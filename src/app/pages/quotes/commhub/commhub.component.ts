import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'

@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
})
export class CommhubComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  async ActionEditCommHub() {
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent
    });
    return await modal.present();
  }
}
