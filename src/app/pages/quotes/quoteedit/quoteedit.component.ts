import { Component, OnInit,Directive } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';

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
  headerInfo:any;
  selectedtabtype:number = 1;



  //version: any;
  
  ngOnInit() {
    //this.headeInfo = this.qprmsobj.header;


    this.ActionQuoteInfo();
   //this.ActionAreaList();
  }

  ActionGoToHome(){
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }
  ActionQuoteInfo(){
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid,this.qprmsobj.quoteno,this.qprmsobj.versionid,0,0,0).subscribe(
      data => {
         this.headerInfo = data;
      },
      error => console.log(error));
  }
  // ActionAreaList(){
  //   let result = this.service.ActionAreaList(this.qprmsobj.quoteid,this.qprmsobj.versionid,0).subscribe(
  //     data => {
  //        this.version = data;
  //     },
  //     error => console.log(error));
  // }
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
  async ActionEditJob() {
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



