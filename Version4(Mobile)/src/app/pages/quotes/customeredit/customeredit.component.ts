import { Component, OnInit,EventEmitter } from '@angular/core';
import { ModalController ,NavParams,PopoverController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  //styleUrls: ['./customeredit.component.scss'],
})
export class CustomereditComponent implements OnInit {

  constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController ) { }
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
   async ActionSearchCustomer(ev: any) {
     let obj={
       search:this.customerinfo.Name,CustTypeID:this.customerinfo.TypeID,
     }
    const popover = await this.popoverCntrl.create({
      component: CustomersearchComponent,
      event: ev,
      translucent: true,
      componentProps:obj,
    });
    return await popover.present();
  }

}

@Component({
  //selector: 'app-customersearch',
  template: `<ion-row>
  <ion-col *ngFor="let item of searchResults">
<ion-label>
  <h2>
      {{item.SelName}}
  </h2>
</ion-label>
  </ion-col>
</ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class CustomersearchComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController,private getservice :QuotegetService ) { }
  ngOnInit() {this.ActionSearchParentAccount();}
  ActionSearchParentAccount(){
    debugger;
    this.getservice.GetParentAccListWithType(this.searchObj.CustTypeID,this.searchObj.search).subscribe(data=>{
      this.searchResults = data
    });
  }
  ActionCloseCustomerSearch(issave) {
     this.popoverCntrl.dismiss({
       'dismissed': true,
       //componentProps:this.customerinfo,
     });
   }
}