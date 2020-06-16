import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { OverlayEventDetail } from '@ionic/core';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AddactivityComponent } from '../addactivity/addactivity.component';
// Calendar Components
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarsettingComponent } from '../calendarsetting/calendarsetting.component';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import { QuoteeditComponent } from '../../quotes/quoteedit/quoteedit.component';
import { MapComponent } from '../../map/map.component';
import { AuthService } from 'src/app/service/auth.service';




declare var platform: string;declare const imgUrl: any;
@Component({
  selector: 'app-scheduling',
  // template: `<div id="calendar"></div>`,
  template: `
  <ion-toolbar color="primary">
  <ion-icon name="menu" class="fontlarge"  slot="start" (click)="ActionCalendarSetting()"></ion-icon>
  <ion-icon name="refresh" class="fontmedium"  slot="start" (click)="ActionRefreshCalendar()"></ion-icon>
  <ion-icon ios="ios-locate" class="fontmedium" md="md-locate" (click)="ActionMapView()"></ion-icon>
  <ion-title class="headersty">{{calObj.ActTypes}}</ion-title>
  <ion-icon name="home" slot="end" class="fontlarge" (click)="ActionGoToHome()"></ion-icon>
  </ion-toolbar>
  <ion-fab vertical="bottom" horizontal="end">
  <ion-button  color="primary" (click)="ActionAddActivity(0)"><ion-icon name="add"></ion-icon> </ion-button>
 </ion-fab>
  <ion-content>
  <ion-list class="paddzero no-margin">
  <ion-row>
  <ion-col size="2">
  <button type="button" class="fc-prev-button fc-button fc-button-primary" aria-label="prev" (click)="ActionNavigateView('prev')"><span class="fc-icon fc-icon-chevron-left"></span></button>
  </ion-col>
  <ion-col size="8" class="text-center"><h2 class="nomargin fontsmall">{{CalendarTitle}}</h2></ion-col>
  <ion-col size="2" class="text-right">
  <button type="button" class="fc-next-button fc-button fc-button-primary" aria-label="next" (click)="ActionNavigateView('next')"><span class="fc-icon fc-icon-chevron-right"></span></button>
  </ion-col>
  </ion-row>
  </ion-list>
   <full-calendar
#calendar
schedulerLicenseKey ="GPL-My-Project-Is-Open-Source"
[defaultView]="options.defaultView"
[defaultDate]="options.defaultDate"
themeSystem= 'cerulean'
resourceLabelText= " "
[height]="options.height"
[slotWidth] = "options.slotWidth"
[resourceAreaWidth]="options.resourceAreaWidth"
[header]="false"
[minTime] = "options.minTime"
[maxTime] = "options.maxTime"
[duration]="options.duration"
[views]="options.views"
[plugins]="options.plugins"
(datesRender)="Actioncall($event)"
[events]="actlist"
[resources]="resources"
(eventRender)="ActionRenderEvent($event)"
(eventClick)="ActionOnEventSelected($event)"
></full-calendar></ion-content>
`,
  //styleUrls: ['./scheduling.page.scss'],
  providers: [DatePipe]
})
export class SchedulingPage implements OnInit {
  calendar: any; actlist: any = []; resources: any = []; options: OptionsInput; eventinfo: any;
  actResources: any = []; width: number;
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
  CalendarTitle: any; ActiveDate: Date; calendarApi4 = null;
  loaderToShow: Promise<void>;
  calObj: any = {
    StartDate: Date, EndDate: Date, ActTypeIDs: "11", ActTypes: "Template", ResourceIDs: "", 
    ResourceNames: "ALL", StatusIDs: "", StatusNames: "ALL",IsDateChange: false, IsDayChange: false,
    CalID: 1, CalendarType: "resourceTimeline", CalendarView: "resourceTimeline", 
    CalendarDays: 3, CalFields: "", Search: "", UserId: 0,
    IsViewChange: false, starttime: "7:00 AM",endtime: "8:00 PM", CalColorID: 1,
    ColorType: 'Activity Type',ActTypeList: [{ id: 11, groupId: 0, title: "Template" }]
  }
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) 
  public loadingController: LoadingController,private schService: SchedulingService, 
    private navCtrl: NavController, private datePipe: DatePipe, 
    public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController,private authService:AuthService) { }

  ngOnInit() {
    let height = window.innerHeight - 110; this.width = ((window.innerWidth)-120)/3;
    console.log(window.innerWidth);
    console.log(this.width);
    var _dafaultDate = new Date();
    this.options = {
      plugins: [dayGridPlugin, resourceTimelinePlugin, resourceTimeGridPlugin, resourceDayGridPlugin],
      height: height,
      slotWidth: this.width,
      resourceAreaWidth: 110,
      defaultView: "resourceTimeline",
      minTime: "07:00:00",
      maxTime: "22:00:00", defaultDate: _dafaultDate,
      duration: { days: 3 },
      //  resourceAreaWidth: platform == 'desktop' ? 180 : 100,
      views: {
        //resource by day
        resourceTimeline: {
          type: 'resourceTimeline', slotDuration: { days: 1 }, buttonText: "resource", duration: { days: 3 },
        },
        //day by resource
        resourcegridView: {
          type: 'resourceDayGrid', duration: { days: 3 }, buttonText: "resource",
        },
        // Day by Timeline
        restimelineDay: { type: 'resourceTimeline', duration: { days: 1 }, buttonText: "day", slotDuration: "00:15:00", },
      },
    }
  }

  hide
  ngAfterViewInit() {
      console.log(this.fullcalendar);
    this.calendarApi4 = this.fullcalendar;
    this.resources = [
      {
        id: "0",
        groupId: '0',
        title: 'Un-Assigned'
      }]
  }
