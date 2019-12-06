import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController ,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private navCntrl:NavParams) { }
  TypeID = this.navCntrl.data.TypeID;
  ngOnInit() {
    
    console.log(this.TypeID)
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

}
