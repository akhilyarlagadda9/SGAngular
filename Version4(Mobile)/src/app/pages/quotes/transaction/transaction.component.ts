import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';

declare var _qscope: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  qprmsobj = this.navParams.data;
  headerInfo:any = [];
  customer:any =[];
  Version:any=[];
  InvoiceTypeID:any[];
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController,) { }

  ngOnInit() {
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  

}
