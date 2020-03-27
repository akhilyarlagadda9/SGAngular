import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, PopoverController, ActionSheetController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'
import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { OverlayEventDetail } from '@ionic/core';
import { MapComponent } from '../../map/map.component';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component';
import { ManagementsummaryComponent } from '../managementsummary/managementsummary.component';
import { ActionquoteComponent } from '../actionquote/actionquote.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { CommhubComponent } from '../commhub/commhub.component';
import { OtherComponent } from '../other/other.component';
//import { CallNumber } from '@ionic-native/call-number/ngx';
declare var _qscope: any;
@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService,
    private navCtrl: NavController, private repService: QuoterepService,
    public actionSheetCtrl: ActionSheetController, private qrepservice: QuoterepService) { }
  qprmsobj = this.navParams.data;
  headerInfo: any={QuoteContacts:[]};
  versionList: any = []; phaseList: any = [];
  selectedtabtype: number;selChildTabId: number = 1;
  //QuoteVersionID: number = this.qprmsobj.versionid;
  @ViewChild(CommhubComponent, { static: false }) commHubCom: CommhubComponent; 
  @ViewChild(OtherComponent, { static: false }) otherCom: OtherComponent;
  public contacts: any;
  public SelectedTypeID: number;
 //#region Actions
  ngOnInit() {
    if (this.navParams.data.layoutId == 1) {
      this.selectedtabtype = this.navParams.data.layoutId;
    }
    this.ActionQuoteInfo();
    if (this.qprmsobj.viewtypeid == 2) {
      this.ActionGetPhaseList();
    }
  }
  ActionAreaList(typeId: number) {
    this.service.ActionQuoteAreaList(this.qprmsobj.versionid, this.qprmsobj.phaseid).subscribe(data => {
      data;
      _qscope.quote.Version.AreaList = data;
      _qscope.quote.Version.AreaID = 0;
      if (typeId == 0) {
        this.selectedtabtype = 2;
      }

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
        this.versionList = this.headerInfo.VersionList;
        this.headerInfo.Version = this.headerInfo.VersionList.find(x => x.ID === this.qprmsobj.versionid);
        this.SetVersionInfo(0);
        this.headerInfo.FullAddres = this.qrepservice.GetQuoteAddress(this.headerInfo);
      },
      error => console.log(error));
  }
  ActionLoadTabInfo(componet: any) {
    this.selectedtabtype = componet; this.selChildTabId = 1;
    if (componet == 1) {
      this.ActionLoadVersion(this.qprmsobj.versionid);
    }
  }
  ActionLoadVersion(id) {
    this.qprmsobj.versionid = id;
    this.service.ActionVersionInfo1(this.qprmsobj.quoteid, id, 0).subscribe(data => {
      this.headerInfo.Version = data;
      this.qprmsobj.statusId = data.StatusID;
      this.SetVersionInfo(1);
    })
  }
  AreaSummarySelect(ev) {
    if (ev == "success") {
      this.ActionLoadTabInfo(2);
    }
  }
  ActionLoadCommHub(typeId) {
    this.selChildTabId = typeId;
    this.commHubCom.ActionLoadHubInfo(typeId);
  }
  ActionLoadOtherTab(typeId) {
    this.selChildTabId = typeId;
    this.otherCom.ActionLoadTabInfo(typeId);
  }
  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  callNow(number) {
    // this.callNumber.callNumber(number, true)
    //   .then(res => console.log('Launched dialer!', res))
    //   .catch(err => console.log('Error launching dialer', err));
    //   console.log(number)
  }