//#region  Actions
  Actioncall(info) {
    this.ActiveDate = info.view.activeStart;
    if (info.view.type == "restimelineDay") {
      this.calObj.StartDate = this.datePipe.transform(this.calObj.StartDate, "MM/dd/yyyy");
      this.calObj.EndDate = this.datePipe.transform(this.calObj.EndDate, "MM/dd/yyyy");
    }
    if (info.view.type != "restimelineDay") {
      this.CalendarTitle = info.view.title;
      let start = this.datePipe.transform(info.view.activeStart, "MM/dd/yyyy");
      let end = this.datePipe.transform(info.view.activeEnd, "MM/dd/yyyy");
      this.calObj.StartDate = start;
      this.calObj.EndDate = end;
    }
    this.calObj.CalendarView = info.view.type;
    this.ActionEventsByFilterSettings();
    //this.ActionLoadEvents();
  }
  //Calling the Map View
  async ActionMapView(){
    console.log(this.actlist);
    let copyobj = JSON.parse(JSON.stringify(this.actlist));
    let obj = {headerInfo: copyobj,MapCalled:"Scheduling"};
    const modal = await this.Modalcntrl.create({
      component: MapComponent,
      componentProps: obj,
    });
    return await modal.present();
  }
  ActionNavigateView(navtype) {
    let calendarApi = this.fullcalendar.getApi();
    if (this.calObj.CalendarView == "restimelineDay") {
      let sDate = new Date(this.calObj.StartDate);
      let daycount = navtype == "prev" ? -this.calObj.CalendarDays : this.calObj.CalendarDays;
      sDate.setDate(sDate.getDate() + daycount);
      this.calObj.StartDate = sDate;
      this.PrepareDays(navtype);
    }
    if (navtype == "prev") {
      calendarApi.prev();
    } else {
      calendarApi.next();
    }

  }
  ActionEventsByFilterSettings() {
    if (this.calObj.CalID == 1) {
      this.ActionGetResList();
    } else {
      this.ActionLoadEvents();
    }
  }
  ActionRenderEvent(evnt) {
    this.PrepareEventHtml(evnt);
    // if (platform == 'desktop'){
    //   this.PrepareEventForDesktop(evnt);
    // }else{
    //   this.PrepareEventHtml(evnt);
    // }
  }
  ActionLoadEvents() {
    //this.showLoader()
    if (this.calObj.CalendarView != "" && this.calObj.CalendarView != undefined) {
      let resids = "";
      let sDate = this.calObj.StartDate; let eDate = this.calObj.EndDate;
      let colorId =  this.calObj.CalID == 1 ? 1 : this.calObj.CalColorID;
      this.schService.ActionQuickActList(sDate, eDate, this.calObj.Search, this.calObj.ActTypeIDs, 0, this.calObj.ResourceIDs, this.calObj.StatusIDs,colorId).subscribe(data => {
        console.log(data);
        this.actlist = [];
        if (this.calObj.CalID == 1) {
          let filterIds = this.calObj.ResourceIDs;
          if (filterIds != "" && filterIds.length > 1) {
            filterIds = filterIds.split(',');
          }
          for (let j in data) {
            let item = data[j];
            item.Imageurl = imgUrl + 'Status/' + item.StatusIcon;
            this.SetResouceEvents(item, filterIds);
          }
        } else {
          for (let j in data) {
            let item = data[j];
            item.Imageurl = imgUrl + 'Status/' + item.StatusIcon;
            this.SetActTypeEvents(item);
          }
        }
      });
    }
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
  ActionRefreshCalendar() {
    this.calObj.ActTypeIDs = "11"; this.calObj.ActTypes = "Template";
    this.calObj.ResourceIDs = ""; this.calObj.ResourceNames = "ALL";
    this.calObj.StatusIDs = ""; this.calObj.StatusNames = "ALL"
    this.calObj.CalID = 1,
      // this.calObj.CalendarView= "resourceTimeline";
      this.calObj.CalendarDays = 3, this.calObj.CalFields = ""; this.calObj.Search = ""; this.calObj.UserId = 0;
    this.calObj.IsViewChange = false;
    this.ActionEventsByFilterSettings();
    //this.ActionGetResList();
  }
  ActionGetResList() {
    this.schService.GetResourcesAndHolidays(this.calObj.StartDate, this.calObj.EndDate, this.calObj.ActTypeIDs, 1, this.calObj.ResourceIDs).subscribe(data => {
      this.ActionLoadEvents();
      this.resources = [];
      for (let j in data.ActTypeResList) {
        let item = data.ActTypeResList[j];
        item.TextColor = item.TextColor == null ? "#ddd" : item.TextColor;
        this.resources.push({ id: item.ResourceID, groupId: 0, title: item.ResourceName, eventBackgroundColor: item.TextColor, eventTextColor: "black", eventBorderColor: "black", extendedProps: item });
      }
      this.actResources = this.resources;
    });
  }
  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }
