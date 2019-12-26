import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { PoeditComponent } from '../poedit/poedit.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-headeredit',
  templateUrl: './headeredit.component.html',
  styleUrls: ['./headeredit.component.scss'],
})
export class HeadereditComponent implements OnInit {

  navObj = this.navParams.data;
  PoItemList: any;

  constructor(public Modalcntrl: ModalController, private navParams: NavParams, private getservice: QuotegetService) {
    this.PopulateDropDownList(this.navParams.data.Version.CustTypeID);
   }
  headerinfo:any;
  salesPersonsList: any = [];
  estimatorsList: any = [];
  projectManagersList: any = [];
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
    this.getservice.CustTypeResourceList(Id, 3).subscribe(data => { this.salesPersonsList = data ;
     // this.headerinfo.SalesPersonID = this.navObj.SalesPersonID; 
    });
    this.getservice.CustTypeResourceList(Id, 8).subscribe(data => { this.estimatorsList = data
      //this.headerinfo.EstimatorID = this.navObj.EstimatorID; 
    });;
    this.getservice.CustTypeResourceList(Id, 9).subscribe(data => { this.projectManagersList = data;
      //this.headerinfo.ProjectManagerID = this.navObj.ProjectManagerID;
    });;
    this.getservice.CustPriceList(Id).subscribe(data => { this.priceList = data 
      this.headerinfo.Version.PriceListID = Number(this.headerinfo.Version.PriceListID);
    });
  }
  
 //PO items Edit Function
 async ActionEditPOItem(info: any, indx: any) {
  if (info == 0) {
    info = { ID: 0, VersionID: this.headerinfo.VersionID, POByID: 0, PONumber: 0, PODate: Date, POAmount: 0, AttachmentList: [], ParentID: this.headerinfo.ParentID, POBy:0 }
  }
  let poitem = { poitem: info, index: indx, ParentID : this.headerinfo.Version.CustTypeID };
  const modal = await this.Modalcntrl.create({
    component: PoeditComponent,
    componentProps: poitem,
  })
  modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    if (detail.data.componentProps.ID == 0) {
      this.PoItemList.push(detail.data.componentProps.poitem)
    }
    else {
      this.PoItemList[detail.data.componentProps.index] = detail.data.componentProps.poitem;
    }
  });
  return await modal.present();
}


}
