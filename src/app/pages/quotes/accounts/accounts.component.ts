import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';
import { TransactionComponent } from '../transaction/transaction.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  inputs: [`custID`, `headerInfo`]
})
export class AccountsComponent implements OnInit {
  //public Version: any;
  paymentlist: any = [];
  public custID: any;
  public headerInfo: any;
  accountlist :any = [];

  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private getservice: QuotegetService, private service: QuoteService) { }
  ngOnInit() {
    this.GetAccountList();
    this.GetPaymentList();
  }
  GetAccountList() {
    this.service.ActionGetInvoiceList(this.custID, this.headerInfo.ID).subscribe(
      data => { this.accountlist = data; console.log(this.accountlist); }
    );
  }


  GetPaymentList() {
    this.service.ActionGetPaymentList(this.custID, this.headerInfo.ID).subscribe(
      data => { this.paymentlist = data; console.log(this.paymentlist); }
    );
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  /***********new transaction*************/
  async ActionNewTransaction() {
    let header = {headerInfo : this.headerInfo}
    const popover = await this.popoverCntrl.create({
      component: NewtranComponent,
      componentProps: header,
      translucent: true,
      showBackdrop: false,
      cssClass: "popover_class2"
    });
    return await popover.present();
  }
}

@Component({
  template: `
  <ion-grid class="acc-pop">
    <ion-row class="pad2" (click)="ActionAddTransaction(1,  'Sale Order Details')">Sale Order (QBD)</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(2,  'Estimate Details')">Estimate (QBO)</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(3,  'Customer Payment Details')">Receive Deposit</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(4,  'Quote Invoice Details')">Quote Invoice</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(5,  'Quote Invoice Details')">Phase Invoice</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(6,  'Customer Payment Details')">Receive Payment</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(7,  'Refund Receipt')">Refund Receipt</ion-row>
    <ion-row class="pad2" (click)="ActionAddTransaction(8,  'Credit Memo')">Credit Memo</ion-row>
  </ion-grid>`,
  styleUrls: ['./accounts.component.scss'],
})
export class NewtranComponent implements OnInit {
  partinfo: any = [];
  navObj = this.navParams.data;
  headerInfo: any;
  constructor(private navParams: NavParams,public Modalcntrl: ModalController, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() { }



  async ActionAddTransaction(typeId: number, viewtype: string) {
    let tran = {ViewType: viewtype, headerInfo: this.headerInfo, InvoiceTypeID:typeId }
    const modal = await this.Modalcntrl.create({
      component: TransactionComponent,
      componentProps: tran
    });
    this.ActionToClosePop(true);
    return await modal.present();

  }
  ActionToClosePop(isSelect: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      isSelect: isSelect
    });
  }
  
}