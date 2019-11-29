import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoitemsComponent } from '../poitems/poitems.component';

@Component({
  selector: 'app-headeredit',
  templateUrl: './headeredit.component.html',
  styleUrls: ['./headeredit.component.scss'],
})
export class HeadereditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  /******** Quoteedit Close ************/
  ActionCloseQuoteEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  /***** POItems Edit Popup *****/
 async ActionEditPOItem() {
  const modal = await this.Modalcntrl.create({
    component: PoitemsComponent

  });
  return await modal.present();
}

}
