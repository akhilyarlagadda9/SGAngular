import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController, ActionSheetController } from '@ionic/angular';
import { AddareaComponent } from '../addarea/addarea.component';
import { SinkComponent } from '../sink/sink.component';
import { AddoninfoComponent } from '../addoninfo/addoninfo.component';
import { SplashComponent } from '../splash/splash.component';
import { EdgeinfoComponent } from '../edgeinfo/edgeinfo.component';
import { CutoutinfoComponent } from '../cutoutinfo/cutoutinfo.component';
import { MaterialinfoComponent } from '../materialinfo/materialinfo.component';
import { MeasurementsComponent } from '../measurements/measurements.component';
import { FaucetsComponent } from '../faucets/faucets.component';
import { TileinfoComponent } from '../tileinfo/tileinfo.component';
import { TemplateComponent } from '../template/template.component';
import { CustitemComponent } from '../custitem/custitem.component';
import { QuoteService } from 'src/app/service/quote.service';
import { ManagementsummaryComponent } from '../managementsummary/managementsummary.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FabricationComponent } from '../fabrication/fabrication.component';
import { LaborinfoComponent } from '../laborinfo/laborinfo.component';
import { AddpartComponent } from '../addpart/addpart.component';
//declare var _qscope, QBRinitAreadrawing, QBRinitdrawingareapartshape, QBRinitdrawarea: any;
declare var _qscope, QBRinitdrawing31:any;
@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
  inputs: [`Version`,`PhaseId`]
})
export class AreainfoComponent implements OnInit {
  public Version: any; coId: number; coSrNo: string;PhaseId:number;
  arealist: any = []; AreaID: number;AreaName:any="";
  partinfo: any = []; AreaPartID: number;
   areaInfo: any = {
    //PartList: [], ID: 0,
  };
  viewid: any;
  constructor(private service: QuoteService, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private quoterep: QuoterepService) {
  }
  ngOnInit() {
    console.log(this.PhaseId);
    this.InitLoad();
  }
  InitLoad() {
    console.log(_qscope);
    this.coId = this.Version.LatestCoID;this.coSrNo = this.Version.LatestCoSrNo;
    //this.Version = _qscope.quote.Version;
    this.arealist = _qscope.quote.header.Version.AreaList;
    if (_qscope.quote.header.Version.AreaID == 0) {
      this.AreaID = this.arealist[0].ID;
      this.AreaName =  this.arealist[0].Name; // Pre-select the value on dropdown field
    } else {
      this.AreaID = _qscope.quote.header.Version.AreaID;
    }
    this.ActionPartsByArea(this.AreaID, 0);
    
  }


  // ActionGetAreaList() {
  //   let result = this.service.ActionQuickAreaList(this.Version.ID, 0, 0, 0).subscribe(
  //     data => {
  //       this.arealist = data.VersionAreaList; _qscope.quote.Version.AreaList = this.arealist;
  //       if (this.arealist != null) {
  //        this.areaInfo = this.arealist[0];
  //         this.partinfo = data.PartInfo;
  //         this.AreaPartID = this.partinfo == null ? 0 : this.partinfo.ID;
  //         this.ActionPartsByArea(this.areaInfo, 0);
  //       }
  //     },
  //     error => console.log(error));
  // }
  ActionPartsByArea(areaID: any, parttype: number) {
    if(this.arealist != null){this.GetAreaName(areaID);}
    this.service.ActionQuickPartList(this.Version.ID,this.PhaseId, areaID, 0, 0).subscribe(data => {
      console.log(data);
      this.areaInfo = data;
      this.areaInfo.PartList = this.areaInfo.PartList == null ? [] : this.areaInfo.PartList;
      let areaindex = this.getareaindexbyareaid(areaID);
      _qscope.quote.header.Version.AreaList[areaindex].PartList =this.areaInfo.PartList;


      let length = this.areaInfo.PartList.length;
      if(length > 0){
        this.AreaPartID = data.PartInfo.ID;
        this.partinfo = data.PartInfo;
        console.log(data.PartInfo);
        if (data.PartInfo.Shape != "") {
            this.PartDrawing(this.AreaPartID);
        }
      }else{
        this.partinfo = {};this.partinfo.ID = 0;
      }
    
    })
  }
  getareaindexbyareaid(areaid) {
    let areas = _qscope.quote.header.Version.AreaList; for (let i = 0; i < areas.length; i++) { if (areas[i].ID == areaid) { return i; } }
  }



