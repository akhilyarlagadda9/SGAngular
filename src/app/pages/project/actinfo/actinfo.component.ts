import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { DatePipe } from '@angular/common';
import { AddactivityComponent } from '../addactivity/addactivity.component';
import { OverlayEventDetail } from '@ionic/core';
import { AuthService } from 'src/app/service/auth.service';
declare const imgUrl: any;
@Component({
  selector: 'app-actinfo',
  templateUrl: './actinfo.component.html',
  styleUrls: ['./actinfo.component.scss'],
  providers: [DatePipe]
})
export class ActinfoComponent implements OnInit {
  obj: any = this.navParams.data;
  actInfo: any;
  actheader: any;
  showmore: number = 0; calAccess: boolean
  blnDeleteAct: Boolean = false; objToSend: Array<any> = [];
  constructor(public Modalcntrl: ModalController, private navParams: NavParams,
    private schService: SchedulingService, private datePipe: DatePipe, private authservise: AuthService) { }
  ngOnInit() {
    let intID = this.obj.actId == 0 ? this.obj.ActTypeID : this.obj.actId;
    console.log(intID);
    this.schService.ActionGetAuditList(intID, 4, 3).subscribe(data => {
      console.log(data);
      this.objToSend.push(data);
    });
    this.LoadCalendarAccess();
    this.ActionActivityInfo();
  }
  LoadCalendarAccess() {
    this.authservise.GetStoredCalAccess().then(result => {
      let access = result == 2 ? true : false;
      this.calAccess = access;
    });
  }
  ActionActivityInfo() {
    let start = this.datePipe.transform(this.obj.StartDate, "MM-dd-yyyy");
    let end = this.datePipe.transform(this.obj.EndDate, "MM-dd-yyyy");
    let result = this.schService.ActivityInfo(this.obj.actId, this.obj.actTypeID, start, end).subscribe(
      data => {
        this.actInfo = data;
        this.actInfo.Imageurl = imgUrl + 'Status/' + this.actInfo.IconPath;
        this.actInfo.StatusIcon
        this.GetJobAddress(data.Version.Header);
        // this.actheader = data.Version.Header;
        console.log(data);
      },
      error => console.log(error));
  }
  GetJobAddress(header) {
    this.actInfo.JobName = header.QuoteName;
    this.actInfo.QuoteNo = header.QuoteNo;
    header.Address1 = header.Address1 == null || header.Address1 == "" ? "" : header.Address1 + ",";
    header.City = header.City == null || header.City == "" ? "" : header.City + ",";
    header.State = header.State == null || header.State == "" ? "" : header.State;
    header.Zipcode = header.Zipcode == null ? "" : header.Zipcode;
    var zipcodeComma = header.Zipcode != "" && (header.State != "" || header.City != "") ? " - " : "";
    this.actInfo.JobFullAddres = header.Address1 + header.City + header.State + zipcodeComma + header.Zipcode;
  }
  //More function
  ActionMoreAreas(more: number) {
    this.showmore = more;
  }

  ActionDeleteEvent() {
    // this.actInfo={};
    this.blnDeleteAct = true;
    this.ActionClose(false);
  }
  //Close Function
  ActionClose(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.actInfo,
      issave: issave,
      deleteAct: this.blnDeleteAct
    });
    this.blnDeleteAct = false;
  }
  //Edit Activity Function
  async ActionEditActivity() {
    let copyobj = JSON.parse(JSON.stringify(this.actInfo));
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: copyobj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {

    });
    return await modal.present();
  }

  async ActionOpenAudit() {
    const modal = await this.Modalcntrl.create({
      component: AuditDetails,
      componentProps: this.objToSend
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {

    });
    return await modal.present();
  }

}
@Component({
  template: ` <ion-header>
  <ion-toolbar color="secondary">
  <ion-title align="center">Audit Details</ion-title>
  <ion-buttons slot="start">
      <ion-button color="danger" type="button" (click)="ActionClosePopUp()">
        Close
      </ion-button>
    </ion-buttons>
</ion-toolbar>
</ion-header>

<ion-content>
<ion-card  *ngFor="let data of auditdata" class="margin-bottom">

<ion-item>

<ion-row>
<b>Updted Date:</b>{{data.UpdatedDate}}
<b>Updated By:</b>{{data.UpdatedByName}}
<div [innerHTML]=data.Decription> </div>
</ion-row>

</ion-item>

</ion-card>
</ion-content>`,
providers: [DatePipe]
})
export class AuditDetails implements OnInit {
  actData = this.navParams.data;
  auditdata: Array<any> = [];
  constructor(private navParams: NavParams, public Modalcntrl: ModalController,private datePipe: DatePipe) { }

  ngOnInit() {
    this.auditdata = this.actData[0];
    this.auditdata.forEach(data=>{
        data.UpdatedDate =this.datePipe.transform(data.UpdatedDate, "MM-dd-yyyy hh:mm a");
    });
  }

  ActionClosePopUp() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
    });
  }

}
