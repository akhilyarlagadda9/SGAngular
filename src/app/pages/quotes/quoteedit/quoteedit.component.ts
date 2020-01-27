import { Component, OnInit, Directive, Input } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, PopoverController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'


import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { OverlayEventDetail } from '@ionic/core';
import { MapComponent } from '../../map/map.component';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component';
import { ManagementsummaryComponent } from '../managementsummary/managementsummary.component';
import { PoeditComponent } from '../poedit/poedit.component';
import { ActionquoteComponent } from '../actionquote/actionquote.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
//import { QuoterepService } from 'src/app/service/quoterep.service';

declare var _qscope: any;

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController, private popoverCntrl: PopoverController) { }
  quoteId: number;
  quoteno: string;
  shownGroup = 1;
  qprmsobj = this.navParams.data;
  headerInfo: any;
  selectedtabtype: number;
  QuoteVersionID: number = this.qprmsobj.versionid;
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
    if(this.navParams.data.layoutId == 1){
      this.selectedtabtype = this.navParams.data.layoutId;
    }
    this.ActionQuoteInfo();
  }

  ActionAreaList(){
    this.service.ActionQuoteAreaList(this.qprmsobj.versionid).subscribe(data => { data;
      _qscope.quote.Version.AreaList = data;
      _qscope.quote.Version.AreaID = 0;
      this.selectedtabtype = 2;
    })
  }

  ActionGoToHome() {
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }



  ActionQuoteInfo() {
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid, this.qprmsobj.quoteno, this.qprmsobj.versionid, 0, 0, 0).subscribe(
      data => {
        this.headerInfo = data; _qscope.quote = {};
        this.headerInfo.Version = this.headerInfo.VersionList.find(x => x.ID === this.qprmsobj.versionid);
        _qscope.quote = this.headerInfo;
        if(this.navParams.data.layoutId == 2){
          this.ActionAreaList();
        }
      },
      error => console.log(error));
  }

  /*****tabs****** */
  ActionLoadTabInfo(componet: any) {
    this.selectedtabtype = componet;
    if(componet == 1){
      this.ActionLoadVersion(this.QuoteVersionID);
    }
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
        if (detail.data.isSave == true) {
          this.headerInfo = detail.data.componentProps;
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
    let obj = { headerInfo: copyobj }
    const modal = await this.Modalcntrl.create({
      component: MapComponent,
      componentProps: obj,
    });
    return await modal.present();
  }

  //Customer Edit Function
  async ActionEditCustomer(typeId: number, info: any, contactList) {
    let custinfo = info;
    custinfo.ContactList = contactList;
    let copyobj = JSON.parse(JSON.stringify(custinfo))
    //let obj = {version:this.headerInfo.Version,customerinfo:copyobj,SelectedTypeID:this.SelectedTypeID}
    let obj = { version: this.version, customerinfo: copyobj, SelectedTypeID: this.SelectedTypeID }
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent,
      componentProps: obj,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.issave == true) {
          this.SetCustomerDetails(typeId, detail.data);
        }
      }
    });
    return await modal.present();
  }
  SetCustomerDetails(typeId, model) {
    this.headerInfo.CustomerContacts = model.componentProps;
    this.contacts = model.componentProps.ContactList;
  }

  //Job Description Edit Function
  async ActionEditJobDesc(typeId: any) {
    let ver = { TypeID: typeId, Version: this.headerInfo.Version }
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent,
      componentProps: ver,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.issave == true) {
          if (typeId == 1) {
            this.headerInfo.Version.Description = detail.data.componentProps.Description;
          }
          else {
            this.headerInfo.Version.PrivateNote = detail.data.componentProps.PrivateNote;
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

  ActionLoadVersion(id) {
    this.qprmsobj.versionid = id;
    this.service.ActionVersionInfo1(this.qprmsobj.quoteid, id, 0).subscribe(data => {
      this.headerInfo.Version = data;
    })
  }
  // AreaSummarySelect(ev) {
  //   if (ev == "success") {
  //     this.ActionLoadTabInfo(2);
  //   }
  // }
  async ActionNewAction() {
    let header = { header: this.headerInfo }
    const popover = await this.popoverCntrl.create({
      component: NewactionComponent,
      componentProps: header,
      translucent: true,
      showBackdrop: true,
      cssClass: "popover_class3"
    });
    return await popover.present();
  }
}
// <ion-row class="pad2" (click)="createaction(2,'a')"><span style="color:Blue"><b>Duplicate Version</b></span></ion-row>
// <ion-row class="pad2" (click)="createaction(3,'Cancelled')"><span style="color:green"><b>Copy Quote</b></span></ion-row>

@Component({
  template: `
  <ion-list class="acc-pop no-margin">
    <ion-item class="pad2 color-green fontbold" *ngIf="header.Version.StatusID != 6 && header.IsApproved == false && header.Version.IsLock == 0" (click)="ActionQuoteStatuses(6,'Approved')">Approve Quote</ion-item>
    <ion-item class="pad2 fontbold" *ngIf="header.Version.StatusID != 2 &&  header.Version.StatusID != 6 && header.IsApproved == false &&  header.Version.IsLock == 0" style="color:#f8ac59" (click)="ActionQuoteStatuses(2,'Declined')">Decline Quote</ion-item>
    <ion-item class="pad2 color-red fontbold" *ngIf="(header.Version.StatusID != 4 ||  header.Version.StatusID == 6) && header.Version.IsLock == 0" (click)="ActionQuoteStatuses(4,'Cancelled')">Cancel Quote</ion-item>
    <ion-item class="pad2 fontbold" *ngIf="header.Version.StatusID == 2 ||  header.Version.StatusID == 4 && header.Version.IsLock == 0" style="color:#2E86C1" (click)="ActionQuoteStatuses(1,'Bidding')">Bidding Quote</ion-item>
    <ion-item class="pad2 color-blue fontbold" *ngIf="header.Version.LatestCoID == 0" (click)="ActionDuplicateVersion(header.Version.ID, header.Version.CustomerID,header.Version.ChildAccID,header.Version.ParentAccID)">Duplicate Version</ion-item>
    <ion-item class="pad2 color-green fontbold" *ngIf="header.Version.LatestCoID == 0" (click)="ActionCopyQuote()">Copy Quote</ion-item>
    <ion-item class="pad2 fontbold" *ngIf="header.Version.StatusID == 6" style="color:#2E86C1" (click)="ActionCreateChangeOrder()">Create Change Order</ion-item>
  </ion-list>`,
  styleUrls: ['./quoteedit.component.scss'],
})
export class NewactionComponent implements OnInit {
  navObj = this.navParams.data;
  header: any;
  result: void;
  action: any = {};
  searchobj2: any = {};
  searchobj: any = {};
  firststage: any = [];
  constructor(private alertCtrl: AlertController, private navParams: NavParams,private service : QuoteService, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private quoterep: QuoterepService) { }
  obj: any;
  ngOnInit() { }

  ActionQuoteStatuses(statusId, status) {
    let result = false;
    if (statusId == 6) {
      result = this.quoterep.approvechecklist(this.header);
    }
    //s1:edit,isadmin
    // if (this.header.reviewapproval == true) { this.searchobj.alertflag = false; }
    //s2:no
    //if (this.header.reviewapproval == false && result == false) { this.searchobj.alertflag = false; }
    this.searchobj.alertflag = false;
    this.action = this.stageaction(statusId, status); this.searchobj2 = this.searchobj;
    this.StatusAlertAction();this.ActionToClosePop(true);
  }

  stageaction(statusId, status) {
    if (statusId == 6) {
        this.service.ActionGetProjectTypes(1).subscribe(data => { 
          this.firststage = data;
          this.action.StageID = this.firststage[0].ID;
          this.action.Name = this.firststage[0].Name;
        })
    }
    this.action.PreferID = 0;
    this.action.HoldDate = "01/24/2020"
    this.action.FollowUpDate = new Date();
    this.action.ActionName = status;
    this.action.Description = "";
    this.action.LayApproval = 0;
    this.action.CustPickup = 0;
    this.action.StatusId = statusId;
    this.action.MFlag = 0;
    this.action.IsMaterialView = false;
    this.action.IsConfirmView = true;
    this.action.showjobReady = statusId == 6 ? true : false;
    this.action.Coview = false;
    return this.action;
  }
  async StatusAlertAction(){
    let info = { action : this.action, searchobj2 : this.searchobj2, header : this.header }
    const modal = await this.Modalcntrl.create({
      component: ActionquoteComponent,
      componentProps: info
    });
    return await modal.present();
  }


  async SaveQuoteStatues(viewtype2: number, viewtype: string, ) {
    let act = { ViewType: viewtype, viewtype2: viewtype2 }
    if (viewtype2 === 1) {
      const modal = await this.Modalcntrl.create({
        component: ActionquoteComponent,
        componentProps: act
      });

      this.ActionToClosePop(true);
      return await modal.present();
    }
    if (viewtype2 === 2) {
      
    }
    if (viewtype2 === 3) {
      const alert = await this.alertCtrl.create({
        message: 'Are you sure you want to Copy Quote?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: blah => {
              console.log('Confirm Cancel: Cancelled');
            }
          },
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

            }
          }
        ]

      });
      alert.present();
    }

  }
  ActionToClosePop(isSelect: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      isSelect: isSelect
    });
  }
}