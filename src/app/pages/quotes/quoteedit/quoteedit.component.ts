import { Component, OnInit, ViewChild, PipeTransform } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, PopoverController, ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
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
import { AuthService } from 'src/app/service/auth.service';
//import { CallNumber } from '@ionic-native/call-number/ngx';
declare var _qscope: any;
@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit, PipeTransform {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private sanitizer: DomSanitizer,
    private navCtrl: NavController, private repService: QuoterepService,
    public actionSheetCtrl: ActionSheetController, private qrepservice: QuoterepService, private authService: AuthService) { }

  qprmsobj = this.navParams.data;
  headerInfo: any = { QuoteContacts: [] };
  versionList: any = []; phaseList: any = [];
  selectedtabtype: number; selChildTabId: number = 1;
  //OCInfoAdd:any;
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
  // ActionAreaList(typeId: number) {
  //   this.service.ActionQuoteAreaList(this.qprmsobj.versionid, this.qprmsobj.phaseid).subscribe(data => {
  //     data;
  //     _qscope.quote.header.Version.AreaList = data;
  //     _qscope.quote.header.Version.AreaID = 0;
  //     if (typeId == 0) {
  //       this.selectedtabtype = 2;
  //     }

  //   })
  // }
  ActionAreaList(typeId: number) {
    _qscope.quote.header.Version.AreaList = this.qrepservice.areaslist;
    _qscope.quote.header.Version.AreaID = 0;
    // if (typeId == 0) {
    //   this.selectedtabtype = 2;
    // }
  }
  ActionGoToHome() {
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }
  ActionQuoteInfo() {
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid, this.qprmsobj.quoteno, this.qprmsobj.versionid, 0, 0, 0).subscribe(
      data => {
        this.headerInfo = data; _qscope.quote = {};
        this.headerInfo.FullAddres = this.qrepservice.GetQuoteAddress(this.headerInfo);
        this.versionList = this.headerInfo.VersionList;
        this.service.ActionVersionInfo2(this.qprmsobj.versionid, this.qprmsobj.quoteid, 0).subscribe(data => {
          this.headerInfo.Version = data;
          this.calclastpaymentscheduleamt(this.headerInfo.Version.VersionPaymentScheduleList);
          this.repService.SetAreasList(data.AreaList);
          this.SetVersionInfo(0);
        })
      },
      error => console.log(error));
  }
  calclastpaymentscheduleamt(quotepayschedulelist) {
    //ref fee
    let refFeepencentage = this.findpercentageval(this.headerInfo.Version.TotalAmt - this.headerInfo.Version.RefAmt, this.headerInfo.Version.TotalAmt);
    //discount
    let areadiscount = this.getareadiscountAmt();
    let schcount = this.getschpaycount(quotepayschedulelist);
    //disc,tax
    let discamt = this.qrepservice.roundToTwo((this.headerInfo.Version.DiscountAmt - areadiscount) / schcount);
    let taxamt = this.qrepservice.roundToTwo(this.headerInfo.Version.TaxAmt / schcount);
    //calculations
    for (let i = 0; i < quotepayschedulelist.length; i++) {
        let payschdule = quotepayschedulelist[i];
        let obj = this.getareapaymentscheduletotalamt(payschdule.PaymentTypeID);
        let totalamount = obj.totalamt;
        if (totalamount != 0) {
            //fee
            totalamount = totalamount + this.qrepservice.convertToFloat(obj.totalamtwithdiscount * (refFeepencentage / 100));
            //total - disc
            totalamount = this.qrepservice.convertToFloat(totalamount + taxamt - discamt);
            //totals
            payschdule.SignAmt = totalamount * (payschdule.DueSigning / 100);
            payschdule.TemplateAmt = totalamount * (payschdule.DueTeamplate / 100);
            payschdule.OtherAmt = totalamount * (payschdule.DueOther / 100);
            payschdule.FinalAmt = totalamount * (payschdule.DueInstall / 100);
            payschdule.NetTermAmt = totalamount;
        }
    }        
}
getareadiscountAmt() {
  let areadiscamt = 0;
  let areas = this.headerInfo.Version.AreaList;
  for (let i = 0; i < areas.length; i++) {
      areadiscamt += areas[i].AreaDiscAmt;
  }
  return areadiscamt;
}
findpercentageval(cost, price) {
    let markValue = 0;
    markValue = ((price - cost) / cost) * 100;
    markValue = this.qrepservice.roundToTwo(markValue);
    return markValue;
}
getschpaycount(quotepayschedulelist) {
  let count = 0;
  for (let i = 0; i < quotepayschedulelist.length; i++) {
      let payschdule = quotepayschedulelist[i];
      let obj = this.getareapaymentscheduletotalamt(payschdule.PaymentTypeID);
      if (obj.totalamt != 0) {
          count += 1;
      }
  }
  return count;
}
getareapaymentscheduletotalamt(paymenttypeid) {
  let obj = { totalamt: 0, totalamtwithdiscount: 0 };
  let areas = this.headerInfo.Version.AreaList;
  for (let i = 0; i < areas.length; i++) {
      if (areas[i].PaymentTypeID == paymenttypeid) {
          obj.totalamt += areas[i].TotalAmt;
          obj.totalamtwithdiscount += areas[i].TotalAmt + areas[i].AreaDiscAmt;
      }
  }
  return obj;
}
  ActionLoadTabInfo(componet: any) {
    this.selectedtabtype = componet; this.selChildTabId = 1;
    if (componet == 1 || componet == 2) {
      this.ActionLoadVersion(this.qprmsobj.versionid);
    }
  }
  ActionLoadVersion(id) {
    this.qprmsobj.versionid = id;
    this.service.ActionVersionInfo2(this.qprmsobj.versionid, this.qprmsobj.quoteid, 0).subscribe(data => {
      this.headerInfo.Version = data;
      this.repService.SetAreasList(data.AreaList);
      this.calclastpaymentscheduleamt(this.headerInfo.Version.VersionPaymentScheduleList);
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

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  //Job Description Edit Function
  async ActionEditJobDesc(typeId: any) {
    let ver = { TypeID: typeId, Version: this.headerInfo.Version }
    //ver.Version.Description = this.transform(ver.Version.Description); // Get the Value we wanted(with styles)
    console.log(ver);
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
          this.headerInfo = this.qrepservice.ResetQuote(this.headerInfo, detail.data.componentProps);
        } else { this.headerInfo.PoItemList = detail.data.componentProps.PoItemList }
      }
    });
    return await modal.present();
  }
  //Map Function
  async ActionLoadMap() {
    let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
    let obj = { headerInfo: copyobj, MapCalled: "Quote" };
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
          this.headerInfo = this.qrepservice.ResetQuoteCutomer(this.headerInfo, detail.data.componentProps);
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
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.issave == true) {
          this.headerInfo.Version = detail.data.componentProps;
        }
      }
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
    let appButtons = [
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
    appButtons = appButtons.filter(x => x.text != "");
    let actionSheet = this.actionSheetCtrl.create({
      //title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: appButtons,
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
    _qscope.quote.header = this.headerInfo;
    if (this.navParams.data.layoutId == 2 || typeId == 1 || typeId == 0) {
      this.ActionAreaList(typeId);
    }
    this.UpdateColor();
    this.repService.setHeader(this.headerInfo);
    this.headerInfo.Version = this.repService.PaymentScheduleInfo(this.headerInfo.Version);
  }
  UpdateColor() {
    let statusId = this.headerInfo.Version.StatusID;
    this.headerInfo.StatusColor = statusId == 6 ? "success" : (statusId == 4 ? "danger" : (statusId == 2 ? "warning" : "primary"));
    let color = statusId == 6 ? "#10dc60" : (statusId == 4 ? "#f04141" : (statusId == 2 ? "#ffce00" : "#3880ff"));
    document.documentElement.style.setProperty("--statuscolor", color);
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
          this.UpdateColor();
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