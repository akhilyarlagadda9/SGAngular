import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-customersearch',
  templateUrl: './customersearch.component.html',
})
export class CustomersearchComponent implements OnInit {
  searchObj = this.navParams.data;
  customerList = [];info:any;
  constructor(private navParams : NavParams,private modelCntrl :ModalController,private getservice:QuotegetService ) { }
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
    this.modelCntrl.dismiss({
      'dismissed': true,
      componentProps:this.info,
      isselect:isselect
    });
  }
}
