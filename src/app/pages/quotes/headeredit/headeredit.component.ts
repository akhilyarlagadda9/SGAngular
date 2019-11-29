import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-headeredit',
  templateUrl: './headeredit.component.html',
  styleUrls: ['./headeredit.component.scss'],
})
export class HeadereditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  /******** Quoteedit Close ************/
  ActionCloseJobEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
