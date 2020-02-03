import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController, LoadingController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { AddmeasComponent } from '../addmeas/addmeas.component';

declare var _qscope: any;

@Component({
  selector: 'app-addmat',
  templateUrl: './addmat.component.html',
  styleUrls: ['./addmat.component.scss'],
})
export class AddmatComponent implements OnInit {
  //MaterialList: any = [];
  Progress: number = 0;
  priceListID: number; AreaID: number
  material: any;
  loaderToShow: any;
  // VersionId: number; materialId: number; AreaId: number; priceListID: number
  //partList: any = [];
  // partinfo: any;
  //areaInfo: any;
  //Version: any;
  finishItems: any = []; thicknessItems: any = []; riskLevels: any = []; supplierList: any = []; slabtypes: any = []; subproductgroups: any = [];
  productItems: any = []; pricegroups: any = []; suppliers: any = [];
  prosubgroupId: number;
  searchtypeId: number;
  showProductinventory: boolean;
  showProducts: boolean;
  showProductinventory1: boolean;
  SlabList: any;
  size: any;
  materialId: any;
  //verId: any;
  //dictionaryObj: any;
  //arrObj: any;


  constructor(public loadingController: LoadingController, public popoverController: PopoverController, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private quoterep: QuoterepService, private getservice: QuotegetService, private navParams: NavParams, private service: QuoteService) { }

  ngOnInit() {
    if (this.material.ID == 0) {
      this.GetMaterialVer(this.materialId);
    }
    else {
      this.GetMaterialVer(this.material.ID);
    }
    this.initdictlists();
    this.InitMaterial();

  }

  GetMaterialVer(materialId) {
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
  }
  ActionAddSlab() {
    this.material.SlabList = this.material.SlabList == null ? [] : this.material.SlabList;

    let slab = this.quoterep.SetInitSlabs();
    this.material.SlabList.push(slab);
  }
  ActionToClose(issave) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave
    });
  }


  ActionSaveMaterial(form: any) {
    if (form.valid && form.touched) {
      this.material.UserID = 0;
      if (typeof (this.material.RiskLevels) == 'object') { this.riskLevels = JSON.stringify(this.riskLevels) };
      this.service.ActionSaveMaterial(this.AreaID, this.material).subscribe(data => {
        this.ActionToClose(true);
        debugger
      });
    }
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

  ActionSetSqft(size, typeid) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
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
  ActionSearchProductItems = function (material, searchtypeId, productsubgroup, searchType) {
    this.material.searchType = searchType; this.material.showProducts = true;
    let searchobj = material;
    let prosubgroupId = (productsubgroup == null || productsubgroup == undefined || productsubgroup == 0) ? 0 : productsubgroup.ID;
    let color = (this.material.Description == null || this.material.Description == "" || this.material.Description == undefined) ? "" : this.material.Description;
    if (prosubgroupId == 0 && color == "") { return; }
    else if (prosubgroupId > 0 && color == "") { this.searchtypeId = 1; }
    else if (prosubgroupId == 0 && color != "") { this.searchtypeId = 2; }
    else if (prosubgroupId > 0 && color != "") { this.searchtypeId = 3; }
    this.preparematerialsearch(material, searchtypeId, prosubgroupId, color, searchobj, this.priceListID);
    
  }
  preparematerialsearch(material, searchtypeId, prosubgroupId, color, searchobj, pricelistId) {
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
  }
  ActionClosePopup() {
    this.material.showProducts = false; this.showProducts = false; this.showProductinventory = false; this.showProductinventory1 = false;
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

  ActionPopulateMaterialSearch(productItem: any) {debugger
    this.material = this.quoterep.popultaesearchiteminfo(this.material, this.subproductgroups, productItem);
    this.ActionClosePopup();
    console.log(this.material)
  }



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
  ActionCalculeteMargin = function (typeId, item, type) {debugger
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

  /***** MATERIAL DETAILS *****/
  async ActionAddMeas(selName: string, ViewType: string, ev: any) {
    // let sel = { selName: selName, material: this.material, finishItems: this.finishItems, thicknessItems: this.thicknessItems, partinfo: this.partinfo, areaInfo: this.areaInfo, ViewType: ViewType, Version: this.Version }
    const popover = await this.popoverController.create({
      component: AddmeasComponent,
      // componentProps: sel,
      event: ev,
      translucent: true,
      cssClass: "popover_class4"
    });
    return await popover.present();
  }

  async ActionSearchSelect(typeid, typeid2) {
    let obj = { searchTypeId: typeid, producttypeId: typeid2, search: this.material.Des == undefined ? "" : this.material.Des }
    const popover = await this.popoverCntrl.create({
      component: SearchComponent,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    return await popover.present();
  }


}

@Component({
  template: `
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
  styleUrls: ['./addmat.component.scss'],
})
export class SearchComponent implements OnInit {
  partinfo: any = [];
  navObj = this.navParams.data;
  headerInfo: any;
  info: any;
  searchobj = this.navParams.data;
  listItems = [];
  constructor(private navParams: NavParams, public Modalcntrl: ModalController, private getservice: QuotegetService, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() {
    this.ActionlistItems()
  }

  ActionToClosePop(isSelect: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      isSelect: isSelect
    });
  }

  ActionSelectItem(model: any) {
    this.info = model;
    this.ActionToClosePop(true)
  }
  ActionlistItems() {
    this.getservice.ActionSearchMaterials(this.searchobj.search, this.searchobj.typeId, this.searchobj.pricelistIds, this.searchobj.depthId, this.searchobj.finishId, this.searchobj.searchtypeId, this.searchobj.proSubGroupId).subscribe(data => {
      this.listItems = data
    });
  }

}
