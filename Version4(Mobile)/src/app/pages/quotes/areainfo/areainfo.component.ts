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
import { OverlayEventDetail } from '@ionic/core';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
  inputs: [`Version`]
})
export class AreainfoComponent implements OnInit {
  public Version: any;coId:number;coSrNo:string;
  arealist: any = [];
  partinfo: any = [];
  partlist: any = [];
  areaInfo:any;AreaPartID:number;
  viewid: any;
  constructor(private service: QuoteService, 
    public Modalcntrl: ModalController, 
    private popoverCntrl: PopoverController,private quoterep: QuoterepService) { }
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

  AddAreaItem(loadType:string,loadId:number){
    switch(loadType) { 
      case "partmat": { 
        let partmat = this.quoterep.AddPartMatItem(this.AreaPartID,this.areaInfo.ID,this.areaInfo.VersionID,this.coId,this.coSrNo,this.Version.MatPercent);
        this.ActionEditMaterial(partmat);
        break; 
      } 
      case "size": { 
         break; 
      } 
      case "splash": {
         break;    
      } 
      case "edge": { 
        let edge = this.quoterep.AddEdgeItem(this.AreaPartID,this.areaInfo.ID,this.areaInfo.VersionID,this.coId,this.coSrNo,this.Version.MatPercent);
        this.ActionEditEdge(edge);
         break; 
      } 
      case "cutout": { 
        break; 
     }  
      case "sink": { 
        break; 
     } 
     case "faucet": { 
        break; 
     } 
     case "other": {
        break;    
     } 
     case "labor": { 
        break; 
     }  
     case "tile": { 
      break; 
   }  
   }
  }
  async ActionAddAreaitem(ev: any) {
      let obj = {Shape:this.partinfo.Shape}
      const popover = await this.popoverCntrl.create({
        component: additemComponent,
        event: ev,
        translucent: true,
        componentProps: obj,
        cssClass: "popover_class"
      });
      popover.onDidDismiss().then((detail: OverlayEventDetail) => {
        if (detail !== null) {
          if(detail.data.isSelect == true){
          this.AddAreaItem(detail.data.info.loadType,detail.data.info.loadId);
          }
        }
     });
      return await popover.present();
    }
  
//Management summary component
  async ActionSummaryEdit() {
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
              <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-grid>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('partmat',0)">part Material</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('sink',0)">Sink</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
             <div *ngIf="navObj.Shape == null || navObj.Shape == ''"(click)="ActionLoadPopup('size',0)">Measurements</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('faucet',0)">Faucets</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('splash',0)">Splash</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('tile',18)">Appliance</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
             <div>Apron</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('labor',0)">Labor</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('edge',0)">Edge</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('other',0)">Add On Products</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',1)">Sink Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup(response,0)">Customer Items</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',2)">Outlet Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('tile',12)">Tile</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div *ngIf="navObj.Shape == null || navObj.Shape == ''" (click)="ActionLoadPopup('cutout',3)">Appliance Cutout</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('tile',13)">Cabinet</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionLoadPopup('fab',0)">Fabrication</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('tile',17)">Consumable</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionLoadPopup('labor',1)">Template</div>
          </ion-col>
          <ion-col>
            <div (click)="ActionLoadPopup('tile',19)">Tool</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div (click)="ActionLoadPopup('labor',2)">Install</div>
          </ion-col>
          <ion-col>
            <div><span style="red">Discount</span></div>
          </ion-col>
        </ion-row>
      </ion-grid>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class additemComponent implements OnInit {
  navObj = this.navParams.data;
  constructor(private navParams: NavParams, private popoverCntrl: PopoverController) { }
   obj:any;
   ngOnInit(){}

ActionLoadPopup(loadType:string,loadId:number){
  this.obj = {loadType:loadType,loadId:loadId};
  this.ActionToClosePop(true);
}
ActionToClosePop(isSelect:boolean) {
  this.popoverCntrl.dismiss({
    'dismissed': true,
    info:this.obj,
    isSelect:isSelect
  });
}
}



