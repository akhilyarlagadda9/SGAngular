import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.scss'],
})
export class CustomereditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}
  ActionCloseCustomer() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
