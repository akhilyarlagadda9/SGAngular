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
  
  calObj: any;IsShowPopup:boolean= false;
  calViews = [{Id: 1,name:'Resource By Day'}, {Id: 2,name:'Day By Activity Type'}, {Id: 3,name:'Day By Resource'},{Id: 4,name:'Day By Time'},{Id: 5,name:'Day By Resource By Time'},];
  constructor(public Modalcntrl: ModalController,private schService: SchedulingService, private popoverCntrl: PopoverController) { }

  ngOnInit() { 
    
  }
   
  //Close Function
  ActionCloseCalendarSett(isfilter) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      isfilter: isfilter,
      componentProps: this.calObj,
    });
  }
 






  async ActionFilterPopup(ev: any,filterTypeId,selIds,selNames) {
    let obj = {
      FiterTypeID:filterTypeId,SelIDs:selIds,SelNames:selNames,ActTypeIDs:this.calObj.ActTypeIDs
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
      case 1: {this.calObj.ActTypeIDs =info.SelIDs;this.calObj.ActTypes =info.SelNames;  break; }
      case 2: { this.calObj.ResourceIDs =info.SelIDs;this.calObj.ResourceNames =info.SelNames;break; }
      case 3: {this.calObj.StatusIDs =info.SelIDs;this.calObj.StatusNames =info.SelNames; break; }
    }
  }
}
