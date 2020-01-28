import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input } from '@angular/core';
//import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController, LoadingController, PopoverController, NavParams } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { OverlayEventDetail } from '@ionic/core';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { AddactivityComponent } from '../addactivity/addactivity.component';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';
import * as moment from 'moment';

// Calendar Components
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarsettingComponent } from '../calendarsetting/calendarsetting.component';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';





@Component({
  selector: 'app-scheduling',
  // template: `<div id="calendar"></div>`,
  template: `
  <ion-toolbar color="primary">
  <ion-icon name="menu" class="fontlarge"  slot="start" (click)="ActionCalendarSetting()"></ion-icon>
  <ion-icon name="refresh" class="fontmedium"  slot="start" (click)="ActionRefreshCalendar()"></ion-icon>
  <ion-title class="headersty">{{calObj.ActTypes}}</ion-title>
  <ion-icon name="home" slot="end" class="fontlarge" (click)="ActionGoToHome()"></ion-icon>
  </ion-toolbar>
  <ion-fab vertical="bottom" horizontal="end">
  <ion-button  color="primary" (click)="ActionAddActivity(0)"><ion-icon name="add"></ion-icon> </ion-button>
 </ion-fab>
   <full-calendar
#calendar
schedulerLicenseKey ="GPL-My-Project-Is-Open-Source"
timeZone= 'UTC'
defaultView="resourceTimeline"
[header]="{
  left: 'prev',
  center: 'title',
  right: 'next'
}"
[height]="options.height"
[views]="options.views"
[plugins]="options.plugins"
(datesRender)="call($event)"
[events]="actlist"
[resources]="resources"
(eventRender)="ActionRenderEvent($event)"
(eventClick)="ActionOnEventSelected($event)"
></full-calendar>`,
  styleUrls: ['./scheduling.page.scss'],
  providers: [DatePipe]
})
export class SchedulingPage implements OnInit {
  calendar: any; actlist: any = []; resources: any = []; options: OptionsInput;eventinfo:any;
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
  calObj: any = {
    StartDate: Date, EndDate: Date, ActTypeIDs: "11", ActTypes: "Template", ResourceIDs: "", ResourceNames: "", StatusIDs: "", StatusNames: "",
    CalID: 1, CalendarView: "resourceTimeline", CalendarDays: 3, CalFields: "", Search: "", UserId: 0, IsViewChange: false, starttime: "7:00 AM", endtime: "8:00 PM"
  }
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string, public loadingController: LoadingController,
    private schService: SchedulingService, private navCtrl: NavController, private datePipe: DatePipe) { }

  ngOnInit() {
    let height = window.innerHeight - 20;
    // setTimeout(function () {
    var _dafaultDate = new Date();
    this.options = {
      plugins: [interactionPlugin, dayGridPlugin, resourceTimelinePlugin, resourceTimeGridPlugin],
      height: height,
      resourceAreaWidth: 150,
      resourceColumns: 6,
      views: {
        timelineDay: { type: 'timeline', duration: { days: 1 }, buttonText: "day", slotDuration: "00:15:00", },
        resourceTimeline: {
          type: 'resourceTimeline', slotDuration: { days: 1 }, buttonText: "resource",
          duration: { days: this.calObj.CalendarDays }
        },
        resourcegridView: {
          type: 'resourceTimeGrid', slotDuration: "00:15:00",
          buttonText: "resource",
        },
      },
    }
    //});
  }

  ngAfterViewInit() {

    this.resources = [
      {
        id: "0",
        groupId: '0',
        title: 'Un-Assigned'
      }]
  }

  call(info) {
    let start = moment(info.view.activeStart).utc().format("MM/DD/YYYY");
    let today = moment(info.view.activeEnd).utc().format("MM/DD/YYYY");
    this.calObj.FilterDate = start;
    this.calObj.CalendarView = info.view.type;
    this.calObj.StartDate = start;
    this.calObj.EndDate = today;
    this.ActionGetResList();
    //this.ActionLoadEvents();
  }

  ActionRenderEvent(evnt) {
    var stime = this.datePipe.transform(evnt.event.start, "h:mm a");
    var etime = this.datePipe.transform(evnt.event.end, "h:mm a");
    var htmlstring = '';
    htmlstring = "<div style='font-size: 13px;white-space: normal' >";
    htmlstring += "<div>" + evnt.event.extendedProps.ActivityType + "</div>";
    htmlstring += "<div style='font-size: 10px;'>" + stime + " - " + etime + "</div>";
    htmlstring += "<div>" + evnt.event.extendedProps.QuoteNo + "-" + evnt.event.extendedProps.QuoteName + "</div>";
    htmlstring += "</div>"
    evnt.el.innerHTML = htmlstring;
  }

  ActionResourceRender(info) {
    // info.el.innerHTML =htmlstring; 
  }
  ActionLoadEvents() {
    if (this.calObj.CalendarView != "" && this.calObj.CalendarView != undefined) {
      let resids = "";
      this.schService.ActionQuickActList(this.calObj.StartDate, this.calObj.EndDate, this.calObj.Search, this.calObj.ActTypeIDs, 0, this.calObj.ResourceIDs, this.calObj.StatusIDs).subscribe(data => {
        this.actlist = [];
        let filterIds = this.calObj.ResourceIDs;
        if (filterIds != "" && filterIds.length > 1) {
          filterIds = filterIds.split(',');
        }
        for (let j in data) {
          let item = data[j];
          this.ActionPushEvents(item, filterIds);
        }
      });
    }

  }


  ActionPushEvents(item, filterIds) {
    var id = (item.ResourceIDs != null && item.ResourceIDs != "") ? item.ResourceIDs.split(',') : "0";
    for (var s = 0; s < id.length; s++) {
      let isexist = true;
      if (filterIds.length > 0) {
        isexist = false;
        filterIds.map(function (elem) { if (elem == id[s]) { isexist = true; } });
      }
      if (isexist == true) {
        this.actlist.push({ title: item.QuoteNo, start: item.StartTime, end: item.EndTime, id: item.ID,resourceId: id[s],resourceIds: [id[s]], DragResId: id[s], backgroundColor: item.ActBgColor, textColor: item.ActTextColor, borderColor: item.ActTextColor, extendedProps: item });
      }
    }
  }

  ActionRefreshCalendar(){
    this.calObj.ActTypeIDs= "11"; this.calObj.ActTypes= "Template";
    this.calObj.ResourceIDs= "";this.calObj.ResourceNames=""; 
    this.calObj.StatusIDs= ""; this.calObj.StatusNames= ""
    this.calObj.CalID= 1,
    // this.calObj.CalendarView= "resourceTimeline";
    this.calObj.CalendarDays= 3, this.calObj.CalFields= ""; this.calObj.Search= ""; this.calObj.UserId= 0;
    this.calObj.IsViewChange = false;
    this.ActionGetResList();
  }
  ActionGetResList() {
    this.schService.GetResourcesAndHolidays(this.calObj.StartDate, this.calObj.EndDate, this.calObj.ActTypeIDs, 1, this.calObj.ResourceIDs).subscribe(data => {
      this.ActionLoadEvents();
      this.resources = [];
      for (let j in data.ActTypeResList) {
        let item = data.ActTypeResList[j];
        this.resources.push({ id: item.ResourceID, groupId: 0, title: item.ResourceName });
      }
    });
  }


  PrepareEvents(list) {

  }
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

  LoadFilterView() {
    if (this.calObj.IsViewChange == true) {
      this.SetCalendarOptions();
    }
    else {
      this.ActionGetResList();
    }

  }
  //Onclick event Info
  async ActionOnEventSelected(ev) {
    console.log(ev);
    console.log(ev.ID);
    let obj = { actId: ev.event._def.extendedProps.ID, actTypeID: ev.event._def.extendedProps.ActivityTypeID, StartDate: ev.event._def.extendedProps.StartTime, EndDate: ev.event._def.extendedProps.EndTime }
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data != null) {
        if (detail.data.issave) {
          this.eventinfo = detail.data.componentProps
          this.ActionAddActivity(ev.event.id);
          //  this.actlist.push(detail.data.componentProps);
          //this.beforeViewType = detail.data.componentProps.eventType;
          //detail.data.componentProps.eventType = ""; //blanking out as we do not want to bind it beforehand
          // this.eventSource.push(detail.data.componentProps);
          // this.myCal.loadEvents();
          // this.resetEvent();

        }
      }
    });
    return await modal.present();
  }

  //Add events
  async ActionAddActivity(Id: number) {

    let actinfo = {
      ID: Id, VersionID: 0, PhaseID: 0, ActTypeID: 11, ResourceList: [], SchStartTime: new Date(), SchEndTime: new Date(),
      ProjectID: 0, JobName: "", TypeID: 0
    }
    actinfo = Id > 0 ?  this.eventinfo : actinfo
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
    this.ActionPushEvents(quickInfo, filterIds);
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
  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  SetCalendarOptions(){
    this.calObj.IsViewChange = false;
    let calendarApi = this.fullcalendar.getApi();
    if(this.calObj.CalendarDays == 5){
      //calendarApi.setOption('slotWidth', 90);
    }
    //this.calObj.EndDate= this.calObj.StartDate.setDate(new Date(this.calObj.StartDate).getDate() + this.calObj.CalendarDays);
    calendarApi.changeView(this.calObj.CalendarView,this.calObj.StartDate);
  }
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