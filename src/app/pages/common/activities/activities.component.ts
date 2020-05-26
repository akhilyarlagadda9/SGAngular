import { Component, OnInit } from '@angular/core';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { OverlayEventDetail } from '@ionic/core';
import { AddactivityComponent } from 'src/app/pages/project/addactivity/addactivity.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  inputs: [`VersionId`,`PhaseId`]
})
export class ActivitiesComponent implements OnInit {
  VersionId: any;
  PhaseId: any;
  ActivitiesList: any;
  eventinfo: { ID: number; VersionID: number; PhaseID: number; ActTypeID: number; ResourceList: any[]; SchStartTime: Date; SchEndTime: Date; ProjectID: number; JobName: string; TypeID: number; };

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetActivitiesList();
  }
 //Activites List Function
  GetActivitiesList() {
    if(this.PhaseId == 0){
      this.getservice.QuoteactivitiesList(this.VersionId,0).subscribe(
        data => { this.ActivitiesList = data; }
      );
    }else{
      this.getservice.JobActivitiesList(this.VersionId,this.PhaseId).subscribe(
        data => { this.ActivitiesList = data; }
      );
    }
  }

  
/* async addActivities() {debugger
    let actinfo = {}
    //let viewtypeId = { viewtypeId: viewId }
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: actinfo,
    });
    return await modal.present();
  } */

  async addActivities(Id: number) {
    let actinfo = {
      ID: Id, VersionID: this.VersionId, PhaseID: this.PhaseId, ActTypeID: 11, ResourceList: [], SchStartTime: new Date(), SchEndTime: new Date(),
      ProjectID: 0, JobName: "", TypeID: 0
    }
    actinfo = Id > 0 ? this.eventinfo : actinfo
    //let viewtypeId = { viewtypeId: viewId }
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: actinfo,
    });
    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
          this.GetActivitiesList();
        }
      }
    });

    return await modal.present();

  }
}
