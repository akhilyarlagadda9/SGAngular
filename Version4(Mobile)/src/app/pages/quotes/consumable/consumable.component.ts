import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';

@Component({
  selector: 'app-consumable',
  templateUrl: './consumable.component.html',
  styleUrls: ['./consumable.component.scss'],
})
export class ConsumableComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private popoverCntrl :PopoverController ) { }

  ngOnInit() {}


  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  async ActionSearchSelect(ev: any) {
    let obj={}
   const popover = await this.popoverCntrl.create({
     component: AdditionalitemserachComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }
 ActionToClosePop() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.popoverCntrl.dismiss({
    'dismissed': true
  });
}
}
