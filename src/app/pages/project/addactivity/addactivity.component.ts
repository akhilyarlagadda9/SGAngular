import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { OverlayEventDetail } from '@ionic/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
declare var timings: any;
import { AreaPartsComponent } from '../area-parts/area-parts.component';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
  providers: [DatePipe]
})
export class AddactivityComponent implements OnInit {
  actinfo: any = this.navParams.data; ApproveList: any; serObj: any; orginalData: Object = {};
  ActTypeList: any; statusList: any; phaseList: any; ResourceList: any[]; PhasePartList: any; ResourceListWithDates: any[];
  eventCopy: any; calAccess: boolean;
  IsResource: boolean;
  IsSelectedPopulate: number;
  resourceList: any;
  QuotePartList: any; timings: any = timings;dayCheck:any;
  loaderToShow: Promise<void>; minYear:any;
  //arrShowItems:any;
  constructor(public Modalcntrl: ModalController, private schService: SchedulingService, private navParams: NavParams,
    private datePipe: DatePipe, private alertCtrl: AlertController, private authservise: AuthService, public loadingController: LoadingController,) { }

  ngOnInit() {
    this.minYear = (new Date().getFullYear());
    this.LoadCalendarAccess();
    if (this.actinfo.ID == 0) {
      console.log(this.actinfo);
      this.ActionActivityInfo();
    } else {
      console.log(this.actinfo);
      this.actinfo.STime = this.actinfo.STime.charAt(0)=="0"?this.actinfo.STime.substr(1,this.actinfo.STime.length): this.actinfo.STime;
      this.actinfo.ETime = this.actinfo.ETime.charAt(0)=="0"?this.actinfo.ETime.substr(1,this.actinfo.ETime.length):this.actinfo.ETime;
      // this.ActionActivityInfoWithDates();
      this.actinfo.ActualStartDate = this.datePipe.transform(this.actinfo.ActualStartDate.substr(0,(this.actinfo.ActualStartDate).indexOf("T")),"MM/dd/yyyy");
      this.actinfo.ActualEndDate = this.datePipe.transform(this.actinfo.ActualEndDate.substr(0,(this.actinfo.ActualEndDate).indexOf("T")),"MM/dd/yyyy");
      console.log(this.actinfo.ActualStartDate);
      this.actinfo.SchEndTime  = (this.actinfo.SchEndTime).substring(0,(this.actinfo.SchEndTime).indexOf("T"));
      this.GetSelectedData(this.actinfo);
      this.statusList = this.actinfo.StatusList;
    }

    this.ActionActivityTypeList();

    if (this.actinfo.VersionID > 0) {
      this.ActionPhaseist(0);
    }
    if (this.actinfo.PhaseID > 0) {
      this.ActionPhasePartList(0);
    }
    this.dayCheck = this.actinfo.STime == "08:00 AM" && this.actinfo.ETime == "06:00 PM" ? 1: 0;
    console.log(this.actinfo);
  }

  GetSelectedData(data) {
    //var original = {};
    var arrValues: Array<any> = [];
    if (data.QuotePartList != []) {
      data.QuotePartList.forEach(data => {
        arrValues.push(data.AreaName + "-Part" + data.SrNo + "-" + data.JobSqft + "SF");
      });
    }
    this.orginalData["ID"] = data.ID;
    this.orginalData["ActTypeName"] = data.ActTypeName;
    //this.orginalData["SchStartTime"] = data.ActStartDate;
    //this.orginalData["SchEndTime"] = data.ActEndDate;
    //original.SchStartTime = data.SchStartTime;
    //original.SchEndTime = data.SchEndTime;
    this.orginalData["Duration"] = data.Duration;
    this.orginalData["StatusName"] = data.StatusName;
    this.orginalData["Memo"] = data.Memo;
    this.orginalData["PhaseID"] = data.PhaseID;
    this.orginalData["PhaseSrNo"] = data.PhaseSrNo;
    this.orginalData["MatTypeID"] = data.MatTypeID;
    this.orginalData["Area"] = arrValues;
    this.orginalData["DelayHr"] = data.DelayHr;
    this.orginalData["DelayMin"] = data.DelayMin;
    this.orginalData["ResourceName"] = data.ResourceName;
    //if (data.StatusID == 5) {
    this.orginalData["ActualStartDate"] = data.ActualStartDate;
    this.orginalData["ActualEndDate"] = data.ActualEndDate;
    //}
    console.log(this.orginalData);
  }

