import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-common-edit-mail-hub',
  templateUrl: './common-edit-mail-hub.component.html',
  styleUrls: ['./common-edit-mail-hub.component.scss'],
})
export class CommonEditMailHubComponent implements OnInit {
  Template:String = ""; To:String = "";From:String="";CC:String="";Subject:String="";mailBody:String="";
  arrInfo:Array<any>=[];
 // public Editor = ClassicEditor; 
  isItemToAvailable:boolean=false;mailList:Array<any>=[]; mailFilter:Array<any>=[]; blnIsAtttachAvailable:boolean=false;getNoteAttachments:Array<any>=[];
  isItemCCAvailable:boolean = false; headerData:any;
  templateList:Array<any>=[]; mailDetails:object={}; emailList:Array<any>=[];
  @ViewChild('To', {static: false}) pRef: ElementRef;

  constructor(public Modalcntrl: ModalController,private qteService: QuoteService,private navParams: NavParams,private qRepService:QuoterepService,private qGetService:QuotegetService) { }

  ngOnInit() {
    this. mailDetails ={
      From : "",
      To: "",
      CC: "",
      Subject: "",
      mailBody: ""
    };
   //this.qRepService.interface$.subscribe(message => this.headerData = message);
   this.headerData = this.qRepService.getHeader();
    console.log(this.headerData);
   
    this.qteService.ActiongettemplateList(26).subscribe(data => {
      this.templateList = data;
      console.log(this.templateList);
    });
   this.qteService.ActionGetQuoteCustContactList(this.navParams.data.versionId).subscribe(data=>{
        this.qteService.ActionGetEmailsEmployeeList(data).subscribe(item=>{
          item.forEach(element => {
            this.mailList.push(element);
          });
          console.log(this.mailList);
        });
    });
    
    this.qGetService.NoteAttachements(this.headerData.ID).subscribe(data=>{
        this.getNoteAttachments.push(data[0]);
    });
    console.log(this.getNoteAttachments);
  }
  
  ActionChangeTempl(selectedTemplate){
      this.templateList.forEach(element => {
        if(selectedTemplate == element.Name){
          this.Template = element.Name;
          this.To = element.To;
          this.From = element.From;
          this.CC= element.CC;
          this.Subject = element.Subject;
          this.mailBody = element.Body;
        }
      });
      this.mailDetails = {
        Template:this.Template,
        From : this.From,
        To: this.To,
        CC: this.CC,
        Subject: this.headerData.QuoteNo+" - "+this.headerData.QuoteName+" - "+this.Subject,
        mailBody: this.mailBody
    }
    console.log(this.mailDetails);
  }


  onBlurMethod(){
    this.mailDetails["mailBody"] = document.getElementById("mail_body").innerHTML;
  }

  getToItems(ev: any) {
     var result = ev.substring(ev.length, (ev.lastIndexOf(",")+1));
     if(result==""){
      this.To = "";
     }
     console.log(result);
     this.arrInfo = [];
     if(result && result.trim() != ""){
      this.isItemToAvailable = true;
       this.mailList.filter((item) => {
        var objInfo={
          Name: "",
          Phone: "",
          Email: ""
      };
           if((item.PriEmail).includes(result)){
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
  addMail(selectMail,intItemChk){
    console.log(selectMail);
    this.arrInfo = [];
    if(intItemChk == 1){
      if(!this.To){
        this.To = this.To+selectMail+",";
      }
      else{
        this.To = this.To+"\n"+selectMail+",";
      }
    console.log(this.To);
    }
    else{
      if(!this.CC){
        this.CC = this.CC+selectMail+",";
      }
      else{
        this.CC = this.CC+"\n"+selectMail+",";
      }
    }
    this.mailDetails = {
      Template: this.Template,
      From : this.From,
      To: this.To,
      CC: this.CC,
      Subject: this.Subject,
      mailBody: this.mailBody
    }
   this.arrInfo = [];
    this.isItemToAvailable  = false;
    this.isItemCCAvailable = false;
  }

  getCCItems(ev: any) {
    var result = ev.substring(ev.length, (ev.lastIndexOf(",")+1));
    if(result == ""){
      this.CC="";
    }
    console.log(result);
    this.arrInfo = [];
    if(result && result.trim() != ""){
     this.isItemCCAvailable = true;
      this.mailList.filter((item) => {
        var objInfo={
          Name: "",
          Phone: "",
          Email: ""
      };
          if((item.PriEmail).includes(result)){
            objInfo.Name = item.Name;
            objInfo.Phone = item.PriPhone;
            objInfo.Email = item.PriEmail;
            this.arrInfo.push(objInfo);
          }
        });
    }
 }

 ActionCloseMailPopup(){
  this.isItemToAvailable  = false;
  this.isItemCCAvailable = false;
 }

 ActionSaveActivity(form: NgForm){
  if (form.valid) {
    console.log(form); 
    //dummy mail sent //TEST
    this.mailDetails["From"] = "support@stonegridusa.com";
    this.mailDetails["CC"] = "";
    this.mailDetails["To"] = "support@stonegridusa.com";
    this.qteService.qsendEmail(this.mailDetails).subscribe(data => {
      console.log(data);
    });
  }
 }
//Attcahments
ActionOnAttach(){
  this.blnIsAtttachAvailable =true;
   
 }
 addAttach(file){
  this.blnIsAtttachAvailable =false;
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
}
