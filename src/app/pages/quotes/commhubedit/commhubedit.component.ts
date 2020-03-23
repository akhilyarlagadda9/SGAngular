import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { AuthService } from 'src/app/service/auth.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
declare const appUrl: any;

@Component({
  selector: 'app-commhubedit',
  templateUrl: './commhubedit.component.html',
  styleUrls: ['./commhubedit.component.scss'],
})
export class CommhubeditComponent implements OnInit {
  
  categoryList: any; docFormList: any; msgStatusList: any; phaseList: any;
  commDetails: any = this.navParams.data;; notesList: any; StatusID: any;
  userInfo: any; header: any;


  fileData: File = null; url = appUrl;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  loaderToShow: Promise<void>;

  constructor(public Modalcntrl: ModalController, private qservice: QuoteService,public loadingController: LoadingController,
    private navParams: NavParams, private authservice: AuthService, private qRepService: QuoterepService, private http: HttpClient) {

  }

  ngOnInit() {
    this.authservice.GetStoredLoginUser().then((data) => {
      this.userInfo = data;
      if (this.commDetails.ID == 0) {
        this.commDetails.UserID = data.logInUserID;
      }
    });
    this.header = this.qRepService.getHeader();
    this.GetcategoryList();
    this.GetformsList();
    this.GetstatusList();
    this.GetphaseList();
  }
  //Close Function
  ActionCloseCommhubedit(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave:issave
    });
  }
  //Category List Function
  GetcategoryList() {
    this.qservice.NotecategoryList(0).subscribe(
      data => {
        this.categoryList = data;
        this.GetSelectedCategoryName();
      }
    );
  }
  GetSelectedCategoryName() {
    let commDetails = this.categoryList.find(s => s.ID == this.commDetails.categoryID);
    if (commDetails != null) {
      this.commDetails.category = commDetails.Name;
    }
  }
  //Phase List Function
  GetphaseList() {
    this.qservice.CommHubPhaseList(this.commDetails.RefID).subscribe(
      data => {
        this.phaseList = data;
        this.GetSelectedPhaseName();
      }
    );
  }
  GetSelectedPhaseName() {
    let commDetails = this.phaseList.find(s => s.ID == this.commDetails.PhaseID);
    if (commDetails != null) {
      this.commDetails.Phase = commDetails.Name;
    }
  }
  //Document Forms List Function
  GetformsList() {
    this.qservice.FormsList(1).subscribe(
      data => {
        this.docFormList = data;
        this.ActionChangeTempl(this.commDetails.FromID,0);
      }
    );
  }
  //Status List Function
  GetstatusList() {
    this.qservice.QuoteMasterList(11).subscribe(
      data => {
        this.msgStatusList = data;
        this.GetSelectedStatusName();
      }
    );
  }
  GetSelectedStatusName() {
    let commDetails = this.msgStatusList.find(s => s.ID == this.commDetails.StatusID);
    if (commDetails != null) {
      this.commDetails.Status = commDetails.Name;
    }
  }
  //Attachments Function
  ActionUploadCommhubAttach(event: any) {
    if (this.commDetails.ID == 0) {
      let info = this.commDetails;
      this.qservice.DocHeader(info.ID, info.RefID, info.categoryID, this.userInfo.logInUserID, info.Subject, info.TypeID).subscribe(data => {
        this.commDetails.ID = data;
        this.UploadImage(event);
      });
    } else {
      this.UploadImage(event);
    }

  }
  UploadImage(event) {
    this.showLoader();
    if (event.target.files && event.target.files[0]) {
      let info = this.commDetails;
      this.fileData = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('files', this.fileData);
      this.fileUploadProgress = '0%';
      this.http.post(this.url + 'api/fileUpload/UploadAttatchments?Id=' + info.ID + "&versionId=" + info.RefID + "&typeId=" + info.TypeID + "&quoteNo=" + this.header.QuoteNo + "&jobstatusId=" + this.header.Version.JobStatusID, formData, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe(events => {
          if (events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
            console.log(this.fileUploadProgress);
          } else if (events.type === HttpEventType.Response) {
            this.fileUploadProgress = '';
            if (events.body != null) {
              this.PushImage(events.body);
            }
            // alert('SUCCESS !!');
          }
        });

    }
  }
  PushImage(result) {
    var result = result.toString().replace('[', "").replace(']', "");
    let array = result.split('+');
    let name = array[0].replace(/"/g, '');
    var model = {
      ID: Number(result[2].replace(/"/g, '')), FileName: name,
      Check: 1, ThumbPath: "thumb_" + name, QuoteNo: this.header.QuoteNo, TypeID: this.commDetails.TypeID,
    };
    this.commDetails.AttachmentList.push(model);
    this.hideLoader();
    
  }

  ActionSaveQuoteNote(){
    this.qservice.SaveQuoteNote(this.commDetails).subscribe(data => {
      this.commDetails.ID = data;
      this.ActionCloseCommhubedit(true);
  });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'please wait'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }
  async hideLoader() {
    this.loadingController.dismiss();
  }



  ActionChangeTempl(event,typeId){
    let docInfo = this.docFormList.find(s => s.ID == event);
    if (docInfo != null) {
      this.commDetails.formtype = docInfo.Name;
      if(typeId == 1){
        this.commDetails.Subject = this.header.QuoteNo + " - V " + this.header.Version.SrNo + " - " + this.header.QuoteName + " - " +  docInfo.Name;
      }
    }
  }
  
  
}
