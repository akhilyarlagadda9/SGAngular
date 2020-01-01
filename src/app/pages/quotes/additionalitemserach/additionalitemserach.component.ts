import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-additionalitemserach',
  templateUrl: './additionalitemserach.component.html',
  styleUrls: ['./additionalitemserach.component.scss'],
})
export class AdditionalitemserachComponent implements OnInit {
  searchobj= this.navParams.data;
  listItems = [];info:any;
  constructor(private getservice:QuotegetService, private popoverCntrl :PopoverController, private navParams : NavParams,) { }
  

  ngOnInit() {
    this.ActionlistItems()}

  

  ActionToClosePop(isselect) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps:this.info,
      isselect:isselect
    });
  }


  ActionSelectItem(model:any){
    this.info = model;
    this.ActionToClosePop(true)
  }
  ActionlistItems() {debugger;
   this.getservice.qsgetpricelistproductItems(this.searchobj.pricelistId,this.searchobj.producttypeId,this.searchobj.searchTypeId,this.searchobj.search).subscribe(data=>{
     this.listItems = data});
  }

  ActionPopulateParentInfo(item:any) {
    this.info = item;
    this.ActionToClosePop(true);
   }
}

