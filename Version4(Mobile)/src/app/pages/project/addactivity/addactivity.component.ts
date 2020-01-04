import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
})
export class AddactivityComponent implements OnInit {
  PhaseList: any;
  VersionID: number;
  ApproveList: any;
  serObj: any;
  ActTypeList: any;
  StatusList: any;
  Header: any;
  statusId: number;

  constructor(public Modalcntrl: ModalController, private schService: SchedulingService, public popoverCntrl: PopoverController,private navParams: NavParams) {
    this.serObj = {
      search: '', typeId: 2
    };
  }

  ngOnInit() {
    this.ActionActivityTypeList();
    this.ActionPhaseist();
    this.ActionStatusList();
    //  this.ActionApprovedJobList();
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
    this.schService.PhaseList(this.VersionID).subscribe(
      data => { this.PhaseList = data; }
    );
  }
  //Activitytype List Function
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => { this.ActTypeList = data; }
    );
  }
  //Status List Function
  ActionStatusList() {
    this.schService.ActionStatusList(3).subscribe(
      data => { this.StatusList = data; }
    );
  }

  //Close add activity function
  ActionCloseAddActivity() {
    this.Modalcntrl.dismiss({
    });
  }

  async Actionsearchjobs(ev: any) {
    let approvelist = { ApproveList: ev }
    const popover = await this.popoverCntrl.create({
      component: jobssearchComponent,
      componentProps: approvelist,
      translucent: true,
      cssClass: "popover_class"
    });
    return await popover.present();
  }
}

@Component({
  template: `
  <ion-header>
  <ion-toolbar class="toolbarsty">
    <ion-title class="font-size15">Approved Jobs</ion-title>
    <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)" class="buttonsty">X</ion-button>
  </ion-toolbar>
</ion-header>
<ion-list>
<ion-row>
  <ion-col size="2">Job#</ion-col>
  <ion-col size="7">Job Name</ion-col>
  <ion-col size="3">Approved Date</ion-col>
</ion-row>
<ion-row *ngFor="let job of ApproveList">
  <ion-col size="12">
     <ion-row>
         <ion-col size="2"> {{job.Header.QuoteNo}} - V{{job.SrNo}} </ion-col>
         <ion-col size="7"> {{job.Header.QuoteName}} </ion-col>
         <ion-col size="3"> {{job.AcceptedDate | date:'MM/dd/yyyy'}} </ion-col>
     </ion-row>
 </ion-col>
 </ion-row>
</ion-list>`,
  styleUrls: ['./addactivity.component.scss'],
})
export class jobssearchComponent implements OnInit {
  serObj: any;
  ApproveList: any;

  constructor(private Modalcntrl: ModalController, public popoverCntrl: PopoverController) {

  }

  ngOnInit() { }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }

}
