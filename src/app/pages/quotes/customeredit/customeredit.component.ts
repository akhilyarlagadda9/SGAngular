import { Component, OnInit,EventEmitter } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { CustomersearchComponent } from '../customersearch/customersearch.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuoteService } from 'src/app/service/quote.service';
import { NgForm } from '@angular/forms';
declare var _qscope;
@Component({
  selector: 'app-customeredit',
  //templateUrl: './customeredit.component.html',
  templateUrl: './customeredit1.component.html',
  styleUrls: ['./customeredit.component.scss'],
})
export class CustomereditComponent implements OnInit {

  constructor(private Modalcntrl : ModalController,private navParams : NavParams,
    private qRep:QuoterepService,private qServe:QuoteService) { }
  customerinfo = this.navParams.data;header :any;
  ngOnInit() {}


  ActionCloseCustomer(issave) {
    // this.quoterep.SendInfo(this.customerinfo);
    // this.customerEvent.emit(this.customerinfo);
     this.Modalcntrl.dismiss({
       'dismissed': true,
       componentProps:this.header,
       issave:issave
     });
   }
   async ActionSearchCustomer(ev: any) {
    //  let obj={
    //    search:this.customerinfo.Name,CustTypeID:this.customerinfo.TypeID,
    //  }
    // const popover = await this.popoverCntrl.create({
    //   component: CustomereditsearchComponent,
    //   event: ev,
    //   translucent: true,
    //   componentProps:obj,
    // });
    // return await popover.present();
  }

  ActionShowNewCustomerList(ev: any, typeId: number, search: string, clickType: number) {
    search = search == undefined ? "" : search;
    if ((search != null && search != "") || typeId == 2) {
      this.ActionShowPopover(ev, typeId, search, clickType);
    }
  }
  async ActionShowPopover(ev: any, typeId: number, search, clickType: number) {
    let custTypeID = 4;
    let obj = { search: search, selectTypeId: typeId, custTypeID: custTypeID }
    const popover = await this.Modalcntrl.create({
      component: CustomersearchComponent,
      //event: ev,
     // translucent: true,
      showBackdrop: true,
      componentProps: obj,
     // cssClass: "popover_class4"
    })
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          this.PopulateCustomerInfo(detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }
  PopulateCustomerInfo(info: any) {
    this.header = this.qRep.Preparecustomermodel(this.header, info);
   // this.ActionPopulateCustName();
    this.Getcustomercontacts();
  }
  Getcustomercontacts() {
    let model: any; let header = this.header; 
    this.qServe.GetCustomerContacts(header.CustomerID).subscribe(data => {
      this.header.CustomerContacts = data;
      if (header.CustomerID > 0) {
        model = this.header.CustomerContacts.find(s => s.CustomerID == header.CustomerID && s.IsDefault == 1);
        if (model != "" && model != null && model != undefined) {
          header.Version.CustContactID = model.ID;
        }
        //  customerContacts.map(function (elem) { if (elem.CustomerID == header.CustomerID && elem.IsDefault == 1) { model = elem; } });

      }
    });
  }
  ActionSaveCustomer(form:NgForm){
    if (form.valid) {
      this.header.Version.InvoiceTo = this.header.Version.InvoiceTo == true ? 1 : 0;
      this.qServe.ActionSaveQuoteCustomer(this.header).subscribe(data=>{
        this.ActionCloseCustomer(true);
      })
    }
  }

}

// @Component({
//   //selector: 'app-customersearch',
//   template: `
//   <ion-header>
//     <ion-toolbar style="height:37px;top:-8px;left:-10px;">
//       <ion-title style="font-size:15px;">Customer Details</ion-title>
//       <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
//     </ion-toolbar>
//   </ion-header>
//   <ion-row style="height:360px">
//   <ion-col *ngFor="let item of searchResults">
// <ion-label>
//   <h2>
//       {{item.SelName}}
//   </h2>
// </ion-label>
//   </ion-col>
// </ion-row>`,
//   //styleUrls: ['./customeredit.component.scss'],
// })
// export class CustomereditsearchComponent implements OnInit {
//   searchObj = this.navParams.data;
//   searchResults = [];
//   constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController,private getservice :QuotegetService ) { }
//   ngOnInit() {this.ActionSearchParentAccount();}
//   ActionSearchParentAccount(){
//     this.getservice.GetParentAccListWithType(this.searchObj.CustTypeID,this.searchObj.search).subscribe(data=>{
//       this.searchResults = data
//     });
//   }
//   ActionCloseCustomerSearch(issave) {
//      this.popoverCntrl.dismiss({
//        'dismissed': true,
//        //componentProps:this.customerinfo,
//      });
//    }

//    ActionToClosePop() {
//     // using the injected ModalController this page
//     // can "dismiss" itself and optionally pass back data
//     this.popoverCntrl.dismiss({
//       'dismissed': true
//     });
//   }
// }