//#endregion  
//#region other Methods
GetNavDates(view) {
  let start = this.datePipe.transform(view.activeStart, "MM/dd/yyyy");
  // For Prev
  let prevbutton = <HTMLElement>document.body.querySelector(".fc-prev-button");
  prevbutton.addEventListener("click", () => { this.calObj.StartDate = start; this.PrepareDays("prev") });
  //For Next
  let nextbutton = <HTMLElement>document.body.querySelector(".fc-next-button");
  nextbutton.addEventListener("click", () => { this.calObj.StartDate = start; this.PrepareDays("next") });
}
UpdateActivty(info) {
  let filterIds = this.calObj.ResourceIDs;
  if (filterIds != "" && filterIds.length > 1) {
    filterIds = filterIds.split(',');
  }
  let quickInfo = this.PrepareActInfo(info);
  if (info.ExtID > 0) {
    let calendarApi = this.fullcalendar.getApi();
    var event = calendarApi.getEventById(info.ID)
    event.remove();
  }
  //  this.ActionPushEvents(quickInfo, filterIds);
}
LoadFilterView() {
  let obj = this.calObj;
  this.resources = this.calObj.CalID == 3 ? this.calObj.ActTypeList : this.actResources;
  if (obj.IsViewChange == true || obj.IsDateChange == true || obj.IsDayChange == true) {
    this.SetCalendarOptions(obj);
  } else {
    this.ActionEventsByFilterSettings();
  }
  this.SetResourceGridViewWith();
}
ChangedViewEvents() {
  let sdate = new Date(this.calObj.StartDate);
  sdate.setDate(sdate.getDate() + Number(this.calObj.CalendarDays));
  this.calObj.StartDate = this.datePipe.transform(this.calObj.StartDate, "MM/dd/yyyy");
  // this.calObj.StartDate = moment(this.calObj.StartDate).utc().format("MM/DD/YYYY");;
  this.calObj.EndDate = this.datePipe.transform(sdate, "MM/dd/yyyy");
  this.ActionEventsByFilterSettings();
}
//#endregion
//#region popups
  //Calendar Settings Function
  async ActionCalendarSetting() {
    let obj = { calObj: this.calObj };
    //  let copyobj = JSON.parse(JSON.stringify(this.calObj));
    const modal = await this.Modalcntrl.create({
      component: CalendarsettingComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isfilter == true) {
          this.calObj = detail.data.componentProps;
          this.LoadFilterView();
        }
      }
    });
    return await modal.present();
  }
  //Onclick event Info
  async ActionOnEventSelected(ev) {
    let actionSheet = this.actionSheetCtrl.create({
      //title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [       {
          text: 'Activity Edit',
         // role: 'destructive',
          handler: () => {this.ActionEditActivity(ev);}
        },
        {
          text: 'Job View',
          cssClass:'color-orange',
          handler: () => {this.ActionEditJobView(ev);}
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => { }
        }
      ]
    });
    (await actionSheet).present();
  }
  async ActionEditActivity(ev) {
    //console.log(ev);
    let objAlrtShow={};
    let sDate = new Date(ev.event._def.extendedProps.StartDate);
    let eDate = new Date(ev.event._def.extendedProps.EndDate);
    let obj = { actId: ev.event._def.extendedProps.ID, actTypeID: ev.event._def.extendedProps.ActivityTypeID, StartDate: sDate, EndDate: eDate }
    console.log(obj);
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data != null) {
        if (detail.data.issave) {
          this.eventinfo = detail.data.componentProps
          console.log(this.eventinfo);
          this.ActionAddActivity(ev.event.id);
          //  this.actlist.push(detail.data.componentProps);
          //this.beforeViewType = detail.data.componentProps.eventType;
          //detail.data.componentProps.eventType = ""; //blanking out as we do not want to bind it beforehand
          // this.eventSource.push(detail.data.componentProps);
          // this.myCal.loadEvents();
          // this.resetEvent();

        }
        else if(detail.data.deleteAct){
          //console.log(detail.data);
          objAlrtShow = {
            Header: "Are you sure you want to delete activity?",
            SubAlert: "Do you want to continue?",
            ActivityId: detail.data.componentProps.ID
          }
          this.confirmDeleteAct(objAlrtShow);
        }
      }
    });
    return await modal.present();
  }
  async confirmDeleteAct(obj) {
    const alert = await this.alertCtrl.create({
      header: obj.Header,
      message: obj.SubAlert,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
          // May be do something letter
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.schService.ActionDeleteActivity(obj.ActivityId).subscribe(data=>{
            if(this.calObj.CalendarView == "resourceTimeline"){
              this.ActionLoadEvents();
            }else{
              let calendarApi = this.fullcalendar.getApi();
              var event = calendarApi.getEventById(obj.ActivityId)
              event.remove();
            }
          });
          this.ConfirmSuccess();
        }
      }]
    });
    alert.present();
  }
  async ConfirmSuccess(){
    let obj = {
      Header: "Activity Deleted Sucessfully!",
    }
    const alert = await this.alertCtrl.create({
      header: obj.Header,
      buttons: [{
        text: 'OK',
      }]
    });
    alert.present();
  }
 
  async ActionEditJobView(ev) {
    //console.log(ev);
    let event = ev.event.extendedProps;
    let sDate = new Date(ev.event._def.extendedProps.StartDate);
    let eDate = new Date(ev.event._def.extendedProps.EndDate);
    let obj = { actId: ev.event._def.extendedProps.ID, actTypeID: ev.event._def.extendedProps.ActivityTypeID, StartDate: sDate, EndDate: eDate }
    console.log(obj);
    console.log(event); 
      let qprmsobj = {
        quoteid: event.ProjectID, quoteno: event.QuoteNo, versionid: event.VersionID, customerid: 0,obj:obj,
        accountid: 0, childaccid: 0, phaseid: event.PhaseID, viewtypeid: event.PhaseID > 0 ? 2 : 1, layoutId: 1,statusId:event.PhaseID > 0 ? 6 : 1,
      }; 
    const modal = await this.Modalcntrl.create({
      component: QuoteeditComponent,
      //component: QlayoutComponent,
      componentProps: qprmsobj,
    });
    return await modal.present();
    
  }
  //Add events
  async ActionAddActivity(Id: number) {
    let actinfo = {
      ID: Id, VersionID: 0, PhaseID: 0, ActTypeID: 11, ResourceList: [], SchStartTime: new Date(), SchEndTime: new Date(),
      ProjectID: 0, JobName: "", TypeID: 0
    }
    actinfo = Id > 0 ? this.eventinfo : actinfo
    console.log(actinfo);
    //let viewtypeId = { viewtypeId: viewId }
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: actinfo,
    });

    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
          // this.UpdateActivty(result.data.componentProps);
          this.ActionLoadEvents();
        }
        //this.calObj.ActTypeID = result.data.ActTypeId;
        // this.calObj.ResourceIds = result.data.ResourceIds;
        // this.calObj.ResourceNames = result.data.ResourceNames;
        // this.calObj.ActivityType = result.data.ActivityType
        //this.ActionLoadEvents();
      }
    });

    return await modal.present();

  }
