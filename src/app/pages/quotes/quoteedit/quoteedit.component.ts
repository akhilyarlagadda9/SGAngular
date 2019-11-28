import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { HeaderinfoComponent } from '../headerinfo/headerinfo.component';
import { PoitemsComponent } from '../poitems/poitems.component';
import { JobdesComponent } from '../jobdes/jobdes.component';
import { CommhubComponent } from '../commhub/commhub.component';
import { PrintsComponent } from '../prints/prints.component';

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  tabComponet = HeaderinfoComponent;
  quoteId: number;
  quoteno: string;
  qprmsobj = this.navParams.data;
  header: any;
  version: any;
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController) { }

  ngOnInit() {
    this.ActionQuoteInfo();
    this.ActionAreaList();
  }

  ActionQuoteInfo() {
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid, this.qprmsobj.quoteno, this.qprmsobj.versionid, 0, 0, 0).subscribe(
      data => {
        this.header = data;
      },
      error => console.log(error));
  }
  ActionAreaList() {
    let result = this.service.ActionAreaList(this.qprmsobj.quoteid, this.qprmsobj.versionid, 0).subscribe(
      data => {
        this.version = data;
      },
      error => console.log(error));
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
    if (componet == 1) {
      this.tabComponet = HeaderinfoComponent;
    } else if (componet == 2) {
      this.tabComponet = JobdesComponent
    }
    else if (componet == 3) {
      this.tabComponet = PoitemsComponent
    }
    else if (componet == 4) {
      this.tabComponet = CommhubComponent
    }
    else if (componet == 5) {
      this.tabComponet = PrintsComponent
    }
  }
}



