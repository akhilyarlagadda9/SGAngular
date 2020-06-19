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
import { LeadService } from 'src/app/service/lead.service';
@Component({
    selector: 'app-LeadEdit',
    templateUrl: './LeadEdit.component.html',
    styleUrls: ['./LeadEdit.component.scss'],
    providers: [DatePipe]
  })

  export class LeadEditComponent implements OnInit{
    constructor(public Modalcntrl: ModalController, private navParams: NavParams,private service: QuoteService, private qrepservice: QuoterepService,private sanitizer:DomSanitizer,
        private repService: QuoterepService,private leadService:LeadService){}
        @ViewChild(CommhubComponent, { static: false }) commHubCom: CommhubComponent; 
    qprmsobj = this.navParams.data;headerInfo: any;
    selectedtabtype: number;;selChildTabId: number=1;
    public SelectedTypeID: number; PhaseID:any; fullAddress:any; Notes:any = {};
    ngOnInit() {
        console.log(this.qprmsobj);
        this.ActionLeadInfo(); // get Header Info for Quote
        //this.ActionGetPhaseList(); // Get Pahse List
    }

    ActionLeadInfo() {
            this.selectedtabtype = 1
            this.leadService.GetLeadInfo(this.qprmsobj.LeadID).subscribe(data=>{
            console.log(data);
            this.headerInfo = data;
            this.fullAddress = this.headerInfo.CustomerContacts[0].Address;
            this.Notes["Description"] = this.headerInfo.LeadNotes;
            this.PhaseID = 0;
            this.UpdateColor();
          });
    }

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
      //   let header = {
      //       Customer:this.headerInfo.CustomerContacts[0],
      //   };
      //   let copyobj = JSON.parse(JSON.stringify(header));
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
        let copyobj = JSON.parse(JSON.stringify(this.fullAddress));
        console.log(this.qprmsobj);
        let obj = {CustName:this.qprmsobj.CustName,leadID:this.qprmsobj.LeadID,headerInfo: copyobj,MapCalled:"Lead"};
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
        let ver = { TypeID: typeId, Version: {Description:this.Notes.Description} }
        ver.Version.Description = this.transform(this.Notes.Description); // Get the Value we wanted(with styles)
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
        // if (componet == 1) {
        //   this.ActionLoadVersion(this.qprmsobj.versionid);
        // }
      }

      // ActionLoadVersion(id) {
      //   this.qprmsobj.versionid = id;
      //   this.service.ActionVersionInfo1(this.qprmsobj.LeadID, id, 0).subscribe(data => {
      //     console.log(data);
      //     //this.headerInfo.Version = data;
      //     //this.qprmsobj.statusId = data.StatusID;
      //     //this.repService.setHeader(this.headerInfo); // To set the Header from One Tab to Another
      //   })
      // }

      ActionLoadCommHub(typeId) { //Load View
        this.selChildTabId = typeId;
        console.log(typeId);
        this.commHubCom.ActionLoadHubInfo(typeId);
      }
      
  }
