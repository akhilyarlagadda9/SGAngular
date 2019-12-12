import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-poedit',
  templateUrl: './poedit.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
   poitem = this.navParams.data;
  
  ngOnInit() {}

  ActionSavePOItem() {
    this.ActionClosePOItem(true);
  }

  ActionClosePOItem(issave) { 
    let obj = {poitem:this.poitem}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:obj,
      issave:issave
    });
  }
}
