import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.component.html',
  styleUrls: ['./createquote.component.scss'],
})
export class CreatequoteComponent implements OnInit {
  create: any;

  constructor(public Modalcntrl : ModalController ) { }

  ngOnInit() {}
  ActionCloseCreateQuote() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
