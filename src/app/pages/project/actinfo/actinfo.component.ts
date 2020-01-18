import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { DatePipe } from '@angular/common';
import { AddactivityComponent } from '../addactivity/addactivity.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-actinfo',
  templateUrl: './actinfo.component.html',
  styleUrls: ['./actinfo.component.scss'],
  providers: [DatePipe]
})
export class ActinfoComponent implements OnInit {
  obj: any = this.navParams.data;
  actInfo: any;
  actheader: any;
  showmore: number = 0;

  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private schService: SchedulingService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.ActionActivityInfo();
  }

  ActionActivityInfo() {
    let start = this.datePipe.transform(this.obj.StartDate, "MM-dd-yyyy");
    let end = this.datePipe.transform(this.obj.EndDate, "MM-dd-yyyy");
    let result = this.schService.ActivityInfo(this.obj.actId, this.obj.actTypeID, start, end).subscribe(
      data => {
        this.actInfo = data;
        this.GetJobAddress(data.Version.Header);
       // this.actheader = data.Version.Header;
        console.log(data);
      },
      error => console.log(error));
  }
  GetJobAddress(header){
    this.actInfo.JobName = header.QuoteName;
    this.actInfo.QuoteNo = header.QuoteNo;
    header.Address1 = header.Address1 == null || header.Address1 == "" ? "" : header.Address1 + ",";
    header.City = header.City == null || header.City == "" ? "" : header.City + ",";
    header.State = header.State == null || header.State == "" ? "" : header.State;
    header.Zipcode = header.Zipcode == null ? "" : header.Zipcode;
    var zipcodeComma = header.Zipcode != "" && (header.State != "" || header.City != "") ? " - " : "";
    this.actInfo.JobFullAddres = header.Address1 + header.City + header.State + zipcodeComma + header.Zipcode;
  }
  //More function
  ActionMoreAreas(more: number) {
    this.showmore = more;
  }

  //Close Function
  ActionClose(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.actInfo,
      issave: issave
    });
  }

  // //Edit Activity Function
  // async ActionEditActivity() {
  //   let copyobj = JSON.parse(JSON.stringify(this.actInfo));
  //   const modal = await this.Modalcntrl.create({
  //     component: AddactivityComponent,
  //     componentProps: copyobj
  //   });
  //   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      
  //   });
  //   return await modal.present();
  // }
}
