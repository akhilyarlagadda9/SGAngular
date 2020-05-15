import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionsInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import TimeGridView from '@fullcalendar/timegrid/AbstractTimeGridView';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';
import { LeadService } from 'src/app/service/lead.service';

@Component({
  selector: 'app-lead',
  template: `
  <ion-header>
  <ion-toolbar color="primary">
  <ion-title class="headersty">FollowUp</ion-title>
  <ion-icon name="home" slot="end" class="fontlarge" (click)="ActionGoToHome()"></ion-icon>
  </ion-toolbar>
</ion-header>
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
[slotEventOverlap] = "false"
[defaultView]="options.defaultView"
[defaultDate]="options.defaultDate"
[plugins]="options.plugins"
[views]="options.views"
themeSystem= 'cerulean'
[height]="options.height"
[header]="false"
(datesRender)="Actioncall($event)"
[events]="actlist"
(eventRender)="ActionRenderEvent($event)"
></full-calendar>
</ion-content>`,
  styleUrls: ['./lead.page.scss'],
  providers: [DatePipe]
})
export class LeadPage implements OnInit {
  options: OptionsInput; width:number = 0; actlist: any = []; CalendarTitle:any; currentDate:Date; 
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
  calObj: any = {
    StartDate: Date, EndDate: Date,CalendarDays:1}
  logInUserID: any;
  constructor(private navCtrl: NavController,private leadService:LeadService,private authService: AuthService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.authService.GetStoredLoginUser().then((data) => { this.logInUserID = data.logInUserID; });
    this.CalendarTitle = this.datePipe.transform(new Date(),"MMM dd");
    let height = window.innerHeight - 110; this.width = window.innerHeight;
    var _dafaultDate = new Date();
    this.options = {
      plugins:[timeGridPlugin],
      height: height,
      defaultView: "timeGridDay",
      defaultDate: _dafaultDate,
      views: {
        timeGridDay: { type: 'timeGridDay',duration: { days: 1 }, buttonText: "day", slotDuration: "00:15:00"},
      },
    }
  
  }

  Actioncall(info) {
  if(info.view.type == "timeGridDay"){ // for now its always bes timegridDay
    this.calObj.StartDate = this.datePipe.transform(info.view.activeStart, "MM/dd/yyyy");
    this.calObj.EndDate = this.datePipe.transform(info.view.activeStart, "MM/dd/yyyy");
  }
    this.getActivityData();
  }
  
  getActivityData(){
      this.leadService.LeadFollowUpActList(0,0,0,0,0,this.calObj.StartDate,this.calObj.EndDate,"").subscribe(data=>{
       console.log(data);
        this.actlist = []; // clear up the storage
        for (let j in data) {
          let item = data[j];
          this.ActionLoadEvents(item);
        }
      });
  }

  ActionLoadEvents(item){
    console.log(item.SchStartTime);
    console.log(item.SchEndTime);
    let sDate = new Date(item.SchStartTime);
      let eDate = new Date(item.SchEndTime);
      console.log(sDate + "  "+ eDate);
    this.actlist.push({ title: item.CustName, start: sDate, end: eDate, backgroundColor: item.ColorCode, textColor: item.TextColor, borderColor: item.TextColor,extendedProps: item});
    console.log(this.actlist); 
  }


  ActionNavigateView(navtype) {
    let calendarApi = this.fullcalendar.getApi();
      let sDate = new Date(this.calObj.StartDate);
      let daycount = navtype == "prev" ? -this.calObj.CalendarDays : this.calObj.CalendarDays;
      sDate.setDate(sDate.getDate() + daycount);
      this.calObj.StartDate = sDate;
      this.CalendarTitle = this.datePipe.transform(this.calObj.StartDate, "MMM dd")

    if (navtype == "prev") {
      calendarApi.prev();
    } else {
      calendarApi.next();
    }
  }

  ActionRenderEvent(evnt) {
// If need to Dp anything we can do
     console.log(evnt.event.extendedProps);
    let event = evnt.event.extendedProps;

    var htmlstring = '';
    htmlstring = "<div style='font-size: 13px;white-space: normal' >";
    //htmlstring += "<div>" + event.ActivityType;
    htmlstring += "<div><img class='ico' src='" + event.IconPath + "' width='15' height='15'>" + event.ActivityType + "</div>";
    htmlstring += "<div style='font-size: 10px;'>" + this.datePipe.transform(event.SchStartTime,"HH:mm:ss") + " - " + this.datePipe.transform(event.SchEndTime,"HH:mm:ss") + "</div>";
    htmlstring += "<div><b>" + event.LeadExtID + "- L" + event.LeadID + "</b></div>";
    //htmlstring += "<div>" + event.QuoteName + "</div></div>"
    evnt.el.innerHTML = htmlstring;
  }

  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
