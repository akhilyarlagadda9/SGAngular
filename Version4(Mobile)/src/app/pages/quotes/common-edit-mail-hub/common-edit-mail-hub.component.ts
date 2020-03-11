import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuoteService } from 'src/app/service/quote.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-common-edit-mail-hub',
  templateUrl: './common-edit-mail-hub.component.html',
  styleUrls: ['./common-edit-mail-hub.component.scss'],
})
export class CommonEditMailHubComponent implements OnInit {
  Template:String = ""; To:String = "";From:String="";CC:String="";Subject:String="";mailBody:String="";
  public Editor = ClassicEditor; isItemToAvailable:boolean=false;mailList:Array<any>=[]; mailFilter:Array<any>=[];
  isItemCCAvailable:boolean = false;
  templateList:Array<any>=[]; mailDetails:object={}; emailList:Array<any>=[];


  constructor(public Modalcntrl: ModalController,private qteService: QuoteService,private navParams: NavParams) { }

  ngOnInit() {
    this. mailDetails ={
      From : "",
      To: "",
      CC: "",
      Subject: "",
      mailBody: ""
    }
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
        Subject: this.Subject,
        mailBody: this.mailBody
    }
    console.log(this.mailDetails);
  }
  getToItems(ev: any) {
     var result = ev.substring(ev.length, (ev.lastIndexOf(",")+1));
     if(result==""){
      this.To = "";
     }
     console.log(result);
     this.mailFilter = [];
     if(result && result.trim() != ""){
      this.isItemToAvailable = true;
       this.mailList.filter((item) => {
           if((item.PriEmail).includes(result)){
            this.mailFilter.push( item.PriEmail);
           }
         });
         console.log(this.mailFilter);
     }
  }
  addMail(selectMail,intItemChk){
    this.mailFilter = [];
    if(intItemChk == 1){
    this.To = this.To+selectMail+",";
    console.log(this.To);
    }
    else{
      this.CC = this.CC+selectMail+",";
    }
    this.mailDetails = {
      Template: this.Template,
      From : this.From,
      To: this.To,
      CC: this.CC,
      Subject: this.Subject,
      mailBody: this.mailBody
    }
    this.isItemToAvailable  = false;
    this.isItemCCAvailable = false;
  }
  getCCItems(ev: any) {
    var result = ev.substring(ev.length, (ev.lastIndexOf(",")+1));
    if(result == ""){
      this.CC="";
    }
    console.log(result);
    this.mailFilter = [];
    if(result && result.trim() != ""){
     this.isItemCCAvailable = true;
      this.mailList.filter((item) => {
          if((item.PriEmail).includes(result)){
           this.mailFilter.push( item.PriEmail);
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
    //dummy mail sent 
    this.mailDetails["From"] = "support@stonegridusa.com";
    this.mailDetails["CC"] = "";
    this.mailDetails["To"] = "support@stonegridusa.com";
    this.qteService.qsendEmail(this.mailDetails).subscribe(data => {
      console.log(data);
    });
  }
 }
//Attcahments
 ActionUploadAttach(ev:any){
   console.log(ev);
 }

 //Close add activity function
 ActionCloseCommhubedit(issave) {
  this.Modalcntrl.dismiss({
    'dismissed': true,
    //componentProps: this.mailBody,
    issave: issave
  });
}

}