//#endregion
//#region Prepare Methods
  PrepareEventHtml(evnt) {
    console.log(evnt.event.extendedProps);
    let event = evnt.event.extendedProps;
    var htmlstring = '';
    htmlstring = "<div style='font-size: 13px;white-space: normal;word-break:break-all' >";
    //htmlstring += "<div>" + event.ActivityType;
    htmlstring += "<div style='word-break:break-all'><img class='ico' src='" + event.Imageurl + "' width='15' height='15'>" + event.ActivityType + "</div>";
    htmlstring += "<div style='font-size: 10px;'>" + event.StartTime + " - " + event.EndTime + "</div>";
    htmlstring += "<div><b>" + event.QuoteNo + "- P" + event.PhaseSrNo + "</b></div>";
    htmlstring += "<div>" + event.QuoteName + "</div></div>"
    evnt.el.innerHTML = htmlstring;
  }
  PrepareDays(navtype) {
    this.resources = [];
    var startDate = new Date(this.calObj.StartDate.valueOf());
    for (var s = 0; s < this.calObj.CalendarDays; s++) {
      let start = startDate;
      if (s > 0) {
        start.setDate(startDate.getDate() + 1);
      }
      let start4 = this.datePipe.transform(start, "MM/dd/yyyy");
      this.resources.push({ id: start4, title: start4 });
    }
    let stitle = this.datePipe.transform(this.calObj.StartDate, "MMM dd");
    let title = stitle + " - " + this.datePipe.transform(startDate, "MMM dd, yyyy");
    this.CalendarTitle = title;
    startDate.setDate(startDate.getDate() + 1);
    this.calObj.EndDate = startDate;
  }
  PrepareActInfo(info) {
    let item: any;
    item = {
      ID: info.ID,
      PhaseID: info.PhaseID,
      ProjectID: info.ProjectID,
      VersionID: info.VersionID,
      PhaseSrNo: (info.PhaseSrNo == null || info.PhaseSrNo == "") ? "0" : info.PhaseSrNo,
      StartTime: info.SchStartTime,
      EndTime: info.SchEndTime,
      ActivityType: info.ActTypeName,
      ActivityTypeID: info.ActTypeID,
      StatusID: info.StatusID,
      StatusName: info.StatusName,
      StatusIcon: info.IconPath,
      PhaseSF: info.PhaseSF,
      ResourceNames: info.ResourceName,
      ResourceIDs: info.ResourceIDs,
      QuoteName: info.JobName,
      QuoteNo: info.QuoteNO,
      AllDay: info.AllDay == 1 ? true : false,
      ActBgColor: info.ActColorCode,
      ActTextColor: info.ActTxtColor,
    }
    return item;
  }
  PrepareEvents(list) {
  }
  PrepareEventForDesktop(evnt) {
    let event = evnt.event.extendedProps; var htmlstring = '';
    if (event.ResourceNames == null || event.ResourceNames == "") {
      event.ResourceNames = "resource+";
    }
    var rcolor = event.ResourceNames == "resource+" ? "Red" : "Blue";
    var qno = (event != undefined && event.QuoteNo != "") ? '#' + event.QuoteNo : "";
    var jobname = (event != undefined && event.QuoteName != "") ? " - " + event.QuoteName : "";
    var CustType = (event.CustType == null || event.CustType == "") ? "" : " - " + event.CustType;
    var Zipcode = event.Zipcode != null && event.Zipcode != "" ? "-" + event.Zipcode : "";
    var addressString = "<div class='actdiv'  style='font-size:13px' title='" + '' + "'>" + event.City + "," + event.State + Zipcode + "</div>";
    var resourceString = "<tr><td style='border:0;background:#ddd;' colspan='2' valign='top' align='left'><div style='text-align:left;border-bottom:none;white-space: pre-wrap;color:" + rcolor + "' width='90%' class='resCls wrap' title='" + event.ResourceNames + "'>" + event.ResourceNames + "</div>" + "</td></tr>";
    htmlstring = "<table width='100%'>";
    htmlstring += "<tr><td valign='middle' width='90%' class='editact' style='font-size: 13px;border:0;color:" + event.ActTextColor + ";background:" + event.ActBgColor + "'>" + "&nbsp;" + event.ActivityType + "</td>";
    htmlstring += "<td style='border:0' valign='top' width='10%' align='center'>" + "<span>" + "<img class='ico' src='" + event.Imageurl + "' width='20' height='20'>" + "</span>" + "</td></tr>";
    htmlstring += "<tr><td style='border:0' colspan='2'><table width='100%' style='color: gray;font-size: 10px;'>";
    if (this.width < 1600) {
      htmlstring += "<tr><td style='border:0' valign='top' width='100%' align='left'>" + "<div class='timeCls' style='color:orangered;font-size: 12px;'>" + event.StartTime + " - " + event.EndTime + "</div>" + "</td></tr>";
      htmlstring += "<tr><td style='border:0' valign='top' width='100%' align='left'>" + "<div align='right'>" + event.SalesPerson + "</div>" + "</td></tr>";
      htmlstring += "</table></td></tr>";
    } else {
      htmlstring += "<tr>";
      htmlstring += "<td style='border:0' valign='top' width='30%' align='left'>" + "<div class='timeCls' style='color:orangered;font-size: 12px;'>" + event.sTime + " - " + event.eTime + "</div>" + "</td>";
      htmlstring += "<td style='border:0' valign='top' width='70%' align='left'>" + "<div align='right'>" + event.SalesPerson + "</div>" + "</td>";
      htmlstring += "</tr></table></td></tr>";
    }
    if (event.ProjectManagerID > 0) {
      htmlstring += "<tr><td style='border:0;color: grey;' colspan='2' valign='top' width='70%' align='left'>" + "<div align='left'>" + event.ProjectManager + "</div>" + "</td></tr>";
    }
    htmlstring += "<tr><td style='border:0' colspan='2' valign='top' align='left'><div style='color:black;font-size: 13px' class='actdiv font-bold'>" + "<span style='color:blue;font-size: 14px'>" + event.QuoteNo + "</span>" + (event.PhaseSrNo > 0 ? " - P " + event.PhaseSrNo : "") + "</div><td></tr>";
    htmlstring += "<tr><td style='border:0' colspan='2' valign='top' align='left'><div  style='color:black;font-size: 13px' class='wordwrap'>" + event.CustName + CustType + "</div></td></tr>";
    htmlstring += "<tr><td colspan='2' style='border:0;color:orangered;font-size:13px;' valign='top' align='right'>";
    htmlstring += "<div style='float:left'>" + event.PhaseSF + "</div>";
    htmlstring += "<div style='float:right'>" + addressString + "</div>";
    htmlstring += "</td></tr>" + resourceString + "</table>";
    evnt.el.innerHTML = htmlstring;
  }
  //#endregion
