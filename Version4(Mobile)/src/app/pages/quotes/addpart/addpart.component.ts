import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { AddmatComponent } from '../materialinfo/addmat/addmat.component';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.scss'],
})
export class AddpartComponent implements OnInit {
  partinfo: any; priceListID: any;
  coId: number; coSrNo: string;matPercent:any;
  MaterialList: any = []; CountertypeList: any = [];
  SplashList: any = []; EdgeList: any = []; CutoutList: any = [];
  selectedcomponent: number = 2;
  constructor(public Modalcntrl: ModalController, public popoverCntrl: PopoverController, 
    private service: QuoteService, private getservice: QuotegetService,private quoterep:QuoterepService) { }

  ngOnInit() {
    console.log(this.partinfo);console.log(this.priceListID);
    if (this.partinfo.ID == 0) {
    this.PreparePart()
    }
    this.GetMaterialList();
    this.GetCounterList();
    this.GetPriceListItems();
  }

  PreparePart() {
    debugger;
      this.partinfo.PartMaterialList = [];this.partinfo.PartFabList = [];
      this.partinfo.EdgeList = [];this.partinfo.SplashList =[];this.partinfo.CutoutList =[];
      this.partinfo.LaborList =[];
      // Material
      let partmat = this.quoterep.AddPartMatItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
      this.partinfo.PartMaterialList.push(partmat);
      //Fabrigation
      let fab = this.quoterep.AddFabricationItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
      let sizes = this.quoterep.AddMeasurementItem();
      fab.MeasureList.push(sizes);
      this.partinfo.PartFabList.push(fab);
      //Splash
      this.ActionAddSplash();
      //Edge
     this.ActionAddEdge();
      //cutout
     this.ActionAddCutOut();
      //Template And install
      let template = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1, "Template");
      template.Description ="Template";
      let install = this.quoterep.AddLaborItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1, "Install");
      install.Description ="Install";
      this.partinfo.LaborList.push(template);this.partinfo.LaborList.push(install);
    }
  GetMaterialList() {
    let result = this.service.ActionGetMaterialList(this.partinfo.VersionID).subscribe(data => {
      this.MaterialList = data;
    })
  }
  GetCounterList() {
    let result = this.service.ActionGetCountertypeList().subscribe(data => {
      this.CountertypeList = data[0];
    })
  }
  GetPriceListItems() {
    let typeIdList = []; typeIdList.push(5); typeIdList.push(6); typeIdList.push(10); typeIdList.push(7);
    let result = this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(data => {
      this.SplashList = data[1];
      this.EdgeList = data[0];
      this.CutoutList = data[2];
      console.log(data);
    })
  }
  ActionPopulateMaterial(Id,index){
    let material = this.MaterialList.find(s=>s.ID == Id);
    if(material != null && material != undefined){
      this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index],material);
    }
  }
  ActionPopulateSize(Id,index){
    // let material = this.CountertypeList.find(s=>s.ID == Id);
    // if(material != null && material != undefined){
    //   this.partinfo.PartMaterialList[index] = this.quoterep.SetPartMaterial(this.partinfo.PartMaterialList[index],material);
    // }
  }
  ActionPopulateSplash(Id,index){
    let splash = this.SplashList.find(s=>s.ID == Id);
    if(splash != null && splash != undefined){
      this.partinfo.SplashList[index] = this.quoterep.Setsplash(this.partinfo.SplashList[index],splash);
    }
  }
  ActionPopulateEdge(Id,index){
    let edge = this.EdgeList.find(s=>s.ID == Id);
    if(edge != null && edge != undefined){
      this.partinfo.EdgeList[index] = this.quoterep.SetEdge(this.partinfo.EdgeList[index],edge);
    }
  }
  ActionPopulateCutout(Id,index){
    let cutout = this.CutoutList.find(s=>s.ID == Id);
    if(cutout != null && cutout != undefined){
      this.partinfo.CutoutList[index] = this.quoterep.SetCutout(this.partinfo.CutoutList[index],cutout);
    }
  }
  ActionSetSqft(size, typeid,index) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
    this.ActionSetFabSqft(index);
  }
  ActionSetFabSqft(index) {
    debugger;
    let sum:number = this.partinfo.PartFabList[index].MeasureList.reduce((sum, current) => sum + current.Sqft, 0);
    this.partinfo.PartFabList[index].PartSqft = Number(sum) ;
    this.partinfo.PartFabList[0].Sqft = this.quoterep.roundToTwo(this.partinfo.PartFabList[0].PartSqft+this.partinfo.PartFabList[0].SplashSqft);
    this.PopulateSqfts();
  }
  ActionChangeSplash() {
    let sum:number = this.partinfo.SplashList.reduce((sum, current) => sum + current.Sqft, 0);
    this.partinfo.PartFabList[0].SplashSqft = Number(sum);
    this.partinfo.PartFabList[0].Sqft = this.quoterep.roundToTwo(this.partinfo.PartFabList[0].PartSqft+this.partinfo.PartFabList[0].SplashSqft);
    console.log(this.partinfo.PartFabList[0]);
    this.PopulateSqfts();

  }
  PopulateSqfts() {
    const sum = this.partinfo.PartFabList.reduce((sum, current) => sum + current.Sqft, 0);
    this.partinfo.PartFabList[0].Sqft = sum;
    this.partinfo.PartMaterialList[0].Sqft = sum;
    this.partinfo.LaborList[0].Qty = sum;
    this.partinfo.LaborList[1].Qty = sum;
  }
  ActionCloseAddPart() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
    });
  }

  ActionAddEdge(){
    let edge = this.quoterep.AddEdgeItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.EdgeList.push(edge);
  }

  ActionAddSplash(){
    let splash = this.quoterep.AddSplashItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent);
    this.partinfo.SplashList.push(splash);
  }
  ActionAddCutOut(){
    let cutout = this.quoterep.AddCutoutItem(this.partinfo.ID, this.partinfo.AreaID, this.partinfo.VersionID, this.coId, this.coSrNo, this.matPercent, 1);
    this.partinfo.CutoutList.push(cutout);
  }
  ActionAddSize(index){
   let size= this.quoterep.AddMeasurementItem();
    this.partinfo.PartFabList[index].MeasureList.push(size);
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


  async ActionAddMaterial() {
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent
    });
    return await modal.present();
  }



/********************ADD PART EDIT FUNCTIONS ************************/


ActionPartTabInfo(type:number){debugger;
  this.selectedcomponent = type;
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