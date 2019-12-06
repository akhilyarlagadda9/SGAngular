import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
})
export class CommhubComponent implements OnInit {
  arealist: any[] = [{ id: 1, name: 'Stages' }, { id: 2, name: 'Material' }, { id: 3, name: 'Scheduling' }, { id: 4, name: 'CAD' }, { id: 5, name: 'Template' }];
  partlist: any[] = [{ id: 1, name: 'Doc Type' }, { id: 2, name: 'CO Approval' }, { id: 3, name: 'CO Canceled' }, { id: 4, name: 'Directions' }, { id: 5, name: 'Drawings' }];

  constructor(public Modalcntrl : ModalController) { }

  AreaName: any = this.partlist;
  PartName: any = this.partlist;
  ngOnInit() {
    this.MyDefaultYearIdValue = "1";
  }

/// In declarations : 

compareWith: any;
MyDefaultYearIdValue: string;

  async ActionEditCommHub() {
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent
    });
    return await modal.present();
  }
}
