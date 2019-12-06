import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cutoutinfo',
  templateUrl: './cutoutinfo.component.html',
  styleUrls: ['./cutoutinfo.component.scss'],
})
export class CutoutinfoComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private navCntrl:NavParams) { }
  TypeID = this.navCntrl.data.TypeID;

  ngOnInit() {}

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

}
