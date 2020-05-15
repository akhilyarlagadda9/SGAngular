import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, LoadingController } from '@ionic/angular';
//import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormsModule } from '@angular/forms';
import { CustomersearchComponent } from '../customersearch/customersearch.component';
import { OverlayEventDetail } from '@ionic/core';
//import { QuotepostService } from 'src/app/service/quotepost.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuotePageModule } from '../quote/quote.module';
import { QuoteeditComponent } from '../quoteedit/quoteedit.component';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.component.html',
  styleUrls: ['./createquote.component.scss'],
})
export class CreatequoteComponent implements OnInit {
  quoteId: number = 0; header: any; NavigateTab: number; CustTypeID: number = 4; Progress: number = 0;
  salesPersonsList: any = []; estimatorsList: any = []; projectManagersList: any = []; customerTypes: any = []; leadTypes: any = []; leadHearAbout: any = [];
  priceList: any = []; productionTypeList: any = []; projectTypes:any;
  loaderToShow: any;
  form: any;
  layId: 1;
  qprmsobj: {
    quoteid: number, quoteno: string, versionid: number, customerid: number,
    accountid: number, childaccid: number, phaseid: number, viewtypeid: number, layoutId: 2
  };
  bntStyle:string;
  CustType: any;
  constructor(private loadingController: LoadingController, public Modalcntrl: ModalController,
      private popoverCntrl: PopoverController,private qServe:QuoteService,private qRep:QuoterepService) { }
  ngOnInit() {
    this.header = {
      ProjectManagerID: 0, EstimatorID: 0, ProjectTypeID:0,
      ID: 0, CustomerID: 0, QuoteOrLeadTypeID: 2, QuoteInfoType: "QUOTE", LocID: 1, CustJobNo: "", CustPoNo: "", QuoteDate: new Date().toLocaleDateString("en-US"),
      IsCheck: 1,
      //UserID : getloginuserId(),
      //SalesPersonID : _userModel.logInUserEmpID,
      JobName: "", Address1: "", Address2: "", City: "", State: "", Zipcode: "", YearBuilt: "",
      LeadInfo: {
        ID:0,LeadTypeID: "", SourceID: 0, HearBefore: 2, HearAbout: "",
      },
      Version: {
        ID:0,AccName: "", ProductionTypeID: "", CustTypeID: 4, InvoiceTo: 1, ParentAccID: 0, ChildAccID: 0, StatusID: 1,
        ParentCustInfo: {}, ChildParentCustInfo: {}, IsCustRetail : 1,
        Customer: {
         ID:0,TypeID:0, Name: "", FirstName: "", LastName: "", PPhone: "", Email: "", chkflag: false,
        },
      },
    };

    let custDicIds = [1]; let leadDicIds = [2, 3];
    this.qServe.LeadDictionaryLists(leadDicIds).subscribe(
      data => {let leadtypes  = data[0]; this.leadHearAbout = data[1] 
        this.leadTypes =leadtypes.filter(s=>s.Name != "" && s.Name != null);
      }
    );
    this.qServe.CustomerDictionayList(custDicIds).subscribe(data => {  this.customerTypes = data[0];this.selectcusttype(this.header.Version.CustTypeID) });
    this.qServe.GetAdminProjectTypes(28).subscribe(data => { this.projectTypes = data });
    this.PopulateDropDownList(4);
    //FORM VALIDATIONS
  }

