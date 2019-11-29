import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-jobdescedit',
  templateUrl: './jobdescedit.component.html',
  styleUrls: ['./jobdescedit.component.scss'],
})
export class JobdesceditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}
  ActionCloseJobDescEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
