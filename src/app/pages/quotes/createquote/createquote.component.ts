import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { CustomersearchComponent } from '../customeredit/customeredit.component';

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.component.html',
  styleUrls: ['./createquote.component.scss'],
})
export class CreatequoteComponent implements OnInit {
  quoteId:number = 0;
  header :any;
  salesPersonsList:any = [];
  estimatorsList:any = [];
  projectManagersList:any = [];
  customerTypes:any = [];
  leadTypes:any = [];
  leadHearAbout:any = [];
  priceList:any = [];
  constructor(public Modalcntrl : ModalController,private getservice:QuotegetService,private popoverCntrl :PopoverController ) { }
  ngOnInit() {
    let custDicIds = [1];let leadDicIds = [2,3];
    this.getservice.CustTypeResourceList(4, 3).subscribe(data => {this.salesPersonsList = data});
    this.getservice.CustTypeResourceList(4, 8).subscribe(data => {this.estimatorsList = data});;
    this.getservice.CustTypeResourceList(4, 9).subscribe(data => {this.projectManagersList = data});;
    this.getservice.CustomerDictionayList(custDicIds).subscribe(data => {this.customerTypes = data[0]});
    this.getservice.CustPriceList(4).subscribe(data => {this.priceList = data});
    this.getservice.LeadDictionaryLists(leadDicIds).subscribe(
      data=> { this.leadTypes = data[0] ;this.leadHearAbout = data[1] }
    );
    this.header= {
      LeadTypeID:0,
      SourceID:0,
      
      
      
      Version:{
        AccName:"",
        Customer:{},
        ParentCustInfo:{},
        ChildParentCustInfo:{}
      },
    };
    }
  /******* Actions *******/
  ActionCloseCreateQuote() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  async ActionShowAccountCustomerItems(ev: any,) {
    let obj={}
   const popover = await this.popoverCntrl.create({
     component: CustomersearchComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }
}


