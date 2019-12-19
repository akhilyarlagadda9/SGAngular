import { Component, OnInit,EventEmitter } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.scss'],
})
export class CustomereditComponent implements OnInit {

  constructor(private Modalcntrl : ModalController,private navParams : NavParams,) { }
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