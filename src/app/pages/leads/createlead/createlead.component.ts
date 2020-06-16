import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { AuthService } from 'src/app/service/auth.service';
import { LeadService } from 'src/app/service/lead.service';
import { OverlayEventDetail } from '@ionic/core'
import { CustomersearchComponent } from '../../quotes/customersearch/customersearch.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
@Component({
  selector: 'app-createlead',
  templateUrl: './createlead.component.html',
  styleUrls: ['./createlead.component.scss'],
})
export class CreateleadComponent implements OnInit {
  leadHearAbout: any[]; customerTypes: any[]; projectTypes: any[]; leadTypes: any[]; salesPersonsList: any[];
  estimatorsList: any[]; projectManagersList: any[]; productionTypeList: any[]; priceList: any[];
  userLocations: any[]; scopeListsInfo: any[]; CreateaccountContacts: any[]; priceListsInfo: any[];
  logInUserID: any; leadInfo: any; CustType: any; SalesInfoType: any; selectedAccID: number; saleRepInfo: any;
  parentAccounts: any; DefLeadActType: number; commercialAccType: number; commActType: number;
  loaderToShow: Promise<void>; logInSign: any; SelectTabId: number;

  constructor(private loadingController: LoadingController, private qServe: QuoteService, private authService: AuthService,
    private leadService: LeadService, private Modalcntrl: ModalController, private qRep: QuoterepService) { }

  ngOnInit() {
    this.DefLeadActType = 36; this.commercialAccType = 13; this.commActType = 36; this.SelectTabId = 1;
    this.authService.GetStoredLoginUser().then(data => {
      this.logInUserID = data.logInUserID; this.logInSign = data.logInUserSignature;
      this.qServe.GetUserLocList(data.logInUserID).subscribe(data => {
        this.userLocations = data;
        this.leadInfo.LocID = this.userLocations.length == 0 ? 1 : this.userLocations[0].locationID;
      });
    });
    this.SalesInfoType = "LEAD";
    this.selectedAccID = 0; this.scopeListsInfo = []; this.CreateaccountContacts = [];
    this.leadInfo = {
      ID: 0, CustomerID: 0, ActTypeID: this.DefLeadActType, LeadDate: new Date().toLocaleDateString("en-US"), StatusID: 1,
      UserID: this.logInUserID, SalesPersonID: 0, HearBefore: 2, HearAbout: 2,
      SourceID: 0, CustTypeID: 4, IsCustRetail: 0,
      LeadCustomer: { ID: 0, chkflag: false, }
    }
    let custDicIds = [1]; let leadDicIds = [2, 3];
    this.qServe.LeadDictionaryLists(leadDicIds).subscribe(data => {
      let leadtypes = data[0]; this.leadHearAbout = data[1];
      this.leadTypes = leadtypes.filter(s => s.Name != "" && s.Name != null);
    });
    this.qServe.CustomerDictionayList(custDicIds).subscribe(data => { this.customerTypes = data[0]; this.selectcusttype(this.leadInfo.CustTypeID) });
    this.qServe.GetAdminProjectTypes(28).subscribe(data => { this.projectTypes = data });
    this.PopulateDropDownList(4);
    this.LeadActTypeList();
  }

