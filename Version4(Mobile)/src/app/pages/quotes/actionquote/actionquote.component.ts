import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

declare var _qscope: any;

@Component({
  selector: 'app-actionquote',
  templateUrl: './actionquote.component.html',
  styleUrls: ['./actionquote.component.scss'],
})
export class ActionquoteComponent implements OnInit {
  navObj = this.navParams.data;

  constructor(private navParams: NavParams,public Modalcntrl: ModalController, private popoverCntrl: PopoverController) { }

  ngOnInit() {
  }

  ActionCloseCustomer(issave) {
    // this.quoterep.SendInfo(this.customerinfo);
    // this.customerEvent.emit(this.customerinfo);
     this.Modalcntrl.dismiss({
       'dismissed': true,
       issave:issave
     });
   }

}
