import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tileinfo',
  templateUrl: './tileinfo.component.html',
  styleUrls: ['./tileinfo.component.scss'],
})
export class TileinfoComponent implements OnInit {

  constructor(public Modalcntrl : ModalController ) { }

  ngOnInit() {}

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
