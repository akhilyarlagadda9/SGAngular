import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { HeaderinfoComponent } from '../headerinfo/headerinfo.component';
import { PoitemsComponent } from '../poitems/poitems.component';
import { JobdesComponent } from '../jobdes/jobdes.component';
import { CommhubComponent } from '../commhub/commhub.component';
import { PrintsComponent } from '../prints/prints.component';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController) { }
  quoteId: number;
  quoteno: string;
  qprmsobj = this.navParams.data;
  headeInfo:any;
 



  //version: any;
  selectedtabtype:number = 1;
  

  ngOnInit() {
    this.headeInfo = this.qprmsobj.header;
    //this.ActionQuoteInfo();
   //this.ActionAreaList();
  }

  
  
  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  /***** Quote Header *****/
  async ActionQuoteHeader() {
    const modal = await this.Modalcntrl.create({
      component: HeadereditComponent

    });
    return await modal.present();
  }
  /*****tabs****** */
  ActionQuickLoad(componet: any) {
    this.selectedtabtype = componet;
  }

  // ActionQuickLoad(componet: any) {
  //   if (componet == 1) {
  //     this.tabComponet = HeaderinfoComponent;
  //   } else if (componet == 2) {
  //     this.tabComponet = JobdesComponent;
  //   }
  //   else if (componet == 3) {
  //     this.tabComponet = PoitemsComponent;
  //   }
  //   else if (componet == 4) {
  //     this.tabComponet = CommhubComponent;
  //   }
  //   else if (componet == 5) {
  //     this.tabComponet = PrintsComponent;
  //   }
  // }
}



