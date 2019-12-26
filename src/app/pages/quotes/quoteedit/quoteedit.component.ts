import { Component, OnInit,Directive, Input } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { OverlayEventDetail } from '@ionic/core';
import { MapComponent } from '../../map/map.component';
//import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController) { }
  quoteId: number;
  quoteno: string;
  shownGroup = 1;
  qprmsobj = this.navParams.data;
  headerInfo:any;
  selectedtabtype:number = 1;
  QuoteVersionID:number = this.qprmsobj.versionid; 
  expanded = false;

  //version: any;
  

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = 0;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };


  ngOnInit() {
    this.ActionQuoteInfo();
  }



  ActionGoToHome(){
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }



  ActionQuoteInfo(){debugger;
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid,this.qprmsobj.quoteno,this.qprmsobj.versionid,0,0,0).subscribe(
      data => {
         this.headerInfo = data;
         this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === this.qprmsobj.versionid)[0];
      },
      error => console.log(error));
  }
ActionLoadVersion(id:number){
  this.qprmsobj.versionid = id;
  this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === id)[0];
}
  /*****tabs****** */
  ActionLoadTabInfo(componet: any){
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
    let obj = JSON.parse(JSON.stringify(this.headerInfo));
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

  async ActionLoadMap() {
    let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
   let obj = {headerInfo : copyobj}
    const modal = await this.Modalcntrl.create({
      component: MapComponent,
      componentProps: obj,
    });
    return await modal.present();
  }
  
  
}