import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { OverlayEventDetail } from '@ionic/core';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
  providers: [DatePipe]
})
export class SchedulingPage implements OnInit {
 calObj :{
  StartDate: any,EndDate:any,ActTypeID:11,Search:'',ResourceIds:'',UserId:0
 }
 viewTitle: string = '';
  activitylist: any = [];
  ActTypeList: any;
  //todaydate = new Date().toISOString();
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  calendar = {
    mode: 'day',
    queryMode: 'remote',
    currentDate: new Date(),

  };
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string,
    private schService: SchedulingService, private navCtrl: NavController, public actionSheetCtrl: ActionSheetController,public datePipe: DatePipe) { }

  ngOnInit() {
    //this.ActionActivityList();
    // this.ActionActivityTypeList();
  }
  ActionOnRangeChanged(ev) {
    this.calObj.StartDate = this.datePipe.transform(ev.startTime,"MM-dd-yyyy");
    this.calObj.EndDate =  this.datePipe.transform(ev.endTime,"MM-dd-yyyy");
    console.log(this.calObj.StartDate + "end" + this.calObj.EndDate);
    this.ActionLoadEvents();
  }
  ActionLoadEvents(){
    this.schService.ActionQuickActList(this.calObj.StartDate, this.calObj.EndDate, this.calObj.Search, this.calObj.ActTypeID, this.calObj.UserId, this.calObj.ResourceIds).subscribe(data => {
      this.PrepareEvents(data);
    });
  }
  // Change current month/week/day
  ActionOnMove(navtype: string) {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    if (navtype == "prev") {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }

  }
  // Change between month/week/day
  ActionOnChangeMode(mode) {
    this.calendar.mode = mode;
  }
  ActionOnViewTitleChanged(title) {
    this.viewTitle = title;
  }
  // Focus today
  ActionOnToday() {
    this.calendar.currentDate = new Date();
  }
  async ActionOnEventSelected(ev) {
    
    
    let obj = { actId: ev.ID, actTypeID: ev.item.actTypeID, StartDate: ev.StartTime, EndDate: ev.EndTime }
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data != null) {
        if (detail.data.issave) {
          //this.beforeViewType = detail.data.componentProps.eventType;
          //detail.data.componentProps.eventType = ""; //blanking out as we do not want to bind it beforehand
          // this.eventSource.push(detail.data.componentProps);
          // this.myCal.loadEvents();
          // this.resetEvent();

        }
        else {
          //hopefully do nothing
        }
      }
    });
    return await modal.present();
  }
  PrepareEvents(list: any) {
    this.activitylist = [];
    for (let j in list) {
      let item = list[j];
      this.activitylist.push({
        title: item.QuoteNo + " - P" + item.PhaseSrNo,
        startTime: new Date(item.StartTime),
        endTime: new Date(item.EndTime),
        allDay: item.AllDay,
        ID: item.ID,
        item: item,
        color: item.StatusID == 5 ? 'success' : 'primary',
      });
    }
    console.log(this.activitylist);
    this.myCal.loadEvents();
  }
  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => { this.ActTypeList = data; }
    );
  }
  async ActionOnOpenSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Calendar',
      buttons: [{
        text: 'Day',
        icon: 'list',
        handler: () => {
          this.ActionOnChangeMode('day');
        }
      }, {
        text: 'Week',
        icon: 'grid',
        handler: () => {
          this.ActionOnChangeMode('week');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
