import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams,AlertController } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { OverlayEventDetail } from '@ionic/core';
import { DatePipe,formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
  providers: [DatePipe]
})
export class AddactivityComponent implements OnInit {

  actinfo: any = this.navParams.data; ApproveList: any; serObj: any; 
  ActTypeList: any; statusList: any; phaseList: any;ResourceList: any[];PhasePartList: any;
  eventCopy :any;
  constructor(public Modalcntrl: ModalController, private schService: SchedulingService,
  public popoverCntrl: PopoverController, private navParams: NavParams, 
  private datePipe: DatePipe,private alertCtrl:AlertController) { }

  ngOnInit() {
    if (this.actinfo.ID == 0) {
      this.ActionActivityInfo();
    }else{
      this.statusList = this.actinfo.StatusList;
    }
    this.ActionActivityTypeList();
   
    if (this.actinfo.VersionID > 0) {
      this.ActionPhaseist();
    }
    if (this.actinfo.PhaseID > 0) {
      this.ActionAreaList();
    }
  }
  ActionActivityInfo() {
    let start = this.datePipe.transform(this.actinfo.SchStartTime, "MM-dd-yyyy");
    let result = this.schService.ActivityInfo(this.actinfo.ID, this.actinfo.ActTypeID, start, start).subscribe(
      data => {
        this.actinfo = data;
        this.actinfo.PrevStartDate = data.SchStartTime;
        this.actinfo.PrevEndDate = data.SchEndTime;
        this.statusList = data.StatusList;
        this.PopulateActualDate();
      },
      error => console.log(error));
  }
  GetResoucreList() {
    this.schService.ActivityTypeResourceList(this.actinfo.ActTypeID).subscribe(data => {
      this.ResourceList = data;
    })
  }
  //Approved Job List Function
  ActionApprovedJobList(search, typeId) {
    this.schService.ApprovedJobList(search, typeId).subscribe(
      data => {
        this.ApproveList = data;
        this.Actionsearchjobs(this.ApproveList);
      }
    );
  }
  //Phase List Function
  ActionPhaseist() {
    this.schService.PhaseList(this.actinfo.VersionID).subscribe(
      data => {
        this.phaseList = data; 
      });
  }
  ActionChangePhase() {
    let phase = this.phaseList.find(s => s.ID == this.actinfo.PhaseID);
    if (phase != null) {
      this.actinfo.PhaseID = phase.ID;
      this.actinfo.PhaseSrNo = phase.Code;
      this.actinfo.MatTypeID = phase.MatTypeID;
      this.actinfo.MaterialName = phase.Materials;
      this.ActionAreaList();
    }
  }
  //Area List 
  ActionAreaList() {
    // this.schService.ActionAreaList(this.actinfo.VersionID, this.actinfo.PhaseID).subscribe(
    //   data => { this.AreaList = data; }
    // );
  }

