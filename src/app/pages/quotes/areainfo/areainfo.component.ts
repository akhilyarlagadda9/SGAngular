import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SinkComponent } from '../sink/sink.component';
import { LaborinfoComponent } from '../laborinfo/laborinfo.component';
import { AddoninfoComponent } from '../addoninfo/addoninfo.component';
import { SplashComponent } from '../splash/splash.component';
import { EdgeinfoComponent } from '../edgeinfo/edgeinfo.component';
import { CutoutinfoComponent } from '../cutoutinfo/cutoutinfo.component';
import { MaterialinfoComponent } from '../materialinfo/materialinfo.component';
import { MeasurementsComponent } from '../measurements/measurements.component';
import { FaucetsComponent } from '../faucets/faucets.component';
import { TileinfoComponent } from '../tileinfo/tileinfo.component';
import { CabinetComponent } from '../cabinet/cabinet.component';
import { ToolComponent } from '../tool/tool.component';
import { ConsumableComponent } from '../consumable/consumable.component';
import { ApplianceComponent } from '../appliance/appliance.component';

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
})
export class AreainfoComponent implements OnInit {
  arealist : any[] = [{id:1,name: 'Area1'},{id:2,name: 'Area2'},{id:3,name: 'Area3'},{id:4,name: 'Area4'},{id:5,name: 'Area5'} ];
  partlist : any[] = [{id:1,name: 'Part1'},{id:2,name: 'Part2'},{id:3,name: 'Part3'},{id:4,name: 'Part4'},{id:5,name: 'Part5'} ];
  constructor(public Modalcntrl : ModalController ) { }
  AreaName:any = this.partlist;
  PartName:any = this.partlist;
  ngOnInit() {
    this.MyDefaultYearIdValue = "1" ;
  }
  /// In declarations : 

compareWith : any ;
MyDefaultYearIdValue : string ;

  /***** SINK DETAILS *****/
  async ActionCreateSink() {
    const modal = await this.Modalcntrl.create({
      component: SinkComponent
    });
    return await modal.present();
  }

/***** LABOR DETAILS *****/
  async ActionCreateLabor() {
    const modal = await this.Modalcntrl.create({
      component: LaborinfoComponent
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
  /***** SPLASH DETAILS *****/
  async ActionCreateEdge() {
    const modal = await this.Modalcntrl.create({
      component: EdgeinfoComponent
    });
    return await modal.present();
  }
  
/***** CUTOUT DETAILS *****/
  async ActionCreateCutout() {
    const modal = await this.Modalcntrl.create({
      component: CutoutinfoComponent
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
        async ActionCreateTile() {
          const modal = await this.Modalcntrl.create({
            component: TileinfoComponent
          });
          return await modal.present();
        }

      /***** CABINET DETAILS *****/
      async ActionCreateCabinet() {
        const modal = await this.Modalcntrl.create({
          component: CabinetComponent
        });
        return await modal.present();
      }

      /***** TOOL DETAILS *****/
      async ActionCreateTool() {
        const modal = await this.Modalcntrl.create({
          component: ToolComponent
        });
        return await modal.present();
      }

      /***** CONSUMABLE DETAILS *****/
      async ActionCreateConsumable() {
        const modal = await this.Modalcntrl.create({
          component: ConsumableComponent
        });
        return await modal.present();
      }

      /***** APPLIANCE DETAILS *****/
      async ActionCreateAppliance() {
        const modal = await this.Modalcntrl.create({
          component: ApplianceComponent
        });
        return await modal.present();
      }
}

///// In functions declaration zone

