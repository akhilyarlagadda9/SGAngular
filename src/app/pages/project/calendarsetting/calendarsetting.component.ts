import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';
import { OverlayEventDetail } from '@ionic/core';
import { flatten } from '@angular/compiler';
declare var timings :any;
@Component({
  selector: 'app-calendarsetting',
  templateUrl: './calendarsetting.component.html',
  styleUrls: ['./calendarsetting.component.scss'],
})
export class CalendarsettingComponent implements OnInit {
  timings:any = timings;
  calObj: any;IsShowPopup:boolean= false;
  calViews = [{Id: 1,name:'Resource By Day',Type:"resourceTimeline"},{Id: 3,name:'Activity Type By Day',Type:"resourceTimeline"},
  //{Id: 2,name:'Day By Resource',Type:"resourcegridView"},
  {Id: 4,name:'Day By Timeline',Type:"restimelineDay"},{Id: 5,name:'Week By Day',Type:"dayGridWeek"}];
  calDays = [{Id: 1},{Id: 3},{Id: 5}];
  colorByActivities = [{ ID: 1, Name: 'Activity Type' }, { ID: 2, Name: 'Resource' }];
  // calViews = [{Id: 1,name:'Resource By Day',Type:"resourceTimeline"},{Id: 2,name:'Day By Resource',Type:"resourcegridView"},{Id: 3,name:'Day By Time',Type:"timelineDay"},{Id: 4,name:'Day By Resource By Time',Type:"resourceTimeGrid"},];
  constructor(public Modalcntrl: ModalController) { }

  ngOnInit() { 
    this.ActionPopulateView(this.calObj.CalID);
    this.calObj.IsViewChange = false;
    this.calObj.IsDateChange = false;
    this.calObj.IsDayChange = false;
    
  }
  ActionPopulateView(Id){
   let model = this.calViews.find(s=>s.Id == Id);
   if(model != undefined && model != null){
    this.calObj.ViewName = model.name;
    this.calObj.CalendarView =model.Type;
    this.calObj.IsViewChange = true;
   }
  }
  ActionPopulateColor(Id){
    this.calObj.ColorType = Id == 1 ? "Ativity Type" :"Resource";
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
    const popover = await this.Modalcntrl.create({
      component: CalendarfilterComponent,
      //event: ev,
      //translucent: true,
      componentProps: obj,
     // cssClass: "popover_class"
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
