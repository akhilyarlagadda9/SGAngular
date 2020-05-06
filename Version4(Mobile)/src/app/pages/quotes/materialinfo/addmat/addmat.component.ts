import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController, LoadingController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { AddmeasComponent } from '../addmeas/addmeas.component';

declare var _qscope: any;

@Component({
  selector: 'app-addmat',
  //templateUrl: './addmat.component.html',
  templateUrl: './addmatnew.component.html',
  styleUrls: ['./addmat.component.scss'],
})
export class AddmatComponent implements OnInit {
  //MaterialList: any = [];
  Progress: number = 0;
  priceListID: number; AreaID: number
  material: any;
  loaderToShow: any;
  loaderToShow2: Promise<void>;
  
  finishItems: any = []; thicknessItems: any = []; riskLevels: any = []; supplierList: any = []; slabtypes: any = []; subproductgroups: any = [];
  productItems: any = []; pricegroups: any = []; suppliers: any = [];
  prosubgroupId: number;
  searchtypeId: number;
  showProductinventory: boolean;
  showProducts: boolean;
  showProductinventory1: boolean;
  size: any;
  materialId: number;
  stockList: any;
  productId: number;
  locId: number;
  search: any;
  finishId: number;
  depthId: number;
  //verId: any;
  //dictionaryObj: any;
  //arrObj: any;


  constructor(public loadingController: LoadingController, public popoverController: PopoverController, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private quoterep: QuoterepService, private getservice: QuotegetService, private navParams: NavParams, private service: QuoteService) { }

  ngOnInit() {
    this.initdictlists();
    if(this.material.ID == 0){
      this.InitMaterial();
    }else{
      this.GetVerionMaterial(this.material.ID);
    }
    //this.GetStockInfo();
  }

  GetVerionMaterial(materialId) {
    this.service.ActionVersionMaterial(materialId).subscribe(
      data => { this.material = data; console.log(this.material); }
    );
  }

  showLoader(value) {
    if (value == 0)
    {this.loaderToShow = 0 }
    else 
    {this.loaderToShow = 1}
  }



