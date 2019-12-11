import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-poedit',
  templateUrl: './poedit.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {
  

  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
  navObj = this.navParams.data;
  poitems:any = this.navObj.info;

  // item = this.navParams.data;
 
  ngOnInit() {}

  ActionSavePOItem() {
    this.ActionClosePOItem(true);
  }

  ActionClosePOItem(issave) { 
    let obj = {poitems:this.poitems}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:obj,
      issave:issave
    });
  }
}
