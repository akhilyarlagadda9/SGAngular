import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { AddmatComponent } from '../materialinfo/addmat/addmat.component';
//import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { OverlayEventDetail } from '@ionic/core';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
@Component({
  selector: 'app-addpart',
  //templateUrl: './addpart.component.html',
  templateUrl: './addpart1.component.html',
  styleUrls: ['./addpart.component.scss'],
})
export class AddpartComponent implements OnInit {
  partinfo: any; priceListID: any; pricebook: any;
  coId: number; coSrNo: string; matPercent: any;
  MaterialList: any = []; CountertypeList: any = [];
 // SplashList: any = []; EdgeList: any = []; CutoutList: any = [];
  selectedcomponent: number = 2; 
  Version:any;
  areaInfo: any;
  shownGroup: number = 1;
  shownGroup4: any = 2;
  material: any;
  loaderToShow: Promise<void>;
  readonlyFlag:boolean = false;
  currIndex:any = [];
  constructor(public Modalcntrl: ModalController, public popoverCntrl: PopoverController,public loadingController: LoadingController,
    private service: QuoteService, private getservice: QuotegetService, private quoterep: QuoterepService,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.readonlyFlag = this.partinfo.Shape != "" ? true : false;
    this.FabricationRiskLevels();
    //this.GetPriceListItems();
    this.GetMaterialList(0);
    this.GetCounterList();
  }

  PreparePart() {
  //   this.partinfo = {Name:"",IsActive:1,Shape:"",PartMaterialList:[],PartFabList:[],
  //   EdgeList:[],SplashList:[],CutoutList:[],LaborList:[],SinkList:[],FaucetList:[],
  //   OtherList:[],ApplianceList:[]
  // }
    this.partinfo.Name = ""; this.partinfo.IsActive = 1; 
    this.partinfo.PartMaterialList = []; this.partinfo.PartFabList = [];
    this.partinfo.EdgeList = []; this.partinfo.SplashList = []; this.partinfo.CutoutList = [];
    this.partinfo.LaborList = []; this.partinfo.SinkList = []; this.partinfo.FaucetList = []; this.partinfo.OtherList = [];this.partinfo.ApplianceList = [];
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
    let appliance = this.quoterep.AddTileItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 18, "Appliance");
    this.partinfo.ApplianceList.push(appliance);
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