  /******* Actions *******/
  ActionCloseCreateQuote(isSave) {
    if (isSave == true) {
    //  let obj = { ID: this.header.ID, QuoteNo : this.quoteNo, VersionID: this.verId, header : this.header, CustomerID : this.customerId, ParentAccID :this.parAccountId, ChildAccID : this.accountId }
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: this.qprmsobj,
        isSave: isSave,
      });
    } else {
      this.Modalcntrl.dismiss({
        'dismissed': true,
        isSave: isSave,
      })
    }
  }

  //get f() { return this.registerForm.controls; }

  ActionQuoteSubmit(form: any) {debugger
    console.log(form);
    if (form.valid) {
      this.showLoader();
      this.ValidateHeader();
      this.qServe.ActionSaveQuote(this.header).subscribe(data => {
        let Ids = data.split(',');
        this.header.ID = Ids[0];
        this.qprmsobj = {
          quoteid: Number(Ids[0]), quoteno: Ids[2], versionid: Number(Ids[1]), customerid: Ids[3],
          accountid: this.header.Version.ParentAccID, childaccid: this.header.Version.ChildAccID,
           phaseid: 0, viewtypeid: 1, layoutId: 2
        };
        this.ActionCloseCreateQuote(true);
        this.hideLoader();
      });
   
    console.log(this.header); // just to test
    }
  }
  ActionShowNewCustomerList(ev: any, typeId: number, search: string, clickType: number) {
    search = search == undefined ? "" : search;
    if ((search != null && search != "") || typeId == 2) {
      this.ActionShowPopover(ev, typeId, search, clickType);
    }
  }
  ValidateHeader() {
    let header = this.header;
    header.Version.QuoteID = 0;
    header.Version.StatusID = 1;
    header.Version.IsAccAsCustomer = header.Version.IsCustRetail;
    header.Version.CustomerID = (header.Version.CustomerID == undefined || header.Version.CustomerID == null) ? 0 : header.Version.CustomerID;
    if (header.Version.IsCustRetail == 0 && header.Version.CustTypeID != 4) {
      var modelItem = header.Version.ParentCustInfo;
      header.CustomerID = modelItem.ID;
      header.Version.CustomerID = modelItem.ID;
      header.Version.ChildAccID = 0;
      header.Version.ParentAccID = 0;
      header.Customer = modelItem;
      if (modelItem.ParentID > 0) {
        header.CustomerID = modelItem.ID;
        header.Version.CustomerID = modelItem.ID;
        header.Version.ChildAccID = 0;
        header.Version.ParentAccID = modelItem.ParentID;
      }
    }
    header.ContactInfo = header.ContactInfo == "" ? {} : header.ContactInfo;
  header.Version.IsAccAsCustomer = header.Version.IsAccAsCustomer == true ? 1 :0;
  header.Version.Financed  = header.Version.Financed == true ? 1 :0;
    this.header = header;
  }
  async ActionShowPopover(ev: any, typeId: number, search, clickType: number) {
    let custTypeID = clickType == 0 ? 4 : this.header.Version.CustTypeID;
    console.log(custTypeID);
    let obj = { search: search, selectTypeId: typeId, custTypeID: custTypeID }
    const popover = await this.Modalcntrl.create({
      component: CustomersearchComponent,
      //event: ev,
     // translucent: true,
      showBackdrop: true,
      componentProps: obj,
     // cssClass: "popover_class4"
    })
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          // if (this.header.Version.ParentAccID > 0 && detail.data.componentProps.TypeID == 4) {
            if(detail.data.componentProps.TypeID == 4){
            this.PopulateCustomerInfo(detail.data.componentProps);
          } else {
            this.PopulateParentCustInfo(detail.data.componentProps);
          }

        }
      }
    });
    return await popover.present();
  }
  ActionChangeRetailCheckBox = function () {
    let custID = this.header.Version != undefined ? 0 : this.header.Version.CustomerID;
    if (custID == 0) {
      this.header.Version.Customer.Name = '';
      this.header.Version.Customer.FirstName = '';
      this.header.Version.Customer.LastName = '';
    }
  }
  PopulateParentCustInfo(info: any) {
    this.header.Version.CustTypeID = info.TypeID;
    this.ActionPopulateParentAccounts(info.TypeID);
    if (info.TypeID == 4) {
      this.PopulateCustomerInfo(info);
    } else {
      if (info != '') {
        this.header.Version.AccName = info.SelName + info.ShowHyphen + info.Name;
        this.header = this.qRep.Prepareparentcustmodel(this.header, info);
        this.populateSalesPersonList(info);
        this.populatePriceList(info);
        this.populateEstimatorList(info);
        this.populateProjManagerList(info);
        this.ActionSameAsCustomerAddress();
      }
    }
    console.log(this.header);
  }
  ActionPopulateParentAccounts = function (Id) {
    this.header.Version.IsCustRetail = 0;
    this.header.Version.ChildAccID = 0;
    this.header.Version.ParentAccID = 0;
    this.header.Version.ParentCustInfo = {};
    this.header.Version.AccName = '';
    this.header.Version.CreatePrimaryContactID = 0;
    this.selectedAccID = 0;
    this.CreateaccountContacts = [];
    if (Id != 4) {
      this.PopulateIsCustDefault(Id);
    }
    this.PopulateDropDownList(Id);
  }
  PopulateDropDownList(Id: number) {
    this.qServe.CustTypeResourceList(Id, 3).subscribe(data => {
       this.salesPersonsList = data; 
       if(this.salesPersonsList != null){
        let model = this.salesPersonsList[0];
       this.header.SalesPersonID = model.ResourceID;
}
    });
    this.qServe.CustTypeResourceList(Id, 8).subscribe(data => {
       this.estimatorsList = data; 
      });
    this.qServe.CustTypeResourceList(Id, 9).subscribe(data => { 
      this.projectManagersList = data; 
    });
    this.qServe.QuoteMasterList(24).subscribe(data => { 
      this.productionTypeList = data;
      if(this.productionTypeList != null){
               let model = this.productionTypeList[0];
              this.header.Version.JobTypeID = model.ID;
      }
     });
    this.qServe.CustPriceList(Id).subscribe(data => { 
      this.priceList = data;
      if(this.priceList != null){
        let model = this.priceList[0];
       this.header.Version.PriceListID = model.RefID;
}
     });
  }
  PopulateIsCustDefault(Id) {
    this.qServe.SelTypePrefInfo(Id, 5).subscribe(data => { if (data != null && data != "") { this.header.Version.IsCustRetail = data.Isdefault } });
  }
  isSameChange(ev){
    this.header.IsCheck = ev.target.checked;
    this.header.IsCheck = ev.target.checked == true ? 1: 0;
    if(this.header.IsCheck == 0){
    this.header.Address1 = "";
    this.header.Address2 = "";
    this.header.City = "";
    this.header.State = "";
    this.header.Zipcode = "";
    }
    else{
    this.header.Address1 = this.header.Customer.BillAddress == "" ? "" : this.header.Customer.BillAddress;
    this.header.Address2 = this.header.Customer.BillAddress1 == "" ? "" : this.header.Customer.BillAddress1;
    this.header.City = this.header.Customer.BillCity == "" ? "" : this.header.Customer.BillCity;
    this.header.State = this.header.Customer.BillState== "" ? "" : this.header.Customer.BillState;
    this.header.Zipcode = this.header.Customer.BillZipCode == "" ? "" : this.header.Customer.BillZipCode;
    }
  }
  PopulateCustomerInfo(info: any) {
    this.header = this.qRep.Preparecustomermodel(this.header, info);
    console.log(this.header);
    if (this.header.Version.IsCustRetail == 1) {
      let childAccCode = this.header.Version.ChildAccID == 0 ? "" : this.header.Version.ParentCustInfo.Code + " - ";
      this.header.QuoteName =  (this.header.Version.ParentCustInfo.SelCode == null || this.header.Version.ParentCustInfo.SelCode == "" ||
      this.header.Version.ParentCustInfo.SelCode == undefined) ? childAccCode + info.Name :
      this.header.Version.ParentCustInfo.SelCode + " - " + childAccCode + info.Name;
    }
    this.ActionPopulateCustName();
    this.Getcustomercontacts();
  }
  ActionPopulateCustName() {
    let header = this.header;
    let custname = header.Version.Customer.Name, firstname = header.Version.Customer.FirstName, lastname = header.Version.Customer.LastName;
    if (firstname == "") { header.Version.Customer.chkflag = true; }

    if ((firstname == "" || firstname == null) || header.Version.Customer.chkflag == true) {
      //Step1
      var commaNames = (custname != "" && custname != undefined) ? custname.split(',') : "";
      if (commaNames.length == 1) {
        header.Version.Customer.FirstName = commaNames[0];
      }
      else if (commaNames.length > 1) {
        header.Version.Customer.FirstName = commaNames[commaNames.length - 1];
        header.Version.Customer.LastName = commaNames.slice(0, commaNames.length - 1).join(" ");
        return;
      }
      //Step2
      var names = (custname != "" && custname != undefined) ? custname.split(' ') : "";
      if (names.length == 1) {
        header.Version.Customer.FirstName = names[0];
      }
      else if (names.length > 1) {
        header.Version.Customer.LastName = names[names.length - 1];
        header.Version.Customer.FirstName = names.slice(0, names.length - 1).join(" ");
      }
      if (custname == '' || custname == undefined) {
        header.Version.Customer.FirstName = "";
        header.Version.Customer.LastName = "";
      }
    }
  }
  Getcustomercontacts() {
    let model: any; let header = this.header; let customerContacts = [];
    this.qServe.GetCustomerContacts(header.CustomerID).subscribe(data => {
      customerContacts = data;
      if (header.CustomerID > 0) {
        model = customerContacts.find(s => s.CustomerID == header.CustomerID && s.IsDefault == 1);
        if (model != "" && model != null && model != undefined) {
          header.Version.CustContactID = model.ID;
        }
        //  customerContacts.map(function (elem) { if (elem.CustomerID == header.CustomerID && elem.IsDefault == 1) { model = elem; } });
      }
    });
  }
  populateSalesPersonList(modelItem) {
    let salesperList = [];
    if (modelItem.SalesPersonIDs != null && modelItem.SalesPersonIDs != "") {
      salesperList = JSON.parse(modelItem.SalesPersonIDs);
      salesperList.map(function (elem) { elem.ResourceName = elem.Name; elem.ResourceID = elem.ID; return elem });
      
    }
    if (salesperList.length == 0) {
      salesperList = this.salesPersonsList;
    } else {
      this.header.SalesPersonID = salesperList[0].ID;
    }
    return salesperList;
  }
  populatePriceList(modelItem) {
    let priceList = [];
    if (modelItem.PriceListIDs != null && modelItem.PriceListIDs != "") {
      priceList = JSON.parse(modelItem.PriceListIDs);
      priceList.map(function (elem) { elem.Name = elem.Name; elem.ID = elem.ID; return elem });
    }
    if (priceList.length == 0) {
      priceList = this.priceList;
    } else {
      this.header.PriceListID = priceList[0].RefID;
    }
    return priceList;
  }
  populateEstimatorList(modelItem) {
    let salesperList = [];
    if (modelItem.EstimatorIDs != null && modelItem.EstimatorIDs != "") {
      salesperList = JSON.parse(modelItem.EstimatorIDs);
      salesperList.map(function (elem) { elem.ResourceName = elem.Name; elem.ResourceID = elem.ID; return elem });
    }
    if (salesperList.length == 0) {
      salesperList = this.estimatorsList;
    } else {
      this.header.EstimatorID = salesperList[0].ID;
    }
    return salesperList;
  }
  populateProjManagerList(modelItem) {
    let salesperList = [];
    if (modelItem.ProjectManagerIDs != null && modelItem.ProjectManagerIDs != "") {
      salesperList = JSON.parse(modelItem.ProjectManagerIDs);
      salesperList.map(function (elem) { elem.ResourceName = elem.Name; elem.ResourceID = elem.ID; return elem });
    }
    if (salesperList.length == 0) {
      salesperList = this.projectManagersList;
    } else {
      this.header.ProjectManagerID = salesperList[0].ID;
    }
    return salesperList;
  }
  ActionSameAsCustomerAddress() {
    let header = this.header;
    var add1 = '', add2 = '', city = '', state = '', zip = '', contId = 0, coninfo = '';
    if (header.IsCheck1 == 1) {
      add1 = header.Version.ParentCustInfo.BillAddress;
      add2 = header.Version.ParentCustInfo.BillAddress1;
      city = header.Version.ParentCustInfo.BillCity;
      state = header.Version.ParentCustInfo.BillState;
      zip = header.Version.ParentCustInfo.BillZipCode;
    }
  console.log(this.header);
    header.Address1 = add1;
    header.Address2 = add2;
    header.City = city;
    header.State = state;
    header.Zipcode = zip;
    header.ContactId = contId; header.ContactInfo = coninfo;
    return header;
  }
  ActionNavigateToFro(loadtab: number, form: any) {
    if (loadtab == 2) {
      form.submitted = true;
      if (form.valid) {
        this.NavigateTab = loadtab;
      }
    } else {
      this.NavigateTab = loadtab;
    }
  }
  onChange(CustTypeID:number){
    //Resetting the Parent Acc each time Account type changes
    this.header.Version.ParentAccID=0;
    this.header.Version.ParentCustInfo={};
    this.selectcusttype(CustTypeID);
  }
  changeProgress(value) {
    this.Progress = value;
  }
  selectcusttype(TypeID){debugger;
    let custtype = this.customerTypes.find(s => s.ID == TypeID);
    if (custtype != null) {
      this.CustType = custtype.Name;
    }
  }
  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'please wait while saving'
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