//#endregion
//#region  popups
async ActionQuoteHeader() {
  const modal = await this.Modalcntrl.create({
    component: HeadereditComponent

  });
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    if (detail !== null) {
      if (detail.data.issave == true) {
     
      }
    }
  });
  return await modal.present();
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
//Job edit Function
async ActionEditJob() {
  let obj = JSON.parse(JSON.stringify(this.headerInfo));
  const modal = await this.Modalcntrl.create({
    component: HeadereditComponent,
    componentProps: obj,
  });
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    if (detail !== null) {
      if (detail.data.issave == true) {
        this.headerInfo =  this.qrepservice.ResetQuote(this.headerInfo,detail.data.componentProps);
       // this.headerInfo = detail.data.componentProps;
        //this.contacts = detail.data.componentProps.ContactList;
      }
    }
  });
  return await modal.present();
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
  // let custinfo = info;
  // custinfo.ContactList = contactList;
  // let copyobj = JSON.parse(JSON.stringify(custinfo))
  //let obj = {version:this.headerInfo.Version,customerinfo:copyobj,SelectedTypeID:this.SelectedTypeID}
  let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
  let obj = { header: copyobj, SelectedTypeID: this.SelectedTypeID }
  const modal = await this.Modalcntrl.create({
    component: CustomereditComponent,
    componentProps: obj,
  })
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    if (detail !== null) {
      if (detail.data.issave == true) {
        this.headerInfo =  this.qrepservice.ResetQuoteCutomer(this.headerInfo,detail.data.componentProps)
      }
    }
  });
  return await modal.present();
}
//Quote Summary 
async ActionSummaryEdit() {
  let version = { Version: this.headerInfo.Version, VersionId: this.qprmsobj.versionid, header: this.headerInfo }
  let copyver = JSON.parse(JSON.stringify(version));
  const modal = await this.Modalcntrl.create({
    component: ManagementsummaryComponent,
    componentProps: copyver
  });
  return await modal.present();
}
//Quote Actions
async ActionNewAction() {
  let version = this.headerInfo.Version;
  let delFlag = version.StatusID != 2 && version.StatusID != 6 && this.headerInfo.IsApproved == false && version.IsLock == 0 ? "Decline Quote" : "";
  let cancelFlg = (version.StatusID != 4 || version.StatusID == 6) && version.IsLock == 0 ? "Cancel Quote" : "";
  let bidFlg = (version.StatusID == 2 || version.StatusID == 4) && version.IsLock == 0 ? "Bidding Quote" : "";
  let appFlag = version.StatusID != 6 && this.headerInfo.IsApproved == false && version.IsLock == 0 ? "Approve Quote" : "";
  let actionSheet = this.actionSheetCtrl.create({
    //title: 'Actions',
    cssClass: 'action-sheets-basic-page',
    buttons: [
      {
        text: bidFlg,
        cssClass: 'color-green',
        handler: () => { this.ActionQuoteStatuses(1, 'Bidding'); }
      },
      {
        text: appFlag,
        cssClass: 'color-green',
        handler: () => { this.ActionQuoteStatuses(6, 'Approved'); }
      },
      {
        text: cancelFlg,
        role: 'destructive',
        handler: () => { this.ActionQuoteStatuses(4, 'Cancelled'); }
      },
      {
        text: delFlag,
        cssClass: 'color-orange',
        handler: () => { this.ActionQuoteStatuses(2, 'Declined'); }
      },
      {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        handler: () => { }
      }
    ]
  });
  (await actionSheet).present();
}
//#endregion
//#region Set Methods
  SetCustomerDetails(typeId, model) {
    this.headerInfo.CustomerContacts = model.componentProps;
    this.contacts = model.componentProps.ContactList;
  }
  SetVersionInfo(typeId) {
    _qscope.quote = this.headerInfo;
    if (this.navParams.data.layoutId == 2 || typeId == 1) {
      this.ActionAreaList(typeId);
    }
    this.repService.setHeader(this.headerInfo);
  }
//#endregion
//#region Quote Actions
  actionObj: any = {};
  ActionQuoteStatuses(statusId, status) {
    let result = false;
    if (statusId == 6) {
      result = this.qrepservice.approvechecklist(this.headerInfo);
    }
    this.actionObj.alertflag = false;
    this.actionObj = this.GetActionObj(statusId, status);
    this.StatusAlertAction();
  }
  async StatusAlertAction() {
    let info = { action: this.actionObj, header: this.headerInfo }
    const modal = await this.Modalcntrl.create({
      component: ActionquoteComponent,
      componentProps: info
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.issave == true) {
          this.headerInfo.Version.StatusID = this.actionObj.StatusId;
          this.headerInfo.Version.Status = this.actionObj.ActionName;
          this.qprmsobj.statusId = this.actionObj.StatusId;
        }
      }
    });
    return await modal.present();
  }
  GetActionObj(statusId, status) {
    if (statusId == 6) {
      this.service.ActionGetProjectTypes(1).subscribe(data => {
        let firststage = data;
        this.actionObj.StageID = firststage[0].ID;
        this.actionObj.Name = firststage[0].Name;
      })
    }
    this.actionObj.PreferID = 0;
    this.actionObj.HoldDate = new Date().toUTCString();
    this.actionObj.FollowUpDate = new Date();
    this.actionObj.ActionName = status;
    this.actionObj.Description = "";
    this.actionObj.LayApproval = 0;
    this.actionObj.CustPickup = 0;
    this.actionObj.StatusId = statusId;
    this.actionObj.MFlag = 0;
    this.actionObj.IsMaterialView = false;
    this.actionObj.IsConfirmView = true;
    this.actionObj.showjobReady = statusId == 6 ? true : false;
    this.actionObj.Coview = false;
    return this.actionObj;
  }
  //#endregion
//#region  JobView
  ActionGetPhaseList() {
    this.service.ActionGetPhaseList(this.qprmsobj.versionid).subscribe(data => {
      this.phaseList = data;
    })
  }
  ActionLoadPhase(id) {
    this.qprmsobj.phaseid = id;
    this.ActionAreaList(1);
  }
  //#endregion
}