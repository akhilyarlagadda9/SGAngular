import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { AddmatComponent } from '../materialinfo/addmat/addmat.component';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { OverlayEventDetail } from '@ionic/core';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.scss'],
})
export class AddpartComponent implements OnInit {
  partinfo: any; priceListID: any; pricebook: any;
  coId: number; coSrNo: string; matPercent: any;
  MaterialList: any = []; CountertypeList: any = [];
  SplashList: any = []; EdgeList: any = []; CutoutList: any = [];
  selectedcomponent: number = 2;
  sinkfaucet: any;
  faucet: any;
  labor: any;
  other: any;
  areaInfo: any;
  shownGroup: number = 1;
  shownGroup4: any = 2;
  constructor(public Modalcntrl: ModalController, public popoverCntrl: PopoverController,
    private service: QuoteService, private getservice: QuotegetService, private quoterep: QuoterepService) { }

  ngOnInit() {
    this.GetPriceListItems();
    this.GetMaterialList();
    this.GetCounterList();

  }

  PreparePart() {
    this.partinfo.Name = ""; this.partinfo.IsActive = 1; this.partinfo.IsActive = 1;
    this.partinfo.PartMaterialList = []; this.partinfo.PartFabList = [];
    this.partinfo.EdgeList = []; this.partinfo.SplashList = []; this.partinfo.CutoutList = [];
    this.partinfo.LaborList = []; this.partinfo.SinkList = []; this.partinfo.FaucetList = []; this.partinfo.OtherList = [];
    // Material
    let partmat = this.quoterep.AddPartMatItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.PartMaterialList.push(partmat);
    //Fabrigation
    let fab = this.quoterep.AddFabricationItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    let sizes = this.quoterep.AddMeasurementItem();
    fab.MeasureList.push(sizes);
    this.GetCostFromRiskLevels(fab, 0);
    this.partinfo.PartFabList.push(fab);
    //Splash
    this.ActionAddSplash();
    //Edge
    this.ActionAddEdge();
    //cutout
    this.ActionAddCutOut();
    //Template 
    let template = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1, "Template");
    template.Description = "Template";
    this.GetCostFromRiskLevels(template, 1);
    this.partinfo.LaborList.push(template);
    //Install
    let install = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1, "Install");
    install.Description = "Install";
    this.GetCostFromRiskLevels(install, 2);
    this.partinfo.LaborList.push(install);
    //Sink
    this.ActionAddSink();
    //Faucet
    this.ActionAddFaucet();
    //Others
    this.ActionAddOther();
    //labor
    let labor = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 0, "Labor");
    this.partinfo.LaborList.push(labor);
  }

  GetCostFromRiskLevels(model, typeId) {
    let obj = this.quoterep.getdefaultrisklevelprice1(this.pricebook, typeId);
    model.UnitCost = obj.cost > 0 ? obj.cost : model.UnitCost;
    model.Margin = obj.margin > 0 ? obj.margin : model.Margin;
    if (typeId == 0) {
      model.LaborUnitPrice = obj.price > 0 ? obj.price : model.LaborUnitPrice;
    } else {
      model.UnitPrice = obj.price > 0 ? obj.price : model.UnitPrice;
    }
  }

  GetMaterialList() {
    this.service.ActionGetMaterialList(this.partinfo.VersionID).subscribe(data => {
      this.MaterialList = data;
    })
  }
  GetCounterList() {
    this.service.ActionGetCountertypeList().subscribe(data => {
      this.CountertypeList = data[0];
    })
  }
  GetPriceListItems() {
    let typeIdList = []; typeIdList.push(5); typeIdList.push(6); typeIdList.push(10); typeIdList.push(7);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(data => {
      this.SplashList = data[1];
      this.EdgeList = data[0];
      this.CutoutList = data[2];
      console.log(data);
    })
    this.FabricationRiskLevels();
  }
  async ActionSearchSelect(ev: any, typeid, protypeId, info) {
    let obj = {
      pricelistId: this.priceListID, searchTypeId: typeid, producttypeId: protypeId, search: info.Description == undefined ? "" : info.Description, info: info
    }
    const popover = await this.popoverCntrl.create({
      component: AdditionalitemserachComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          if (protypeId == 8) {
            this.sinkfaucet = detail.data.componentProps;
          } else if (protypeId == 9) {
            this.faucet = detail.data.componentProps;
          } else if (protypeId == 7) {
            this.labor = detail.data.componentProps;
          } else if (protypeId == 11) {
            this.other = detail.data.componentProps;
          }
        }
      }
    });
    return await popover.present();
  }
  FabricationRiskLevels() {
    let result = this.service.FabricationRiskLevels(this.priceListID).subscribe(data => {
      if (data != undefined) {
        this.pricebook = data;
        //this.getservice.getdefaultrisklevelprice1(data);
      }
      if (this.partinfo.ID == 0) {
        this.PreparePart()
      }
    })
  }




  ActionPopulateMaterial(Id, index) {
    let material = this.MaterialList.find(s => s.ID == Id);
    if (material != null && material != undefined) {
      this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index], material);
    }
  }
  ActionPopulateSize(Id, index) {
    // let material = this.CountertypeList.find(s=>s.ID == Id);
    // if(material != null && material != undefined){
    //   this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index],material);
    // }
  }
  ActionPopulateSplash(Id, index) {
    let splash = this.SplashList.find(s => s.ID == Id);
    if (splash != null && splash != undefined) {
      this.partinfo.SplashList[index] = this.quoterep.Setsplash(this.partinfo.SplashList[index], splash);
    }
  }
  ActionPopulateEdge(Id, index) {
    let edge = this.EdgeList.find(s => s.ID == Id);
    if (edge != null && edge != undefined) {
      this.partinfo.EdgeList[index] = this.quoterep.SetEdge(this.partinfo.EdgeList[index], edge);
    }
  }
  ActionPopulateCutout(Id, index) {
    let cutout = this.CutoutList.find(s => s.ID == Id);
    if (cutout != null && cutout != undefined) {
      this.partinfo.CutoutList[index] = this.quoterep.SetCutout(this.partinfo.CutoutList[index], cutout);
    }
  }

  ActionSetSqft(size, typeid, index) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
    this.ActionSetFabSqft(index);
  }
  ActionSetFabSqft(index) {
    const sum = this.partinfo.PartFabList[index].MeasureList.reduce((sum, current) => Number(sum) + current.Sqft, 0);
    this.partinfo.PartFabList[index].PartSqft = sum;
    this.PopulateSqfts();
  }
  ActionSetSplashSqft(splash) {
    splash.Sqft = this.quoterep.calcsqft(splash.Width, splash.Height);
    this.ActionChangeSplash();
  }
  ActionChangeSplash() {
    const sum = this.partinfo.SplashList.reduce((sum, current) => Number(sum) + current.Sqft, 0);
    this.partinfo.PartFabList[0].SplashSqft = sum;
    //this.partinfo.PartFabList[0].Sqft =this.partinfo.PartFabList[0].PartSqft + this.partinfo.PartFabList[0].SplashSqft;
    // console.log(this.partinfo.PartFabList[0]);
    this.PopulateSqfts();

  }
  PopulateSqfts() {
    // Fab
    this.partinfo.PartFabList[0].Sqft = Number(this.partinfo.PartFabList[0].PartSqft) + Number(this.partinfo.PartFabList[0].SplashSqft);
    this.ActionSetAmount("Fab", this.partinfo.PartFabList[0]);
    let sqft = this.partinfo.PartFabList[0].Sqft;
    // Material
    this.partinfo.PartMaterialList[0].Sqft = sqft;
    this.partinfo.PartMaterialList[0].Qty = sqft
    this.ActionSetAmount("matfab", this.partinfo.PartMaterialList[0]);
    //Template
    this.partinfo.LaborList[0].Qty = sqft;
    this.ActionSetAmount("labor", this.partinfo.LaborList[0]);
    //Install
    this.partinfo.LaborList[1].Qty = sqft;
    this.ActionSetAmount("labor", this.partinfo.LaborList[1]);
  }



  ActionCloseAddPart(issave) {
    let text = { Name: this.partinfo.Name, ID: this.partinfo.ID }
    //let text = isbool == true ? this.partinfo.Name : "";
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: text,
      issave: issave
    });
  }

  ActionAddEdge() {
    let edge = this.quoterep.AddEdgeItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.EdgeList.push(edge);
  }

  ActionAddSplash() {
    let splash = this.quoterep.AddSplashItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.SplashList.push(splash);
  }
  ActionAddCutOut() {
    let cutout = this.quoterep.AddCutoutItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1);
    this.partinfo.CutoutList.push(cutout);
  }
  ActionAddSize(index) {
    let size = this.quoterep.AddMeasurementItem();
    this.partinfo.PartFabList[index].MeasureList.push(size);
  }
  ActionAddSink() {
    let sinkfaucet = this.quoterep.AddSinkItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.SinkList.push(sinkfaucet);
  }
  ActionAddFaucet() {
    let faucet = this.quoterep.AddFaucetItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.FaucetList.push(faucet);
  }
  ActionAddOther() {
    let other = this.quoterep.AddOtherItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.OtherList.push(other);
  }
  ActionAddLabor() {
    let other = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 0, 'Labor');
    this.partinfo.LaborList.push(other);
  }
  ActionRemoveSizes(indx:number, jndx:number){
    this.partinfo.PartFabList[jndx].MeasureList.splice(indx, 1);
    this.ActionSetFabSqft(jndx);
  }
  ActionRemoveSplash(index:number){
    this.partinfo.SplashList.splice(index, 1);
  }
  ActionRemoveEdge(index:number){
    this.partinfo.EdgeList.splice(index, 1);
  }
  ActionRemoveCutout(index:number){
    this.partinfo.CutoutList.splice(index, 1);
  }
  ActionRemoveSink(index:number){
    this.partinfo.SinkList.splice(index, 1);
  }
  ActionRemoveFaucet(index:number){
    this.partinfo.FaucetList.splice(index, 1);
  }
  ActionRemoveLabor(index:number){
    this.partinfo.LaborList.splice(index, 1);
  }
  ActionRemoveOther(index:number){
    this.partinfo.OtherList.splice(index, 1);
  }

  ActionSetMargin(typeId: number, model: any, type: string) {
    model = this.quoterep.margincalculations(typeId, model, type);
    this.ActionSetAmount(type, model);

  }
  ActionSetAmount(type, model) {
    switch (type) {
      case "Fab": case "matfab":
        //model.Amount = this.quoterep.calcitemamt(model.Sqft, model.LaborUnitPrice);
        model.Amount = this.quoterep.calcitemamt(model.Sqft, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      case "labor":
        model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
        break;
      case "cutout":
        model.Amount = this.quoterep.calcitemamt(model.LF, model.Unitprice);
        model.Amt = model.Amount;
        break;
      case "edge":
        model.Amount = this.quoterep.calcitemamt(model.LF, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      case "sink":
        model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      case "faucet":
        model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      case "other":
        model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
        model.Amt = model.Amount;
        break;
    }
  }
  ActionSavePart() {
    if (this.partinfo.VersionID > 0) {
      this.service.ActionSaveAreaLayout(this.partinfo.VersionID, this.partinfo).subscribe(data => {
        this.ActionCloseAddPart(true);
      })
    }


  }
  /***************POPOVERS ******************/
  // async ActionAddSize(ev: any) {
  //   let obj = {}
  //   const popover = await this.popoverCntrl.create({
  //     component: AddSizesComponent,
  //     event: ev,
  //     translucent: true,
  //     componentProps: obj,
  //     cssClass: "popover_class"
  //   });
  //   return await popover.present();
  // }



  async ActionAddMaterial(materialId: any, source: string) {
    let sel = { VersionId: this.partinfo.VersionID, AreaId: this.partinfo.AreaID, materialId: materialId, priceListID: this.priceListID, areainfo : this.areaInfo }
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent,
      componentProps: sel
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.GetMaterialList();
      }
    });
    return await modal.present();
  }


  /********************ADD PART EDIT FUNCTIONS ************************/


  ActionPartTabInfo(type: number) {
    this.selectedcomponent = type;
  }

  toggleGroup(group) {
    if(group == 1){
      if (this.isGroupShown(group)) {
        this.shownGroup = 0;
    } else {
        this.shownGroup = group;
    }
    }else{
      if (this.isGroupShown4(group)) {
        this.shownGroup4 = 0;
    } else {
        this.shownGroup4 = group;
    }
    }
   
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  isGroupShown4(group) {
    return this.shownGroup4 === group;
  };



}

/***************Additional popups***********************/


@Component({
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title class="titleheader">Measurements</ion-title>
    <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
    <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-row>
    <ion-col size="5">
    <ion-input type="text" class="border-btm"></ion-input>
    </ion-col>
    <ion-col size="7" class="ion-no-padding">
    <ion-row class="ion-no-padding">
      <ion-col size="3">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
      <ion-col size="1" class="ion-text-center ion-padding-top"> X
      </ion-col>
      <ion-col size="3">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
      <ion-col size="1" class="ion-text-center ion-padding-top"> =
     </ion-col>
      <ion-col size="4">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
    </ion-row>
 </ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="3"><u class="color-blue">Add+</u></ion-col>
    <ion-col class="ion-text-right">0.00</ion-col>
  </ion-row>  
</ion-content>`,
  styleUrls: ['./addpart.component.scss'],
})
export class AddSizesComponent implements OnInit {

  constructor(private Modalcntrl: ModalController, public popoverCntrl: PopoverController, private service: QuotegetService) { }

  ngOnInit() {

  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }

}