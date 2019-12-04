import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sink',
  templateUrl: './sink.component.html',
  styleUrls: ['./sink.component.scss'],
})
export class SinkComponent implements OnInit {

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
