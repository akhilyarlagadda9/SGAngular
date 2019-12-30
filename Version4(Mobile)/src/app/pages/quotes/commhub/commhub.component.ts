import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
  inputs: [`Version`]
})
export class CommhubComponent implements OnInit {
  Version: any;
  processtypeList: any;
  docFormList: any;
  phaseList: any;
  selectedhubtype: number = 1;
  type: any;

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetprocessstatusList();
    this.GetformsList();
    this.GetphaseList();
  }

  //Tab selection Function
  ActionLoadHubInfo(componet: any){
    this.selectedhubtype = componet;
  }
 //Comm.Hub Edit Function
  async ActionEditCommHub(type:any) {
    let version = {version : this.Version,TypeId: type}
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
    this.getservice.CommHubPhaseList(this.Version.ID).subscribe(
      data => { this.phaseList = data; }
    );
  }
  
}
