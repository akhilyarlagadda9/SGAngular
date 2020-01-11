import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';


@Component({
  selector: 'app-commhubedit',
  templateUrl: './commhubedit.component.html',
  styleUrls: ['./commhubedit.component.scss'],
})
export class CommhubeditComponent implements OnInit {
  categoryList: any;  docFormList: any;  msgStatusList: any;  phaseList: any;  versionId: any;  commDetails: any;  notesList: any;  StatusID: any;

  constructor(public Modalcntrl : ModalController, private getservice: QuotegetService) {
    this.commDetails = {};
   }

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
    this.getservice.CommHubPhaseList(this.versionId).subscribe(
      data => { 
        this.phaseList = data;
        this.GetSelectedPhaseName();
       }
    );
  }
  GetSelectedPhaseName() {
    let commDetails = this.phaseList.find(s => s.ID == this.commDetails.PhaseID);
    if (commDetails != null) {
      this.commDetails.PhaseID = commDetails.Name;
    }
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
      data => {
        this.msgStatusList = data;
        this.GetSelectedStatusName();
      }
    );
  }
  GetSelectedStatusName() {
    let commDetails = this.msgStatusList.find(s => s.ID == this.commDetails.StatusID);
    if (commDetails != null) {
      this.commDetails.StatusID = commDetails.Name;
    }
  }
  //Attachments Function
  ActionUploadCommhubAttach(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        let model = { ID: 0, Path: file.name }
        this.commDetails.AttachmentList.push(model);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
