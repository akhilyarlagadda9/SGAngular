import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-calendarsetting',
  templateUrl: './calendarsetting.component.html',
  styleUrls: ['./calendarsetting.component.scss'],
})
export class CalendarsettingComponent implements OnInit {
  ActTypeList: any;
  ActTypeID: number;
  ResourceList: any;
  calObj: any;
  constructor(public Modalcntrl: ModalController,private schService: SchedulingService, private popoverCntrl: PopoverController) { }

  ngOnInit() {}

  //Close Function
  ActionCloseCalendarSett(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave
    });
  }
  //Activity Type List Service
  ActionActivityTypeList() {
    this.schService.ActivityTypeList(4).subscribe(
      data => {
        this.ActTypeList = data;
      });
  }
  //Resource List Service
  ActionGetResoucreList() {
    this.schService.ActivityTypeResourceList(this.ActTypeID).subscribe(data => {
      this.ResourceList = data;
    })
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
    });
    return await popover.present();
  }
  

}
