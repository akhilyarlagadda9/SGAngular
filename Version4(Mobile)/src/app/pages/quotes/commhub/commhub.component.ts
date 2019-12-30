import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
  inputs: [`VersionId`]
})
export class CommhubComponent implements OnInit {
  VersionId: any;
  processtypeList: any;
  docFormList: any;
  phaseList: any;
  selectedhubtype: number = 1;
  type: any;
  notesList: any;

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
  async ActionEditCommHub(type:any) {
    let version = {version : this.VersionId,TypeId: type}
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent,
      componentProps : version
    });
    return await modal.present();
  }

 //Status List Function
  GetprocessstatusList() {
    this.getservice.processTypeList(1).subscribe(
      data => {this.processtypeList = data;}
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
      data => { this.notesList = data; }
    );
  }
  
}
