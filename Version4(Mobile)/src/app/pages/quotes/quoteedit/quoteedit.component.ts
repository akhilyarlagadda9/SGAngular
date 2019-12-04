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
  version:any;
  selectedtabtype:number = 1;
  QuoteVersionID:number = this.qprmsobj.versionid; 


  //version: any;
  
  ngOnInit() {
    //this.headeInfo = this.qprmsobj.header;
    this.ActionQuoteInfo();
    this.ActionAreaList();
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
  ActionAreaList(){
    let result = this.service.ActionAreaList(this.qprmsobj.quoteid,this.qprmsobj.versionid,0).subscribe(
      data => {
         this.version = data;
      },
      error => console.log(error));
  }
  /*****tabs****** */
  ActionQuickLoad(componet: any) {
    this.selectedtabtype = componet;
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

  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}