  //Activitytype List Function
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => { this.ActTypeList = data; }
    );
  }
  ActionGetStatusResourceList(Id) {
    let sdate = this.datePipe.transform(this.actinfo.SchStartTime, "MM-dd-yyyy");
    this.schService.GetActTypeInfo(Id, sdate).subscribe(data => {
      this.PreapareActivity(data);
    });
  }
  //Status List Function
  ActionStatusList() {
    this.schService.ActionStatusList().subscribe(data => {
      this.statusList = data;
    });
  }
  //Close add activity function
  ActionCloseActivity(issave) {
    this.Modalcntrl.dismiss({
      componentProps: this.eventCopy,
    });
  }
  ActionPushResources = function (data) {
    this.actinfo.IsSelectedPopulate = 0;
    if (data.Check == 1) {
      var sDate = this.actinfo.SchStartTime + " " + this.actinfo.StartTime;
      var eDate = this.actinfo.SchEndTime + " " + this.actinfo.EndTime;
      this.schService.CheckIsExistSameRes(this.actinfo.ID, data.ResourceID, sDate, eDate).then(function (results) {
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
          this.PopulateVersionInfo(detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }
  ActionChangeDate(selctedDate,typeId,type){
    let obj:any;
    let start = this.datePipe.transform(selctedDate, "MM-dd-yyyy");
    let today = this.datePipe.transform( new Date(), "MM-dd-yyyy");
    if (new Date(start) < new Date(today) || this.actinfo.StatusID == 5) {
      var alertMsg = this.actinfo.StatusID == 5 ? "Activity is Completed" : "Past Date(s)";
     obj = {
        Header:"Activity Schedule!",
        ChangedDateType:type,
        ShowCalFollowUp:1,
        HolidayName:"PastDate",
        Message:alertMsg + "Schedule Change is not allowed",
        SubAlert:"Do you want to continue?",
        ClickType:1,Type:type,StartDate:selctedDate,TypeID:typeId
      }
      this.ShowConfirmAlert(obj);
  } 
else{
  this.GetDuration(typeId);
}

  }
  ActionSaveActivity(form: NgForm){
    if (form.valid) {
      if (this.actinfo.IsDateChange == true || this.actinfo.ID == 0) {

this.schService.FollowUpStatus(this.actinfo).subscribe(data=>{
  var follow = data;let obj :any;
  // Sunaday and Company Holiday
  if ((follow.SeletedDayOfWeek != null && follow.SeletedDayOfWeek != "") || follow.IsCompanyHoliday == "True") { // For Sunday
    var alertMsg = follow.IsCompanyHoliday == "True" ? "Company holiday (" + follow.HolidayName + ") " : follow.SeletedDayOfWeek
    obj = {
      IsExistSunday:1,
      ShowCalFollowUp:0,
      Header:"Activity Schedule!",
      ChangedDateType:"",
      HolidayName:"PastDate",
      Message:alertMsg + "Schedule Change is not allowed",
      SubAlert:"Do you want to continue?",
      ClickType:2,
    }
    this.ShowConfirmAlert(obj);
}
// For Resource and Company Events
else if (follow.IsUserHoliday == "True") { 
  var alertMsg1 = follow.IsCompanyHoliday == "True" ? "Company holiday" : "Resource";
  obj = {
    IsExistSunday:1,
    ShowCalFollowUp:0,
    Header:"Activity Schedule!",
    ChangedDateType:"",
    HolidayName:"",
    Message:follow.HolidayName + " (OFF) Schedule Change is not allowed",
  }
  this.ShowAlert(obj);
}
//Duplicate Activites Timings
else if (this.actinfo.ID == 0 && follow.DuplicateActs != null && follow.DuplicateActs != "") {
  obj = {
    IsExistSunday:1,
    ShowCalFollowUp:0,
    Header:"Resource Schedule!",
    ChangedDateType:"",
    HolidayName:"",
    Message:follow.DuplicateActs + "Scheduled with same Resource same Time",
    SubAlert:"Do you want to continue?",
    ClickType:2,
  }
  this.ShowConfirmAlert(obj);
}
else {
  this.ConfirmSaveActInfo();
}
})
    } else {
        this.ConfirmSaveActInfo();
    }
     
    }
  }
  PopulateVersionInfo(version: any) {
    debugger;
    this.actinfo.JobName = version.Header.QuoteName;
    this.actinfo.QuoteNo = version.Header.QuoteNo;
    this.actinfo.VersionID = version.ID;
    this.actinfo.version = version;
    this.actinfo.ProjectID = version.QuoteID;
    this.actinfo.SalesPersonID = version.Header.SalesPersonID;
    this.actinfo.PhaseID = version.PhaseID;
    this.actinfo.LocID = version.Header.LocID;
    this.actinfo.JobStageID = version.JobStatusID;
    this.actinfo.SalesPinNo = version.Header.SalesPinNo;
    this.actinfo.SalesPerName = version.Header.SalesPerson;
    this.actinfo.SalesPerEmail = version.Header.SalesPerEmail;
    this.actinfo.CustomerID = version.CustomerID;
    this.actinfo.CustName = version.CustName;
    this.actinfo.CustPhone = version.CustPhone;
    this.actinfo.CustTypeID = version.CustTypeID;
    this.actinfo.PhaseSrNo = version.Header.PhaseSrNo;
    this.actinfo.MatTypeID = version.Header.MatTypeID;
    this.actinfo.MaterialName = version.PhaseMaterials;
    this.GetJobAddress(version.Header);
    this.ActionPhaseist();
  }
GetJobAddress(header){
  this.actinfo.JobName = header.QuoteName;
  this.actinfo.QuoteNo = header.QuoteNo;
  header.Address1 = header.Address1 == null || header.Address1 == "" ? "" : header.Address1 + ",";
  header.City = header.City == null || header.City == "" ? "" : header.City + ",";
  header.State = header.State == null || header.State == "" ? "" : header.State;
  header.Zipcode = header.Zipcode == null ? "" : header.Zipcode;
  var zipcodeComma = header.Zipcode != "" && (header.State != "" || header.City != "") ? " - " : "";
  this.actinfo.JobFullAddres = header.Address1 + header.City + header.State + zipcodeComma + header.Zipcode;
}
  PreapareActivity(result) {
    // ActType Info
    this.actinfo.ActTypeID = result.ActTypeID;
    this.actinfo.ActTypeName = result.ActTypeName;
    this.actinfo.ActivityType = result.ActTypeName;
    this.actinfo.ActColorCode = result.ActColorCode;
    this.actinfo.ActTxtColor = result.ActTxtColor;
    this.actinfo.StageID = result.StageID;
    // Status Info
    this.actinfo.StatusID = result.StatusID;
    this.actinfo.StatusName = result.StatusName;
    this.actinfo.IconPath = result.IconPath;
    this.actinfo.Duration = result.Duration;
    this.actinfo.Hrs = result.Hrs;
    this.actinfo.Mins = result.Mins;
    this.actinfo.SchStartTime = result.SchStartTime;
    this.actinfo.SchEndTime = result.SchEndTime;
    this.actinfo.StartTime = result.SchStartTime;
    this.actinfo.EndTime = result.EndTime;
    this.actinfo.ActualStartDate = result.ActualStartDate;
    this.actinfo.ActualEndDate = result.ActualEndDate;
    this.actinfo.ResourceList = this.actinfo.ResourceList == null ? [] : this.actinfo.ResourceList;
    this.actinfo.ResourceList = result.ResourceList;
    this.actinfo.ResourceIDs = result.ResourceIDs;
    if (result.StatusList.length > 0) {
      this.statusList = result.StatusList;
    }
    this.PopulateActualDate();
  }
  PopulateActualDate() {
    let actStartYear = this.datePipe.transform(this.actinfo.ActualStartDate, "yyyy");
    let actEndYear = this.datePipe.transform(this.actinfo.ActualEndDate, "yyyy");
    if ((actStartYear == "0001" || actStartYear == "0000") && this.actinfo.StatusID == 5) {
      this.actinfo.ActualStartDate = this.actinfo.SchStartTime;
    }
    if ((actEndYear == "0001" || actEndYear == "0000") && this.actinfo.StatusID == 5) {
      this.actinfo.ActualEndDate = this.actinfo.SchEndTime;
    }
  }
  async ShowConfirmAlert(event) {
    const alert = await this.alertCtrl.create({
      header: event.Header,
      subHeader: event.Message,
      message: event.SubAlert,
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            this.ConfirmCancel(event);
          }
        }, {
          text: 'Allow',
          handler: () => {
            this.ConfirmSuccess(event);
          }
        }]
    });
    alert.present();
  }
  async ShowAlert(event) {
    const alert = await this.alertCtrl.create({
      header: event.Header,
      subHeader: event.Message,
     // message: event.SubAlert,
      buttons: [{
          text: 'OK',
          role: 'OK',
          handler: (blah) => {
          }
        }]
    });
    alert.present();
  }
  
  ConfirmCancel(event){
    switch (event.ClickType) {
      case 1: {
        if(event.Type == "sDate"){
          this.actinfo.SchStartTime = this.actinfo.PrevStartDate;
        }else{
          this.actinfo.SchEndTime = this.actinfo.PrevEndDate;
        }
        break;
      }
    }
  }
  ConfirmSuccess(event) {
    switch (event.ClickType) {
      case 1: {
        this.GetDuration(event.TypeID);
        break;
      }
      case 2: {
        this.ConfirmSaveActInfo();
        break;
      }
    }
}
ConfirmSaveActInfo(){
  let id = this.actinfo.ID;
  this.schService.ActionSaveActivityInfo(this.actinfo).subscribe(data=>{
    this.actinfo = data;
    this.actinfo.ExtID = id;
    this.eventCopy = this.actinfo;
this.ActionCloseActivity(true);
  })
}

GetDuration(type){
 var hrs = this.actinfo.Hrs;
 var mins = this.actinfo.Mins;
let sDate = this.actinfo.SchStartTime;
let edate = this.actinfo.SchEndTime;
  this.schService.GetDuration(hrs,mins,sDate,edate,type).subscribe(results=>{
    if (type == 1) {
      this.actinfo.Hrs = results[0];
      this.actinfo.Mins = results[1];
    }
  else {
    let eDate = results[0] + " " +results[1];
    this.actinfo.SchEndTime = eDate;
   }
   this.actinfo.PrevStartDate = this.actinfo.SchStartTime;
   this.actinfo.PrevEndDate = this.actinfo.SchEndTime;
  this.actinfo.Duration = Number(this.actinfo.Hrs * 60) + Number(this.actinfo.Mins);
  })
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
