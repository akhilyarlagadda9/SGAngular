import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
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
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
  providers: [DatePipe]
})
export class SchedulingPage implements OnInit {
  calObj: any;
  viewTitle: string = '';
  activitylist: any = [];
  ActTypeList: any;
  loaderToShow: any;
  //todaydate = new Date().toISOString();
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  calendar = {
    mode: 'day',
    queryMode: 'remote',
    currentDate: new Date(),
  };
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string, public loadingController: LoadingController,
    private schService: SchedulingService, private navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    public datePipe: DatePipe, private popoverCntrl: PopoverController) {
    this.calObj = {
      StartDate: '', EndDate: '', ActTypeID: 11, Search: '', ResourceIds: '', UserId: 0,
      ActivityType: '', ResourceNames: ''
    };
  }

  ngOnInit() {
    this.ActionActivityTypeList();
  }
  ActionOnRangeChanged(ev) {
    this.calObj.StartDate = this.datePipe.transform(ev.startTime, "MM-dd-yyyy");
    this.calObj.EndDate = this.datePipe.transform(ev.endTime, "MM-dd-yyyy");
    console.log(this.calObj.StartDate + "end" + this.calObj.EndDate);
    this.ActionLoadEvents();

  }
  ActionLoadEvents() {
    //this.showLoader()
    this.schService.ActionQuickActList(this.calObj.StartDate, this.calObj.EndDate, this.calObj.Search, this.calObj.ActTypeID, this.calObj.UserId, this.calObj.ResourceIds).subscribe(data => {
      this.PrepareEvents(data);
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
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
    let obj = { actId: ev.ID, actTypeID: ev.item.ActivityTypeID, StartDate: ev.startTime, EndDate: ev.endTime }
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
    let offset = -5.0;
    this.activitylist = [];
    for (let j in list) {
      let item = list[j];
      this.activitylist.push({
        title: item.QuoteNo + " - P" + item.PhaseSrNo,
        startTime: new Date((new Date(item.StartTime)).getTime() + (new Date(item.StartTime).getTimezoneOffset() * 60000) + (3600000 * offset)),
        endTime: new Date((new Date(item.EndTime)).getTime() + (new Date(item.EndTime).getTimezoneOffset() * 60000) + (3600000 * offset)),
        allDay: this.calendar.mode == "week" ? true : item.AllDay,
        ID: item.ID,
        item: item,
        color: item.StatusID == 5 ? 'eventAsGreen' : 'eventAsBlue',
      });
    }
    console.log(this.activitylist);
    this.myCal.loadEvents();
    this.hideLoader();

  }

  
  //Custom Event color
  getEventClass(events) {
    console.log(events);
   return events.color;
  }

  async hideLoader() {
    this.loadingController.dismiss();
  }


  ActionGoToHome() {
    this.navCtrl.navigateRoot('/home');
  }
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => {
        this.ActTypeList = data;
        this.GetSelectedActTypeName();
      });

  }
  GetSelectedActTypeName() {
    let obj = this.ActTypeList.find(s => s.ID == this.calObj.ActTypeID);
    if (obj != null) {
      this.calObj.ActivityType = obj.Name;
    }
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

  async ActionFilterPopup(ev: any,filterTypeId) {
    let obj = {
      ActTypeId: this.calObj.ActTypeID, ResourceIds: this.calObj.ResourceIds,
      ResourceNames: this.calObj.ResourceNames, ActTypeTypeList: this.ActTypeList,
      ActivityType: this.calObj.ActivityType,FiterTypeID:filterTypeId,
    };
    const popover = await this.popoverCntrl.create({
      component: CalendarfilterComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((result: OverlayEventDetail) => {
      console.log(result);
      if (result.data !== null && result.data != undefined) {
        this.calObj.ActTypeID = result.data.ActTypeId;
        this.calObj.ResourceIds = result.data.ResourceIds;
        this.calObj.ResourceNames = result.data.ResourceNames;
        this.calObj.ActivityType = result.data.ActivityType
        this.ActionLoadEvents();
      }
    });
    return await popover.present();
  }
  async ActionAddActivity(viewId: any) {

    let actinfo = {
      ID: 0, VersionID: 0, PhaseID: 0, ActTypeID: this.calObj.ActTypeID, ResourceList: [], SchStartTime: new Date(), SchEndTime: new Date(),
      ProjectID: 0, JobName: "", TypeID: 0
    }
    let viewtypeId = { viewtypeId: viewId }
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: actinfo,
    });

    modal.onDidDismiss().then((result: OverlayEventDetail) => {

      if (result.data !== null && result.data != undefined) {
        if (result.data.componentProps != null && result.data.componentProps != undefined) {
          this.UpdateActivty(result.data.componentProps);


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
    let obj: any;  let offset = -5.0;
    let quickInfo = this.PrepareActInfo(info);
    obj = {
      title: quickInfo.QuoteNo + " - P" + quickInfo.PhaseSrNo,
      startTime: new Date((new Date(quickInfo.StartTime)).getTime() + (new Date(quickInfo.StartTime).getTimezoneOffset() * 60000) + (3600000 * offset)),
      endTime: new Date((new Date(quickInfo.EndTime)).getTime() + (new Date(quickInfo.EndTime).getTimezoneOffset() * 60000) + (3600000 * offset)),
      allDay: this.calendar.mode == "week" ? true : quickInfo.AllDay,
      ID: quickInfo.ID,
      item: quickInfo,
      color: quickInfo.StatusID == 5 ? 'eventAsGreen' : 'eventAsBlue',
    }
    if (info.ExtID == 0) {
      this.activitylist.push(obj);
    }else{
      let index = this.activitylist.findIndex(s => { return s.ID == info.ID;});
      this.activitylist[index] = quickInfo;
    }
    console.log(this.activitylist);
    this.myCal.loadEvents();
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
    }
    return item;
  }
}