  GetMaterialList(materialId) {
    this.service.ActionGetMaterialList(this.partinfo.VersionID).subscribe(data => {
      this.MaterialList = data;
      if(materialId > 0){
        this.ActionPopulateMaterial(materialId,0);
      }
    })
  }
  GetCounterList() {
    this.service.ActionGetCountertypeList().subscribe(data => {
      this.CountertypeList = data[0];
    })
  }
  // GetPriceListItems() {
  //   let typeIdList = []; typeIdList.push(5); typeIdList.push(6); typeIdList.push(10); typeIdList.push(7);
  //   this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(data => {
  //     this.SplashList = data[1];
  //     this.EdgeList = data[0];
  //     this.CutoutList = data[2];
  //     console.log(data);
  //   })
  //   this.FabricationRiskLevels();
  // }
 
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
    console.log(this.partinfo.PartMaterialList)
    let material = this.MaterialList.find(s => s.ID == Id);
    if (material != null && material != undefined) {
      this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index], material);
    }
    this.ActionSetAmount("matfab", this.partinfo.PartMaterialList[index]);
    console.log(this.partinfo.PartMaterialList)
  }
  ActionPopulateSize(Id, index) {
    // let material = this.CountertypeList.find(s=>s.ID == Id);
    // if(material != null && material != undefined){
    //   this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index],material);
    // }
  }
  // ActionPopulateSplash(Id, index) {
  //   let splash = this.SplashList.find(s => s.ID == Id);
  //   if (splash != null && splash != undefined) {
  //     this.partinfo.SplashList[index] = this.quoterep.Setsplash(this.partinfo.SplashList[index], splash);
  //   }
  // }
  // ActionPopulateEdge(Id, index) {
  //   let edge = this.EdgeList.find(s => s.ID == Id);
  //   if (edge != null && edge != undefined) {
  //     this.partinfo.EdgeList[index] = this.quoterep.SetEdge(this.partinfo.EdgeList[index], edge);
  //   }
  // }
  // ActionPopulateCutout(Id, index) {
  //   let cutout = this.CutoutList.find(s => s.ID == Id);
  //   if (cutout != null && cutout != undefined) {
  //     this.partinfo.CutoutList[index] = this.quoterep.SetCutout(this.partinfo.CutoutList[index], cutout);
  //   }
  // }

  ActionSetSqft(size, typeid, index) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
    this.ActionSetFabSqft(index);
  }

  ActionSetFabSqft(index) {
    const sum = this.partinfo.PartFabList[index].MeasureList.reduce((sum, current) => sum + this.quoterep.convertToFloat(current.Sqft), 0);
    this.partinfo.PartFabList[index].PartSqft = sum;
    this.PopulateSqfts();
  }
  ActionChangeFabSqft(index) {
    this.PopulateSqfts();
    let list = this.partinfo.PartFabList[index].MeasureList;
    for (let i in list) {
      let size = list[i];
      size.Height =0;size.Width = 0;size.Sqft = 0;
    }
  }

  ActionSetSplashSqft(splash) {
    splash.Sqft = this.quoterep.calcsqft(splash.Width, splash.Height);
    this.ActionChangeSplash();
  }
  ActionChangeSplash() {
    const sum = this.partinfo.SplashList.reduce((sum, current) => sum + this.quoterep.convertToFloat(current.Sqft), 0);
    this.partinfo.PartFabList[0].SplashSqft = sum;
    //this.partinfo.PartFabList[0].Sqft =this.partinfo.PartFabList[0].PartSqft + this.partinfo.PartFabList[0].SplashSqft;
    // console.log(this.partinfo.PartFabList[0]);
    this.PopulateSqfts();

  }
  PopulateSqfts() {
    // Fab
    let fab =this.partinfo.PartFabList[0]; 
    this.partinfo.PartFabList[0].Sqft = this.quoterep.convertToFloat(fab.PartSqft) + this.quoterep.convertToFloat(fab.SplashSqft);
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
  ActionAddAppliance() {
    let appliance = this.quoterep.AddTileItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 18, 'Appliance');
    this.partinfo.ApplianceList.push(appliance);
  }
  ActionRemoveSizes(indx:number, jndx:number){
    this.partinfo.PartFabList[jndx].MeasureList.splice(indx, 1);
    this.ActionSetFabSqft(jndx);
  }
  //ActionRemoveSplash(index:number){}

  //ActionRemoveEdge(index:number){}


  async ConfirmSuccess(){
    const alert = await this.alertCtrl.create({
      header: "Deleted Sucessfully!",
      buttons: [{
        text: 'OK',
      }]
    });
    alert.present();
  }

  async  ActionRemovePartItems(index:number, part, type){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removepartItems(part.ID,index, part, type,);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
  }
  async ActionRemoveSink(index:number){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removesink(this.partinfo.SinkList[index].ID, index, this.partinfo.SinkList[index]);
          this.partinfo.SinkList.splice(index, 1);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();

  }
  async ActionRemoveFaucet(index:number){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removefaucet(this.partinfo.FaucetList[index].ID, index, this.partinfo.FaucetList[index]);
          this.partinfo.FaucetList.splice(index, 1);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
  }
  async ActionRemoveLabor(index:number){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removelabor(this.partinfo.LaborList[index].ID, index, this.partinfo.LaborList[index]);
          this.partinfo.LaborList.splice(index, 1);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
  }
  async ActionRemoveOther(index:number){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removeaddon(this.partinfo.OtherList[index].ID, index, this.partinfo.OtherList[index]);
          this.partinfo.OtherList.splice(index, 1);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
  }
  async ActionRemoveAppliance(index:number){
    const alert = await this.alertCtrl.create({
      header: "Are you sure you want to delete item?",
      message: "Do you want to continue?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
         //May be later
        }
      }, {
        text: 'Allow',
        handler: () => {
          this.removetile(this.partinfo.ApplianceList[index].ID, index, this.partinfo.ApplianceList[index]);
          this.partinfo.ApplianceList.splice(index, 1);
          this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
    
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
      case "cutout":
        model.Amount = this.quoterep.calcitemamt(model.LF, model.Unitprice);
        model.Amt = model.Amount;
        break;
      case "edge":
        model.Amount = this.quoterep.calcitemamt(model.LF, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      case "sink": case "tile":case "other":case "labor":
        model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
        model.Amt = model.Amount;
        break;
      // case "faucet":
      //   model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
      //   model.Amt = model.Amount;
      //   break;
      // case "other":
      //   model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
      //   model.Amt = model.Amount;
      //   break;
      //   case "appliance":
      //   model.Amount = this.quoterep.calcitemamt(model.Qty, model.UnitPrice);
      //   model.Amt = model.Amount;
      //   break;
    }
  }
  ActionSavePart() {
    if (this.partinfo.VersionID > 0) {
      this.showLoader();
      this.service.ActionSavePartItems(this.partinfo).subscribe(data => {
        this.hideLoader();
        this.ActionCloseAddPart(true);
      })
    }


  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'please wait'
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
    let matinfo = {ID:materialId,VersionID:this.partinfo.VersionID};

   let info = {material:matinfo, priceListID : this.priceListID,AreaID:this.areaInfo.ID};
    //let sel = { material : materialId == 0 ? {ID : 0} : this.material, VersionId: this.partinfo.VersionID, AreaId: this.partinfo.AreaID, materialId: materialId, priceListID: this.priceListID, areainfo : this.areaInfo }
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent,
      componentProps: info
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.GetMaterialList(materialId);
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

  async ActionSearchSelect(ev: any, typeid, protypeId, info) {
    let obj = {
      pricelistId: this.priceListID, searchTypeId: typeid, producttypeId: protypeId, search: info.Description == undefined ? "" : info.Description
    }
    const popover = await this.Modalcntrl.create({
      component: AdditionalitemserachComponent,
      componentProps: obj,
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          info = this.quoterep.SetQuoteItem(protypeId,info,detail.data.componentProps);
          // if (protypeId == 8) {
          //   this.sinkfaucet = detail.data.componentProps;
          // } else if (protypeId == 9) {
          //   this.faucet = detail.data.componentProps;
          // } else if (protypeId == 7) {
          //   this.labor = detail.data.componentProps;
          // } else if (protypeId == 11) {
          //   this.other = detail.data.componentProps;
          // } else if (protypeId == 18){
          //   this.appliance = detail.data.componentProps;
          // }
        }
      }
    });
    return await popover.present();
  }
//*******************Part item delete funcrtionality********************//


removepartItems(Id,index, part, type,) {
  let partItems = "";
  switch (type) {
      case "Material":
          partItems = part.PartMaterialList;
          this.service.qppartmaterialremove(Id, part.VersionID, part.AreaID).subscribe(data => {});
          break;
      case "Fab":
          partItems = part.PartFabList;
          this.service.qppartfabremove(Id, part.VersionID, part.AreaID).subscribe(data => {});
          break;
      case "Edge":
          partItems = part.EdgeList;
          this.service.qppartedgeremove(Id,  part.VersionID, part.AreaID,).subscribe(data => {});
          this.partinfo.EdgeList.splice(index, 1);
          break;
      case "Splash":
          partItems = part.SplashList;
          this.service.qppartsplashremove(Id,  part.VersionID, part.AreaID,).subscribe(data => {});
          this.partinfo.SplashList.splice(index, 1);
          break;
      case "CutOut":
          partItems = part.CutoutList;
          this.service.qppartcutoutremove(Id,  part.VersionID, part.AreaID,).subscribe(data => {});
          this.partinfo.CutoutList.splice(index, 1);
          break;
  }
}

removesink(Id, index, faucets) {
  let result = this.service.qpremovesink(Id, faucets.VersionID, faucets.AreaID).subscribe(data => {result});
}

removefaucet(Id, index, faucets) {
  let result = this.service.qpremovefaucet(Id, faucets.VersionID, faucets.AreaID).subscribe(data => {result});
}

  removelabor(Id, index, laborlist) {
    let result = this.service.qpremovelabor(Id, laborlist.VersionID, laborlist.AreaID).subscribe(data => {result});
}

removeaddon(Id, index, addons) {
  let result = this.service.qpremoveaddon(Id, addons.VersionID, addons.AreaID).subscribe(data => {result});
}

removetile(Id, index, list) {
  let result = this.service.qpremovetile(Id, list.VersionID, list.AreaID).subscribe(data => {result});
}


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