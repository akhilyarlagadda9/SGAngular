import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { element } from 'protractor';
declare const appUrl: any;
declare const imgUrl: any;

@Component({
  selector: 'app-common-edit-mail-hub',
  templateUrl: './common-edit-mail-hub.component.html',
  styleUrls: ['./common-edit-mail-hub.component.scss'],
})
export class CommonEditMailHubComponent implements OnInit {
  Template: String = ""; To: String = ""; From: String = ""; CC: String = ""; Subject: String = ""; mailBody: String = "";
  arrInfo: Array<any> = [];
  // public Editor = ClassicEditor; 
  isItemToAvailable: boolean = false; mailList: Array<any> = []; mailFilter: Array<any> = []; blnIsAtttachAvailable: boolean = false; getNoteAttachments: Array<any> = [];
  isItemCCAvailable: boolean = false; headerData: any;
  templateList: Array<any> = []; mailDetails: object = {}; emailList: Array<any> = [];
  @ViewChild('To', { static: false }) pRef: ElementRef;
  commDetails: any = this.navParams.data;
  previewDetails: Array<any> = [];

  fileData: File = null;
  userInfo: any;
  fileUploadProgress: string = null;
  url = appUrl;
  header: any;
  loaderToShow: Promise<void>;
  categoryList: any;
  phaseList: any;
  docFormList: any;
  msgStatusList: any;
  showPreview: any;
  imgPath: string;
  filePath: string = "";
  fileName: string = "";
  progressNumber: Number = 0;
  prefEmails: any;
  AttachmentList: any;

  constructor(private alertCtrl: AlertController,public Modalcntrl: ModalController, private authservice: AuthService, private http: HttpClient, public loadingController: LoadingController, private qservice: QuoteService, private qteService: QuoteService, private navParams: NavParams, private qRepService: QuoterepService, private qGetService: QuotegetService) { }

  ngOnInit() {
    document.getElementById("progress").style.visibility = "hidden";
    this.authservice.GetStoredLoginUser().then((data) => {
      this.userInfo = data;
      if (this.commDetails.ID == 0) {
        this.commDetails.UserID = data.logInUserID;
      }
    });

    this.mailDetails = {
      From: "",
      To: "",
      CC: "",
      Subject: "",
      mailBody: ""
    };

    this.headerData = this.qRepService.getHeader();
    this.header = this.qRepService.getHeader();

    this.qteService.ActiongettemplateList(26).subscribe(data => { this.templateList = data; });
    this.qteService.ActionEmailList().subscribe(results => { this.prefEmails = results; });

    this.qteService.ActionGetQuoteCustContactList(this.header.VersionID).subscribe(data => {
      this.qteService.ActionGetEmailsEmployeeList(data).subscribe(item => {
        item.forEach(element => {
          this.mailList.push(element);
        });
        console.log(this.mailList);
      });
    });

    this.qGetService.NoteAttachements(this.headerData.ID).subscribe(data => {
      this.getNoteAttachments.push(data[0]);
    });

    this.GetcategoryList();
    this.GetformsList();
    this.GetstatusList();
    this.GetphaseList();

    this.imgPath = imgUrl + "Jobs/" + this.headerData.QuoteNo + "/";
  }
  ActionChangeTempl(selectedTemplate) {
    this.templateList.forEach(element => {
      if (selectedTemplate == element.Name) {
        this.Template = element.Name;
        this.To = element.To;
        this.From = element.From;
        this.CC = element.CC;
        this.Subject = this.Subject + " - " + element.Subject;
        this.mailBody = element.Body;
      }
    });
    this.mailDetails = {
      Template: this.Template,
      From: this.From,
      To: this.To,
      CC: this.CC,
      Subject: this.Subject,
      mailBody: this.mailBody
    }
    console.log(this.mailDetails);
  }



  getToItems(ev: any) {
    var result = ev.substring(ev.length, (ev.lastIndexOf(",") + 1));
    if (result == "") {
      this.To = "";
    }
    this.arrInfo = [];
    if (result && result.trim() != "") {
      this.isItemToAvailable = true;
      this.mailList.filter((item) => {
        console.log(item);
        var objInfo = {
          Name: "",
          Phone: "",
          Email: ""
        };
        if ((item.PriEmail).includes(result)) {
          //  if(item.PriPhone){
          //     item.PriPhone = "("+ item.PriPhone.substring(0,2);+")"+ item.PriPhone.substr(3,item.PriPhone.length);;
          //  }
          objInfo.Name = item.Name;
          objInfo.Phone = item.PriPhone;
          objInfo.Email = item.PriEmail;
          this.arrInfo.push(objInfo);
          console.log(item);
          //this.mailFilter.push( item.PriEmail);
        }
      });
      console.log(this.arrInfo);
    }
  }
  addMail(selectMail, intItemChk) {
    console.log(selectMail);
    this.arrInfo = [];
    if (intItemChk == 1) {
      if (!this.To) {
        this.To = this.To + selectMail + ",";
      }
      else {
        this.To = this.To + "\n" + selectMail + ",";
      }
    }
    else {
      if (!this.CC) {
        this.CC = this.CC + selectMail + ",";
      }
      else {
        this.CC = this.CC + "\n" + selectMail + ",";
      }
    }
    this.mailDetails = {
      Template: this.Template,
      From: this.From,
      To: this.To,
      CC: this.CC,
      Subject: this.Subject,
      mailBody: this.mailBody
    }
    this.arrInfo = [];
    this.isItemToAvailable = false;
    this.isItemCCAvailable = false;
  }

