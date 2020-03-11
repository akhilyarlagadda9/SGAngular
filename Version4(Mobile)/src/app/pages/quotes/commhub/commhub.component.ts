import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'
import {CommonEditMailHubComponent} from '../common-edit-mail-hub/common-edit-mail-hub.component';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { MaileditComponent } from '../mailedit/mailedit.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
  inputs: [`VersionId`]
})
export class CommhubComponent implements OnInit {
  VersionId: any;  processtypeList: any;  docFormList: any;  phaseList: any;  selectedhubtype: number = 1;  type: any;  notesList: any; 
  msgStatusList: any;
  commDetails: any;
  details: any;
  typeId: any;
  
  //selectedoption: any;
  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetprocessstatusList();
    this.GetformsList();
    this.GetphaseList();
    this.GetQuoteNoteList();
  }

  //Tab selection Function
  ActionLoadHubInfo(componet: any){
    this.selectedhubtype = componet;
  }
   //Comm.Hub Edit Function
  async ActionEditCommHub(note: any) {
    let commDetails = {versionId : this.VersionId,commDetails: note}   
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent,
      componentProps : commDetails
    });
    return await modal.present();
  }
 //Comm.Hub Mail Function
  async ActionEditCommHubMail(note: any) {
    let commDetails = {versionId : this.VersionId,commDetails: note};
    console.log(commDetails);   
    const modal = await this.Modalcntrl.create({
      component: CommonEditMailHubComponent,
      componentProps : commDetails,
    });
    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
          // this.UpdateActivty(result.data.componentProps);
          //this.ActionLoadEvents();
        }
      }
    });
    return await modal.present();
  }
  //Comm.Hub Email Edit Function
  async ActionEditCommEmail(note: any) {
    let commDetails = {versionId : this.VersionId,commDetails: note}   
    const modal = await this.Modalcntrl.create({
      component: MaileditComponent,
      componentProps : commDetails
    });
    return await modal.present();
  }
 //Status List Function
  GetprocessstatusList() {
    this.getservice.processTypeList(1).subscribe(
      data => {
        this.processtypeList = data;
      }
    );
  }
 //Document Forms List Function
  GetformsList() {
    this.getservice.formsList(1).subscribe(
     data => {this.docFormList = data;}
   );
  }
 //Phase List Function
  GetphaseList() {
    this.getservice.CommHubPhaseList(this.VersionId).subscribe(
      data => { this.phaseList = data; }
    );
  }

  //Quote Notes List
  GetQuoteNoteList() {
    this.getservice.QuoteNotes(this.VersionId,0).subscribe(
      data => { 
        this.notesList = data;
      }
    );
  }
 
}
