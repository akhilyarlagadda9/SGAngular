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
  activityId: any;
  actTypeId: any;
  startDate: any;
  endDate: any;
  activityinfo: any;
  activitylist: any = []; viewTitle: string = '';StartDate:any;
  TypeList: any;
  ID: any;
  todaydate = new Date().toISOString();
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  calendar = {
    mode: 'day',
    currentDate: new Date(),
  };
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string,
    private schService: SchedulingService, private navCtrl: NavController,public actionSheetCtrl: ActionSheetController,private datePipe: DatePipe) { }

  ngOnInit() {
    //this.ActionActivityList();
    this.ActionActivityTypeList();
  }

  ActionActivityList() {
    let search = "", resourceIds = "";
    this.schService.ActionQuickActList(this.StartDate, this.calendar.mode, search, 11, 0, resourceIds).subscribe(data => {
      //this.activitylist = data;
      this.PrepareEvents(data);
      console.log(data);
    });
  }
 
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => { this.TypeList = data; }
      );
    }
 

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onDateChanges(ev) {
  this.StartDate = this.datePipe.transform(ev,"MM-dd-yyyy") ;
  this.ActionActivityList();
  }

  // Change current month/week/day
  ActionMove(navtype: string) {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    if (navtype == "prev") {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }

  }

  // Change between month/week/day
  ActionChangeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }



  async onEventSelected(ev) {debugger;
    console.log(ev);
    let obj = {actId:ev.ID,actTypeID:ev.item.actTypeID,StartDate:ev.StartTime,EndDate:ev.EndTime}
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent,
      componentProps : obj
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
  
  PrepareEvents(list: any) {debugger;
    for (let j in list) {
      let item = list[j];
      this.activitylist.push({
        title: item.QuoteNo + " - P" + item.PhaseSrNo,
        startTime: new Date(item.StartTime),
        endTime: new Date(item.EndTime),
        allDay: item.AllDay,
        ID:item.ID,
        item:item,
        color: item.StatusID == 5 ? 'success' :'primary',
      });
    }
    console.log(this.activitylist);
    this.myCal.loadEvents();
  }
  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }


  async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Calendar',
    buttons: [{
      text: 'Day',
      icon: 'list',
      handler: () => {
        this.ActionChangeMode('day');
      }
    }, {
      text: 'Week',
      icon: 'grid',
      handler: () => {
        this.ActionChangeMode('week');
      }
    }, {
      text: 'month',
      icon: 'grid',
      handler: () => {
        this.ActionChangeMode('month');
      }
    },{
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
