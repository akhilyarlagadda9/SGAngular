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
  arealist: any[] = [{ id: 1, name: 'Stages' }, { id: 2, name: 'Material' }, { id: 3, name: 'Scheduling' }, { id: 4, name: 'CAD' }, { id: 5, name: 'Template' }];
  partlist: any[] = [{ id: 1, name: 'Doc Type' }, { id: 2, name: 'CO Approval' }, { id: 3, name: 'CO Canceled' }, { id: 4, name: 'Directions' }, { id: 5, name: 'Drawings' }];
  Version: any;
  processtypeList: any;

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  AreaName: any = this.partlist;
  PartName: any = this.partlist;
  ngOnInit() {
    this.MyDefaultYearIdValue = "1";
    this.GetprocessstatusList();
  }

/// In declarations : 

compareWith: any;
MyDefaultYearIdValue: string;
  
 //Comm.Hub Edit Function
  async ActionEditCommHub() {
    let version = {version : this.Version}
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


  
}
