import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
})
export class AddactivityComponent implements OnInit {
  PhaseList: any; VersionID: number = 0; ApproveList: any; serObj: any; ActTypeList: any; StatusList: any; Header: any; statusId: number; actDetails: any; jname: string;
  QuoteNo: any; QuoteName: any; jsalesPerson: any; jcustName: any; JobReschFlag: any; jAddress: string; JobFullAddres: string; City: string; statusList: any[];
  ResourceList: any[];
  PhaseID: number;
  AreaList: any;

  constructor(public Modalcntrl: ModalController, private schService: SchedulingService, public popoverCntrl: PopoverController, private navParams: NavParams) {
    this.serObj = {
      search: '', typeId: 2
    };
    this.actDetails = {};
  }

  ngOnInit() {
    this.ActionActivityTypeList();
    this.ActionStatusList();
    //this.GetResoucreList();
  }
  GetResoucreList(Id) {
    this.schService.ActivityTypeResourceList(Id).subscribe(data => {
      this.ResourceList = data;
    })
  }
  //Approved Job List Function
  ActionApprovedJobList() {
    this.schService.ApprovedJobList(this.serObj.search, this.serObj.typeId).subscribe(
      data => {
        this.ApproveList = data;
        this.Actionsearchjobs(this.ApproveList);
      }
    );
  }
  //Phase List Function
  ActionPhaseist() {
    this.schService.PhaseList(this.actDetails.VersionID).subscribe(
      data => { this.PhaseList = data; }
    );
  }
  //Area List Function
  ActionAreaist() {debugger;
    this.schService.ActionAreaList(this.actDetails.VersionID,this.PhaseID).subscribe(
      data => { this.AreaList = data; }
    );
  }

  //Activitytype List Function
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => { this.ActTypeList = data; }
    );
  }
  ActionGetStatusResourceList(Id) {
    this.GetResoucreList(Id);
  }
  //Status List Function
  ActionStatusList() {
    this.schService.ActionStatusList().subscribe(data => {
      this.statusList = data;
    });
  }
  //Close add activity function
  ActionCloseAddActivity() {
    this.Modalcntrl.dismiss({
    });
  }
  ActionPushResources = function (data) {
    this.actDetails.IsSelectedPopulate = 0;
    if (data.Check == 1) {
      var sDate = this.actDetails.SchStartTime + " " + this.actDetails.StartTime;
      var eDate = this.actDetails.SchEndTime + " " + this.actDetails.EndTime;
      this.schService.CheckIsExistSameRes(this.actDetails.ID, data.ResourceID, sDate, eDate).then(function (results) {
        var success = results.data;
      });
    }
  }
  async Actionsearchjobs(ev: any) {
    let approvelist = { ApproveList: ev }
    const popover = await this.popoverCntrl.create({
      component: jobssearchComponent,
      componentProps: approvelist,
      translucent: true,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          this.actDetails = detail.data.componentProps;
          this.actDetails.JobName = detail.data.componentProps.Header.QuoteName;
          this.actDetails.LocID = detail.data.componentProps.Header.LocID;
          this.actDetails.VersionID = detail.data.componentProps.ID;
          this.ActionPhaseist();
        }
      }
    });
    return await popover.present();
  }
}

@Component({
  template: `
  <ion-header>
    <ion-toolbar class="toolbarsty">
      <ion-title class="font-size15">Approved Jobs</ion-title>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)" class="buttonsty">X
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-list>
    <ion-item *ngFor="let job of ApproveList" (click)="ActionJobSelect(job)" class="smallfont2">
    <ion-row style="width:100%">
    <ion-col size="9">
      <b>{{job.Header.QuoteNo}} - V{{job.SrNo}} - {{job.Header.QuoteName}} </b>
      </ion-col>
      <ion-col size="3" class="ion-float-right">
      {{job.AcceptedDate | date:'MM/dd/yyyy'}}
      </ion-col>
      </ion-row>
      </ion-item>
  </ion-list>`,
  styleUrls: ['./addactivity.component.scss'],
  })
export class jobssearchComponent implements OnInit {
  serObj: any;
  ApproveList: any;
  jobdetails: any;

  constructor(private Modalcntrl: ModalController, public popoverCntrl: PopoverController) {

  }

  ngOnInit() { }
  ActionJobSelect(model: any) {
    this.jobdetails = model;
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isselect) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps: this.jobdetails,
      isselect: isselect
    });
  }
}