  // preparediclists() {
  //   this.initdictlists();
  //   //this.productgroups();
  // }
  initdictlists() {
    this.getservice.qsgetinventorydictlist(6, 7, 12).subscribe(data => {
      this.finishItems = data[0];
      this.thicknessItems = data[1];
      this.riskLevels = data[2];
    })
    this.getservice.ActionGetSupplierList(0).subscribe(data => { this.supplierList = data });
    this.getservice.ActionInventoryDicLists(9).subscribe(data => { this.slabtypes = data[0] });
  }
  productgroups() {
    this.getservice.ActionGetsubproductgrouplist(2).subscribe(data => { this.subproductgroups = data });//typeId
    this.preparesubproductgroups(this.subproductgroups);
  }
  preparesubproductgroups(g) {
    for (let i = 0; i < g.length; i++) {
      g[i].ParentGroup = g[i].ParentGroupId == 1 ? "Natural Stone" : g[i].ParentGroupId == 2 ? "Engineered Stone" : g[i].ParentGroupId == 3 ? "Solid Surface" : "Misc Stone";
    }
  }
  InitMaterial() {
    this.material.SlabList = [];
    this.material = this.quoterep.SetInitMaterial(this.material.VersionID);
    this.ActionAddMeas();
  }
  ActionAddMeas() {
    this.material.SlabList = this.material.SlabList == null ? [] : this.material.SlabList;
    let size = this.quoterep.SetInitSlabs();
    this.material.SlabList.push(size);
    console.log(this.material.SlabList)
    
  }
  ActionToClose(issave) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:this.material,
      issave: issave
    });
  }


  ActionSaveMaterial(form: any) {
    if (form.valid) {
      this.showLoader2();
      this.material.UserID = 0;
      if (typeof (this.material.RiskLevels) == 'object') { this.riskLevels = JSON.stringify(this.riskLevels) };
      this.service.ActionSaveMaterial(this.AreaID, this.material).subscribe(data => {
        this.ActionToClose(true);
        this.hideLoader()
      });
    }
  }

  showLoader2() {
    this.loaderToShow2 = this.loadingController.create({
      message: 'Please wait'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }
  async hideLoader() {
    this.loadingController.dismiss();
  }


  ActionSetMargin(typeId: number, model: any, type: string) {
    this.material = this.quoterep.margincalculations(typeId, model, type);
    this.material.Amount = this.quoterep.calcmargin(this.material.UnitCost, this.material.Margin);
    this.material.Amt = this.material.Amount;
  }

  ActionSetAmount() {
    this.material.Amount = this.quoterep.calcitemamt(this.material.Qty, this.material.UnitPrice);
    this.material.Amt = this.material.Amount;
  }

  /* GetStockInfo() {
    this.stockList = this.service.ActionGetProductInfo(this.prosubgroupId);
    console.log(this.stockList);
  } */

 /*  GetStockInfo() {
    this.service.ActionGetProductInfo(this.material.ProductItemID,1, this.material.Description, this.material.FinishID, this.material.DepthID, this.material.ProSubGroupID).subscribe(

      data => { this.stockList = data; console.log(this.stockList); }
    );
  } */

  ActionSetSqft(size) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Length);
  }



  ActionSetDisc(model: any) {
    if (this.material.Cost != 0 && this.material.CostDiscount != 0) {
      let cost = Number((this.material.UnitCost * (this.material.CostDiscount / 100)));
      this.material.UnitCost = Number(this.material.Cost - cost);
    } else {
      this.material.UnitCost = this.material.Cost;
    }
  }


  changeProgress(value) {
    if (this.showProgress(value)) {
      this.Progress = 0;
    } else {
      this.Progress = value;
    }
  };

  showProgress(value) {
    return this.Progress === value;
  };

  /*********Material Search************/
  ActionSearchProductItems(material, searchtypeId, productsubgroup, searchType) {
    this.material.searchType = searchType; this.material.showProducts = true;
    let searchobj = material;
    let prosubgroupId = (productsubgroup == null || productsubgroup == undefined || productsubgroup == 0) ? 0 : productsubgroup.ID;
    let color = (this.material.Description == null || this.material.Description == "" || this.material.Description == undefined) ? "" : this.material.Description;
    if (prosubgroupId == 0 && color == "") { return; }
    else if (prosubgroupId > 0 && color == "") { this.searchtypeId = 1; }
    else if (prosubgroupId == 0 && color != "") { this.searchtypeId = 2; }
    else if (prosubgroupId > 0 && color != "") { this.searchtypeId = 3; }
    this.ActionSearchSelect(material, searchtypeId, prosubgroupId, color, searchobj, this.priceListID);
    //this.preparematerialsearch(material, searchtypeId, prosubgroupId, color, searchobj, this.priceListID);
    
    
  }
  /* preparematerialsearch(material, searchtypeId, prosubgroupId, color, searchobj, pricelistId) {
    this.material.SearchChkFlag = material.SearchChkFlag == undefined ? 0 : material.SearchChkFlag;
    this.material.DepthTypeID = material.DepthTypeID == undefined ? 0 : material.DepthTypeID;
    this.material.FinishTypeID = material.FinishTypeID == undefined ? 0 : material.FinishTypeID;
    if (this.material.SearchChkFlag != 0) {
      this.prosubgroupId = 0; this.searchtypeId = 2;
    }
    this.service.ActionGetmaterialsearchrecords(color, this.material.SearchChkFlag, pricelistId, this.material.DepthTypeID, this.material.FinishTypeID, searchtypeId, prosubgroupId).subscribe(data => { this.productItems = data;this.showLoader(1);  });
    this.service.Actionpricegrouplists(pricelistId).subscribe(data => { this.pricegroups = data});
    this.preparesuppliersfromresults(this.productItems);
    this.showProductinventory = false; this.showProducts = true;
  } */
  
  preparesuppliersfromresults(productItems: any) {
    let supplierList = [];
    if (productItems.length > 0) {
      productItems.map(function (elem) {
        if (elem.SupplierID > 0) {
          let item = { ID: "", Name: '' }; item.ID = elem.SupplierID; item.Name = elem.SupplierName; supplierList.push(item);
        }
      });
    }
  }

  /* ActionPopulateMaterialSearch(productItem: any) {

    this.material = this.quoterep.popultaesearchiteminfo(this.material, this.subproductgroups, productItem);
    this.ActionClosePopup();
    console.log(this.material)
  } */



  ActionCalculateMaterialCost(material) {
    if (material.Cost != 0 && material.CostDiscount != 0) {
      let cost = this.quoterep.roundToTwo(Number(material.Cost * (material.CostDiscount / 100)));
      this.material.UnitCost = this.quoterep.roundToTwo(material.Cost - cost);
    } else {
      this.material.UnitCost = material.Cost;
    }
    this.material = this.quoterep.margincalculations('1', material, 'mat');
    //calcmaterialnetprice(material);
    this.material = this.quoterep.calcmaterialwasteamt(material);
  }
  ActionCalculeteMargin = function (typeId, item, type) {
    this.material = this.quoterep.margincalculations(typeId, item, type);
  }
  ActionCalculateMaterialSummary = function (material) {
    this.material = this.quoterep.calcmaterialwasteamt(material);
  }
  //  async ActionAddMeas() {
  //    const popover = await this.popoverCntrl.create({
  //      component: AddMeasComponent,
  //      translucent: true,
  //      showBackdrop: false,
  //      cssClass: "opover_class"
  //    });
  //    return await popover.present();
  //  }

  /***** STOCKIFO DETAILS *****/
  async ActionAddSlab() {
    let sel = {material: this.material, finishItems: this.finishItems, thicknessItems: this.thicknessItems}
    const modal = await this.Modalcntrl.create({
      component: AddmeasComponent,
      componentProps: sel,
    });
    return await modal.present();
  }

  async ActionSearchSelect(material, searchtypeId, prosubgroupId, color, searchobj,priceListID) {
    let obj = { material, searchtypeId, prosubgroupId, color, searchobj,priceListID}
    const popover = await this.Modalcntrl.create({
      component: SearchComponent,
      componentProps: obj,
    });
    console.log(obj);
    return await popover.present();
    
  }
  

}

