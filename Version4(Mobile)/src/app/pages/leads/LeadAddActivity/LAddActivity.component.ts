import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { LeadService } from 'src/app/service/lead.service';
import { SchedulingService } from 'src/app/service/scheduling.service';
declare var timings: any;
@Component({
  selector: 'app-LAddActivity',
  templateUrl: './LAddActivity.component.html',
  styleUrls: ['./LAddActivity.component.scss'],
  providers: [DatePipe]
})

export class LAddActivityComponent implements OnInit {

  actinfo: any = this.navParams.data;
  calAccess: boolean = true;
  ActTypeList: any; statusList: any;
  leadlist: any; timings: any = timings; eventCopy;any;
  messageList: any; MeetingTypes: any; minYear:any;
  constructor(public Modalcntrl: ModalController, private navParams: NavParams,
    private datePipe: DatePipe, private alertCtrl: AlertController, private leadService: LeadService, private schService: SchedulingService) { }


  ngOnInit() {
    this.minYear = (new Date().getFullYear());
    this.MeetingTypes = [
      {
        ID: 1,
        Name: 'Phone Call',
        IconClass: 'fa-phone'
      },
      {
        ID: 2,
        Name: 'Email',
        IconClass: 'fa-envelope-o'
      }, {
        ID: 3,
        Name: 'Meeting',
        IconClass: 'fa-briefcase'
      },
      {
        ID: 4,
        Name: 'In Person',
        IconClass: 'fa-user-md'
      }];
    if(this.actinfo.ID>0){
    this.ActionApprovedLeadList('',2);
    }
    this.ActionActivityTypeList();
    this.ActivityStatusList();
    this.ActionGetMessageList();
    this.PrepareDate();
  }
  ActionGetMessageList() {
    this.leadService.GetMessageStatusList(11).subscribe(data => {
      console.log(data);
      this.actinfo["StatusName"] = "Normal";
      this.messageList = data;
      this.ActionMessageStatus(this.actinfo.PriorityIcon);
    });
  }

  
  ActionMessageStatus(icon){
    let priorityCheck = this.messageList.find(s => s.Path == icon);
    if(priorityCheck){ // Check only if it is not Undefined
    this.actinfo["messageID"] = priorityCheck.ID;
    this.actinfo["StatusName"] = priorityCheck.Name
    this.actinfo["PriorityIcon"] = priorityCheck.Path;
    }
  }

  ActionSetMessageStatus(id){
    let priorityCheck = this.messageList.find(s => s.ID == id);
    this.actinfo["StatusName"] = priorityCheck.Name
    this.actinfo["PriorityIcon"] = priorityCheck.Path;
  }

  ActionActivityTypeList() {
    this.leadService.GetActivityTypeList(10).subscribe(data => {
      console.log(data);
      this.ActTypeList = data;
      this.ActionGetSelectedActivityType();
    });
  }

  ActionGetSelectedActivityType() {
    let actinfo = this.ActTypeList.find(s => s.ID == this.actinfo.ActTypeID); // Only For Edit 
    if (actinfo != null) {
      this.actinfo.ActTypeID = actinfo.ID;
      this.actinfo.ActivityType = actinfo.Name;
    }
    else {
      this.actinfo.ActTypeID = "";
    }
  }
  ActionSetActType(id){
    let acttypeInfo = this.ActTypeList.find(s => s.ID == id);
    if (acttypeInfo != undefined && acttypeInfo != null) {
      this.actinfo["ActTypeID"] = acttypeInfo.ID;
      this.actinfo["ActivityType"] = acttypeInfo.Name;
    }
  }
  ActivityStatusList() {
    this.leadService.GetStatusList().subscribe(data => {
      console.log(data);
      this.statusList = data;
      this.ActionGetSeelctedStatusType();
      //this.actinfo["StatusID"] = data
    });
  }
  ActionGetSeelctedStatusType(){
    let statusInfo = this.statusList.find(s => s.ID == this.actinfo.StatusID); // Only For Edit 
    if (statusInfo != null) {
      this.actinfo.StatusID = statusInfo.ID;
      this.actinfo.ActStatusName = statusInfo.Name;
    }
    else {
      this.actinfo.StatusID = "";
    }
  }

  ActionSetStatus(id) {
    console.log(id);
    let statusinfo = this.statusList.find(s => s.ID == id);
    if (statusinfo != undefined && statusinfo != null) {
      this.actinfo["StatusID"] = statusinfo.ID;
      this.actinfo["ActStatusName"] = statusinfo.Name;
      this.actinfo["IconPath"] = statusinfo.IconName;
    }
  }
  ActionApprovedLeadList(strSearch, id) {
    this.leadService.LeadSearchList(strSearch, id).subscribe(data => {
      if(this.actinfo.ID > 0){
        this.ActionEditJobName(this.actinfo.LeadID,data);
      }
      else{
      console.log(data);
      this.leadlist = data;
      this.Actionsearchjobs(this.leadlist);
      }
    });
  }

