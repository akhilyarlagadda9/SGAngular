import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';


@Component({
  selector: 'app-commhubedit',
  templateUrl: './commhubedit.component.html',
  styleUrls: ['./commhubedit.component.scss'],
})
export class CommhubeditComponent implements OnInit {
  categoryList: any;
  docFormList: any;
  msgStatusList: any;
  phaseList: any;
  version: any;
  

  constructor(public Modalcntrl : ModalController, private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetcategoryList();
    this.GetformsList();
    this.GetstatusList();
    this.GetphaseList();
  }
  //Close Function
  ActionCloseCommhubedit() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  //Category List Function
  GetcategoryList() {
    this.getservice.NotecategoryList(0).subscribe(
      data => { this.categoryList = data; }
    );
  }
  //Phase List Function
  GetphaseList() {
    this.getservice.CommHubPhaseList(this.version.ID).subscribe(
      data => { this.phaseList = data; }
    );
  }
  //Document Forms List Function
  GetformsList() {
    this.getservice.formsList(1).subscribe(
      data => {this.docFormList = data;}
    );
  }
  //Status List Function
  GetstatusList() {
    this.getservice.QuoteMasterList(11).subscribe(
      data => {this.msgStatusList = data;}
    );
  }
  //Attachments Function
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
}
