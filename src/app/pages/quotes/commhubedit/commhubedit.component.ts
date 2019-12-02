import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-commhubedit',
  templateUrl: './commhubedit.component.html',
  styleUrls: ['./commhubedit.component.scss'],
})
export class CommhubeditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  ActionCloseCommhubedit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
