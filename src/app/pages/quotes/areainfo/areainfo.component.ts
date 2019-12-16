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
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';
import { ManagementsummaryComponent } from '../managementsummary/managementsummary.component';

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
  inputs: [`Version`]
})
export class AreainfoComponent implements OnInit {
  public Version: any;
  arealist: any = [];
  partinfo: any = [];
  partlist: any = [];
  areaInfo:any;AreaPartID:number;
  viewid: any;
  constructor(private service: QuoteService, public Modalcntrl: ModalController, private popoverCntrl: PopoverController) { }
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
      if(length > 0){this.ActionGetPartInfo(this.partlist[0].ID);}
    }
  }
  ActionGetPartInfo(partId:number) {
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
    return await modal.present();
  }
  /***** SPLASH DETAILS *****/
  async ActionEditSplash(spl:any) {
    let copyobj = JSON.parse(JSON.stringify(spl));
    let splash = {splash : copyobj,priceListID:Number(this.Version.PriceListID)}
    const modal = await this.Modalcntrl.create({
      component: SplashComponent,
      componentProps: splash
    });
    return await modal.present();
  }
  /***** EDGE DETAILS *****/
  async ActionEditEdge(edg:any) {
    let copyobj = JSON.parse(JSON.stringify(edg));
    let edge = {edge : copyobj,priceListID:Number(this.Version.PriceListID)}
    const modal = await this.Modalcntrl.create({
      component: EdgeinfoComponent,
      componentProps: edge
    });
    return await modal.present();
  }
  /***** CUTOUT DETAILS *****/
  async ActionCreateCutout(typeId:any, cutouts:any) {
    let copyobj = JSON.parse(JSON.stringify(cutouts));
    let cutout = { cutout: copyobj, TypeID:typeId, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: CutoutinfoComponent,
      componentProps: cutout
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
    return await modal.present();
  }
  async ActionCreateTemplate(typeId: number,temp : any) {
    let copyobj = JSON.parse(JSON.stringify(temp));
    let labor = { labor: copyobj, TypeID:typeId }
    const modal = await this.Modalcntrl.create({
      component: TemplateComponent,
      componentProps: labor
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
    return await modal.present();
  }
  /***** TILE DETAILS *****/
  async ActionEditTile(typeId,name,tile:any) {
    
    let copyobj = JSON.parse(JSON.stringify(tile));
    let tileobj = {TypeID:typeId,selName:name,labor:copyobj,priceListID:Number(this.Version.PriceListID)}
    const modal = await this.Modalcntrl.create({
      component: TileinfoComponent,
      componentProps: tileobj
    });
    return await modal.present();
  }



  /***** CUSTOMERITEM DETAILS *****/
  async ActionEditCustItems(res:any) {
    let copyobj = JSON.parse(JSON.stringify(res));
    let response = {response : copyobj,priceListID:Number(this.Version.PriceListID)}
    const modal = await this.Modalcntrl.create({
      component: CustitemComponent,
      componentProps : response
    });
    return await modal.present();
  }


//Management summary component
  async ActionSummaryEdit() {debugger;
    let version = {Version : this.Version}
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
            <ion-toolbar style="height:37px;top:-8px;left:-10px;">
              <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-grid>
        <ion-row>
          <ion-col>
            <div (click)="ActionEditMaterial(material)">Part Material</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditSink(sinkfaucet)">Sink</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
             <div (click)="ActionEditMeasurement(size)">Measurements</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditFaucet(faucet)">Faucets</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionEditSplash(splash)">Splash</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(18,'Appliance', sinkfaucet)">Appliance</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
             <div>Apron</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(7,'Labor', labor)">Labor</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionEditEdge(edge)">Edge</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditAddon(other)">Add On Products</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateCutout(1)">Sink Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditCustItems(response)">Customer Items</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateCutout(2)">Outlet Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(12,'Tile', labor)">Tile</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateCutout(3)">Appliance Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(2,'Cabinet', labor)">Cabinet</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateTemplate(1)">Fabrication</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(19,'Consumable', labor)">Consumable</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateTemplate(2)">Template</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionEditTile(3,'Tool',labor)">Tool</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionCreateTemplate(3)">Install</div>
          </ion-col>
          <ion-col>
            <div><span style="red">Discount</span></div>
          </ion-col>
        </ion-row>
      </ion-grid>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class areaitem2Component implements OnInit {

  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }

ngOnInit(){}
 

/***** CUTOUT DETAILS *****/
async ActionCreateCutout(typeId) {
  let obj = { TypeID: typeId }
  const modal = await this.Modalcntrl.create({
    component: CutoutinfoComponent,
    componentProps: obj
  });
  return await modal.present();
}

ActionToClosePop() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.popoverCntrl.dismiss({
    'dismissed': true
  });
}
}

