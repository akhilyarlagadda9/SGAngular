import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component'

@Component({
  selector: 'app-jobdes',
  templateUrl: './jobdes.component.html',
  styleUrls: ['./jobdes.component.scss'],
  inputs:[`version`]
})
export class JobdesComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}


  async ActionEditJobDesc() {
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent
    });
    return await modal.present();
  }

}
