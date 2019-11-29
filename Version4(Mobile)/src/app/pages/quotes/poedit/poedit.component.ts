import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-poedit',
  templateUrl: './poedit.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}
  ActionClosePOItem() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
