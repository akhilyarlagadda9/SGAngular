import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,AlertController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { PoeditComponent } from '../poedit/poedit.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-headeredit',
  //templateUrl: './headeredit.component.html',
  templateUrl: './headeredit1.component.html',
  styleUrls: ['./headeredit.component.scss'],
})
export class HeadereditComponent implements OnInit {

  navObj = this.navParams.data;
  PoItemList: any;

  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private getservice: QuotegetService,private service:QuoteService,private alertCtrl: AlertController) {
    this.PopulateDropDownList(this.navParams.data.Version.CustTypeID);
   }
  headerinfo:any={QuoteContacts:[]};
  salesPersonsList: any = [];
  estimatorsList: any = [];
  projectManagersList: any = [];
  productionTypeList: any = [];
  priceList: any = [];
  ngOnInit() {
    this.headerinfo = this.navParams.data;
  }

  /******** Quoteedit Close ************/
  ActionCloseJobEdit(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.headerinfo,
      issave: issave
    });
  }
  ActionQuoteInfoSubmit(){

  }

  PopulateDropDownList(Id: number) {
    this.getservice.CustTypeResourceList(Id, 3).subscribe(data => {
      this.salesPersonsList = data ;
     // this.GetSelectedSalesrepName();
     // this.headerinfo.SalesPersonID = this.navObj.SalesPersonID; 
    });
    this.getservice.CustTypeResourceList(Id, 8).subscribe(data => {
       this.estimatorsList = data
       this.ActionGetEstimatorName(this.headerinfo.EstimatorID);
      //this.headerinfo.EstimatorID = this.navObj.EstimatorID; 
    });
    this.getservice.CustTypeResourceList(Id, 9).subscribe(data => {
       this.projectManagersList = data;
       //this.GetSelectedManagerName();
      //this.headerinfo.ProjectManagerID = this.navObj.ProjectManagerID;
    });
    this.getservice.QuoteMasterList(24).subscribe(data => {
      this.productionTypeList = data;
      if(this.headerinfo.Version.JobTypeID != "" && this.headerinfo.Version.JobTypeID!= null){
        let JobTypeID = this.headerinfo.Version.JobTypeID.split(',');
        this.ActionGetProductionName(JobTypeID[0]);
      }
      //this.headerinfo.ProjectManagerID = this.navObj.ProjectManagerID;
    });
    this.getservice.CustPriceList(Id).subscribe(data => { 
      this.priceList = data;
      this.headerinfo.Version.PriceListID = Number(this.headerinfo.Version.PriceListID);
    });
  }
  
  ActionGetSalesrepName(id) {
    let headerinfo = this.salesPersonsList.find(s => s.ResourceID == id);
    if (headerinfo != null) {
      this.headerinfo.SalesPerson = headerinfo.ResourceName;
    }
  }
  ActionGetEstimatorName(id) {
    let headerinfo = this.estimatorsList.find(s => s.ResourceID == id);
    if (headerinfo != null) {
      this.headerinfo.Estimator = headerinfo.ResourceName;
    }
  }
  ActionGetManagerName(id) {
    let headerinfo = this.projectManagersList.find(s => s.ResourceID == id);
    if (headerinfo != null) {
      this.headerinfo.ProjectManager = headerinfo.ResourceName;
    }
  }
  ActionGetPriceList(id) {
    let headerinfo = this.priceList.find(s => s.RefID == id);
    if (headerinfo != null) {
      this.headerinfo.Version.PriceList = headerinfo.Name;
    }
  }
  ActionGetProductionName(Id) {
    let headerinfo = this.productionTypeList.find(s => s.ID == Id);
    if (headerinfo != null) {
      this.headerinfo.Version.JobType = headerinfo.Name;
    }
    // let TypeName = [];
    // for(let i = 0; i < Ids.length ; i++){
    //   var TypeList = this.productionTypeList.find(s => s.ID == JobType[i]);
    //   if (TypeList != null) {
    //     TypeName.push(TypeList.Name);
    //   }
    //   this.headerinfo.JobType = TypeName;
    // }
  }

  ActionDeleteItem(id){
    console.log(id);
    let objAlrtShow = {
      Header: "Are you sure you want to delete activity?",
      SubAlert: "Do you want to continue?",
      ID: id
    }
    this.confirmDelete(objAlrtShow);
  }

  async confirmDelete(obj){
    const alert = await this.alertCtrl.create({
      header: obj.Header,
      message: obj.SubAlert,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
          // May be do something letter
        }
      }, {
        text: 'Allow',
        handler: () => {
      this.service.POItemDelete(obj.ID).subscribe(data=>{
      console.log(data);
      for(var i=0;i<this.headerinfo.PoItemList.length;i++){
        if(this.headerinfo.PoItemList[i].ID==data){
          this.headerinfo.PoItemList.splice(i,1);
        }
      }
    });
      this.ConfirmSuccess();
    }
    }]
    });
    alert.present();
  }
  async ConfirmSuccess(){
    let obj = {
      Header: "Activity Deleted Sucessfully!",
    }
    const alert = await this.alertCtrl.create({
      header: obj.Header,
      buttons: [{
        text: 'OK',
      }]
    });
    alert.present();
  }
 //PO items Edit Function
 async ActionEditPOItem(info: any, indx: any) {
  if (info == 0) {
    info = { ID: 0, VersionID: this.headerinfo.Version.ID, POByID: 0, PONumber: 0, PODate: new Date().toDateString(), POAmount: 0, AttachmentList: [], ParentID: this.headerinfo.ParentID, POBy:0 }
  }
  let ID = info.ID;
  let poitem = { poitem: info, index: indx, ParentID : this.headerinfo.Version.CustTypeID };
  const modal = await this.Modalcntrl.create({
    component: PoeditComponent,
    componentProps: poitem,
  })
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    if(detail.data.issave == true){
      if (ID == 0) {
        this.headerinfo.PoItemList.push(detail.data.componentProps)
      }
      else {
        this.headerinfo.PoItemList[indx] = detail.data.componentProps;
      }
    }
  });
  return await modal.present();
}
ActionSaveHeader(form:NgForm){
  if (form.valid) {
    this.headerinfo.Version.Financed  = this.headerinfo.Version.Financed == true ? 1 :0;
    this.service.ActionSaveQuoteInfo(this.headerinfo).subscribe(data=>{
      this.ActionCloseJobEdit(true);
    })
  }
}


}
