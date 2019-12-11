import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';

@Component({
  selector: 'app-addoninfo',
  templateUrl: './addoninfo.component.html',
  styleUrls: ['./addoninfo.component.scss'],
})
export class AddoninfoComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private popoverCntrl :PopoverController,private navParams : NavParams ) { }
  addoninfo = this.navParams.data;
  ngOnInit() {}
  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:this.addoninfo,
    });
  }

  async ActionSearchSelect(ev: any,typeid,typeid2) {
    let obj={
      searchTypeId:typeid,producttypeId:typeid2,search: this.addoninfo.Des == undefined ? "" : this.addoninfo.Des
    }
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