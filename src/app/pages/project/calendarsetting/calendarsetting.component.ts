import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SchedulingService } from 'src/app/service/scheduling.service';

@Component({
  selector: 'app-calendarsetting',
  templateUrl: './calendarsetting.component.html',
  styleUrls: ['./calendarsetting.component.scss'],
})
export class CalendarsettingComponent implements OnInit {
  ActTypeList: any;
  ActTypeID: number;
  ResourceList: any;
  constructor(public Modalcntrl: ModalController,private schService: SchedulingService) { }

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

}
