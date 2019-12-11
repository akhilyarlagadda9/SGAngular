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

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
})
export class AreainfoComponent implements OnInit {
  arealist: any[] = [{ id: 1, name: 'Area1' }, { id: 2, name: 'Area2' }, { id: 3, name: 'Area3' }, { id: 4, name: 'Area4' }, { id: 5, name: 'Area5' }];
  partlist: any[] = [{ id: 1, name: 'Part1' }, { id: 2, name: 'Part2' }, { id: 3, name: 'Part3' }, { id: 4, name: 'Part4' }, { id: 5, name: 'Part5' }];
  viewid: any;
  constructor(public Modalcntrl: ModalController,private popoverCntrl :PopoverController) { }
  AreaName: any = this.partlist;
  PartName: any = this.partlist;
  ngOnInit() {
    this.MyDefaultYearIdValue = "1";
  }
  /// In declarations : 

  compareWith: any;
  MyDefaultYearIdValue: string;


    async ActionCreateTemplate(typeId) {
    let obj = {TypeID:typeId}
    const modal = await this.Modalcntrl.create({
      component: TemplateComponent,
      componentProps: obj
    });
    return await modal.present();
  }

  /***** SINK DETAILS *****/
  async ActionCreateSink() {
    const modal = await this.Modalcntrl.create({
      component: SinkComponent
    });
    return await modal.present();
  }
  /***** ADD ON DETAILS *****/
  async ActionCreateAddon() {
    const modal = await this.Modalcntrl.create({
      component: AddoninfoComponent
    });
    return await modal.present();
  }

  /***** SPLASH DETAILS *****/
  async ActionCreateSplash() {
    const modal = await this.Modalcntrl.create({
      component: SplashComponent
    });
    return await modal.present();
  }
  /***** EDGE DETAILS *****/
  async ActionCreateEdge() {
    const modal = await this.Modalcntrl.create({
      component: EdgeinfoComponent
    });
    return await modal.present();
  }

  /***** CUTOUT DETAILS *****/
  async ActionCreateCutout(typeId) {
    let obj = {TypeID:typeId}
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
  async ActionCreateMaterial() {
    const modal = await this.Modalcntrl.create({
      component: MaterialinfoComponent
    });
    return await modal.present();
  }

  /***** MEASUREMENT DETAILS *****/
  async ActionCreateMeasurement() {
    const modal = await this.Modalcntrl.create({
      component: MeasurementsComponent
    });
    return await modal.present();
  }

  /***** FAUCETS DETAILS *****/
  async ActionCreateFaucets() {
    const modal = await this.Modalcntrl.create({
      component: FaucetsComponent
    });
    return await modal.present();
  }

  /***** TILE DETAILS *****/
  async ActionCreateTile(typeId,name) {
    let obj = {TypeID:typeId,selName:name}
    const modal = await this.Modalcntrl.create({
      component: TileinfoComponent,
      componentProps: obj
    });
    return await modal.present();
  }

  /***** CUSTOMERITEM DETAILS *****/
  async ActionCreateCi() {
    const modal = await this.Modalcntrl.create({
      component: CustitemComponent
    });
    return await modal.present();
  }

  async ActionDiscSelect(ev: any) {
    let obj={}
   const popover = await this.popoverCntrl.create({
     component: DiscountComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
   });
   return await popover.present();
 }

 async ActionTaxSelect(ev: any) {
  let obj={}
 const popover = await this.popoverCntrl.create({
   component: taxComponent,
   event: ev,
   translucent: true,
   componentProps:obj,
 });
 return await popover.present();
}

async ActionFeeSelect(ev: any) {
  let obj={}
 const popover = await this.popoverCntrl.create({
   component: feeComponent,
   event: ev,
   translucent: true,
   componentProps:obj,
 });
 return await popover.present();
}

}

@Component({
  //selector: 'app-itemsearchComponent',
  template:`
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
      <ion-select [(ngModel)]="Discount" class="labelfont">
          <ion-select-option value="number:25" >10% Friends and Family Discount</ion-select-option>
          <ion-select-option value="number:5059">15% Friends and Family Discount</ion-select-option>
          <ion-select-option value="number:5059" >25% Friends and Family Discount</ion-select-option>
          <ion-select-option value="number:5059" selected>Builder Discount</ion-select-option>
          <ion-select-option value="number:5059">Friends and Family 30% Discount</ion-select-option>
          <ion-select-option value="number:5059">Personal Use Discount 10%</ion-select-option>
      </ion-select></ion-item>
      <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Value($/%)</ion-label>
        <ion-input type="text" class="labelfont" value="0"></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="floating" color="primary"></ion-label>
        <ion-select [(ngModel)]="Discount2" class="labelfont">
            <ion-select-option value="number:25" selected>%</ion-select-option>
            <ion-select-option value="number:5059">$</ion-select-option>
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
  constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController ) { }
  ngOnInit() {this.ActionSearchParentAccount();}
  ActionSearchParentAccount(){
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
    template:`
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
        <ion-select [(ngModel)]="Discount" class="labelfont">
            <ion-select-option value="number:25" >No Tax</ion-select-option>
        </ion-select></ion-item>
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
    constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController ) { }
    ngOnInit() {this.ActionSearchParentAccount();}
    ActionSearchParentAccount(){
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
      template:`
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
          <ion-select [(ngModel)]="Discount" class="labelfont">
              <ion-select-option value="number:25" >Contractor Pref</ion-select-option>
              <ion-select-option value="number:5059">Contractor Std</ion-select-option>
              <ion-select-option value="number:5059" >Material Markup</ion-select-option>
              <ion-select-option value="number:5059" selected>Miscellaneous</ion-select-option>
              <ion-select-option value="number:5059">Retail</ion-select-option>
              <ion-select-option value="number:5059">Shop Minimum</ion-select-option>
          </ion-select></ion-item>
          <ion-item>
            <ion-label class="labelfont" position="floating" color="primary"></ion-label>
            <ion-input type="text" class="labelfont" value="0"></ion-input>
            </ion-item>
            <ion-item>
            <ion-label class="labelfont" position="floating" color="primary"></ion-label>
            <ion-select [(ngModel)]="Discount2" class="labelfont">
                <ion-select-option value="number:25" selected>%</ion-select-option>
                <ion-select-option value="number:5059">$</ion-select-option>
            </ion-select></ion-item>
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
      constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController ) { }
      ngOnInit() {this.ActionSearchParentAccount();}
      ActionSearchParentAccount(){
        }
    
        ActionToClosePop() {
          // using the injected ModalController this page
          // can "dismiss" itself and optionally pass back data
          this.popoverCntrl.dismiss({
            'dismissed': true
          });
        }
      }