@Component({
 /*  template: `
  <ion-header>
  <ion-toolbar class="toolsty">
    <ion-title class="titleheader2"><b>Description</b></ion-title>
    <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)" class="btnsty">X</ion-button>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-item >
    <ion-row>
    <ion-col size="12" *ngFor="let item of listItems" (click)="ActionSelectItem(item)" class="border-btm">
      <ion-label>
        <h3>{{item.ProSubGroup}}</h3>
        <p></p>
      </ion-label>
    </ion-col>
  </ion-row>
  </ion-item>
</ion-content>`,
  styleUrls: ['./addmat.component.scss'], */
  selector: 'app-search',
  templateUrl: './search.html',
})
export class SearchComponent implements OnInit {
  partinfo: any = [];
  navObj = this.navParams.data;
  headerInfo: any;
  info: any;
  searchobj = this.navParams.data;
  listItems = [];
  material: any;
  prosubgroupId: number;
  searchtypeId: number;
  pricegroups: any = [];
  productItems: any = [];
  subproductgroups: any = [];
  showProductinventory: boolean;
  showProducts: boolean;
  loaderToShow: any;
  showProductinventory1: boolean;
  color: any;
  priceListID: any;
  constructor(private service: QuoteService,private navParams: NavParams,private quoterep: QuoterepService, public Modalcntrl: ModalController, private getservice: QuotegetService, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() {
    //this.ActionlistItems()
    this.preparematerialsearch(this.material, this.searchtypeId, this.prosubgroupId, this.color, this.searchobj, this.priceListID)
    
  }

  ActionClosePopup() {
    this.material.showProducts = false; this.showProducts = false; this.showProductinventory = false; //this.showProductinventory1 = false;
    this.Modalcntrl.dismiss({
      componentProps:this.material,
      'dismissed': true,
    });
  }

 /*  ActionSelectItem(model: any) {
    this.info = model;
    this.ActionToClosePop(true)
  } */
  /* ActionlistItems() {debugger
    this.getservice.ActionSearchMaterials(this.searchobj.search, this.material.typeId, this.searchobj.pricelistIds, this.searchobj.depthId, this.searchobj.finishId, this.searchobj.searchtypeId, this.searchobj.proSubGroupId).subscribe(data => {
      this.listItems = data
    });
    
  } */

  preparematerialsearch(material, searchtypeId, prosubgroupId, color=this.color, searchobj, pricelistId) {
    this.material.SearchChkFlag = material.SearchChkFlag == undefined ? 0 : material.SearchChkFlag;
    this.material.DepthTypeID = material.DepthTypeID == undefined ? 0 : material.DepthTypeID;
    this.material.FinishTypeID = material.FinishTypeID == undefined ? 0 : material.FinishTypeID;
    if (this.material.SearchChkFlag != 0) {
      this.prosubgroupId = 0; this.searchtypeId = 2;
    }
    this.service.ActionGetmaterialsearchrecords(color, this.material.SearchChkFlag, this.priceListID, this.material.DepthTypeID, this.material.FinishTypeID, searchtypeId, prosubgroupId).subscribe(data => { this.productItems = data;this.showLoader(1);  });
    this.service.Actionpricegrouplists(pricelistId).subscribe(data => { this.pricegroups = data;console.log(data)});
    this.preparesuppliersfromresults(this.productItems);
    this.showProductinventory = false; this.showProducts = true;
  }
  preparesuppliersfromresults(productItems: any) {
    let supplierList = [];
    if (productItems.length > 0) {
      productItems.map(function (elem) {
        if (elem.SupplierID > 0) {
          let item = { ID: "", Name: '' }; item.ID = elem.SupplierID; item.Name = elem.SupplierName; supplierList.push(item);
        }
      });
    }
  }

  showLoader(value) {
    if (value == 0)
    {this.loaderToShow = 0 }
    else 
    {this.loaderToShow = 1}
  }

  ActionPopulateMaterialSearch(productItem: any) {
;
    this.material = this.quoterep.popultaesearchiteminfo(this.material, this.subproductgroups, productItem);
    this.ActionClosePopup();
    console.log(this.material)
  }

  /* ActionClosePopup() {
    ;
    this.material.showProducts = false; this.showProducts = false; this.showProductinventory = false; this.showProductinventory1 = false;
  } */
}