  //initial load lists
  PopulateDropDownList(Id: number) {
    this.qServe.CustTypeResourceList(Id, 3).subscribe(data => {
      this.salesPersonsList = data;
      if (this.salesPersonsList != null) {
        let model = this.salesPersonsList[0];
        this.leadInfo.SalesPersonID = model.ResourceID;
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
      if (this.productionTypeList != null) {
        let model = this.productionTypeList[0];
        this.leadInfo.JobTypeID = model.ID;
      }
    });
    this.qServe.CustPriceList(Id).subscribe(data => {
      this.priceList = data;
      if (this.priceList != null) {
        let model = this.priceList[0];
        this.leadInfo.PriceListID = model.RefID;
      }
    });
  }
  LeadActTypeList() {
    this.leadService.LeadActTypeList(10, this.DefLeadActType).subscribe(data => {
      this.leadInfo.leadActTypes = [];
      data.forEach(act => {
        if (act.ID == this.DefLeadActType) { act.CheckActType = 1; act.MeetingTypeID = 1; act.MeetingIcon = "Phaone Call"; this.leadInfo.leadActTypes.push(act); }
        else { act.SchStartTime = null; act.SchEndTime = null; }
      });
    });
  }
  //Default Accounttype populating
  selectcusttype(TypeID) {
    let custtype = this.customerTypes.find(s => s.ID == TypeID);
    if (custtype != null) {
      this.CustType = custtype.Name;
    }
  }
  //Retailcheck
  ActionChangeRetailCheckBox(check) {
    if (check == 0) {
      this.leadInfo.CustomerID = 0;
      this.leadInfo.LeadCustomer = {};
      this.leadInfo.LeadCustomer.ID = 0;
      if (this.leadInfo.ParentCustInfo != null && this.leadInfo.ParentCustInfo != undefined) {
        let parentName = this.leadInfo.ChildAccID == 0 ? this.leadInfo.ParentCustInfo.SelName : this.leadInfo.ParentCustInfo.SelCode;
        let childAccCode = this.leadInfo.ChildAccID == 0 ? "" : " - " + this.leadInfo.ParentCustInfo.Name;
        parentName = parentName == undefined ? "" : parentName;
        childAccCode = childAccCode == undefined ? "" : childAccCode;
        this.leadInfo.CustomerName = parentName + childAccCode;
      }
    }
  }
  //Populate Account Cust list && Cutomer list
  ActionShowNewCustomerList(ev: any, typeId: number, search: string, clickType: number) {
    search = search == undefined ? "" : search;
    if ((search != null && search != "") || typeId == 2) {
      this.ActionShowPopover(ev, typeId, search, clickType);
    }
  }
  async ActionShowPopover(ev: any, typeId: number, search, clickType: number) {
    let custTypeID = clickType == 0 ? 4 : this.leadInfo.CustTypeID;
    console.log(custTypeID);
    let obj = { search: search, selectTypeId: typeId, custTypeID: custTypeID }
    const popover = await this.Modalcntrl.create({
      component: CustomersearchComponent,
      showBackdrop: true,
      componentProps: obj,
    })
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          if (detail.data.componentProps.TypeID == 4) {
            this.PopulateCustomerInfo(detail.data.componentProps);
          } else {
            this.PopulateParentCustInfo(detail.data.componentProps);
          }

        }
      }
    });
    return await popover.present();
  }
  PopulateCustomerInfo(model: any) {
    var typeID = this.leadInfo.CustTypeID;
    this.leadInfo.LeadCustomer = model;
    this.leadInfo.LeadCustomer.TypeID = typeID == 0 ? model.TypeID : typeID;
    this.leadInfo.CustomerID = model.ID;

    this.leadInfo.Address1 = (this.leadInfo.Address1 == null || this.leadInfo.Address1 == "") ? model.BillAddress : this.leadInfo.Address1;
    this.leadInfo.Address2 = (this.leadInfo.Address2 == null || this.leadInfo.Address2 == "") ? model.BillAddress1 : this.leadInfo.Address2;
    this.leadInfo.City = (this.leadInfo.City == null || this.leadInfo.City == "") ? model.BillCity : this.leadInfo.City;
    this.leadInfo.State = (this.leadInfo.State == null || this.leadInfo.State == "") ? model.BillState : this.leadInfo.State;
    this.leadInfo.Suburb = (this.leadInfo.Suburb == null || this.leadInfo.Suburb == "") ? model.BillSuburb : this.leadInfo.Suburb;
    this.leadInfo.Zipcode = (this.leadInfo.Zipcode == null || this.leadInfo.Zipcode == "") ? model.BillZipCode : this.leadInfo.Zipcode;
    this.leadInfo.TaxID = 0;
    if (typeID == 4) {//Retail
      let SalesPersonID = (model.SalesPersonID != 0 || model.SalesPersonID != undefined) ? model.SalesPersonID : this.leadInfo.SalesPersonID;
      this.leadInfo.SalesPersonID = SalesPersonID == 0 ? this.logInUserID : SalesPersonID;
      if (this.leadInfo.SalesPersonID > 0) {
        this.getSalesrepDetails(this.leadInfo.SalesPersonID);
      }
      this.leadInfo.IsCheck = 1;
      this.leadInfo.PayTypeID = model.PayTermsID != 0 ? 2 : 1;
      this.leadInfo.PaymentTermID = model.PayTermsID;
      this.leadInfo.CustomerName = model.Name;
    } else {
      if (this.leadInfo.ParentCustInfo == undefined || this.leadInfo.ParentCustInfo == null) {
        this.leadInfo.ParentCustInfo = {}; this.leadInfo.ParentCustInfo.Code = ""; this.leadInfo.ParentCustInfo.SelCode = "";
      }
      let hypen = this.leadInfo.ParentAccID == 0 ? "" : " - ";
      let childAccCode = this.leadInfo.ChildAccID == 0 ? "" : this.leadInfo.ParentCustInfo.Code + " - ";
      let cust = this.leadInfo.LeadCustomer.Name == undefined ? "" : this.leadInfo.LeadCustomer.Name;
      this.leadInfo.CustomerName = this.leadInfo.ParentCustInfo.SelCode + hypen + childAccCode + cust;
    }
    this.populateCustName();
    this.getcustomercontacts();
  }
  PopulateParentCustInfo(info: any) {
    this.leadInfo.CustTypeID = info.TypeID;
    this.populateParentAccounts(info.TypeID);
    if (info.TypeID == 4) {
      this.PopulateCustomerInfo(info);
    } else {
      if (info != '') {
        this.leadInfo.AccName = info.SelName + info.ShowHyphen + info.Name;
        this.leadInfo.ParentCustInfo = info;
        this.leadInfo.ChildAccID = info.ParentID == 0 ? 0 : info.ID;
        this.leadInfo.ParentAccID = info.ParentID == 0 ? info.ID : info.ParentID;
        this.leadInfo.PayTypeID = info.PayTermsID != 0 ? 2 : 1;
        this.leadInfo.PaymentTermID = info.PayTermsID;
        var childAccCode = this.leadInfo.ChildAccID == 0 ? "" : this.leadInfo.ParentCustInfo.Code + " - ";
        var cust = this.leadInfo.LeadCustomer.Name == undefined ? "" : this.leadInfo.LeadCustomer.Name;
        if (this.leadInfo.IsCustRetail == 0 && this.leadInfo.CustomerID == 0) {
          let parentName = this.leadInfo.ChildAccID == 0 ? this.leadInfo.ParentCustInfo.SelName : this.leadInfo.ParentCustInfo.SelCode;
          let childAccCode = this.leadInfo.ChildAccID == 0 ? "" : " - " + this.leadInfo.ParentCustInfo.Name;
          this.leadInfo.CustomerName = parentName + childAccCode;
        } else {
          this.leadInfo.CustomerName = this.leadInfo.ParentCustInfo.SelCode + " - " + childAccCode + cust;
        }
        this.leadInfo.AccountTaxID = info.SalesTaxID;
        this.populateSalesPersonList(info);
        this.populatePriceList(info);
        this.populateEstimatorList(info);
        this.populateProjManagerList(info);
        this.ActionSameAsCustomerAddress();

      }
    }
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
      this.leadInfo.SalesPersonID = salesperList[0].ID;
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
      this.leadInfo.PriceListID = priceList[0].RefID;
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
      this.leadInfo.EstimatorID = salesperList[0].ID;
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
      this.leadInfo.ProjectManagerID = salesperList[0].ID;
    }
    return salesperList;
  }
  ActionSameAsCustomerAddress() {
    let leadInfo = this.leadInfo;
    var add1 = '', add2 = '', city = '', state = '', zip = '', contId = 0, coninfo = '';
    if (leadInfo.IsCheck1 == 1) {
      add1 = leadInfo.ParentCustInfo.BillAddress;
      add2 = leadInfo.ParentCustInfo.BillAddress1;
      city = leadInfo.ParentCustInfo.BillCity;
      state = leadInfo.ParentCustInfo.BillState;
      zip = leadInfo.ParentCustInfo.BillZipCode;
    }
    console.log(this.leadInfo);
    leadInfo.Address1 = add1;
    leadInfo.Address2 = add2;
    leadInfo.City = city;
    leadInfo.State = state;
    leadInfo.Zipcode = zip;
    leadInfo.ContactId = contId; leadInfo.ContactInfo = coninfo;
    return leadInfo;
  }
  getSalesrepDetails(Id) {
    this.leadService.GetSalesRepDetails(Id).subscribe(results => { this.saleRepInfo = results; }, function (error) { alert(error.data); });
  }
  populateCustName() {
    let leadInfo = this.leadInfo
    let custname = leadInfo.LeadCustomer.Name, firstname = leadInfo.LeadCustomer.FirstName, lastname = leadInfo.LeadCustomer.LastName;
    if (firstname == "" || firstname == undefined) { leadInfo.LeadCustomer.chkflag = true; }

    if ((firstname == "" || firstname == null) || leadInfo.LeadCustomer.chkflag == true) {
      //Step1
      var commaNames = (custname != "" && custname != undefined) ? custname.split(',') : "";
      if (commaNames.length == 1) {
        leadInfo.LeadCustomer.FirstName = commaNames[0];
      }
      else if (commaNames.length > 1) {
        leadInfo.LeadCustomer.FirstName = commaNames[commaNames.length - 1];
        leadInfo.LeadCustomer.LastName = commaNames.slice(0, commaNames.length - 1).join(" ");
        return;
      }
      //Step2
      var names = (custname != "" && custname != undefined) ? custname.split(' ') : "";
      if (names.length == 1) {
        leadInfo.LeadCustomer.FirstName = names[0];
      }
      else if (names.length > 1) {
        leadInfo.LeadCustomer.LastName = names[names.length - 1];
        leadInfo.LeadCustomer.FirstName = names.slice(0, names.length - 1).join(" ");
      }

      if (custname == '' || custname == undefined) {
        leadInfo.LeadCustomer.FirstName = "";
        leadInfo.LeadCustomer.LastName = "";
      }
    }
  }
  getcustomercontacts() {
    let model: any; let leadInfo = this.leadInfo; let customerContacts = [];
    this.qServe.GetCustomerContacts(leadInfo.CustomerID).subscribe(data => {
      customerContacts = data;
      if (leadInfo.CustomerID > 0) {
        model = customerContacts.find(s => s.CustomerID == leadInfo.CustomerID && s.IsDefault == 1 && s.IsCustomer == 1);
        if (model != "" && model != null && model != undefined) {
          leadInfo.CustContactID = model.ID;
        }
      }
    });
  }
  populateParentAccounts(Id) {
    this.priceListsInfo = [];
    this.leadInfo.IsCustRetail = 0;
    this.leadInfo.ChildAccID = 0;
    this.leadInfo.ParentAccID = 0;
    this.leadInfo.CreatePrimaryContactID = 0;
    this.leadInfo.AccName = '';
    this.selectedAccID = 0;
    this.leadInfo.ParentCustInfo = {};
    this.CreateaccountContacts = [];
    if (Id != 4) {
      this.leadService.GetParentAccListWithType(Id).subscribe(results => { this.parentAccounts = results; });
      this.qServe.SelTypePrefInfo(Id, 5).subscribe(results => { let success = results; if (success != null) { this.leadInfo.IsCustRetail = success.Isdefault } });
    }
    this.PopulateDropDownList(Id);
  }
  populatehearabout(sourceId) {
    var leadtype = this.leadHearAbout.filter(s => s.ID == sourceId);
    if (leadtype != null && leadtype != undefined) {
      this.leadInfo.HearAbout = leadtype[0].Name;
    }
  }

  //SaveLead
  ActionSaveLead(form: any) {debugger
    if (form.valid) {
      this.showLoader();
      if (this.leadInfo.CustTypeID != 4 && this.leadInfo.ParentAccID == 0) { this.leadInfo.AccName = ""; return; }
      this.prepareLead();
      this.leadService.ActionSaveLead(this.leadInfo).subscribe(data => {
        let Ids = data.split(',');
        this.leadInfo.ID = Ids[0]; this.leadInfo.CustomerID = Ids[1];
        if (this.leadInfo.ID != 0 && this.leadInfo.SalesPersonID > 0) {
          this.leadInfo.Status = "Initiated";
          this.leadInfo.AccountName = this.CustType;
          var model = this.leadTypes.filter(s => s.ID == this.leadInfo.LeadTypeID);
          if (model != null && model != undefined) { this.leadInfo.LeadType = model[0].Name;this.hideLoader(); }
          this.ActionCloseCreateLead(true);
          //this.SendLeadMessage();

        }
        this.hideLoader();
      }, function (error) { alert(error.data);console.log(this.leadInfo) });
    }
  }

  
  prepareLead() {
    this.leadInfo.ActTypeID = this.leadInfo.CustTypeID == this.commercialAccType ? this.commActType : this.DefLeadActType;
    this.leadInfo.CustomerName = this.leadInfo.CustomerName == null ? this.leadInfo.LeadCustomer.Name : this.leadInfo.CustomerName;
    this.leadInfo.UpdatedDate = new Date().toLocaleDateString("en-US");
    this.leadInfo.CustomerID = (this.leadInfo.CustomerID == undefined || this.leadInfo.CustomerID == null) ? 0 : this.leadInfo.CustomerID;
    if (this.leadInfo.IsCustRetail == 0 && this.leadInfo.CustTypeID != 4) {
      var modelItem = this.leadInfo.ParentCustInfo;
      this.leadInfo.CustomerID = modelItem.ID;
      this.leadInfo.ChildAccID = 0;
      this.leadInfo.ParentAccID = 0;
      this.leadInfo.Customer = modelItem;
      if (modelItem.ParentID > 0) {
        this.leadInfo.CustomerID = modelItem.ID;
        this.leadInfo.ChildAccID = 0;
        this.leadInfo.ParentAccID = modelItem.ParentID;
      }

    } else {
      this.leadInfo.LeadCustomer.TypeID = this.leadInfo.LeadCustomer.ID == 0 ? 4 : this.leadInfo.LeadCustomer.TypeID;
    }
  }
  SendLeadMessage() {
    this.leadInfo.UserID = this.logInUserID; this.leadInfo.UserSignature = this.logInSign == null ? "" : this.logInSign;
    this.leadService.ActionSendLeadMessage(this.leadInfo).subscribe(data => { this.hideLoader(); }, function (error) { alert(error.data); });
  }
  //close modal
  ActionCloseCreateLead(isSave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      isSave: isSave,
    });
  }
  //show && hide Loaders
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
  hideLoader() {
    this.loadingController.dismiss();
  }
  //Tab selection
  ActionSelectTab(tabId) {
    this.SelectTabId = tabId;
  }
}
