import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-jobdescedit',
  templateUrl: './jobdescedit.component.html',
  styleUrls: ['./jobdescedit.component.scss'],
})
export class JobdesceditComponent implements OnInit {
    
  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
  navObj = this.navParams.data;
  Description:string = this.navObj.des;

  ngOnInit() {}

  ActionSaveJobDescEdit() {
    this.ActionCloseJobDescEdit(true);
  }

  ActionCloseJobDescEdit(issave) {
    let obj = {Description:this.Description}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:obj,
      issave:issave
    });
  }
}
