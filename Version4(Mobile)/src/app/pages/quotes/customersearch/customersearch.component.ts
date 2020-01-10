import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-customersearch',
  templateUrl: './customersearch.component.html',
})
export class CustomersearchComponent implements OnInit {
  searchObj = this.navParams.data;
  customerList = [];info:any;
  constructor(private navParams : NavParams,private popoverCntrl :PopoverController,private getservice:QuotegetService ) { }
  ngOnInit() {this.ActionSearchParentAccount()}
  ActionSearchParentAccount(){
    this.getservice.qsgetallcustomersearchlist(this.searchObj.search,this.searchObj.selectTypeId,this.searchObj.custTypeID).subscribe(data=>{
      this.customerList = data;
    });
  }
  ActionPopulateParentInfo(customer:any) {
    this.info = customer;
    this.ActionToClosePop(true);
   }

   ActionToClosePop(isselect) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps:this.info,
      isselect:isselect
    });
  }
}
