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
  constructor(public Modalcntrl: ModalController,private navParams: NavParams,private schService: SchedulingService,private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.obj);
    this.ActionActivityInfo();
  }

  ActionActivityInfo(){
    let start = this.datePipe.transform(this.obj.StartDate,"MM-dd-yyyy") ;
    let end= this.datePipe.transform(this.obj.EndDate,"MM-dd-yyyy") ;
      let result = this.schService.ActivityInfo(this.obj.actId,this.obj.actTypeID,start,end).subscribe(
        data => {
          this.actInfo = data; 
          console.log(data);
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
