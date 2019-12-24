import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
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

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
  inputs: [`Version`]
})
export class AreainfoComponent implements OnInit {
  public Version: any; coId: number; coSrNo: string;
  arealist: any = [];
  partinfo: any = [];
  partlist: any = [];
  areaInfo: any; AreaPartID: number;
  viewid: any;
  constructor(private service: QuoteService, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private quoterep: QuoterepService) { }
  ngOnInit() {
    this.ActionGetAreaList();
  }
  ActionGetAreaList() {
    let result = this.service.ActionQuickAreaList(this.Version.ID, 0, 0, 0).subscribe(
      data => {
        this.arealist = data.VersionAreaList;
        if (this.arealist != null) {
          this.areaInfo = this.arealist[0];
          this.partinfo = data.PartInfo;
          this.AreaPartID = this.partinfo == null ? 0 : this.partinfo.ID;
          this.ActionPartsByArea(this.areaInfo, 0);
        }
      },
      error => console.log(error));
  }
  ActionPartsByArea(area: any, parttype: number) {
    this.partlist = area.PartList;
    if (this.partlist != null && parttype != 0) {
      let length = this.partlist.length;
      //this.ActionGetPartInfo(this.partlist[0].VersionID, this.partlist[0].AreaID, this.partlist[0].ID, 0);
      if (length > 0) { this.ActionGetPartInfo(this.partlist[0].ID); }
    }
  }
  ActionGetPartInfo(partId: number) {
    let result = this.service.ActionPartInfo(this.areaInfo.VersionID, this.areaInfo.ID, partId, 0).subscribe(
      data => {
        this.partinfo = data;
      },
      error => console.log(error));
  }
  /***** Addarea DETAILS *****/
  async ActionAddArea() {
    const modal = await this.Modalcntrl.create({
      component: AddareaComponent
    });
    return await modal.present();
  }
  /***** MATERIAL DETAILS *****/
  async ActionEditMaterial(mat: any) {
    let copyobj = JSON.parse(JSON.stringify(mat));
    let material = { material: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: MaterialinfoComponent,
      componentProps: material
    });
    return await modal.present();
  }
  /***** MEASUREMENT DETAILS *****/
  async ActionEditMeasurement(fab: any) {
    let copyobj = JSON.parse(JSON.stringify(fab));
    let sizes = { sizes: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: MeasurementsComponent,
      componentProps: sizes
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.PartFabList = detail.data.componentProps.PartFab;
      }
    });
    return await modal.present();
  }
  /***** SPLASH DETAILS *****/
  async ActionEditSplash(spl: any) {
    let copyobj = JSON.parse(JSON.stringify(spl));
    let splash = { splash: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: SplashComponent,
      componentProps: splash
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.SplashList = detail.data.componentProps.splash;
      }
    });
    return await modal.present();
  }
  /***** EDGE DETAILS *****/
  async ActionEditEdge(edg: any) {
    let copyobj = JSON.parse(JSON.stringify(edg));
    let edge = { edge: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: EdgeinfoComponent,
      componentProps: edge
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.EdgeList = detail.data.componentProps.edge;
      }
    });
    return await modal.present();
  }
  /***** CUTOUT DETAILS *****/
  async ActionCreateCutout(typeId: any, cutouts: any) {
    let copyobj = JSON.parse(JSON.stringify(cutouts));
    let cutout = { cutout: copyobj, TypeID: typeId, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: CutoutinfoComponent,
      componentProps: cutout
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.CutoutList = detail.data.componentProps.cutout;
      }
    });
    return await modal.present();
  }
  /***** SINK DETAILS *****/
  async ActionEditSink(snk: any) {
    let copyobj = JSON.parse(JSON.stringify(snk));
    let sinkfaucet = { sinkfaucet: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: SinkComponent,
      componentProps: sinkfaucet
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.SinkList = detail.data.componentProps.Sink;
      }
    });
    return await modal.present();
  }
  /***** FAUCETS DETAILS *****/
  async ActionEditFaucet(fau: any) {
    let copyobj = JSON.parse(JSON.stringify(fau));
    let faucet = { faucet: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: FaucetsComponent,
      componentProps: faucet
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.FaucetList = detail.data.componentProps.Faucet;
      }
    });
    return await modal.present();
  }
  async ActionEditFabrication(fab: any) {
    let copyobj = JSON.parse(JSON.stringify(fab));
    let fabrication = { fabrication: copyobj }
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
    let labor = { labor: copyobj, TypeID: typeId, ViewType: viewtype }
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
    let labor = { labor: copyobj, TypeID: typeId, ViewType: viewtype }
    const modal = await this.Modalcntrl.create({
      component: LaborinfoComponent,
      componentProps: labor
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.LaborList = detail.data.componentProps.Labor;
      }
    });
    return await modal.present();
  }
  /***** ADD ON DETAILS *****/
  async ActionEditAddon(oth: any) {
    let copyobj = JSON.parse(JSON.stringify(oth));
    let other = { other: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: AddoninfoComponent,
      componentProps: other
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.partinfo.OtherList = detail.data.componentProps.other;
    });
    return await modal.present();
  }
  /***** TILE DETAILS *****/
  async ActionEditTile(typeId, name, tile: any) {
    let copyobj = JSON.parse(JSON.stringify(tile));
    let tileobj = { TypeID: typeId, selName: name, tile: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: TileinfoComponent,
      componentProps: tileobj
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true) {
        this.partinfo.TileList = detail.data.componentProps.Tile;
        this.partinfo.ApplianceList = detail.data.componentProps.Appliance;
        this.partinfo.CabinetList = detail.data.componentProps.Cabinet;
        this.partinfo.CarpetList = detail.data.componentProps.Carpet;
        this.partinfo.ConsumableList = detail.data.componentProps.Consumable;
        this.partinfo.ToolList = detail.data.componentProps.Tool;
      }
    });
    return await modal.present();
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
        let partmat = this.quoterep.AddPartMatItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditMaterial(partmat);
        break;
      }
      case "size": {
        let fab = this.quoterep.AddMeasurementItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditMeasurement(fab);
        break;
      }
      case "splash": {
        let splash = this.quoterep.AddSplashItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditSplash(splash);
        break;
      }
      case "edge": {
        let edge = this.quoterep.AddEdgeItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditEdge(edge);
        break;
      }
      case "cutout": {
        let cutout = this.quoterep.AddCutoutItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent, loadId);
        this.ActionCreateCutout(loadId, cutout);
        break;
      }
      case "sink": {
        let sink = this.quoterep.AddSinkItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditSink(sink);
        break;
      }
      case "faucet": {
        let faucet = this.quoterep.AddFaucetItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditFaucet(faucet);
        break;
      }
      case "other": {
        let other = this.quoterep.AddOtherItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditAddon(other);
        break;
      }
      case "fabrication": {
        let fab = this.quoterep.AddFabricationItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent);
        this.ActionEditFabrication(fab);
        break;
      }
      case "template": {
        let labor = this.quoterep.AddTemplateItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent, loadId, ViewType);
        this.ActionEditTemplate(loadId, labor, ViewType);
        break;
      }
      case "labor": {
        let labor = this.quoterep.AddLaborItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent, loadId, ViewType);
        this.ActionEditLabor(loadId, labor, ViewType);
        break;
      }
      case "tile": {
        let tile = this.quoterep.AddTileItem(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo, this.Version.MatPercent, loadId, ViewType);
        this.ActionEditTile(loadId, ViewType, tile);
        break;
      }
      case "custitem": {
        let cust = this.quoterep.AddCustomerItems(this.AreaPartID, this.areaInfo.ID, this.areaInfo.VersionID, this.coId, this.coSrNo);
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
            <div class="li-list" (click)="ActionLoadPopup('fabrication',0, 'Fabrication')">Fabrication</div>
            <div class="li-list" (click)="ActionLoadPopup('template',1, 'Template')">Template</div>
            <div class="li-list" (click)="ActionLoadPopup('template',1, 'Install')">Install</div>
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