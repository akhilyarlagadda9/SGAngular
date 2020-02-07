import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-addmeas',
  templateUrl: './addmeas.component.html',
  styleUrls: ['./addmeas.component.scss'],
})
export class AddmeasComponent implements OnInit {

  shownGroup: number = 0;
  material: any;
  stockList: any;
  typeIdList: any;
  stockinfo: any;
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private service: QuoteService) { }

  ngOnInit() {
    this.GetStockInfo()
    this.GetSlabListInfo()
    this.SaveStockLisk()
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  toggleGroup(group) {
    if (group == 1) {
      if (this.isGroupShown(group)) {
        this.shownGroup = 0;
      } else {
        this.shownGroup = group;
      }
    }

  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };


  GetStockInfo() {
    this.service.ActionGetProductInfo(this.material.ProductItemID, 1, this.material.Description, this.material.FinishID, this.material.DepthID, 0).subscribe(

      data => { this.stockList = data; console.log(this.stockList); }
    );
  }

  GetSlabListInfo() {
    this.service.ActionInventoryDicLists(9).subscribe(

      data => { this.typeIdList = data; console.log(this.typeIdList); }
    );
  }

  SaveStockLisk() {
    this.service.ActionSaveMaterialInvSlabList(this.stockList).subscribe(

      data => { this.stockinfo = data; console.log(this.stockinfo); }
    );
  }

  ActionAssignSlabs = function () {debugger;
    let chkdList = []; let invSlabList = [];
    this.stockList.SlabList.map(function (elem) { if (elem.Check == 1 && (elem.StatusID == 7 || elem.StatusID == 17)) { chkdList.push(elem); return elem } { return 0 } });
    
    if (invSlabList.length > 0) {
      this.SaveStockLisk(invSlabList);
    }
    this.ActionAssignOnOrderItems();
} 

}