  ActionEditJobName(id,data){
    data.forEach(element => {
      if(element.ID == id){
        console.log(element);
       // this.actinfo["LeadName"] = element.LeadCustomer.Name;
        this.PrepareLeadDetails(element); // While Editing
      }
    });
  }

  async Actionsearchjobs(ev: any) {
    let leadlist = { leadlist: ev }
    const popover = await this.Modalcntrl.create({
      component: leadssearchComponent,
      componentProps: leadlist,
      //translucent: true,
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          console.log(detail.data.componentProps);
          this.PrepareLeadDetails(detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }
  PrepareLeadDetails(LeadDetails) {
    console.log(LeadDetails);
    LeadDetails.LeadCustomer.BillAddress = LeadDetails.LeadCustomer.BillAddress == null ? "" : LeadDetails.LeadCustomer.BillAddress;
    LeadDetails.LeadCustomer.BillCity = LeadDetails.LeadCustomer.BillCity == null ? "" : LeadDetails.LeadCustomer.BillCity;
    LeadDetails.LeadCustomer.BillState = LeadDetails.LeadCustomer.BillState == null ? "" : LeadDetails.LeadCustomer.BillState;
    LeadDetails.LeadCustomer.BillZipCode = LeadDetails.LeadCustomer.BillZipCode == null ? "" : LeadDetails.LeadCustomer.BillZipCode;
    let strLeadAddress = LeadDetails.LeadCustomer.BillAddress + "," + LeadDetails.LeadCustomer.BillCity + "," + LeadDetails.LeadCustomer.BillState + "," + LeadDetails.LeadCustomer.BillZipCode;
    strLeadAddress = strLeadAddress.replace(",,", "");
    this.actinfo["LeadName"] = LeadDetails.LeadCustomer.Name;
    this.actinfo["LeadExtID"] = LeadDetails.ExtID;
    this.actinfo["LeadID"] = LeadDetails.ID;
    this.actinfo["RefTypeID"] = LeadDetails.LeadCustomer.RefID;
    this.actinfo["LeadAddress"] = strLeadAddress;
    this.actinfo["LeadCity"] = LeadDetails.LeadCustomer.BillCity;
    this.actinfo["LeadState"] = LeadDetails.LeadCustomer.BillState;
    this.actinfo["LeadZipcode"] = LeadDetails.LeadCustomer.BillZipCode;
    this.actinfo["LeadSuburb"] = LeadDetails.LeadCustomer.BillSuburb;
    this.actinfo["SalesPerson"] = (LeadDetails.SalesPerson == null || LeadDetails.SalesPerson == "") ? "" : LeadDetails.SalesPerson;
    this.actinfo["SalesPersonID"] = LeadDetails.SalesPersonID;
    this.actinfo["CustomerName"] = LeadDetails.CustomerName;
    this.actinfo["CustTypeID"] = LeadDetails.CustTypeID;
    this.actinfo["UserID"] = LeadDetails.UserID;
    this.actinfo["IsActive"] = LeadDetails.IsActive;
    console.log(this.actinfo);
    this.getSalesPersonalDetais(); // Get sales Rep Details
  }
  getSalesPersonalDetais(){
    this.leadService.GetSalesRepDetails(this.actinfo.SalesPersonID).subscribe(data=>{
      console.log(data);
      this.actinfo["SalesRepEmail"] = data.PriEmail;
      this.actinfo["SalesRepPhone"]=  data.PriPhone;
      this.actinfo["SalesRepProvider"] = data.Provider;
    })
  }


  PrepareDate() {
    if(this.actinfo.ID > 0){
      let startDate =this.actinfo.StartDate.substring(0,this.actinfo.StartDate.indexOf("T"));
      let endDate =  this.actinfo.EndDate.substring(0,this.actinfo.EndDate.indexOf("T"));
      this.actinfo.SchStartTime = this.datePipe.transform(startDate, "MM/dd/yyyy");
      this.actinfo.SchEndTime = this.datePipe.transform(endDate, "MM/dd/yyyy");
      this.actinfo.STime = this.datePipe.transform(this.actinfo.StartDate, "hh:mm a","-400");
      this.actinfo.STime = this.actinfo.STime.charAt(0) == "0" ? this.actinfo.STime.substr(1,this.actinfo.STime.length): this.actinfo.STime;
      this.actinfo.ETime = this.datePipe.transform(this.actinfo.EndDate, "hh:mm a","-400");
      this.actinfo.ETime = this.actinfo.ETime.charAt(0) == "0" ? this.actinfo.ETime.substr(1,this.actinfo.ETime.length): this.actinfo.ETime;
      this.actinfo.Duration = this.actinfo.Duration;
      this.actinfo.Hrs = Math.floor(this.actinfo.Duration/60);
      this.actinfo.Mins = this.actinfo.Duration % 60;
    }
    else{
    this.actinfo.SchStartTime = this.datePipe.transform(this.actinfo.SchStartTime, "MM/dd/yyyy");
    this.actinfo.SchEndTime = this.datePipe.transform(this.actinfo.SchEndTime, "MM/dd/yyyy");
    this.actinfo.STime = "7:30 AM";
    this.actinfo.ETime = "8:30 AM";
    this.actinfo.Hrs = "1";
    this.actinfo.Mins = "0";
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
  GetDuration(type) {
    var hrs = this.actinfo.Hrs;
    var mins = this.actinfo.Mins;
    let sDate = new Date(this.actinfo.SchStartTime).toDateString() + " " + this.actinfo.STime;
    let edate = new Date(this.actinfo.SchEndTime).toDateString() + " " + this.actinfo.ETime;
    this.schService.GetDuration(hrs, mins, sDate, edate, type).subscribe(results => {
      console.log(results);
      if (type == 1) {
        this.actinfo.Hrs = results[0];
        this.actinfo.Mins = results[1];
        //Need To make the start and end Time to their back form
        this.actinfo.SchEndTime = this.datePipe.transform(this.actinfo.SchEndTime,"MM/dd/yyyy");
      }
      else {
        this.actinfo.SchEndTime =  results[0]; this.actinfo.ETime =results[1]; 
        //Need To make the start and end Time to their back form
      this.actinfo.SchStartTime = this.datePipe.transform(this.actinfo.SchStartTime,"MM/dd/yyyy");
      }
      //this.actinfo.PrevStartDate = this.actinfo.SchStartTime;
      //this.actinfo.PrevEndDate = this.actinfo.SchEndTime;
      this.actinfo.Duration = Number(this.actinfo.Hrs * 60) + Number(this.actinfo.Mins);
    })
  }
  ActionChangeDate(selctedDate, typeId, type) {debugger;
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
      //console.log("Need To confirm and Save");
    }
    else {
      this.GetDuration(typeId);
    }

  }

  async ActionopenResourcePopup() {
    let start = this.actinfo.SchStartTime;
    let end = this.actinfo.SchEndTime;
    let obj = { start: start, end: end, actId: this.actinfo.ActTypeID }
    const popover = await this.Modalcntrl.create({
      component: resorceListComponent,
      componentProps: obj,
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          this.actinfo.ResourceList = detail.data.componentProps;
          console.log(detail.data.componentProps);
          //  this.PopulateVersionInfo(detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }

  ActionDeleteSelectedItems(Id, index) {
    if (Id > 0) {
      this.schService.ActionDeleteResource(Id).subscribe(data => {
        let success = data;
      })
    }
    this.actinfo.ResourceList.splice(index, 1);
  }

  ActionCloseActivity(issave) {
    this.eventCopy = this.actinfo;
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.eventCopy,
      issave: issave
    });
  }
  ActionSaveActivity(form: NgForm) {
    if (form.valid) {
      // this.actinfo.SchStartTime = this.datePipe.transform(this.actinfo.SchStartTime);
      // this.actinfo.SchEndTime = this.datePipe.transform(this.actinfo.SchEndTime);
      console.log(this.actinfo.SchStartTime);
      this.actinfo.SchStartTime = this.actinfo.SchStartTime + " " + this.actinfo.STime;
      this.actinfo.SchEndTime = this.actinfo.SchEndTime + " " + this.actinfo.ETime;
      let obj = {
        Header: "Activity Schedule!",
        Message: "Between " + this.actinfo.SchStartTime + " To " + this.actinfo.SchEndTime,
        SubAlert: "Do you want to continue?",
        ClickType:2
      };
      this.ShowConfirmAlert(obj);
    }
  }

  async ShowConfirmAlert(event) {
    console.log(event);
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
  ConfirmCancel(event) {
    //TODO?
  }

  ConfirmSuccess(event) {
    console.log(event);
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
    console.log(this.actinfo);
    let model={};
     model = this.PrepareToSave();
    this.leadService.ActionSaveLeadActivity(model).subscribe(data=>{
        console.log(data);
    });
     this.ActionCloseActivity(true);
  }

  PrepareToSave(){
   console.log(this.actinfo.SchStartTime +"  "+this.actinfo.SchEndTime);
    this.actinfo["MeetingIcon"] = this.MeetingTypes[this.actinfo.MeetingTypeID].IconClass;
    this.actinfo.Duration = this.actinfo.Duration == undefined? 60 : this.actinfo.Duration;
    let dbactivity = {};
                dbactivity["ID"] = this.actinfo.ID;
                dbactivity["LeadID"] = this.actinfo.LeadID;
                dbactivity["ActTypeID"] = this.actinfo.ActTypeID;
                dbactivity["SchStartTime"] = this.actinfo.SchStartTime;
                dbactivity["SchEndTime"] = this.actinfo.SchEndTime;
                dbactivity["StatusID"] = this.actinfo.StatusID;
                dbactivity["Memo"] = this.actinfo.Memo;
                dbactivity["Duration"] = this.actinfo.Duration;
                dbactivity["SalesPersonID"] = this.actinfo.SalesPersonID;
                dbactivity["SalesPerson"] = this.actinfo.SalesPerson;
                dbactivity["LeadExtID"] = this.actinfo.LeadExtID;
                dbactivity["CustName"] = this.actinfo.CustomerName==null?"":this.actinfo.CustomerName;
                dbactivity["IconPath"] = this.actinfo.IconPath;
                dbactivity["LeadAddress"] = this.actinfo.LeadAddress;
                dbactivity["LeadCity"] = this.actinfo.LeadCity;
                dbactivity["LeadState"] = this.actinfo.LeadState;
                dbactivity["LeadSuburb"] = this.actinfo.LeadSuburb;
                dbactivity["LeadZipcode"] = this.actinfo.LeadZipcode;
                dbactivity["CustTypeID"] = this.actinfo.CustTypeID;
                dbactivity["RefTypeID"] = this.actinfo.RefTypeID == 0 ? 1 : this.actinfo.RefTypeID;
                dbactivity["MeetingTypeID"] = this.actinfo.MeetingTypeID;
                dbactivity["MeetingIcon"] = this.actinfo.MeetingIcon;
                dbactivity["UserID"] = this.actinfo.UserID;
                dbactivity["SalesRepEmail"] = this.actinfo.SalesRepEmail;
                dbactivity["SalesRepPhone"] = this.actinfo.SalesRepPhone == null ?"": this.actinfo.SalesRepPhone;
                dbactivity["SalesRepProvider"] = this.actinfo.SalesRepProvider;
                dbactivity["IsActive"] = 1;
                dbactivity["PriorityIcon"] = this.actinfo.PriorityIcon;
    if(this.actinfo.ResourceList != null && this.actinfo.ResourceList.length > 0){
      let arrIds = [];
      let arrNames = [];
      this.actinfo.ResourceList.forEach(data => {
        arrIds.push(data.ResourceID);
        arrNames.push(data.ResourceName);
      });
      dbactivity["ResourceIDs"] = arrIds.join(",");
      dbactivity["ResourceName"] = arrNames.join(",");
    }
    console.log(dbactivity);
    return dbactivity;
  }

}

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
            <ion-title align="center">Lead Details</ion-title>
          </ion-toolbar>
     
    </ion-header>
    <ion-content>
    <ion-list>
    <ion-item *ngFor="let lead of leadDetails" (click)="ActionJobSelect(lead)">
    <ion-col size="9">
    <p>{{lead.LeadCustomer.Name}}</p>
    <p>Phone:<span style="color:blue;">{{lead.LeadCustomer.PPhone}}</span></p>
    </ion-col>
    <ion-col size="3" class="ion-float-right">
    <ion-note><small>{{lead.LeadCustomer.Email}}</small></ion-note>
    </ion-col>
    </ion-item>
   
    </ion-list> </ion-content>`,
})
export class leadssearchComponent implements OnInit {
  selectedLead: any;
  leadDetails: any;
  LeadList: any = this.navParams.data;
  constructor(private Modalcntrl: ModalController, private navParams: NavParams) {

  }
  ngOnInit() {
    this.leadDetails = this.LeadList.leadlist;
    console.log(this.leadDetails);

  }
  ActionJobSelect(model: any) {
    this.selectedLead = model;
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isselect) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.selectedLead,
      isselect: isselect
    });
  }
}
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
})
export class resorceListComponent implements OnInit {
  resourceList: any = []; start: any; end: any; actTypeId: any; actResList: any; actId: number;
  listParam = this.navParams.data;
  constructor(private Modalcntrl: ModalController, private schService: SchedulingService, private alertCtrl: AlertController, private navParams: NavParams) {
  }
  ngOnInit() {
    this.actTypeId = this.listParam.actId;
    this.start = this.listParam.start;
    this.end = this.listParam.end;
    this.GetResoucreList();
  }

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