  getCCItems(ev: any) {
    var result = ev.substring(ev.length, (ev.lastIndexOf(",") + 1));
    if (result == "") {
      this.CC = "";
    }
    this.arrInfo = [];
    if (result && result.trim() != "") {
      this.isItemCCAvailable = true;
      this.mailList.filter((item) => {
        var objInfo = {
          Name: "",
          Phone: "",
          Email: ""
        };
        if ((item.PriEmail).includes(result)) {
          objInfo.Name = item.Name;
          objInfo.Phone = item.PriPhone;
          objInfo.Email = item.PriEmail;
          this.arrInfo.push(objInfo);
        }
      });
    }
  }

  ActionCloseMailPopup() {
    this.isItemToAvailable = false;
    this.isItemCCAvailable = false;
  }

  ActionSaveActivity(form: NgForm) {
    if (form.valid) {
      this.mailDetails["UserID"] = this.commDetails.UserID;
      this.mailDetails["LocID"] = 1;
      this.mailDetails["Body"] = this.mailBody;
      this.mailDetails["AttachmentList"] = this.AttachmentList;
      this.qteService.qsendEmail(this.mailDetails).subscribe(data => {
        if (data != "Send Success") {
          this.ConfirmSuccess(1);
        }else{
          this.ConfirmSuccess(2);
          this.ActionCloseCommhubedit(true);
        }
      });
    }
  }
  async ConfirmSuccess(typeId) {
    if(typeId == 1){
      const alert = await this.alertCtrl.create({
        header: "Failure sending mail !",
        buttons: [{
          text: 'OK',
        }]
      });
      alert.present();
    }else{
      const alert = await this.alertCtrl.create({
        header: "Email Sent Successfully.",
        buttons: [{
          text: 'OK',
        }]
      });
      alert.present();
    }
   
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
        this.ActionChangeTempl(this.commDetails.FromID);
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
  //Attcahments
  ActionOnAttach() {
    this.blnIsAtttachAvailable = true;

  }
  addAttach(file) {
    this.blnIsAtttachAvailable = false;
    console.log(file);
  }

  //Close add activity function
  ActionCloseCommhubedit(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      //componentProps: this.mailBody,
      issave: issave
    });
  }
  // config: AngularEditorModule = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '100%',
  //   //minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   autoFocus: true,
  //   toolbarHiddenButtons: [
  //     ['undo','redo','strikeThrough','subscript','superscript','justifyLeft','justifyCenter','justifyRight','justifyFull',
  //      'indent','outdent','insertUnorderedList','insertOrderedList','insertImage','insertVideo','insertHorizontalRule',
  //      'clearFormatting','toggleEditorMode'],
  //     ],
  // };

  //Attachments Function
  ActionUploadCommhubAttach(event: any) {
    if (this.commDetails.ID == 0) {
      let info = this.commDetails;
      this.qservice.DocHeader(info.ID, info.RefID, info.categoryID, this.userInfo.logInUserID, info.Subject, info.TypeID).subscribe(data => {
        console.log(data);
        this.commDetails.ID = data;
        this.UploadImage(event);
      });
    } else {
      this.UploadImage(event);
    }

  }
  UploadImage(event) {
    document.getElementById("progress").style.visibility = "visible";
    this.progressNumber = 0;
    //this.showLoader()
    if (event.target.files && event.target.files[0]) {
      console.log(this.commDetails);
      let info = this.commDetails;
      this.fileData = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('files', this.fileData);
      this.fileUploadProgress = '0%';
      this.http.post(this.url + 'api/fileUpload/UploadAttatchments?Id=' + info.ID + "&versionId=" + info.RefID + "&typeId=" + info.TypeID + "&quoteNo=" + this.header.QuoteNo + "&jobstatusId=" + this.header.Version.JobStatusID, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(events => {
          if (events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
            this.progressNumber = events.loaded / events.total;
            console.log(this.fileUploadProgress);
          } else if (events.type === HttpEventType.Response) {
            this.fileUploadProgress = '';
            if (events.body != null) {
              this.PushImage(events.body);
            }
          }
        });

    }
  }
  PushImage(result) {
    var result = result.toString().replace('[', "").replace(']', "");
    let array = result.split('+');
    //console.log(array); arr[0] = "Name" arr[1]= ID
    let name = array[0].replace(/"/g, '');
    var model = {
      ID: Number(array[1].replace(/"/g, '')), FileName: name,
      Check: 1, ThumbPath: "thumb_" + name, QuoteNo: this.header.QuoteNo, TypeID: this.commDetails.TypeID,
    };
    this.commDetails.AttachmentList.push(model);
    document.getElementById("progress").style.visibility = "hidden";
    this.progressNumber = 0;
    //this.hideLoader()

  }

  ActionDelete(id){ // To delete the Attachment
    this.qservice.ActionDeleteImage(id).subscribe(id=>{
    console.log(id);
    this.commDetails.AttachmentList.forEach(element => {
      if(element.ID == id){
        this.commDetails.AttachmentList.splice(0);
      }
    });
  });
  }

  /* ActionSaveQuoteNote(){;
    this.qservice.SaveQuoteNote(this.commDetails).subscribe(data => {
      this.commDetails.ID = data;
      this.ActionCloseCommhubedit(true);
  });
  } */

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
}


