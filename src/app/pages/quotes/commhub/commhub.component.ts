import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CommhubeditComponent} from '../commhubedit/commhubedit.component'
import {CommonEditMailHubComponent} from '../common-edit-mail-hub/common-edit-mail-hub.component';
//import { QuotegetService } from 'src/app/service/quoteget.service';
import { MaileditComponent } from '../mailedit/mailedit.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuoteService } from 'src/app/service/quote.service';
// import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
// import { File } from '@ionic-native/file/ngx';
// import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';

declare const imgUrl: any;
@Component({
  selector: 'app-commhub',
  templateUrl: './commhub.component.html',
  styleUrls: ['./commhub.component.scss'],
  inputs: [`VersionId`,`PhaseId`]
})
export class CommhubComponent implements OnInit {
  VersionId: any; PhaseId:number; processtypeList: any;  docFormList: any;  phaseList: any;  selectedhubtype: number = 1;  type: any;  
  notesList: any; msgList:any = []; 
  msgStatusList: any;CategoryID:number = 0;quoteInfo:any;
  commDetails: any;
  categoryList: any;
  details: any;
  typeId: any;
  imgPath:string;
  pictureList:Array<any>=[];
 
  //selectedoption: any;
  constructor(public Modalcntrl : ModalController,private qservice: QuoteService,private qRepService:QuoterepService) { }

  ngOnInit() {
    this.quoteInfo = this.qRepService.getHeader();
    this.imgPath = imgUrl + "Jobs/" + this.quoteInfo.QuoteNo + "/";
    this.GetprocessstatusList();
    this.GetformsList();
    this.GetphaseList();
    this.GetQuoteNoteList();
    //this.GetPictureList();
  }
  ActionChangeCategory(event){
    this.CategoryID = event;
    this.GetQuoteNoteList();
  }
  //Tab selection Function
  ActionLoadHubInfo(componet: any){
    this.selectedhubtype = componet;
  console.log(this.pictureList);
}

ActionPreviewFile(fileName){
  let fullPath = this.imgPath+ encodeURIComponent(fileName);
  window.open(fullPath, '_blank');
}
  //Category List Function
  GetcategoryList() {
    this.qservice.NotecategoryList(0).subscribe(
      data => {
        this.categoryList = data;
        this.GetSelectedCategoryName();
        console.log(this.categoryList)
      }
    );
  }
  GetSelectedCategoryName() {
    let commDetails = this.categoryList.find(s => s.ID == this.commDetails.categoryID);
    if (commDetails != null) {
      this.commDetails.category = commDetails.Name;
    }
  }

   //Comm.Hub Edit Function
  async ActionEditCommHub(note: any) {
    if(note == 0){
      let msg = this.quoteInfo.QuoteNo + " - V " + this.quoteInfo.Version.SrNo + " - " + this.quoteInfo.QuoteName;
      let source = this.PhaseId > 0 ? "job" :"";
      note ={ID:0,RefID:this.VersionId,Subject:msg,PhaseID:this.PhaseId,ModuleID:3,StatusID:94,
      Path:"normal.png",categoryID:0,Source:source,LocID:this.quoteInfo.LocID,AttachmentList:[],TypeID:0}
    }else{
      note = JSON.parse(JSON.stringify(note));
    }
  //  let commDetails = {versionId : this.VersionId,commDetails: note}   
    const modal = await this.Modalcntrl.create({
      component: CommhubeditComponent,
      componentProps : note
    });
    console.log(note)
    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
          this.GetQuoteNoteList();
        }
        console.log(this.notesList);
      }
    });
    return await modal.present();
  }
 //Comm.Hub Mail Function
  async ActionEditCommHubMail(note: any) {
    if(note == 0){
      let msg = this.quoteInfo.QuoteNo + " - V " + this.quoteInfo.Version.SrNo + " - " + this.quoteInfo.QuoteName;
      let source = this.PhaseId > 0 ? "job" :"";
      note ={ID:0,RefID:this.VersionId,Subject:msg,PhaseID:this.PhaseId,ModuleID:3,StatusID:94,
      Path:"normal.png",categoryID:0,Source:source,LocID:this.quoteInfo.LocID,AttachmentList:[],TypeID:0}
    }else{
      note = JSON.parse(JSON.stringify(note));
    }
    //let commDetails = {versionId : this.VersionId,commDetails: note};
    //console.log(commDetails);   
    const modal = await this.Modalcntrl.create({
      component: CommonEditMailHubComponent,
      componentProps : note,
    });
    modal.onDidDismiss().then((result: OverlayEventDetail) => {
      if (result.data !== null && result.data != undefined) {
        if (result.data.issave == true) {
          this.GetQuoteNoteList();
        }
      }
    });
    return await modal.present();
  }
 
 //Status List Function
  GetprocessstatusList() {
    this.qservice.ProjectProcessList(1).subscribe(
      data => {
        this.processtypeList = data;
      }
    );
  }
 //Document Forms List Function
  GetformsList() {
    this.qservice.FormsList(1).subscribe(
     data => {this.docFormList = data;}
   );
  }
 //Phase List Function
  GetphaseList() {
    this.qservice.CommHubPhaseList(this.VersionId).subscribe(
      data => { this.phaseList = data; }
    );
  }
  //Quote Notes List
  GetQuoteNoteList() {
    this.qservice.ActionCommunicationMessageList1(this.VersionId,this.CategoryID,this.PhaseId,0,this.quoteInfo.CustomerID,this.quoteInfo.ID).subscribe(data => {
      this.notesList = data.filter(x => x.TypeID != -2 && x.TypeID != -7);
      this.msgList = data.filter(x => x.TypeID == -1 || x.TypeID == -2 || x.IsSent == 1);
      this.GetPictureList();
    });
    
  //   this.getservice.QuoteNotes(this.VersionId,0).subscribe(
  //     data => { 
  //       this.notesList = data;
  //     }
  //   );
   }
   GetPictureList(){
    this.notesList = this.notesList == null ? [] : this.notesList;
    this.notesList.forEach(notes => {
      notes.AttachmentList.forEach(attach => {
        let path = "";
        let objDetails = {};
        let arrExt = attach.FileName.split(".");
        let strExt = "|gif|GIF|bmp|jpeg|jpg|png|PNG|JPG|JPEG|pdf|PDF|xlsx";
        if(strExt.includes("|"+ arrExt[1] +"|")){
          if(attach.ThumbPath){
           path = this.imgPath+ encodeURIComponent(attach.ThumbPath);
          }else{
            path = this.imgPath+ attach.FileName;
          }
          objDetails["Name"] = arrExt[0];
          // if(arrExt[1] == "pdf" || arrExt[1] == "PDF"){
          //   objDetails["Path"] = "assets/img/Pdf.png";
          // }else if(arrExt[1]=="xlsx"){
          //   objDetails["Path"] = "assets/img/XL.png";
          // }else{
          objDetails["Path"] = path;
         // }
         this.pictureList.push(objDetails);
        }
      });
    });
  }
 
}
