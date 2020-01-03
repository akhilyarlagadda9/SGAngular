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
import { FilterPipe } from 'src/app/FilterPipe';

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
  //todaydate = new Date().toISOString();
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  calendar = {
    mode: 'day',
    queryMode: 'remote',
    currentDate: new Date(),
  };
  constructor(public Modalcntrl: ModalController, @Inject(LOCALE_ID) private locale: string,
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

  async ActionFilterPopup(ev: any) {

    let obj = {
      ActTypeId: this.calObj.ActTypeID,
      ResourceIds: this.calObj.ResourceIds,
      ResourceNames :this.calObj.ResourceNames,
      ActTypeTypeList: this.ActTypeList,
    };
    const popover = await this.popoverCntrl.create({
      component: CalendarFilterComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
         if (detail.data.isselect == true) {
          this.calObj.ActTypeID = detail.data.componentProps.ActTypeID;
          this.calObj.ResourceIds = detail.data.componentProps.ResourceIds;
          this.calObj.ResourceNames = detail.data.componentProps.ResourceNames;
          }
      }
    });
    return await popover.present();
  }


}



@Component({
  template: `
  <ion-header>
    <ion-toolbar style="top:5px;">
    <ion-searchbar [(ngModel)]="queryString" id="search" placeholder="Search Activity Type"></ion-searchbar>
    <ion-button slot="end"  size="small" (click)="ActionRunFilter()" ><ul>Run</ul></ion-button>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" >X</ion-button>
    </ion-toolbar>
  </ion-header>
<ion-content>
  <ion-row style="height:360px">
  <ion-col size="6" >
  <ion-item style="color: darkblue;font-weight:bold">
  Activity Types
  </ion-item>
  <ion-item *ngFor="let item of ActTypeTypeList | FilterPipe: queryString : searchableList" (click)="ActivityTypeResourceList(item.ID)">
  <ion-label>
  <h3 >
      {{item.Name}}
  </h3>
 </ion-label>
 </ion-item>
 </ion-col>
 <ion-col size="6" >
 <ion-item style="color: darkblue;font-weight:bold">
 Resources
 </ion-item>
  <ion-item *ngFor="let resource of ResourceList">
  
  <ion-checkbox style="width:30px" color="dark" [(ngModel)]="resource.Check" checked="resource.Check ==1"></ion-checkbox> 
  <small>{{resource.ResourceName}}</small>
  

 </ion-item>
</ion-col>

</ion-row>
</ion-content>`,
  providers: [FilterPipe]
  //styleUrls: ['./customeredit.component.scss'],
})
export class CalendarFilterComponent implements OnInit {
  filterObj = this.navParams.data; searchableList: any;
  ActTypeTypeList: any; ResourceList: any = [];
  constructor(private schService: SchedulingService, private navParams: NavParams,
    private popoverCntrl: PopoverController, private FilterPipe: FilterPipe) {
    this.searchableList = ['Name']
  }
  ngOnInit() {
    this.ActTypeTypeList = this.filterObj.ActTypeTypeList;
    this.ActivityTypeResourceList(this.filterObj.ActTypeId);
  }
  ActivityTypeResourceList(Id: number) {
    this.filterObj.ActTypeId = Id;
    this.schService.ActivityTypeResourceList(Id).subscribe(data => {
      this.ResourceList = data;
      this.PrepareResources();
    });
  }
  PrepareResources() {
    let check = this.filterObj.ResourceIds == "" || this.filterObj.ResourceIds == null ? 1 : 0;
    let array = check == 0 ? this.filterObj.ResourceIds.split(",") : [];
    for (let i in this.ResourceList) {
      let resource = this.ResourceList[i];
      let resId = array.find(s => s == resource.ID);
      if (check == 1 || resId > 0) {
        resource.Check == 1;
      }
    }
  }
  ActionRunFilter() {
    this.PrepareResourceIds();
  }
  PrepareResourceIds() {
    debugger;
    let resIds = ""; let resNames = "";
    //  let filterList = this.ResourceList.filter(function(item) {
    //   return  item.Check == 1;
    // });
    for (let j in this.ResourceList) {
      let obj = this.ResourceList[j];
      if (obj.Check == 1) {
        resIds += obj.ResourceID + ",";
        resNames += obj.ResourceName + ",";
      }
    }
    this.filterObj.ResourceIds = resIds.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    this.filterObj.ResourceNames = resNames.replace(/(^[,\s]+)|([,\s]+$)/g, '');
 
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isselect) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps:this.filterObj,
      isselect:isselect
    });
  }
}