  ActionGetPartInfo(partId: number) {
    let result = this.service.ActionPartInfo(this.Version.ID,this.PhaseId, this.AreaID, partId, 0).subscribe(
      data => {
        console.log(data);
        this.partinfo = data;
        if(data.Shape != ""){
        this.PartDrawing(partId);
        }
      },
      error => console.log(error));
  }
  PartDrawing(partId: number) {
    //QBRinitAreadrawing('quote');
    let areaindex = this.getareaindexbyareaid(this.AreaID);
    console.log(areaindex);
    QBRinitdrawing31('quote',areaindex);
    //QBRinitdrawingareapartshape(partId, this.areaInfo);
    //QBRinitdrawarea(areaindex, 'quote');
  }
  /***** Addarea DETAILS *****/
  async ActionAddArea(areaId:any) {
    let copyobj = JSON.parse(JSON.stringify(this.arealist));
    let info = {arealists : copyobj, Version : this.Version, quote : _qscope.quote.header, selectedareaId : areaId}
    const modal = await this.Modalcntrl.create({
      component: AddareaComponent,
      componentProps : info
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
      this.arealist = detail.data.componentProps;
      _qscope.quote.header.Version.AreaList = detail.data.componentProps;
      this.GetAreaName(this.AreaID);
      }
    });
    return await modal.present();
  }
  /***** Add PART *****/
  async ActionAddPart(Id) {
    this.partinfo.Shape = this.partinfo.Shape == null ? "": this.partinfo.Shape;
    let copyObj = JSON.parse(JSON.stringify(this.partinfo));
    let info = {ID:Id, VersionID:this.Version.ID,AreaID:this.AreaID,Name:"",Shape:"", SrNo: Id == 0 ? this.areaInfo.PartList.length + 1 :this.partinfo.SrNo }
    let obj = {partinfo: Id == 0 ? info : copyObj, priceListID: Number (this.Version.PriceListID),coId:this.coId, coSrNo:this.coSrNo, matPercent :this.Version.MatPercent, areaInfo : this.areaInfo }
    const modal = await this.Modalcntrl.create({
      component: AddpartComponent,
      componentProps: obj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.Name = detail.data.componentProps.Name;
        this.ActionPartsByArea(this.AreaID, 0);
      }
    });
    return await modal.present();
  }
  
  /***** MATERIAL DETAILS *****/
  // async ActionEditMaterial(mat: any) {
  //   let copyobj = JSON.parse(JSON.stringify(mat));
  //   let material = { material: copyobj, priceListID: Number(this.Version.PriceListID) }
  //   const modal = await this.Modalcntrl.create({
  //     component: MaterialinfoComponent,
  //     componentProps: material
  //   });
  //   return await modal.present();
  // }
  async ActionEditMaterial(mat: any) {
    let copyobj = JSON.parse(JSON.stringify(mat));
    let material = { material: copyobj, priceListID: Number(this.Version.PriceListID),areaInfo : this.areaInfo, partinfo : this.partinfo,Version:this.Version, PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: MaterialinfoComponent,
      componentProps: material
    });
    return await modal.present();
  }
  /***** MEASUREMENT DETAILS *****/
  async ActionEditMeasurement(fab: any) {
    let copyobj = JSON.parse(JSON.stringify(fab));
    let sizes = { fab: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: MeasurementsComponent,
      componentProps: sizes
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.PartFabList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** SPLASH DETAILS *****/
  async ActionEditSplash(spl: any) {
    console.log(spl);
    let copyobj = JSON.parse(JSON.stringify(spl));
    let splash = { splash: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: SplashComponent,
      componentProps: splash
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.SplashList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** EDGE DETAILS *****/
  async ActionEditEdge(edg: any) {
    let copyobj = JSON.parse(JSON.stringify(edg));
    let edge = { edge: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: EdgeinfoComponent,
      componentProps: edge
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.EdgeList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** CUTOUT DETAILS *****/
  async ActionCreateCutout(typeId: any, cutouts: any) {
    let copyobj = JSON.parse(JSON.stringify(cutouts));
    let cutout = { cutout: copyobj, TypeID: typeId, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: CutoutinfoComponent,
      componentProps: cutout
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.CutoutList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** SINK DETAILS *****/
  async ActionEditSink(snk: any) {
    let copyobj = JSON.parse(JSON.stringify(snk));
    let sinkfaucet = { sinkfaucet: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: SinkComponent,
      componentProps: sinkfaucet
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.SinkList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** FAUCETS DETAILS *****/
  async ActionEditFaucet(fau: any) {
    let copyobj = JSON.parse(JSON.stringify(fau));
    let faucet = { faucet: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: FaucetsComponent,
      componentProps: faucet
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.FaucetList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  async ActionEditFabrication(fab: any) {
    let copyobj = JSON.parse(JSON.stringify(fab));
    let fabrication = { fabrication: copyobj, PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: FabricationComponent,
      componentProps: fabrication
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.PartFabList = detail.data.componentProps.Fab;
      }
    });
    return await modal.present();
  }
  async ActionEditTemplate(typeId: number, temp: any, viewtype: string) {
    let copyobj = JSON.parse(JSON.stringify(temp));
    let labor = { labor: copyobj, TypeID: typeId, ViewType: viewtype, PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: TemplateComponent,
      componentProps: labor
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.LaborList = detail.data.componentProps.Temp;
      }
    });
    return await modal.present();
  }
  async ActionEditLabor(typeId: number, temp: any, viewtype: string) {
    let copyobj = JSON.parse(JSON.stringify(temp));
    let labor = { labor: copyobj, TypeID: typeId, ViewType: viewtype, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: LaborinfoComponent,
      componentProps: labor
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.LaborList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** ADD ON DETAILS *****/
  async ActionEditAddon(oth: any) {
    let copyobj = JSON.parse(JSON.stringify(oth));
    let other = { other: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: AddoninfoComponent,
      componentProps: other
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
      this.partinfo.OtherList = detail.data.componentProps;
      }
    });
    return await modal.present();
  }
  /***** TILE DETAILS *****/
  async ActionEditTile(typeId, name, tile: any) {
    let copyobj = JSON.parse(JSON.stringify(tile));
    let tileobj = { TypeID: typeId, selName: name, tile: copyobj, priceListID: Number(this.Version.PriceListID), PhaseId: this.PhaseId }
    const modal = await this.Modalcntrl.create({
      component: TileinfoComponent,
      componentProps: tileobj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.RefreshtileList(tile.TypeID,detail.data.componentProps)
      }
    });
    return await modal.present();
  }
  RefreshtileList(typeId,list){
    switch (typeId) {
      case 12:this.partinfo.TileList = list; break;
      case 13:this.partinfo.CabinetList = list;break;
      case 14: this.partinfo.CarpetList =list;break;
      case 16:this.partinfo.FloorList =list;break;
      case 17:this.partinfo.ConsumableList = list; break;
      case 18: this.partinfo.ApplianceList = list; break;
      case 19: this.partinfo.ToolList = list; break;
    }
  }
  /***** CUSTOMERITEM DETAILS *****/
  async ActionEditCustItems(res: any) {
    let copyobj = JSON.parse(JSON.stringify(res));
    let response = { response: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: CustitemComponent,
      componentProps: response
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.CustomerItemList = detail.data.componentProps.Response;
      }
    });
    return await modal.present();
  }

  AddAreaItem(loadType: string, loadId: number, ViewType: string) {
    switch (loadType) {
      case "partmat": {
        let partmat = this.quoterep.AddPartMatItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditMaterial(partmat);
        break;
      }
      case "size": {
        let fab = this.quoterep.AddMeasurementItem();
        this.ActionEditMeasurement(fab);
        break;
      }
      case "splash": {
        let splash = this.quoterep.AddSplashItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditSplash(splash);
        break;
      }
      case "edge": {
        let edge = this.quoterep.AddEdgeItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditEdge(edge);
        break;
      }
      case "cutout": {
        let cutout = this.quoterep.AddCutoutItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent, loadId);
        this.ActionCreateCutout(loadId, cutout);
        break;
      }
      case "sink": {
        let sink = this.quoterep.AddSinkItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditSink(sink);
        break;
      }
      case "faucet": {
        let faucet = this.quoterep.AddFaucetItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditFaucet(faucet);
        break;
      }
      case "other": {
        let other = this.quoterep.AddOtherItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditAddon(other);
        break;
      }
      case "fabrication": {
        let fab = this.quoterep.AddFabricationItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditFabrication(fab);
        break;
      }
      case "template": {
        let labor = this.quoterep.AddLaborItem(this.AreaPartID, this.AreaID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent, loadId, ViewType);
        let laborType = ViewType == "Standard Template" ? "Template" :"Install";
        this.ActionEditTemplate(loadId, labor, laborType);
        break;
      }
      case "labor": {
        let labor = this.quoterep.AddLaborItem(this.AreaPartID, this.Version.ID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent, 0, ViewType);
        this.ActionEditLabor(loadId, labor, ViewType);
        break;
      }
      case "tile": {
        let tile = this.quoterep.AddTileItem(this.AreaPartID, this.Version.ID, this.Version.ID, this.coId, this.coSrNo, this.Version.MatPercent, loadId, ViewType);
        this.ActionEditTile(loadId, ViewType, tile);
        break;
      }
      case "custitem": {
        let cust = this.quoterep.AddCustomerItems(this.AreaPartID, this.Version.ID, this.Version.ID, this.coId, this.coSrNo);
        this.ActionEditCustItems(cust);
        break;
      }
    }
  }
  async ActionAddAreaitem(ev: any) {
    let obj = { Shape: this.partinfo.Shape }
    const popover = await this.popoverCntrl.create({
      component: additemComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isSelect == true) {
          this.AddAreaItem(detail.data.info.loadType, detail.data.info.loadId, detail.data.info.ViewType);
        }
      }
    });
    return await popover.present();
  }

  //Management summary component
  async ActionSummaryEdit() {
    let version = { Version: this.Version }
    let copyver = JSON.parse(JSON.stringify(version));
    const modal = await this.Modalcntrl.create({
      component: ManagementsummaryComponent,
      componentProps: copyver
    });
    return await modal.present();
  }

  GetAreaName(id){
    let area = this.arealist.find(s => s.ID == id);
    if (area != null) {
      this.AreaName = area.Name;
    }
  }
}


@Component({
  //selector: 'app-itemsearchComponent',
  template: `
          <ion-header>
            <ion-toolbar>
              <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)">X</ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-grid>
        <ion-row>
          <ion-col size="6">
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('partmat',0, 'Material')">Part Material</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''"(click)="ActionLoadPopup('size',0, 'Measurements')">Measurements</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('splash',0, 'Splash')">Splash</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('edge',0, 'Edge')">Edge</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',1,'Sink CutOut')">Sink Cutout</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',2,'Outlet CutOut')">Outlet Cutout</div>
            <div class="li-list" *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',3, 'Appliance CutOut')">Appliance Cutout</div>
            <div class="li-list" (click)="ActionLoadPopup('fabrication',0, 'Standard Fabrication')">Fabrication</div>
            <div class="li-list" (click)="ActionLoadPopup('template',1, 'Standard Template')">Template</div>
            <div class="li-list" (click)="ActionLoadPopup('template',1, 'Standard Install')">Install</div>
          </ion-col>
          <ion-col size="6">
            <div class="li-list" (click)="ActionLoadPopup('sink', 0, 'Sink')">Sink</div>
            <div class="li-list" (click)="ActionLoadPopup('faucet', 0, 'Faucet')">Faucets</div>
            <div class="li-list" (click)="ActionLoadPopup('tile', 18, 'Appliance')">Appliance</div>
            <div class="li-list" (click)="ActionLoadPopup('other',0, 'Add On Products')">Add On Products</div>
            <div class="li-list" (click)="ActionLoadPopup('labor',0, 'Labor')">Labor</div>
            <div class="li-list" (click)="ActionLoadPopup('tile',12,'Tile')">Tile</div>
            <div class="li-list" (click)="ActionLoadPopup('tile',13, 'Cabinet')">Cabinet</div>
            <div class="li-list" (click)="ActionLoadPopup('tile',17, 'Consumable')">Consumable</div>
            <div class="li-list" (click)="ActionLoadPopup('custitem', 0, 'Customer Items')">Customer Items</div>
            <div class="li-list" (click)="ActionLoadPopup('tile',19, 'Tool')">Tool</div>
          </ion-col>
        </ion-row>
      </ion-grid>`,
  styleUrls: ['./areainfo.component.scss'],
})
export class additemComponent implements OnInit {
  navObj = this.navParams.data;
  constructor(private navParams: NavParams, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() { }

  ActionLoadPopup(loadType: string, loadId: number, viewtype: string) {
    this.obj = { loadType: loadType, loadId: loadId, ViewType: viewtype };
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isSelect: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      info: this.obj,
      isSelect: isSelect
    });
  }
}