import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custitem',
  templateUrl: './custitem.component.html',
  styleUrls: ['./custitem.component.scss'],
})
export class CustitemComponent implements OnInit {

  constructor(public Modalcntrl : ModalController ) { }

  ngOnInit() {}

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  async ActionCreateTemplate(typeId) {
    let obj = {TypeID:typeId}
    const modal = await this.Modalcntrl.create({
      component: CustitemComponent,
      componentProps: obj
    });
    return await modal.present();
  }
}


