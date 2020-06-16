import { OnInit, Component, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { DatePipe } from '@angular/common';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { MapComponent } from '../../map/map.component';
import { DomSanitizer } from '@angular/platform-browser';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component';
import { CommhubComponent } from '../commhub/commhub.component';
@Component({
    selector: 'app-LeadEdit',
    templateUrl: './LeadEdit.component.html',
    styleUrls: ['./LeadEdit.component.scss'],
    providers: [DatePipe]
  })

  export class LeadEditComponent implements OnInit{
    constructor(public Modalcntrl: ModalController, private navParams: NavParams,private service: QuoteService, private qrepservice: QuoterepService,private sanitizer:DomSanitizer,
        private repService: QuoterepService){}
        @ViewChild(CommhubComponent, { static: false }) commHubCom: CommhubComponent; 
    qprmsobj = this.navParams.data;headerInfo: any={QuoteContacts:[]};
    versionList: any = []; phaseList: any = [];selectedtabtype: number = 1;selChildTabId: number = 1;
    public SelectedTypeID: number; PhaseID:any;
    ngOnInit() {
        console.log(this.qprmsobj);
        this.ActionLeadInfo(); // get Header Info for Quote
        //this.ActionGetPhaseList(); // Get Pahse List
    }

    ActionLeadInfo() {
            this.headerInfo = this.qprmsobj;
            this.GetJobAddress(this.headerInfo)
            this.PhaseID = 0;
          //  this.versionList = this.headerInfo.VersionList;
          //   this.headerInfo.Version = this.headerInfo.VersionList.find(x => x.ID === this.qprmsobj.versionid);
            this.UpdateColor();
      }

      GetJobAddress(header) {
        header.Address1 = header.LeadAddress == null || header.LeadAddress == "" ? "" : header.LeadAddress;
        header.City = header.LeadCity == null || header.LeadCity == "" ? "" : header.LeadCity + ",";
        header.State = header.LeadState == null || header.LeadState == "" ? "" : header.LeadState;
        header.Zipcode = header.LeadZipcode == null ? "" : header.LeadZipcode;
        var zipcodeComma = header.LeadZipcode != "" && (header.LeadState != "" || header.LeadCity != "") ? " - " : "";
        this.headerInfo.FullAddres = header.Address1 + header.City + header.State + zipcodeComma + header.Zipcode;
      }

      // ActionGetPhaseList() {
      //   this.service.ActionGetPhaseList(this.headerInfo.VersionID).subscribe(data => {
      //     console.log(data);
      //     this.phaseList = data;
      //   });
      // }

      UpdateColor(){
        let statusId = this.headerInfo.StatusID;
        this.headerInfo.StatusColor = statusId == 6 ? "success" : (statusId == 4 ? "danger" : (statusId == 2 ? "warning" : "primary"));
        let color = statusId == 6 ? "#10dc60" : (statusId == 4 ? "#f04141" : (statusId == 2 ? "#ffce00" : "#3880ff"));
        document.documentElement.style.setProperty("--statuscolor", color);
      }

      ActionCloseQuoteInfo() {
        this.Modalcntrl.dismiss({
          'dismissed': true
        });
      }

      // async ActionEditCustomer(typeId: number, info: any, contactList) { // Edit Customer Details
      //   // let custinfo = info;
      //   // custinfo.ContactList = contactList;
      //   // let copyobj = JSON.parse(JSON.stringify(custinfo))
      //   //let obj = {version:this.headerInfo.Version,customerinfo:copyobj,SelectedTypeID:this.SelectedTypeID}
      //   let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
      //   let obj = { header: copyobj, SelectedTypeID: this.SelectedTypeID }
      //   const modal = await this.Modalcntrl.create({
      //     component: CustomereditComponent,
      //     componentProps: obj,
      //   })
      //   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      //     if (detail !== null) {
      //       if (detail.data.issave == true) {
      //         this.headerInfo =  this.qrepservice.ResetQuoteCutomer(this.headerInfo,detail.data.componentProps);
      //       }
      //     }
      //   });
      //   return await modal.present();
      // }

      async ActionLoadMap() {   // Calling Map
        let copyobj = JSON.parse(JSON.stringify(this.headerInfo));
        let obj = {headerInfo: copyobj,MapCalled:"Quote"};
        const modal = await this.Modalcntrl.create({
          component: MapComponent,
          componentProps: obj,
        });
        return await modal.present();
      }

      transform(html) { // To bring color to the Description
        return this.sanitizer.bypassSecurityTrustHtml(html);
      } 

      async ActionEditJobDesc(typeId: any) {
        let ver = { TypeID: typeId, Version: this.headerInfo.Version }
        ver.Version.Description = this.transform(ver.Version.Description); // Get the Value we wanted(with styles)
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

      ActionLoadTabInfo(componet: any) { // To load the information froin
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
          this.repService.setHeader(this.headerInfo); // To set the Header from One Tab to Another
        })
      }

      ActionLoadCommHub(typeId) { //Load View
        this.selChildTabId = typeId;
        this.commHubCom.ActionLoadHubInfo(typeId);
      }
      
  }
