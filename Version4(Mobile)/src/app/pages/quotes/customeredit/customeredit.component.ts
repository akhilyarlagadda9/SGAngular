import { Component, OnInit,EventEmitter } from '@angular/core';
import { ModalController ,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  //styleUrls: ['./customeredit.component.scss'],
})
export class CustomereditComponent implements OnInit {

  constructor(private Modalcntrl : ModalController,private navParams : NavParams) { }
  customerinfo = this.navParams.data;
  ngOnInit() {}


  ActionCloseCustomer(issave) {
    // this.quoterep.SendInfo(this.customerinfo);
    // this.customerEvent.emit(this.customerinfo);
     this.Modalcntrl.dismiss({
       'dismissed': true,
       componentProps:this.customerinfo,
       issave:issave
     });
   }
}
