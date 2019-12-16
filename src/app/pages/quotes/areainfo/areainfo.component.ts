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
  areaInfo: any; AreaPartID: number;
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
  async ActionCreateTemplate(typeId) {
    let obj = { TypeID: typeId }
    const modal = await this.Modalcntrl.create({
      component: TemplateComponent,
      componentProps: obj
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

  /***** SPLASH DETAILS *****/
  async ActionEditSplash(spl: any) {
    let copyobj = JSON.parse(JSON.stringify(spl));
    let splash = { splash: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: SplashComponent,
      componentProps: splash
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
    return await modal.present();
  }

  /***** CUTOUT DETAILS *****/
  async ActionCreateCutout(typeId) {
    let obj = { TypeID: typeId }
    const modal = await this.Modalcntrl.create({
      component: CutoutinfoComponent,
      componentProps: obj
    });
    return await modal.present();
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

  /***** TILE DETAILS *****/
  async ActionEditTile(typeId, name, tile: any) {

    let copyobj = JSON.parse(JSON.stringify(tile));
    let tileobj = { TypeID: typeId, selName: name, labor: copyobj, priceListID: Number(this.Version.PriceListID) }
    const modal = await this.Modalcntrl.create({
      component: TileinfoComponent,
      componentProps: tileobj
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
    return await modal.present();
  }

  async ActionDiscSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: DiscountComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

  async ActionAddAreaitem(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: areaitem2Component,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    return await popover.present();
  }
  async ActionTaxSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: taxComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

  async ActionFeeSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: feeComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }
//Management summary component
  async ActionSummaryEdit(version:any) {
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
      <ion-title style="font-size:15px;">Job Discount(S)</ion-title>
      <ion-button slot="end" color="success" size="small" style="font-size:13px; height:17px;width: 42px;">Save</ion-button>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-row style="height:360px">
  <ion-col>
      <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Discount</ion-label>
      <ion-select class="btninfo" interface="popover" [(ngModel)]="discname" name="discname"
        (ionChange)="ActionChangeDiscount()">
        <ion-select-option *ngFor="let disc of DiscountTypeList" [value]="discname"> {{disc.Name}}</ion-select-option>
      </ion-select>
      </ion-item>
      <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Value($/%)</ion-label>
        <ion-input type="text" class="labelfont" value="0"></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="floating" color="primary"></ion-label>
        <ion-select [(ngModel)]="name" class="labelfont">
           <ion-select-option *ngFor="let disc of DiscTypes1" [value]="name"> {{disc.Name}}</ion-select-option>
        </ion-select></ion-item>
        <ion-item style="margin-left: -4%;">
          <ion-checkbox style="margin-left: 4%;"></ion-checkbox>
          <ion-label style="margin-left: 5px;">Tax</ion-label>
      </ion-item>
  </ion-col>
</ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class DiscountComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  DiscountTypeList: any = [];

  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
    this.ActionSearchParentAccount();
    this.ActionChangeDiscount();
  }
  ActionSearchParentAccount() { }
  DiscTypes1: any = [{ ID: 1, Name: "%" }, { ID: 2, Name: "$" }];

  ActionChangeDiscount() {
    let result = this.service.QuoteMasterList(2).subscribe(
      data => { this.DiscountTypeList = data },
      error => console.log(error));
  }

  ActionToClosePop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}


@Component({
  //selector: 'app-itemsearchComponent',
  template: `
    <ion-header>
      <ion-toolbar style="height:37px;top:-8px;left:-10px;">
        <ion-title style="font-size:15px;">Sales Tax(%)</ion-title>
        <ion-button slot="end" color="success" size="small" style="font-size:13px; height:17px;width: 42px;">Save</ion-button>
        <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-row style="height:360px">
    <ion-col>
          <ion-item>
          <ion-label class="labelfont" position="floating" color="primary">Customer Tax Code:</ion-label>
        <ion-select class="btninfo" interface="popover" [(ngModel)]="taxname" name="taxname" (ionChange)="ActionChangeQuoteTax()">
            <ion-select-option *ngFor="let mat of TaxTypeList " [value]="taxname"></ion-select-option>
        </ion-select>
        </ion-item>
        <ion-item><ion-input type="text" class="labelfont" value="0"></ion-input> </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Material:</ion-label>
        <ion-input type="text" class="labelfont" value="0"><ion-row style="margin-right: 3px;">%</ion-row></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Fabrication:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Edge,Cutouts:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Sink,Faucet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Appliance:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Add on:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Labor:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Tile:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Cabinet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Carpet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Wood Floor:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Consumable:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Tool:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
    </ion-col>
  </ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class taxComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  TaxTypeList: any = [];
  header: any;
  Version: any;

  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
    this.ActionSearchParentAccount();
    this.ActionChangeQuoteTax();
  }
  ActionSearchParentAccount() { }

  ActionChangeQuoteTax() {
    debugger;
    let result = this.service.Accounttaxlist(3, this.Version.CustTypeID).subscribe(
      data => { debugger; this.TaxTypeList = data },
      error => console.log(error));
  }

  ActionToClosePop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}
//styleUrls: ['./customeredit.component.scss'],

@Component({
  //selector: 'app-itemsearchComponent',
  template: `
      <ion-header>
        <ion-toolbar style="height:37px;top:-8px;left:-10px;">
          <ion-title style="font-size:15px;">Charges</ion-title>
          <ion-button slot="end" color="success" size="small" style="font-size:13px; height:17px;width: 42px;">Save</ion-button>
          <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-row style="height:360px">
      <ion-col>
         <ion-item>
            <ion-label class="labelfont" position="floating" color="primary">Fees</ion-label>
            <ion-select class="btninfo" interface="popover" [(ngModel)]="discname" name="discname" (ionChange)="ActionChangeFeeType()">
                <ion-select-option *ngFor="let mat of FeeTypeList " [value]="discname">{{mat.Name}}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label class="labelfont" position="floating" color="primary"></ion-label>
            <ion-input type="text" class="labelfont" value="0"></ion-input>
            </ion-item>
            <ion-item>
            <ion-label class="labelfont" position="floating" color="primary"></ion-label>
            <ion-select [(ngModel)]="name" class="labelfont">
               <ion-select-option *ngFor="let disc of DiscTypes1" [value]="name"> {{disc.Name}}</ion-select-option>
            </ion-select>
          </ion-item>
            <ion-item style="margin-left: -4%;">
              <ion-checkbox style="margin-left: 4%;"></ion-checkbox>
              <ion-label style="margin-left: 5px;">FeeTax</ion-label>
          </ion-item>
          <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Net Total W/O Round Off: </ion-label>
        <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Round Off:</ion-label>
        <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
        </ion-item>
        <ion-item>
          <ion-range value="20">
            <ion-icon slot="start" size="small" name="remove"></ion-icon>
            <ion-icon slot="end" name="add"></ion-icon>
          </ion-range>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Net Total:</ion-label>
        <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
        </ion-item>
      </ion-col>
    </ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class feeComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  FeeTypeList: any = [];
  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
  }
  ActionToClosePop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
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

