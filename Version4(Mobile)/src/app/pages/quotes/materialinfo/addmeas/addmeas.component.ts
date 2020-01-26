import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addmeas',
  templateUrl: './addmeas.component.html',
  styleUrls: ['./addmeas.component.scss'],
})
export class AddmeasComponent implements OnInit {

  shownGroup:number=0;
  constructor(public Modalcntrl: ModalController) { }

  ngOnInit() {
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  toggleGroup(group) {
    if(group == 1){
      if (this.isGroupShown(group)) {
        this.shownGroup = 0;
    } else {
        this.shownGroup = group;
    }
    }
   
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
