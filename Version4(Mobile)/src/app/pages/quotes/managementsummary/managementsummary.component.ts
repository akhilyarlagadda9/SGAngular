import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-managementsummary',
  templateUrl: './managementsummary.component.html',
  styleUrls: ['./managementsummary.component.scss'],
})
export class ManagementsummaryComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}

  ActionCloseSummaryEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
    });
  }

}
