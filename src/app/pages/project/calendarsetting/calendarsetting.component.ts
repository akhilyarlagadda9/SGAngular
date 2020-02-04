import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';
import { OverlayEventDetail } from '@ionic/core';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-calendarsetting',
  templateUrl: './calendarsetting.component.html',
  styleUrls: ['./calendarsetting.component.scss'],
})
export class CalendarsettingComponent implements OnInit {
  timings = ['7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM', '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
  '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM', '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
  '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM', '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM', '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM', '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM',
  '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM', '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM',
  '11:30 PM', '11:45 PM', '12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM', '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM', '3:00 AM', '3:15 AM', '3:30 AM', '3:45 AM',
  '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM', '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM'
   ];
  calObj: any;IsShowPopup:boolean= false;
  calViews = [{Id: 1,name:'Resource By Day',Type:"resourceTimeline"},{Id: 2,name:'Day By Resource',Type:"resourcegridView"},{Id: 3,name:'Day By Activity Type',Type:"resourcegridView"}];
  // calViews = [{Id: 1,name:'Resource By Day',Type:"resourceTimeline"},{Id: 2,name:'Day By Resource',Type:"resourcegridView"},{Id: 3,name:'Day By Time',Type:"timelineDay"},{Id: 4,name:'Day By Resource By Time',Type:"resourceTimeGrid"},];
  constructor(public Modalcntrl: ModalController,private schService: SchedulingService, private popoverCntrl: PopoverController) { }

  ngOnInit() { 
    
    this.ActionPopulateView(this.calObj.CalID);
    this.calObj.IsViewChange = false;
  }
  ActionPopulateView(Id){
   let model = this.calViews.find(s=>s.Id == Id);
   if(model != undefined && model != null){
    this.calObj.ViewName = model.name;
    this.calObj.CalendarType =model.Type;
    this.calObj.IsViewType = true;
   }
  }
  //Close Function
  ActionCloseCalendarSett(isfilter) {
    this.calObj.CalendarDays = Number(this.calObj.CalendarDays);
    this.Modalcntrl.dismiss({
      'dismissed': true,
      isfilter: isfilter,
      componentProps: this.calObj,
    });
  }
 
  async ActionFilterPopup(ev: any,filterTypeId,selIds,selNames) {
    let obj = {
      FiterTypeID:filterTypeId,SelIDs:selIds,SelNames:selNames,ActTypeIDs:this.calObj.ActTypeIDs,
      CheckedActTypeList:[]
    };
    const popover = await this.popoverCntrl.create({
      component: CalendarfilterComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result !== null) {
        if (result.data.isSelect == true) {
           this.PopulateFilterInfo(filterTypeId,result.data.componentProps);
        }
      }
     // console.log(result);
    });
    return await popover.present();
  }
  PopulateFilterInfo(filterId,info:any) {
    switch (filterId) {
      case 1: {this.calObj.ActTypeIDs =info.SelIDs;this.calObj.ActTypes =info.SelNames;
        this.calObj.ActTypeList = info.CheckedActTypeList;
          break; }
      case 2: { this.calObj.ResourceIDs =info.SelIDs;this.calObj.ResourceNames =info.SelNames;break; }
      case 3: {this.calObj.StatusIDs =info.SelIDs;this.calObj.StatusNames =info.SelNames; break; }
    }
  }
}
