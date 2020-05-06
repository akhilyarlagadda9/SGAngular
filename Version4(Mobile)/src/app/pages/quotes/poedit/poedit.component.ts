import { Component, OnInit, Version } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuoteService } from 'src/app/service/quote.service';
declare const appUrl: any;
@Component({
  selector: 'app-poedit',
  //templateUrl: './poedit.component.html',
  templateUrl: './poedit1.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {
  poitem: any;header:any;
  index: any;isSave:boolean = false;
  ID: any;
  salespersons: any;
  ParentID: number;fileData: File = null; url = appUrl;imgEvent:any;

  constructor(public Modalcntrl: ModalController, private postservice: QuotepostService, 
    private getservice: QuotegetService,private http: HttpClient,private qRepService:QuoterepService,private qservice:QuoteService) { }
  ngOnInit() {
    this.GetSalesPersonList();
    this.header = this.qRepService.getHeader();
    this.poitem.AttachmentList = this.poitem.AttachmentList == null || this.poitem.AttachmentList == undefined ? [] : this.poitem.AttachmentList;
  }
  GetSalesPersonList() {
    this.getservice.getsalespersons(this.ParentID, 3).subscribe(
      data => { 
        this.salespersons = data;
      //  this.GetSelectedSalespersonName();
       }
    );
  }
  GetSelectedSalespersonName() {
    let po = this.salespersons.find(s => s.ResourceID == this.poitem.POByID);
    if (po != null) {
      this.poitem.POBy = po.ResourceName;
    }
  }

  ActionSavePOItem(type) {
    this.postservice.ActionSavePoItem(this.poitem).subscribe(data => {
      this.ID = data;this.poitem.ID = data;
      if(type == 1){ //  save from Image upload
        this.UploadImage(this.imgEvent);
      }
      else{
        this.ActionClosePOItem(true);
      }
    })
  }
  ActionClosePOItem(issave) {
    let save = this.isSave == true ? this.isSave: issave;
   // let item = { poitem: this.poitem, index: this.index, ID: this.ID }
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.poitem,
      issave: issave
    });
  }
  // ActionUploadPoAttach(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     let file = event.target.files[0];
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       let model = { ID: 0, Path: file.name }
  //       this.poitem.AttachmentList.push(model);
  //     }
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }



  ActionUploadPoAttach(event: any) {
    if (this.poitem.ID == 0) {
     this.isSave = true;this.imgEvent = event;
      if (this.poitem.POByID != 0 && this.poitem.PONumber != undefined) {
        this.ActionSavePOItem(1);
      }
    } else {
      this.UploadImage(event);
    }

  }
  UploadImage(event) {  
    if (event.target.files && event.target.files[0]) {
      let info = this.poitem;
      this.fileData = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('files', this.fileData);
      this.http.post(this.url + 'api/fileUpload/POAttachmentUpload?Id=' + info.ID + "&versionId=" + info.VersionID + "&quoteNo=" + this.header.QuoteNo + "&jobstatusId=0", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe(events => {
          if (events.type === HttpEventType.UploadProgress) {
            
          } else if (events.type === HttpEventType.Response) {
            if (events.body != null) {
              this.PushImage(events.body);
            }
          }
        });
    }
    
  }

  PushImage(result) {
    var result = result.toString().replace('[', "").replace(']', "");
    let array = result.split(',');
    let name = array[0].replace(/"/g, '');
    var model = {
      ID: Number(array[1].replace(/"/g, '')), Path: name,
      Check: 1,
    };
    this.poitem.AttachmentList.push(model);
    //document.getElementById("progress").style.visibility = "hidden";
  }

  ActionDeleteImage(id){
    this.qservice.POImageDelete(id).subscribe(data=>{
       for(var i=0;i<this.poitem.AttachmentList.length;i++){
         if(this.poitem.AttachmentList[i].ID==data){
          this.poitem.AttachmentList.splice(i,1);
         }
       }
    });
  }
}
