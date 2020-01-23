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
  ActionCloseCalendarSett(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave
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
      
     // console.log(result);
    });
    return await popover.present();
  }
  
  ActionopenFilterPopup() {
    this.IsShowPopup = true;
  }

}
