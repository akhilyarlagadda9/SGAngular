import { Component, OnInit,Directive } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService,
     private navCtrl: NavController,private repservice: QuoterepService,) { }
  quoteId: number;
  quoteno: string;
  qprmsobj = this.navParams.data;
  headerInfo:any;
  //version:any;
  selectedtabtype:number = 1;
  QuoteVersionID:number = this.qprmsobj.versionid; 


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
         this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === this.qprmsobj.versionid)[0];
      },
      error => console.log(error));
  }
  
  ActionAreaList(){
    let result = this.service.ActionAreaList(this.qprmsobj.quoteid,this.qprmsobj.versionid,0).subscribe(
      data => {
         //this.version = data;
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
    let obj = this.headerInfo;
    const modal = await this.Modalcntrl.create({
      component: HeadereditComponent,
      componentProps: obj,
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if(detail.data.issave == true){
          this.headerInfo =  detail.data.componentProps;
          //this.contacts = detail.data.componentProps.ContactList;
        }
      }
   });
    return await modal.present();
  }

  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  
}



