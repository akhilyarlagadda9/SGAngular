import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'
import {CommonEditMailHubComponent} from '../common-edit-mail-hub/common-edit-mail-hub.component';
//import { QuotegetService } from 'src/app/service/quoteget.service';
import { MaileditComponent } from '../mailedit/mailedit.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
  inputs: [`VersionId`,`PhaseId`]
})
export class CommhubComponent implements OnInit {
  VersionId: any; PhaseId:number; processtypeList: any;  docFormList: any;  phaseList: any;  selectedhubtype: number = 1;  type: any;  
  notesList: any; msgList:any = [];
  msgStatusList: any;CategoryID:number = 0;quoteInfo:any;
  commDetails: any;
  details: any;
  typeId: any;
  
  //selectedoption: any;
  constructor(public Modalcntrl : ModalController,private qservice: QuoteService,private qRepService:QuoterepService) { }

  ngOnInit() {
    debugger;
    this.quoteInfo = this.qRepService.getHeader();
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
    if(note == 0){
      let msg = this.quoteInfo.QuoteNo + " - " +this.quoteInfo.QuoteName;
      note ={ID:0,VersionID:this.VersionId,Subject:msg,PhaseID:this.PhaseId}
    }else{
      note = JSON.parse(JSON.stringify(note));
    }
  //  let commDetails = {versionId : this.VersionId,commDetails: note}   
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent,
      componentProps : note
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
    this.qservice.ProjectProcessList(1).subscribe(
      data => {
        this.processtypeList = data;
      }
    );
  }
 //Document Forms List Function
  GetformsList() {
    this.qservice.FormsList(1).subscribe(
     data => {this.docFormList = data;}
   );
  }
 //Phase List Function
  GetphaseList() {
    this.qservice.CommHubPhaseList(this.VersionId).subscribe(
      data => { this.phaseList = data; }
    );
  }
  //Quote Notes List
  GetQuoteNoteList() {
    debugger;
    this.qservice.ActionCommunicationMessageList1(this.VersionId,this.CategoryID,this.PhaseId,0,this.quoteInfo.CustomerID,this.quoteInfo.ID).subscribe(data => {
      this.notesList = data.filter(x => x.TypeID != -2 && x.TypeID != -7);
      this.msgList = data.filter(x => x.TypeID == -1 || x.TypeID == -2 || x.IsSent == 1);
    });
    
  //   this.getservice.QuoteNotes(this.VersionId,0).subscribe(
  //     data => { 
  //       this.notesList = data;
  //     }
  //   );
   }
 
}
