import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';


@Component({
  selector: 'app-commhubedit',
  templateUrl: './commhubedit.component.html',
  styleUrls: ['./commhubedit.component.scss'],
})
export class CommhubeditComponent implements OnInit {
  categoryList: any;  docFormList: any;  msgStatusList: any;  phaseList: any;  
  commDetails: any = this.navParams.data;;  notesList: any;  StatusID: any;

  constructor(public Modalcntrl : ModalController, private getservice: QuotegetService,private navParams: NavParams) {
    
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
    this.getservice.CommHubPhaseList(this.commDetails.VersionID).subscribe(
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
    this.getservice.formsList(1).subscribe(
      data => {
        this.docFormList = data;
        this.GetSelectedFormName();
      }
    );
  }
  GetSelectedFormName() {
    let commDetails = this.docFormList.find(s => s.ID == this.commDetails.FromTypeID);
    if (commDetails != null) {
      this.commDetails.formtype = commDetails.Name;
    }
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
      this.commDetails.Status = commDetails.Name;
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
