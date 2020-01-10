import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormsModule } from '@angular/forms';
import { CustomersearchComponent } from '../customersearch/customersearch.component';
import { OverlayEventDetail } from '@ionic/core';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.component.html',
  styleUrls: ['./createquote.component.scss'],
})
export class CreatequoteComponent implements OnInit {
  quoteId: number = 0; header: any; NavigateTab: number; CustTypeID: number = 4;
  salesPersonsList: any = []; estimatorsList: any = []; projectManagersList: any = []; customerTypes: any = []; leadTypes: any = []; leadHearAbout: any = [];
  priceList: any = []; productionTypeList: any = [];
  verId: any;
  quoteNo: any;
  customerId: any;
  accountId: any;
  parAccountId: any;
  loaderToShow: any;
  constructor(private formBuilder: FormBuilder, private loadingController: LoadingController, public Modalcntrl: ModalController, private getservice: QuotegetService, private popoverCntrl: PopoverController, private postservice: QuotepostService) { }
  ngOnInit() {
    this.header = {
      ProjectManagerID: 0, EstimatorID: 0, SalesPersonID: "",
      ID: 0, CustomerID: 0, QuoteOrLeadTypeID: 2, QuoteInfoType: "QUOTE", LocID: 1, CustJobNo: "", CustPoNo: "", QuoteDate: new Date().toLocaleDateString("en-US"),
      IsCheck: 1,
      //UserID : getloginuserId(),
      //SalesPersonID : _userModel.logInUserEmpID,
      JobName: "", Address1: "", Address2: "", City: "", State: "", Zipcode: "", YearBuilt: "",
      LeadInfo: {
        LeadTypeID: "", SourceID: 0, HearBefore: 2, HearAbout: "",
      },
      Version: {
        AccName: "", PriceListID: "", ProductionTypeID: "", CustTypeID: 4, InvoiceTo: 1, ParentAccID: 0, ChildAccID: 0, StatusID: 1,
        ParentCustInfo: {}, ChildParentCustInfo: {},
        Customer: {
          Name: "", FirstName: "", LastName: "", PPhone: "", Email: "", chkflag: false,
        },
      },
    };

    let custDicIds = [1]; let leadDicIds = [2, 3];
    this.getservice.LeadDictionaryLists(leadDicIds).subscribe(
      data => { this.leadTypes = data[0]; this.leadHearAbout = data[1] }
    );
    this.getservice.CustomerDictionayList(custDicIds).subscribe(data => { this.customerTypes = data[0] });
    this.PopulateDropDownList(4);
    //FORM VALIDATIONS
  }

  /******* Actions *******/
  ActionCloseCreateQuote(isSave) {
    let obj = { QuoteId: this.header.ID }
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: obj,
      isSave: isSave,
    });
  }

  //get f() { return this.registerForm.controls; }

  ActionQuoteSubmit(form: any) {
    if (form.valid) {
      //this.showLoader();
      alert("call");
      this.ValidateHeader();
      this.postservice.ActionSaveQuote(this.header).subscribe(data => {
        //this.hideLoader();
        this.header.ID = data;
        //this.verId = Ids[1], this.quoteNo = Ids[2], this.customerId = Ids[3],
        this.accountId = this.header.Version.ChildAccID, this.parAccountId = this.header.Version.ParentAccID;
        this.ActionCloseCreateQuote(true);
        console.log(this.header);
      })
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
  }

  async ActionShowPopover(ev: any, typeId: number, search, clickType: number) {
    let custTypeID = this.header.Version.ParentAccID > 0 && clickType == 0 ? 4 : 0;
    let obj = { search: search, selectTypeId: typeId, custTypeID: custTypeID }
    const popover = await this.popoverCntrl.create({
      component: CustomersearchComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    })
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          if (this.header.Version.ParentAccID > 0 && detail.data.componentProps.TypeID == 4) {
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
        this.header = this.getservice.Prepareparentcustmodel(this.header, info);
        this.populateSalesPersonList(info);
        //  populateSelPriceList(modelItem);
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
    this.getservice.CustTypeResourceList(Id, 3).subscribe(data => { this.salesPersonsList = data });
    this.getservice.CustTypeResourceList(Id, 8).subscribe(data => { this.estimatorsList = data });
    this.getservice.CustTypeResourceList(Id, 9).subscribe(data => { this.projectManagersList = data });
    this.getservice.QuoteMasterList(24).subscribe(data => { this.productionTypeList = data });
    this.getservice.CustPriceList(Id).subscribe(data => { this.priceList = data });
  }
  PopulateIsCustDefault(Id) {
    this.getservice.SelTypePrefInfo(Id, 5).subscribe(data => { if (data != null && data != "") { this.header.Version.IsCustRetail = data.Isdefault } });
  }
  PopulateCustomerInfo(info: any) {
    this.header = this.getservice.Preparecustomermodel(this.header, info);
    if (this.header.Version.IsCustRetail == 1) {
      let childAccCode = this.header.Version.ChildAccID == 0 ? "" : this.header.Version.ParentCustInfo.Code + " - ";
      this.header.QuoteName = this.header.Version.ParentCustInfo.SelCode + " - " + childAccCode + info.Name;
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
    debugger;
    let model: any; let header = this.header; let customerContacts = [];
    this.getservice.GetCustomerContacts(header.CustomerID).subscribe(data => { customerContacts = data ;
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
    header.Address1 = add1;
    header.Address2 = add2;
    header.City = city;
    header.State = state;
    header.Zipcode = zip;
    header.ContactId = contId; header.ContactInfo = coninfo;
    return header;
  }

  ActionNavigateToFro(loadtab: number) {
    this.NavigateTab = loadtab;
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


