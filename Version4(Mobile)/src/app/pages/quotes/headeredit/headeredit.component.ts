import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-headeredit',
  templateUrl: './headeredit.component.html',
  styleUrls: ['./headeredit.component.scss'],
})
export class HeadereditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
  headerinfo = this.navParams.data;
  ngOnInit() {}

  /******** Quoteedit Close ************/
  ActionCloseJobEdit(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:this.headerinfo,
      issave:issave
    });
  }
}
