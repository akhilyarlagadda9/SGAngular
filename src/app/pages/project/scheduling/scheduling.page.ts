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






@Component({
  selector: 'app-scheduling',
  // template: `<div id="calendar"></div>`,
  template: `
  <ion-toolbar color="primary">
  <ion-icon name="menu" class="fontlarge"  slot="start" (click)="ActionCalendarSetting()"></ion-icon>
  <ion-title class="headersty">
{{calObj.ActTypes}}
  </ion-title>
  <ion-icon name="home" slot="end" class="fontlarge" (click)="ActionGoToHome()"></ion-icon>
  </ion-toolbar>
   <full-calendar
#calendar
schedulerLicenseKey ="GPL-My-Project-Is-Open-Source"
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
></full-calendar>`,
  styleUrls: ['./scheduling.page.scss'],
  providers: [DatePipe]
})
export class SchedulingPage implements OnInit {
  calendar: any; actlist: any = []; resources: any = []; options: OptionsInput
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
 calObj: any = {
    StartDate: Date, EndDate: Date, ActTypeIDs: "11",ActTypes: "Template", ResourceIDs: "",ResourceNames: "", StatusIDs: "",StatusNames:"",
    CalendarView: "Resource By Day", CalendarDays: 3, CalFields: "", Search: "", UserId: 0
  }
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string, public loadingController: LoadingController,
    private schService: SchedulingService, private navCtrl: NavController) { }

  ngOnInit() {
    let height = window.innerHeight-20;
   // setTimeout(function () {
    var _dafaultDate = new Date();
    this.options = {
      plugins: [interactionPlugin, dayGridPlugin, resourceTimelinePlugin],
      height:height,
      views: {
        timelineDay: { type: 'timeline', duration: { days: 1 }, buttonText: "day", slotDuration: "00:15:00", },
        resourceTimeline: {
          type: 'resourceTimeline', slotDuration: { days: 1 }, buttonText: "resource",
          duration: { days: this.calObj.CalendarDays }
        },
       
      },
    }
  //});
  }

  ngAfterViewInit(){
    
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
    this.calObj.CalendarView = info.view.view;
    this.calObj.StartDate = start;
    this.calObj.EndDate = today;
    this.ActionGetResList();
    this.ActionLoadEvents();
  }

  ActionRenderEvent(evnt){
    var stime = moment(evnt.event.start).utc().format('h:mm a');
    var etime = moment(evnt.event.end).utc().format('h:mm a');
    var htmlstring = '';
    htmlstring = "<div style='font-size: 13px;' class='fc-title-wrap' >";
    htmlstring += "<div>" + evnt.event.extendedProps.ActivityType + "</div>";
    htmlstring += "<div style='font-size: 10px;'>" + stime + " - " + etime + "</div>";
    htmlstring += "<div>" + evnt.event.extendedProps.QuoteNo + "-" + evnt.event.extendedProps.QuoteName  + "</div>";
    htmlstring +="</div>"
    evnt.el.innerHTML =htmlstring; 

  }

  ActionResourceRender(info){


   // info.el.innerHTML =htmlstring; 
  }
  ActionLoadEvents() {
    if (this.calObj.CalendarView != "" && this.calObj.CalendarView != undefined) {
      let resids = "";
      //var parameter = JSON.stringify(calObj);
      this.schService.ActionQuickActList(this.calObj.StartDate, this.calObj.EndDate, this.calObj.Search, 11, 0, resids).subscribe(data => {
        this.actlist = [];
        for (let j in data) {
          let item = data[j];
          var id = (item.ResourceIDs != null && item.ResourceIDs != "") ? item.ResourceIDs.split(',') : "0";
          for (var s = 0; s < id.length; s++) {
            let isexist = true;
            if (this.calObj.ResourceIDs.length > 0) {
              isexist = false;
              this.calObj.ResourceIDs.map(function (elem) { if (elem == id[s]) { isexist = true; } });
            }
            if (isexist == true) {
              this.actlist.push({ title: item.QuoteNo, start: item.StartTime, end: item.EndTime, id: item.ID, resourceIds: [id[s]], DragResId: id[s],backgroundColor:item.ActBgColor,textColor:item.ActTextColor,borderColor:item.ActTextColor, extendedProps: item });
            }
          }
          console.log(this.actlist);
        }
      });
    }

  }


  ActionGetResList() {
    this.schService.GetResourcesAndHolidays(this.calObj.StartDate, this.calObj.EndDate, this.calObj.ActTypeIDs, 1, this.calObj.ResourceIDs).subscribe(data => {
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
  let obj={calObj: this.calObj};
//  let copyobj = JSON.parse(JSON.stringify(this.calObj));
  const modal = await this.Modalcntrl.create({
    component: CalendarsettingComponent,
    componentProps:obj
  });
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    
  });
  return await modal.present();
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