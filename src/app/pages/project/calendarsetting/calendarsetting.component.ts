import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController, AlertController} from '@ionic/angular';
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
  colorByActivities = [{ ID: 1, Name: 'Activity Type' }, { ID: 2, Name: 'Resource' }]; blnCheck:any = true;
  // calViews = [{Id: 1,name:'Resource By Day',Type:"resourceTimeline"},{Id: 2,name:'Day By Resource',Type:"resourcegridView"},{Id: 3,name:'Day By Time',Type:"timelineDay"},{Id: 4,name:'Day By Resource By Time',Type:"resourceTimeGrid"},];
  constructor(public Modalcntrl: ModalController,private alertCtrl: AlertController) { }

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
  if(isfilter){
   this.ReviewTiming();// TO review the timings
   }
   else{
     this.blnCheck = true;
   } 
   if(this.blnCheck){
    this.calObj.CalendarDays = Number(this.calObj.CalendarDays);
    this.Modalcntrl.dismiss({
      'dismissed': true,
      isfilter: isfilter,
      componentProps: this.calObj,
    });
  }
  }

     ReviewTiming(){
    if(this.calObj.starttime && this.calObj.endtime){
      let strtTime = (this.ActionConvertTimeFormat(this.calObj.starttime)).split(":");
      let endTime = (this.ActionConvertTimeFormat(this.calObj.endtime)).split(":");
    
      if(parseInt(strtTime[0]) >  parseInt(endTime[0])){
      //this.ReviewTiming();
        this.blnCheck = false;
      }
      else if(parseInt(strtTime[0]) ==  parseInt(endTime[0])){
        if(parseInt(strtTime[1]) >  parseInt(endTime[1])){
         //this.ReviewTiming();
           this.blnCheck = false;
        }
      }
      else{
        this.blnCheck = true;
      }
    }
    if(this.blnCheck == false){
    this.ShowAlert();
    }
    
  }

  async ShowAlert(){
    let event = {Header: "Start time can not be Greater than End time", Message:"Try Other Timings"}
    const alert = await this.alertCtrl.create({
      header: event.Header,
      subHeader: event.Message,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
          this.ConfirmCancel(event);
        }
      },
      ]
    });
    alert.present();
  }

  ConfirmCancel(event){
    //TODO:??
  }

  ActionConvertTimeFormat(time12h) {
    console.log(time12h);
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
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
