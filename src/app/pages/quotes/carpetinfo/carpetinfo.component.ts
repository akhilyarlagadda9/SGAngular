import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carpetinfo',
  templateUrl: './carpetinfo.component.html',
  styleUrls: ['./carpetinfo.component.scss'],
})
export class CarpetinfoComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  ActionCloseCarpet() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

}
