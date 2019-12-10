import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-jobdescedit',
  templateUrl: './jobdescedit.component.html',
  styleUrls: ['./jobdescedit.component.scss'],
})
export class JobdesceditComponent implements OnInit {
    
  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
  version = this.navParams.data;

  ngOnInit() {}
 
  ActionCloseJobDescEdit(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:this.version,
      issave:issave
    });
  }
}
