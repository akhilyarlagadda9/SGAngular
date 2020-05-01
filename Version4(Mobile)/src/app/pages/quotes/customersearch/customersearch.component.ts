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
  custID = this.searchObj.custTypeID;
  constructor(private navParams : NavParams,private modelCntrl :ModalController,private getservice:QuotegetService ) { }
  ngOnInit() {this.ActionSearchParentAccount()}
  ActionSearchParentAccount(){
    if(this.searchObj.custTypeID ==  4){
    this.getservice.qsgetallcustomersearchlist(this.searchObj.search,this.searchObj.selectTypeId,this.custID).subscribe(data=>{
      this.customerList = data;
      console.log(data);
    });
  }
  else if(this.searchObj.selectTypeId == 1){
    this.getservice.qsgetparentaccountswithtype(this.custID,this.searchObj.search).subscribe(data=>{
      this.customerList = data;
      console.log(data);
    });
  }
  else{
    this.getservice.qsgetparentaccounts(this.custID).subscribe(data=>{
      this.customerList = data;
      console.log(data);
    });
  }
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
