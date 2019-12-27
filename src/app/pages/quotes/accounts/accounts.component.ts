import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  inputs: [`custID`,`quoteID`]
})
export class AccountsComponent implements OnInit {
  public custID: any;
  public quoteID: any;
  accountlist :any = [];

  constructor( public Modalcntrl : ModalController, private getservice: QuotegetService, private service : QuoteService ) { }
  ngOnInit() {
    this.GetAccountList();
  }
  GetAccountList() {
    this.service.ActionGetInvoiceList(this.custID, this.quoteID).subscribe(
      data => { this.accountlist = data; console.log(this.accountlist); }
    );
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

}
