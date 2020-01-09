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
//import { QuoterepService } from 'src/app/service/quoterep.service';

declare var _qscope: any;

@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private service: QuoteService, private navCtrl: NavController, private popoverCntrl : PopoverController) { }
  quoteId: number;
  quoteno: string;
  shownGroup = 1;
  qprmsobj = this.navParams.data;
  headerInfo: any;
  selectedtabtype: number = 1;
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
    this.ActionQuoteInfo();
  }



  ActionGoToHome() {
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }



  ActionQuoteInfo() {
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid, this.qprmsobj.quoteno, this.qprmsobj.versionid, 0, 0, 0).subscribe(
      data => {
        this.headerInfo = data; _qscope.quote = {};
        this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === this.qprmsobj.versionid)[0];
        _qscope.quote = this.headerInfo;
      },
      error => console.log(error));
  }

  /*****tabs****** */
  ActionLoadTabInfo(componet: any) {
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
        if (detail.data.issave == true) {
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
  AreaSummarySelect(ev) {
    if (ev == "success") {
      this.ActionLoadTabInfo(2);
    }
  }
  async ActionNewAction() {
    const popover = await this.popoverCntrl.create({
      component: NewactionComponent,
      translucent: true,
      showBackdrop: false,
      cssClass: "popover_class3"
    });
    return await popover.present();
  }
}


@Component({
  template: `
  <ion-grid class="acc-pop">
    <ion-row class="pad2" (click)="createaction(1,'Cancelled')"><span style="color:red"><b>Cancel Quote</b></span></ion-row>
    <ion-row class="pad2" (click)="createaction(2,'a')"><span style="color:Blue"><b>Duplicate Version</b></span></ion-row>
    <ion-row class="pad2" (click)="createaction(3,'Cancelled')"><span style="color:green"><b>Copy Quote</b></span></ion-row>
  </ion-grid>`,
  styleUrls: ['./quoteedit.component.scss'],
})
export class NewactionComponent implements OnInit {
  navObj = this.navParams.data;
  constructor(private alertCtrl: AlertController,private navParams: NavParams,public Modalcntrl: ModalController, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() { }



  async createaction(viewtype2:number, viewtype: string, ) {
    let act ={ViewType:viewtype, viewtype2:viewtype2}
    if (viewtype2 === 1) {
      const modal = await this.Modalcntrl.create({
        component: ActionquoteComponent,
        componentProps: act
      });
      
    this.ActionToClosePop(true);
    return await modal.present();
    }
    if (viewtype2 === 2) {
      const alert = await this.alertCtrl.create({
        message: 'Are you sure you want to Duplicate the Version?',
        buttons:[
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
    if (viewtype2 === 3) {
      const alert = await this.alertCtrl.create({
        message: 'Are you sure you want to Copy Quote?',
        buttons:[
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