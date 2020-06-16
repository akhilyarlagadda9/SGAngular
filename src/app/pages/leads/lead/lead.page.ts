import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { NavController, ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { OptionsInput,EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { OverlayEventDetail } from '@ionic/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';
import { LeadService } from 'src/app/service/lead.service';
import { CreateleadComponent } from '../createlead/createlead.component';
import { LAddActivityComponent } from '../LeadAddActivity/LAddActivity.component';
import { LeadEditComponent } from '../../quotes/LeadEdit/LeadEdit.component';
declare const imgUrl: any;
@Component({
  selector: 'app-lead',
  template: `
  <ion-header>
  <ion-toolbar color="primary">
  <ion-title class="headersty">FollowUp</ion-title>
  <ion-icon name="refresh" class="fontmedium"  slot="start" (click)="ActionRefreshCalendar()"></ion-icon>
  <ion-icon name="add-circle" slot="end" class="fontlarge" (click)="ActionCreateLead()"></ion-icon>
  <ion-icon name="home" slot="end" class="fontlarge" (click)="ActionGoToHome()"></ion-icon>
  </ion-toolbar>
</ion-header>
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
[slotEventOverlap] = "false"
[defaultView]="options.defaultView"
[defaultDate]="options.defaultDate"
[allDaySlot] = "options.allDaySlot"
themeSystem= "cerulean"
[height]="options.height"
[header]="false"

[duration]="options.duration"
[views]="options.views"
[plugins]="options.plugins"
(datesRender)="Actioncall($event)"
[events]="actlist"
(eventRender)="ActionRenderEvent($event)"
(eventClick)="ActionOnEventSelected($event)"
></full-calendar>
</ion-content>`,
  styleUrls: ['./lead.page.scss'],
  providers: [DatePipe]
})
export class LeadPage implements OnInit {
  options: OptionsInput; width: number = 0; actlist:any = []; CalendarTitle: any; currentDate: Date; objEditActivity:any;
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
  calObj: any = {
    StartDate: Date, EndDate: Date, CalendarDays: 1
  }
  logInUserID: any;
  constructor(private navCtrl: NavController, public Modalcntrl: ModalController, private leadService: LeadService, private authService: AuthService,private actionSheetCtrl:ActionSheetController,
     private datePipe: DatePipe,public loadingController : LoadingController) { }

  ngOnInit() {
    this.CalendarTitle = this.datePipe.transform(new Date(), "MMM dd");
    let height = window.innerHeight - 110; this.width = window.innerHeight;
    var _defaultDate = new Date();
    this.options = {
      plugins: [timeGridPlugin],
      height: height,
      // slotLabelFormat: [
      //   {
      //       hour: '2-digit',
      //       minute: '2-digit',
      //       hour12:false
      //   }
      //   ],
      allDaySlot:false,
      timeZone: 'local',
      defaultView: "timeGridDay",
      minTime: "07:00:00", // Should We give it ? Not Sure
      maxTime: "22:00:00",// Should We give it ? Not Sure
      defaultDate: _defaultDate,
      views: {
        timeGridDay: { type: "timeGridDay", duration: { days: 1 }, buttonText: "day",slotDuration: "00:15:00"},
      },
      
    }
  }

  ngAfterViewInit() {
    setTimeout(data=>{
      this.fullcalendar.getApi().render();
    },10); // give some time to reload
  }

  Actioncall(info) {
    if (info.view.type == "timeGridDay") { // for now its always be timegridDay
      this.calObj.StartDate = this.datePipe.transform(info.view.activeStart, "MM/dd/yyyy");
      this.calObj.EndDate = this.datePipe.transform(info.view.activeEnd, "MM/dd/yyyy");
    }
    this.getActivityData();
  }

  getActivityData() {
    console.log(this.calObj.StartDate);
    console.log(this.calObj.EndDate);
    this.leadService.LeadFollowUpActList(0, 0, 0, 0, 0, this.calObj.StartDate, this.calObj.EndDate, "").subscribe(data => {
      console.log(data);
      this.actlist = []; // clear up the storage
      for (let j in data) {
        let item = data[j];
        item.Imageurl = imgUrl + 'Status/' + item.IconPath;
        this.ActionLoadEvents(item);
      }
  });
  }


  ActionLoadEvents(item) {
   let startDate = item.SchEndTime.substring(0,item.SchStartTime.indexOf("T"));
   let endDate =  item.SchEndTime.substring(0,item.SchStartTime.indexOf("T"));
    
    let eDate= new Date(this.datePipe.transform(endDate,"MM/dd/yyyy") + " " + this.datePipe.transform(item.SchEndTime, "hh:mm a","-400"));
    let sDate = new Date(this.datePipe.transform(startDate,"MM/dd/yyyy") + " " + this.datePipe.transform(item.SchStartTime, "hh:mm a","-400"));
    //let eDate = this.datePipe.transform(item.SchEndTime,"MM/dd/yyyy") + " " + this.datePipe.transform(item.SchEndTime,"hh:mm a");
    console.log(sDate);
    console.log(eDate);
    
    this.actlist.push({ title: item.CustName,start:sDate, end:eDate, backgroundColor: item.ColorCode, textColor: item.TextColor, borderColor: item.TextColor, extendedProps: item });
  }

  ActionRefreshCalendar(){
    this.calObj.StartDate = this.datePipe.transform(new Date(),"MM/dd/yyyy");
    let endDate = new Date().setDate(new Date().getDate()+1);
    this.calObj.EndDate = this.datePipe.transform(endDate,"MM/dd/yyyy");
    this.fullcalendar.getApi().render(); // Fastest Way to Render events
   // this.getActivityData();
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
    // If need to Do anything we can do
    let event = evnt.event.extendedProps;
    var htmlstring = '';
    htmlstring = "<div style='font-size: 10px;white-space: normal;word-wrap: break-word'>";
    htmlstring += "<div style='word-break:break-all'><img class='ico' src='" + event.Imageurl + "' width='15' height='15'>" + event.ActivityType + "</div>";
    htmlstring += "<div style='font-size: 10px;'>" +this.datePipe.transform(event.SchStartTime, "hh:mm a",'-400') + " - " + this.datePipe.transform(event.SchEndTime, "hh:mm a",'-400') + "</div>";
    htmlstring += "<div style='word-break:break-all'><b>" + event.LeadID + "- " + event.CustName + "</b></div></div>";
    evnt.el.innerHTML = htmlstring;
  }

  ActionEditActivity(ev) {
    //console.log(ev);
    let objAlrtShow={};
    console.log(ev);
    let sDate =ev.event._def.extendedProps.SchStartTime;
    let eDate = ev.event._def.extendedProps.SchEndTime;
    this.objEditActivity = { ID: ev.event._def.extendedProps.ID, ActTypeID: ev.event._def.extendedProps.ActTypeID, StartDate: sDate, EndDate: eDate,
      LeadID: ev.event._def.extendedProps.LeadID, MeetingTypeID: ev.event._def.extendedProps.MeetingTypeID,PriorityIcon:ev.event._def.extendedProps.PriorityIcon,
      StatusID:ev.event._def.extendedProps.StatusID, Duration: ev.event._def.extendedProps.Duration,Memo:ev.event._def.extendedProps.Memo,IconPath:ev.event._def.extendedProps.IconPath}
    this.ActionAddActivity(ev.event._def.extendedProps.ID);
  }

  async ActionAddActivity(Id: number) {
    let objInitAdd = {
      ID: 0, ActTypeID: 11, ResourceList: [], SchStartTime: new Date(), SchEndTime: new Date(),
      LeadName: "", TypeID: 0,MeetingTypeID:1,messageID:94
    }
    let actinfo = Id > 0 ? this.objEditActivity : objInitAdd;
    const modal = await this.Modalcntrl.create({
      component: LAddActivityComponent,
      componentProps: actinfo,
    });

    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
         this.ActionRefreshCalendar();
        }
      }
    });

    return await modal.present();

  }

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
          text: 'Lead View',
          cssClass:'color-orange',
          handler: () => {this.ActionEditLeadView(ev);}
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

  async ActionEditLeadView(ev){
    let event = ev.event.extendedProps;  
    console.log(event);
    //let qprmsobj = {}; Need TO BE SURE WHETHER WE CAN SEND THE WHOLE INFO or NOT
      // let qprmsobj = {
      //   leadId: event.LeadID, quoteno: event.QuoteNo, versionid: event.VersionID, customerid: 0,
      //   accountid: 0, childaccid: 0,layoutId: 1,statusId:event.StatusID,
      // }; 
    const modal = await this.Modalcntrl.create({
      component: LeadEditComponent,
      componentProps: event,
    });
    return await modal.present();
  }

  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }


  //Create New Lead
  /***** CREATE QUOTE *****/
  async ActionCreateLead() {
    const modal = await this.Modalcntrl.create({
      component: CreateleadComponent,
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isSave == true) {
          this.hideLoader();
        }
      }
    });
    return await modal.present();
  }
  hideLoader() {
    this.loadingController.dismiss();
  }
}