//#region  set Methods
  SetResouceEvents(item, filterIds) {
    let sDate = new Date(item.StartDate);
    let eDate = new Date(item.EndDate);
   
    var resids = (item.ResourceIDs != null && item.ResourceIDs != "") ? item.ResourceIDs.split(',') : "0";
    for (var s = 0; s < resids.length; s++) {
      let isexist = true;
      if (filterIds.length > 0) {
        isexist = false;
        filterIds.map(function (elem) { if (elem == resids[s]) { isexist = true; } });
      }
      if (isexist == true) {
        let bgColor = this.calObj.CalColorID == 2 ? "" : item.ActBgColor;
        let textColor = this.calObj.CalColorID == 2 ? "" : item.ActTextColor;
        this.actlist.push({ title: item.QuoteNo, start: sDate, end: eDate, id: item.ID, resourceId: resids[s], resourceIds: [resids[s]], DragResId: resids[s], backgroundColor: bgColor, textColor: item.ActTextColor, borderColor: textColor, extendedProps: item });
      }
    }
  }
  SetActTypeEvents(item) {
    let sDate = new Date(item.StartDate);
    let eDate = new Date(item.EndDate);
    let extid = item.ActivityTypeID;
    if (this.calObj.CalendarView == "restimelineDay") {
      extid = this.datePipe.transform(sDate, "MM/dd/yyyy");
      sDate = new Date(this.datePipe.transform(this.ActiveDate, "MM/dd/yyyy") + " " + item.StartTime);
      eDate = new Date(this.datePipe.transform(this.ActiveDate, "MM/dd/yyyy") + " " + item.EndTime);
    }
    var resids = (item.ResourceIDs != null && item.ResourceIDs != "") ? item.ResourceIDs.split(',') : "0";
    let resColor = item.ResColor == null || item.ResColor == "" ? "#ddd" : item.ResColor;
    let bgColor = this.calObj.CalColorID == 2 ? resColor : item.ActBgColor;
    let textColor = this.calObj.CalColorID == 2 ? "black" : item.ActTextColor;
    this.actlist.push({ title: item.QuoteNo, start: sDate, end: eDate, id: item.ID, resourceId: extid, resourceIds: [extid], backgroundColor: bgColor, textColor: textColor, borderColor: textColor, extendedProps: item });
  }
  SetResourceGridViewWith() {
    let width = window.innerWidth + "px";
    if (this.calObj.ResourceIDs != "" && this.calObj.ResourceIDs != null && this.calObj.CalID == 1) {
      let array = this.calObj.ResourceIDs.split(",");
      width = array.length * 100 * Number(this.calObj.CalendarDays) + "px";
    } else {
      width = this.resources.length * 100 * Number(this.calObj.CalendarDays) + "px";
    }
    document.documentElement.style.setProperty("--reswidth", width);
  }
  SetCalendarOptions(obj) {
    let calendarApi = this.fullcalendar.getApi();
    //let gduration = calendarApi.getOption('duration');
    if (this.calObj.CalendarView == "restimelineDay") {
      this.PrepareDays("curr");
    //  calendarApi.setOption('slotWidth', "35");
    }
    if (calendarApi.view.type == this.calObj.CalendarView && obj.IsDayChange != true && obj.IsDateChange != true) {
      this.ActionEventsByFilterSettings();
    } else if (obj.IsDateChange == true && obj.IsViewChange == false && obj.IsViewChange == false) {
      calendarApi.gotoDate(obj.StartDate);
    } else {
      let duration = { days: this.calObj.CalendarDays };
      this.options.views.resourceTimeline.duration = { days: this.calObj.CalendarDays };
      this.fullcalendar.views.resourceTimeline.duration = { days: this.calObj.CalendarDays };
      this.fullcalendar.dateIncrement = this.calObj.CalendarDays;
      //calendarApi.setOption('duration', duration);
      if(this.calObj.CalendarDays == 5 || this.calObj.CalendarDays == 1){
        let width = ((window.innerWidth)-120)/this.calObj.CalendarDays;
        calendarApi.setOption('slotWidth', width);
    }
      calendarApi.batchRendering(function () {
        calendarApi.setOption('duration', duration);
        calendarApi.changeView(obj.CalendarView, obj.StartDate);
      });
    }
    this.calObj.IsViewChange = false;
    this.calObj.IsViewChange = false;
  }
  //#endregion
}

















 // ngOnInit() {
    //  let calendarEl: HTMLElement = document.getElementById('calendar')!;
    //   var _dafaultDate = new Date();
    //   this.calendar = new Calendar(calendarEl, {
    //     schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    //     plugins: [interactionPlugin, dayGridPlugin, resourceTimelinePlugin],
    //     editable: true,
    //     droppable: true,
    //     defaultDate: _dafaultDate,
    //     header: {
    //       left: 'prev',
    //       center: '',
    //       right: 'next'
    //     },
    //     views: {
    //       timelineDay: { type: 'timeline', duration: { days: 1 }, buttonText: "day", slotDuration: "00:15:00", },
    //       resourceTimeline3Days: {
    //         type: 'resourceTimeline', slotDuration: { days: 1 }, buttonText: "resource",
    //         duration: { days: 3 }
    //       }
    //     },
    //     defaultView: "resourceTimeline3Days",

    //     resources:reslistssss,
    //     datesRender: function name(info) {
    //       let start = moment(info.view.activeStart).utc().format("MM/DD/YYYY");
    //       let today = moment(info.view.activeEnd).utc().format("MM/DD/YYYY");
    //       calObj.CalendarView = info.view.view;
    //       calObj.StartDate = start;
    //       calObj.EndDate = today;
    //      // this.ActionGetResList();
    //     },
    //     events: this.actlist,
    //   }
    //   );

    //   this.calendar.render();
    //   this.ActionGetResList();
    //  // this.ActionGetResList();
    //   //this.ActionLoadEvents();
    // }
