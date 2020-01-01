import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams} from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-actinfo',
  templateUrl: './actinfo.component.html',
  styleUrls: ['./actinfo.component.scss'],
  providers: [DatePipe]
})
export class ActinfoComponent implements OnInit {
   obj:any =  this.navParams.data;
   actInfo:any;
   start: any;
   end: any;
  constructor(public Modalcntrl: ModalController,private navParams: NavParams,private schService: SchedulingService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.ActionActivityInfo();
  }

  ActionActivityInfo(){
    let start = this.datePipe.transform(this.obj.StartDate,"MM-dd-yyyy") ;
    let end= this.datePipe.transform(this.obj.EndDate,"MM-dd-yyyy") ;
      let result = this.schService.ActivityInfo(this.obj.actId,this.obj.actTypeID,this.start,this.end).subscribe(
        data => {
          this.actInfo = data; 
        },
        error => console.log(error));
  
  }
  //Close Function
  ActionCloseActivityEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
