import { Component, OnInit,Directive, Input } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { OverlayEventDetail } from '@ionic/core';
import { MapComponent } from '../../map/map.component';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component';
import { ManagementsummaryComponent } from '../managementsummary/managementsummary.component';
import { PoeditComponent } from '../poedit/poedit.component';
//import { QuoterepService } from 'src/app/service/quoterep.service';

declare var _qscope: any;

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
  public customer: any; 
  public version: any; 
  public contacts: any; 
  public SelectedTypeID: number;
  public Version: any;
  public PoItemList: any;
  public ParentID: number;

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



  ActionQuoteInfo(){
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid,this.qprmsobj.quoteno,this.qprmsobj.versionid,0,0,0).subscribe(
      data => {
        this.headerInfo = data; _qscope.quote = {};
        this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === this.qprmsobj.versionid)[0];
        _qscope.quote = this.headerInfo;
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
  //Job edit Function
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
  //Map Function
  async ActionLoadMap() {
    let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
   let obj = {headerInfo : copyobj}
    const modal = await this.Modalcntrl.create({
      component: MapComponent,
      componentProps: obj,
    });
    return await modal.present();
  }

  //Customer Edit Function
  async ActionEditCustomer(typeId:number,info:any,contactList) {
    let custinfo = info;
   custinfo.ContactList = contactList;
    let copyobj = JSON.parse(JSON.stringify(custinfo))
    let obj = {version:this.version,customerinfo:copyobj,SelectedTypeID:this.SelectedTypeID}
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent,
      componentProps: obj,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if(detail.data.issave == true){
          this.SetCustomerDetails(typeId,detail.data);
        }
      }
   });
    return await modal.present();
  }
 SetCustomerDetails(typeId,model){
    this.headerInfo.CustomerContacts =  model.componentProps;
    this.contacts =model.componentProps.ContactList;
  }

  //Job Description Edit Function
  async ActionEditJobDesc(typeId:any) {
    let ver = {TypeID: typeId,Version:this.headerInfo.Version}
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent,
      componentProps: ver,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null) {
            if(detail.data.issave == true){
              if(typeId == 1){
                this.headerInfo.Version.Description =  detail.data.componentProps.Description;
              }
             else{
              this.headerInfo.Version.PrivateNote =  detail.data.componentProps.PrivateNote;
             }
              
            }
          }
       });
    return await modal.present();
  }

  //Management summary component
  async ActionSummaryEdit() {
    let version = { Version: this.headerInfo.Version }
    let copyver = JSON.parse(JSON.stringify(version));
    const modal = await this.Modalcntrl.create({
      component: ManagementsummaryComponent,
      componentProps: copyver
    });
    return await modal.present();
  }
 

}
  
  
