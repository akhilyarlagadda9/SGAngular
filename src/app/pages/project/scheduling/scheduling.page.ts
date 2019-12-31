import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { OverlayEventDetail } from '@ionic/core';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
})
export class SchedulingPage implements OnInit {
  activitylist: any = []; viewTitle: string = '';
  todaydate = new Date().toISOString();
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  calendar = {
    mode: 'day',
    currentDate: new Date(),
  };
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string,
    private schService: SchedulingService, private navCtrl: NavController,public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.ActionActivityList();
  }

  ActionActivityList() {
    let sdate = "12/31/2019"; let edate = "1/1/2020";
    let search = "", resourceIds = "";
    console.log(this.todaydate);
    this.schService.ActionQuickActList(sdate, edate, search, 11, 0, resourceIds).subscribe(data => {
      //this.activitylist = data;
      this.PrepareEvents(data);
      console.log(data);
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onDateChanges(ev) {
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



  async onEventSelected(ev) {
   // console.log(ev);
    let ID = ev.ID;
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent
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