  //#region Actions
  ActionActivityInfo() {
    let start = this.datePipe.transform(this.actinfo.SchStartTime, "MM-dd-yyyy");
    let result = this.schService.ActivityInfo(this.actinfo.ID, this.actinfo.ActTypeID, start, start).subscribe(
      data => {
        this.actinfo = data;
        this.actinfo.PrevStartDate = data.SchStartTime;
        this.actinfo.PrevEndDate = data.SchEndTime;
        this.statusList = data.StatusList;
        this.PopulateActualDate();
        //this.ActionActivityInfoWithDates();
      },
      error => console.log(error));
  }
  ActionApprovedJobList(search, typeId) {
    this.showLoader();
    this.schService.ApprovedJobList(search, typeId).subscribe(
      data => {
        this.ApproveList = data;
        this.Actionsearchjobs(this.ApproveList);
        this.hideLoader();
      }
    );
  }
  ActionGetSelectedAreas(ev: any) {
    for (let i = 0; i <= ev.length; i++) {
      let actinfo = this.QuotePartList.find(s => s.ID == i[0]);
      if (actinfo != null) {
        this.QuotePartList.AreasName = this.QuotePartList.AreaName;
      }
    }
  }
  ActionPhaseist(typeId) {
    this.schService.PhaseList(this.actinfo.VersionID).subscribe(
      data => {
        this.phaseList = data;
        if (typeId == 1) {
          this.ActionChangePhase(this.phaseList[0].ID);
        }
        this.ActionGetSelectedPhase();
      });
  }
  ActionGetSelectedPhase() {
    let actinfo = this.phaseList.find(s => s.ID == this.actinfo.PhaseID);
    if (actinfo != null) {
      this.actinfo.PhaseName = actinfo.Name;
    }
  }
  ActionChangePhase(Id) {
    let phase = this.phaseList.find(s => s.ID == Id);
    if (phase != null) {
      this.actinfo.PhaseID = phase.ID;
      this.actinfo.PhaseSrNo = phase.Code;
      this.actinfo.MatTypeID = phase.MatTypeID;
      this.actinfo.MaterialName = phase.Materials;
      this.ActionPhasePartList(1);
    }
  }
  ActionPhasePartList(ischange) {
    this.actinfo.ActPartIds = this.actinfo.ActPartIds == undefined ? null : this.actinfo.ActPartIds;
    this.actinfo.Area = this.actinfo.Area == undefined ? null : this.actinfo.Area;
    this.schService.ActionPhasePartList(this.actinfo.VersionID, this.actinfo.PhaseID, this.actinfo.ActTypeID, this.actinfo.ActPartIds, this.actinfo.Area).subscribe(
      data => {
        this.PhasePartList = data;
        if (ischange == 1) {
          // this.actinfo.QuotePartList =this.PhasePartList;
          this.SetAreaPartIDs(this.PhasePartList);
        }
      }
    );
  }
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => {
        this.ActTypeList = data;
        //this.GetResoucreList();
        this.ActionGetSelectedActivityType();
      }
    );
  }
  ActionGetSelectedActivityType() {
    let actinfo = this.ActTypeList.find(s => s.ID == this.actinfo.ActTypeID);
    if (actinfo != null) {
      this.actinfo.ActivityType = actinfo.Name;
    }
  }
  ActionGetStatusResourceList(Id) {
    let sdate = this.datePipe.transform(this.actinfo.SchStartTime, "MM-dd-yyyy");
    this.schService.GetActTypeInfo(Id, sdate).subscribe(data => {
      this.PreapareActivity(data);
    });
  }
  ActionStatusList() {
    this.schService.ActionStatusList().subscribe(data => {
      this.statusList = data;
    });
  }
  ActionSetStatus(id) {
    let statusinfo = this.statusList.find(s => s.ID == id);
    if (statusinfo != undefined && statusinfo != null) {
      if (id == 5) {
        let strCurrentTime = this.datePipe.transform(new Date().getTime(), "hh:mm a");
        let currDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        //let actStartYear = this.datePipe.transform(this.actinfo.ActualStartDate, "yyyy");
      // let actEndYear = this.datePipe.transform(this.actinfo.ActualEndDate, "yyyy");
        this.actinfo.ActStart =  (strCurrentTime.charAt(0))=="0"?strCurrentTime.substr(1,strCurrentTime.length):strCurrentTime;
        this.actinfo.ActEnd =  (strCurrentTime.charAt(0))=="0"?strCurrentTime.substr(1,strCurrentTime.length):strCurrentTime;
        debugger;
        //if ((actStartYear == "0001" || actStartYear == "0000")) {
          //this.actinfo.ActualStartDate = currDate + " " + this.actinfo.STime; // Need to check whether need to add STime, because anyhow we are adding time
          this.actinfo.ActualStartDate = currDate + " "+this.actinfo.ActStart;
       // }
        //if ((actEndYear == "0001" || actEndYear == "0000")) {
          //this.actinfo.ActualEndDate = currDate + " " + this.actinfo.ETime; // Need to check whether need to add ETime, because anyhow we are adding time
          this.actinfo.ActualEndDate = currDate + " "+this.actinfo.ActEnd;
        //}
      }
      this.actinfo.StatusName = statusinfo.Name;
      this.actinfo.IconPath = statusinfo.IconName;
    }


  }
  ActionCloseActivity(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.eventCopy,
      issave: issave
    });
  }
  ActionChangeDate(selctedDate, typeId, type) {
    let obj: any;
    if (type == "sDate") {
      this.actinfo.SchStartTime = selctedDate;
    } else if (type == "eDate") {
      this.actinfo.SchEndTime = selctedDate;
    }
    let start = type == "" ? "" : this.datePipe.transform(selctedDate, "MM-dd-yyyy");
    let today = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    if (new Date(start) < new Date(today) || this.actinfo.StatusID == 5) {
      var alertMsg = this.actinfo.StatusID == 5 ? "Activity is Completed" : "Past Date(s)";
      obj = {
        Header: "Activity Schedule!",
        ChangedDateType: type,
        ShowCalFollowUp: 1,
        HolidayName: "PastDate",
        Message: alertMsg + "Schedule Change is not allowed",
        SubAlert: "Do you want to continue?",
        ClickType: 1, Type: type, StartDate: selctedDate, TypeID: typeId
      }
      this.ShowConfirmAlert(obj);
    }
    else {
      this.GetDuration(typeId);
    }

  }
  ActionChangeDuration(value, typeId) {
    if (typeId == 1) {
      this.actinfo.Hrs = value;
    } else {
      this.actinfo.Mins = value;
    }
    this.GetDuration(0);
  }
  ActionSaveActivity(form: NgForm) {
    console.log(this.actinfo);
    if (form.valid) {
      this.actinfo.SchStartTime = new Date(this.actinfo.SchStartTime).toDateString() + " " + this.actinfo.STime;
      this.actinfo.SchEndTime = new Date(this.actinfo.SchEndTime).toDateString() + " " + this.actinfo.ETime;
      if (this.actinfo.IsDateChange == true || this.actinfo.ID == 0) {
        this.schService.FollowUpStatus(this.actinfo).subscribe(data => {
          var follow = data; let obj: any;
          // Sunaday and Company Holiday
          if ((follow.SeletedDayOfWeek != null && follow.SeletedDayOfWeek != "") || follow.IsCompanyHoliday == "True") { // For Sunday
            var alertMsg = follow.IsCompanyHoliday == "True" ? "Company holiday (" + follow.HolidayName + ") " : follow.SeletedDayOfWeek
            obj = {
              IsExistSunday: 1,
              ShowCalFollowUp: 0,
              Header: "Activity Schedule!",
              ChangedDateType: "",
              HolidayName: "PastDate",
              Message: alertMsg + "Schedule Change is not allowed",
              SubAlert: "Do you want to continue?",
              ClickType: 2,
            }
            this.ShowConfirmAlert(obj);
          }
          // For Resource and Company Events
          else if (follow.IsUserHoliday == "True") {
            var alertMsg1 = follow.IsCompanyHoliday == "True" ? "Company holiday" : "Resource";
            obj = {
              IsExistSunday: 1,
              ShowCalFollowUp: 0,
              Header: "Activity Schedule!",
              ChangedDateType: "",
              HolidayName: "",
              Message: follow.HolidayName + " (OFF) Schedule Change is not allowed",
            }
            this.ShowAlert(obj);
          }
          //Duplicate Activites Timings
          else if (this.actinfo.ID == 0 && follow.DuplicateActs != null && follow.DuplicateActs != "") {
            obj = {
              IsExistSunday: 1,
              ShowCalFollowUp: 0,
              Header: "Resource Schedule!",
              ChangedDateType: "",
              HolidayName: "",
              Message: follow.DuplicateActs + "Scheduled with same Resource same Time",
              SubAlert: "Do you want to continue?",
              ClickType: 2,
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
  // Delete resource function
  ActionDeleteSelectedItems(Id, index, list) {
    if (Id > 0) {
      this.schService.ActionDeleteResource(Id).subscribe(data => {
        let success = data;
      })
    }
    this.actinfo.ResourceList.splice(index, 1);
  }
  ActionAllDayClick(event) {
    this.actinfo.STime = "8:00 AM";
    this.actinfo.ETime = "9:00 AM";
    if (event.detail.checked) {
      this.actinfo.Hrs = 9; this.actinfo.Mins = 0;
      this.actinfo.ETime = "6:00 PM";
      this.actinfo.Duration = 540; this.dayCheck = 1;
    } else {
      this.actinfo.Hrs = 1; this.actinfo.Mins = 0; this.actinfo.Duration = 60; this.dayCheck = 0;
    }
  }
  //#endregion
  //#region  popups
  async Actionsearchjobs(ev: any) {
    let approvelist = { ApproveList: ev }
    const popover = await this.Modalcntrl.create({
      component: jobssearchComponent,
      componentProps: approvelist,
      //translucent: true,
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
  async ActionopenResourcePopup() {
    let start = new Date(this.actinfo.SchStartTime).toDateString() + " " + this.actinfo.STime;
    let end = new Date(this.actinfo.SchEndTime).toDateString() + " " + this.actinfo.ETime;
    let obj = { start: start, end: end, actTypeId: this.actinfo.ActTypeID, actResList: this.actinfo.ResourceList, actId: this.actinfo.ID }
    const popover = await this.Modalcntrl.create({
      component: resorceListComponent,
      componentProps: obj,
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          this.actinfo.ResourceList = detail.data.componentProps;
          //  this.PopulateVersionInfo(detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }
  async ActionOpenAreaPart() {
    let objAreaInfo = { PhasePartList: this.PhasePartList, ActPartIds: this.actinfo.ActPartIds, ActAreaParts: this.actinfo.ActAreaParts };
    const popover = await this.Modalcntrl.create({
      component: AreaPartsComponent,
      componentProps: objAreaInfo,
    });
    popover.onDidDismiss().then((result: OverlayEventDetail) => {
      console.log(result);
      if (result.data.componentProps !== null && result.data.componentProps != undefined) {
        if (result.data.isSelect == true) {
          this.SetAreaPartIDs(result.data.componentProps);
        }
      }
    });
    return await popover.present();
  }
  
showLoader() {
  this.loaderToShow = this.loadingController.create({
    message: 'please wait'
  }).then((res) => {
    res.present();
    res.onDidDismiss().then((dis) => {
      console.log('Loading dismissed!');
    });
  });
}
async hideLoader() {
  this.loadingController.dismiss();
} 
  //#endregion
  //#region activity preparation
  LoadCalendarAccess() {
    this.authservise.GetStoredCalAccess().then(result => {
      let access = result == 2 ? true : false;
      this.calAccess = access;
    });
  }
  PopulateVersionInfo(version: any) {
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
    this.ActionPhaseist(1);
  }
  GetJobAddress(header) {
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
    this.actinfo.STime = result.STime;
    this.actinfo.ETime = result.ETime;
    this.actinfo.ActualStartDate = result.ActualStartDate;
    this.actinfo.ActualEndDate = result.ActualEndDate;
    this.actinfo.ActStart = result.ActStart;
    this.actinfo.ActEnd = result.ActEnd;
    this.actinfo.ResourceList = this.actinfo.ResourceList == null ? [] : this.actinfo.ResourceList;
    this.actinfo.ResourceList = result.ResourceList;
    this.actinfo.ResourceIDs = result.ResourceIDs;
    if (result.StatusList.length > 0) {
      this.statusList = result.StatusList;
    }
    this.PopulateActualDate();
    console.log(this.actinfo);
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
  GetDuration(type) {
    var hrs = this.actinfo.Hrs;
    var mins = this.actinfo.Mins;
    let sDate = new Date(this.actinfo.SchStartTime).toDateString() + " " + this.actinfo.STime;
    let edate = new Date(this.actinfo.SchEndTime).toDateString() + " " + this.actinfo.ETime;
    this.schService.GetDuration(hrs, mins, sDate, edate, type).subscribe(results => {
      if (type == 1) {
        this.actinfo.Hrs = results[0];
        this.actinfo.Mins = results[1];
      }
      else {
        let eDate = results[0] + " " + results[1];
        this.actinfo.SchEndTime = eDate; this.actinfo.ETime = results[1];
      }
      this.actinfo.PrevStartDate = this.actinfo.SchStartTime;
      this.actinfo.PrevEndDate = this.actinfo.SchEndTime;
      this.actinfo.Duration = Number(this.actinfo.Hrs * 60) + Number(this.actinfo.Mins);
    })
  }
  SetAreaPartIDs(list) {
    this.actinfo.QuotePartList = [];
    let Ids = ""; let sqft = 0;
    for (let j in list) {
      let obj = list[j];
      Ids += obj.ID + ",";
      sqft += obj.JobSqft;
      let part = {
        ID: obj.ID,
        AreaID: obj.AreaID,
        AreaName: obj.Area.Name,
        JobPartName: obj.JobPartName,
        NewSrNo: obj.NewSrNo,
        JobSqft: obj.JobSqft,
      };
      this.actinfo.QuotePartList.push(part);
    }
    this.actinfo.ActPartIds = Ids.replace(/(^,)|(,$)/g, "");
    this.actinfo.PhaseSF = sqft;
  }
  //#endregion
  //#region alerts
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
  ConfirmCancel(event) {
    switch (event.ClickType) {
      case 1: {
        if (event.Type == "sDate") {
          this.actinfo.SchStartTime = this.actinfo.PrevStartDate;
        } else {
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
  ConfirmSaveActInfo() {
    let id = this.actinfo.ID;
    this.schService.ActionSaveActivityInfo(this.actinfo).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.actinfo = data;// new one
        this.actinfo.ExtID = id;
        this.eventCopy = this.actinfo;
      }
      this.authservise.GetStoredLoginUserID().then(data => {
        let loginUserID = data;
        this.ActionSaveAuditLog(this.actinfo, loginUserID);
        this.ActionCloseActivity(true);
      });
    });
  }

  ActionSaveAuditLog(actinfo, loginUserID) {
    var Description = "";
    //var root = $routeParams.isPurchase == 1 ? "Purchase" : $routeParams.isJob == 3 ? "Quote" : $routeParams.isJob == 1 ? "Job" : $routeParams.isJob == 0 ? "Calendar" : "";
    if (actinfo.ID == 0) {
      Description = "<b>Action:</b> Activity Created From Calender View";
    } else {
      Description = "<div>" + "<b>Action:</b> Activity Changed From Calendar View" + "</div>" + "<div>" + this.ActionfindDiff(this.orginalData, actinfo) + "</div>";
    }
    if (Description.length > 0) {
      var auditModel = {};
      auditModel["UpdatedBy"] = loginUserID;
      auditModel["ModuleID"] = 4;
      auditModel["Decription"] = Description;
      auditModel["RefID"] = actinfo.ID == 0 ? actinfo.ActTypeID : actinfo.ID;
      auditModel["RefType"] = "3";
      auditModel["ViewType"] = "ActivityEdit";
      var selList = actinfo.ActivityTypeInfo.ResFollowUpList;
      selList = selList == undefined || selList == null ? [] : selList;
      if (selList.length > 0) {
        var refType = actinfo.ActTypeName + " Date Changed";
        auditModel["RefType"] = refType;
        auditModel["FollowUpActs"] = selList;
      }
      console.log(auditModel);
      this.schService.ActionSaveAuditDetails(auditModel).subscribe(data => {
        console.log(data);
      });
    }
  }

  ActionfindDiff(orgData, changedData) {
    let arrAreaName: Array<any> = []   // TODO: Can it be Done in Different Way?
    changedData.QuotePartList.forEach(data => {
      arrAreaName.push(data.AreaName + "-Part" + data.SrNo + "-" + data.JobSqft + "SF");
    });
    var Description = "";
    for (var key in orgData) {
      if (orgData[key] != 0 && orgData[key] != null) {
        if (orgData[key] !== changedData[key] && key !== "ResourceName" && key !== "Area") {
          Description = Description + key + ' from ' + orgData[key] + ' to ' + changedData[key];
          Description = Description + ' | ';
        }
      }
      if (key == "ResourceName" && (orgData[key] == null || orgData[key] == '')) {
        orgData[key] = orgData[key] == null ? ' - ' : orgData[key];
        if (orgData[key] !== changedData[key]) {
          Description = Description + key + ' from ' + orgData[key] + ' to ' + changedData[key];
          Description = Description + ' | ';
        }
      }
      if (key == "Area" && (orgData[key] == null || orgData[key] == '')) {
        orgData[key] = orgData[key] == null ? ' - ' : orgData[key];
        orgData[key].forEach(orgArea => {
          arrAreaName.forEach(chgArea => {
            if (orgArea !== chgArea) {
              Description = Description + key + ' from ' + orgArea + ' to ' + chgArea;
              Description = Description + ' | ';
            }
          });
        });
      }
    }
    return Description;
  }
  //#endregion
}
//#region job search
@Component({
  template: `
  <ion-header>
  <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-button color="danger" type="button" (click)="ActionToClosePop(false)">
            Cancel
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            
          </ion-buttons>
          <ion-title align="center">Approved Jobs</ion-title>
        </ion-toolbar>
   
  </ion-header>
  <ion-content>
  <ion-list>
  <ion-item *ngFor="let job of ApproveList" (click)="ActionJobSelect(job)">
  <ion-col size="9">
  {{job.Header.QuoteNo}} - V{{job.SrNo}} - {{job.Header.QuoteName}} 
  </ion-col>
  <ion-col size="3" class="ion-float-right">
  <ion-note><small>{{job.AcceptedDate | date:'MM/dd/yyyy'}}</small></ion-note>
  </ion-col>
  </ion-item>
 
  </ion-list> </ion-content>`,
})
export class jobssearchComponent implements OnInit {
  serObj: any;
  ApproveList: any;
  jobdetails: any;
  constructor(private Modalcntrl: ModalController) {

  }
  ngOnInit() { }
  ActionJobSelect(model: any) {
    this.jobdetails = model;
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isselect) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.jobdetails,
      isselect: isselect
    });
  }
}
//#endregion
//#region  resources
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
})
export class resorceListComponent implements OnInit {
  resourceList: any = []; start: any; end: any; actTypeId: any; actResList: any; actId: number;
  constructor(private Modalcntrl: ModalController, private schService: SchedulingService, private alertCtrl: AlertController) {
  }
  ngOnInit() { this.GetResoucreList(); }
  GetResoucreList() {
    this.schService.ActTypeResListWithDates(this.actTypeId, this.start, this.end).subscribe(
      data => {
        this.resourceList = data;
        this.selectedResourceHeighlited();
      },
      error => console.log(error));
  }
  ActionPushResource(data, resource) {
    if (data == true) {
      this.schService.ActionCheckIsExistSameRes(this.actId, resource.ResourceID, this.start, this.end).subscribe(results => {
        var success = results.data;
        if (success != null && success != "") {
          let obj = {
            IsExistSunday: 1,
            ShowCalFollowUp: 0,
            Header: "Resource Schedule!",
            ChangedDateType: "",
            HolidayName: "",
            Message: success + "Scheduled with same Resource same Time",
            SubAlert: "Do you want to continue?",
            ClickType: 3,
            model: resource,
          }
          this.ShowResConfirmAlert(obj);
        } else {
          this.ConfirmResPopulate(resource);
        }
      });
    }
  }
  selectedResourceHeighlited() {
    for (let i in this.resourceList) {
      let reslistId = this.resourceList[i].ResourceID;
      let resInfo = this.actResList.find(s => s.ResourceID == reslistId);
      if (resInfo != null) {
        this.resourceList[i].Check = 1;
      }
    }
  }
  async ShowResConfirmAlert(event) {
    const alert = await this.alertCtrl.create({
      header: event.Header,
      subHeader: event.Message,
      message: event.SubAlert,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {

        }
      }, {
        text: 'Allow',
        handler: () => {
          this.ConfirmResPopulate(event.model);
        }
      }]
    });
    alert.present();
  }
  ConfirmResPopulate(data) {
    var addToArray = true;
    var model = {
      ResourceName: data.ResourceName,
      ResourceID: data.ResourceID,
      ActivityID: this.actId,
      IsActive: data.IsActive,
      EmpMail: data.EmpMail,
      EmpPinNo: data.EmpPin,
      EmpPhone: data.EmpPhone,
      Provider: data.Provider,
      AssignTypeID: 1,
    }
    if (this.actResList == null) {
      this.actResList = [];
    }
    addToArray = this.isCheck(this.actResList, data.ResourceID);
    if (addToArray) {
      this.actResList.push(model);
    }
  }
  isCheck(list, id) {
    var addToArray = true;
    if (list != null && list != undefined) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].ResourceID === id) {
          addToArray = false;
        }
      }
    }
    return addToArray;
  }
  ActionToClosePop(isselect) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.actResList,
      isselect: isselect
    });
  }
}
//#endregion