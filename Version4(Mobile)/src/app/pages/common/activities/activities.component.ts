import { Component, OnInit } from '@angular/core';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { OverlayEventDetail } from '@ionic/core';
import { AddactivityComponent } from 'src/app/pages/project/addactivity/addactivity.component';
import { DatePipe } from '@angular/common';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { ActinfoComponent } from 'src/app/pages/project/actinfo/actinfo.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  inputs: [`VersionId`,`PhaseId`,`qprmsobj`],
  providers: [DatePipe],
})
export class ActivitiesComponent implements OnInit {
  VersionId: any;
  PhaseId: any;
  qprmsobj:any;
  ActivitiesList: any;
  eventinfo: { ID: number; VersionID: number; PhaseID: number; ActTypeID: number; ResourceList: any[]; SchStartTime: Date; SchEndTime: Date; ProjectID: number; JobName: string; TypeID: number; };
  actInfo: any;

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService,private schService: SchedulingService, private datePipe: DatePipe,) { }

  ngOnInit() {
    this.GetActivitiesList();
    this.ActionActivityInfo();
  }
 //Activites List Function
  GetActivitiesList() {
    if(this.PhaseId == 0){
      this.getservice.QuoteactivitiesList(this.VersionId,0).subscribe(
        data => { this.ActivitiesList = data;console.log(this.ActivitiesList) }
      );
    }else{
      this.getservice.JobActivitiesList(this.VersionId,this.PhaseId).subscribe(
        data => { this.ActivitiesList = data;console.log(this.ActivitiesList) }
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
    let copyobj =  JSON.parse(JSON.stringify(this.actInfo));
    //let viewtypeId = { viewtypeId: viewId }
    const modal = await this.Modalcntrl.create({
      component: AddactivityComponent,
      componentProps: copyobj,
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

  async ActionEditActivity(i:any) {

    //console.log(ev);
    let objAlrtShow={};
    let sDate = new Date(this.ActivitiesList[i].ActualStartDate);
    let eDate = new Date(this.ActivitiesList[i].ActualEndDate);
    let obj = { actId: this.ActivitiesList[i].ID, actTypeID: this.ActivitiesList[i].ActTypeID, StartDate: sDate, EndDate: eDate }
    console.log(obj);
    const modal = await this.Modalcntrl.create({
      component: ActinfoComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data != null) {
        if (detail.data.issave) {
          this.eventinfo = detail.data.componentProps
          console.log(this.eventinfo);
          this.addActivities(this.ActivitiesList[i].id);
          //  this.actlist.push(detail.data.componentProps);
          //this.beforeViewType = detail.data.componentProps.eventType;
          //detail.data.componentProps.eventType = ""; //blanking out as we do not want to bind it beforehand
          // this.eventSource.push(detail.data.componentProps);
          // this.myCal.loadEvents();
          // this.resetEvent();

        }
        else if(detail.data.deleteAct){
          //console.log(detail.data);
          objAlrtShow = {
            Header: "Are you sure you want to delete activity?",
            SubAlert: "Do you want to continue?",
            ActivityId: detail.data.componentProps.ID
          }
          //this.confirmDeleteAct(objAlrtShow);
        }
      }
    });
    return await modal.present();
  }

  ActionActivityInfo() {
    let start = this.datePipe.transform(this.qprmsobj.obj.StartDate, "MM-dd-yyyy");
    let end = this.datePipe.transform(this.qprmsobj.obj.EndDate, "MM-dd-yyyy");
    let result = this.schService.ActivityInfo(this.qprmsobj.obj.actId, this.qprmsobj.obj.actTypeID, start, end).subscribe(
      data => {
        this.actInfo = data;
        this.GetJobAddress(data.Version.Header);
        // this.actheader = data.Version.Header;
        console.log(data);
      },
      error => console.log(error));
  }
  GetJobAddress(header) {
    this.actInfo.JobName = header.QuoteName;
    this.actInfo.QuoteNo = header.QuoteNo;
    header.Address1 = header.Address1 == null || header.Address1 == "" ? "" : header.Address1 + ",";
    header.City = header.City == null || header.City == "" ? "" : header.City + ",";
    header.State = header.State == null || header.State == "" ? "" : header.State;
    header.Zipcode = header.Zipcode == null ? "" : header.Zipcode;
    var zipcodeComma = header.Zipcode != "" && (header.State != "" || header.City != "") ? " - " : "";
    this.actInfo.JobFullAddres = header.Address1 + header.City + header.State + zipcodeComma + header.Zipcode;
  }

  /* async addActivities(Id: number) {
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

  } */
}
