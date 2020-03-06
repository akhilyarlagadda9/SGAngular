import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class QuotegetService {
  ActionGetList(search: string, statusId: number, index: number, noOfRecords: number, accessmode: number, arg5: number, sortTypeId: number, sortby: number) {
    throw new Error("Method not implemented.");
  }

  url = appUrl;
  constructor(private http: HttpClient) { }
  
  //Lead type List
  LeadDictionaryLists(typeIdList):Observable<any> {
    return this.http.get<any>(this.url +  'api/lead/LeadDictionaryLists?typeIdList=' + typeIdList)
  }
  //Hear About Us List
  getCustomerSearchList(search:string, typeId:Number):Observable<any> {
    return this.http.get<any>(this.url +  'api/customer/GetCustomerSearchList?search=' + search + "&typeId=" + typeId)
   }
  //Customer/Account List
  qsgetallcustomersearchlist(search:string, typeId:number, custTypeID:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/customer/GetAllCustomerSearchList?search=' + search + "&typeId=" + typeId + "&custTypeID=" + custTypeID)
   }
  //Project Type List
  getpricelists(typeId:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + "&typeId=" + typeId)
  }

 //Production Type List,DiscountType List
 QuoteMasterList(typeID:number):Observable<any> {;
  return this.http.get<any>(this.url +  'api/QuoteAdmin/MasterList?typeID=' + typeID)
}
 //Price List
 CustPriceList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + typeID)
}
//Quote Contacts service
qsgetquotecontacts(quoteId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteRep3/GetQuoteContacts?quoteId=' + quoteId)
}
 //Sales Rep List,Estimator List and Project Managers List
CustTypeResourceList(parentId:number,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustTypeResourceList?parentID=' + parentId + '&typeId=' + typeId)
}
CustomerDictionayList(tIdList:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Customer/CustomerDictionayList?typeIdList=' + tIdList)
}

GetParentAccListWithType(typeId:number,search:string):Observable<any> {
  return this.http.get<any>(this.url +  'api/customer/GetParentAccListWithType?typeId=' + typeId + "&search=" + search)
}
GetCustomerContacts(custId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteRep3/GetCustomerContacts?custId=' + custId)
}
CustomerList(count:number,search:string,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Customer/CustomerList?count=' + count + "&search=" + search + "&typeId=" + typeId)
}

SelTypePrefInfo(custTypeId:number,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/SelTypePrefInfo?custTypeId=' + custTypeId + "&typeId=" + typeId)
}
/********** Pricebook Lists *************/

//Edge,Splash,Cutout,Labor List
qsgetpricelistitems(pricelistId:any,typeIdList:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/FabDropDownList?id=' + pricelistId + '&typeIds=' + typeIdList)
}

//Sink,Faucet,Labor,Add on,Tile,Appliance,Tool,Consumables Lists
qsgetpricelistproductItems(pricelistId:any, producttypeId:any, searchTypeId:any, search:string):Observable<any> {
   let parameterAry = [pricelistId, producttypeId, 0, searchTypeId, search];
  return this.http.get<any>(this.url +  'api/Quote/SearchPriceItemList?modelAry=' + parameterAry)
}

// Tax List 
Accounttaxlist(typeID:number,CustTypeID:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/AccountTaxList?typeID=' + typeID + "&custTypeID=" + CustTypeID)
}
//Inventory Thickness List and Finish Item List
qsgetinventorydictlist(finishId:any, thickId:any,rislevelId:any):Observable<any> {
  let result = "", typeIdList = []; typeIdList.push(finishId); typeIdList.push(thickId); typeIdList.push(rislevelId);
  return this.http.get<any>(this.url +  'api/admin/InventoryDicLists?typeIdList=' + typeIdList)
}

//DICTIONARY LISTS
getsalespersons(parentId:number,typeId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustTypeResourceList?parentID=' + parentId + '&typeId=' + typeId,)
}

/*************** COMM.HUB LIST *****************/
//Message List
// CommunicationMessageList(versionId:any, catId:any, phaseId:any, typeId:any, customerId:any) {
//   return this.http.get<any>(this.url +  'api/Quote/CommunicationMessageList?versionId=' + versionId + "&catagoryId=" + catId + "&phaseId=" + phaseId + "&typeId=" + typeId + "&customerId=" + customerId)
// }

//Quote Notes List
QuoteNotes(Id:number, typeId:number) {
  return this.http.get<any>(this.url +  'api/Quote/QuoteNotes?Id=' + Id + "&typeId=" + typeId)
}
//Stages List
processTypeList(typeId:number):Observable<any> {
  console.log(typeId);
  return this.http.get<any>(this.url +  'api/Project/ProjectProcessList?typeId=' + typeId)
}
//Category List
NotecategoryList(Id:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/NotecategoryList?Id=' + Id)
}
//Type List
formsList(typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/FormsList?typeId=' + typeId)
}
//Phase List
CommHubPhaseList(versionID:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/CommHubPhaseList?versionID=' + versionID)
}
//Message Status List(QuoteMasterList)
//Note Attachment List
NoteAttachements(Id:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/NoteAttachements?Id=' + Id)
}

 /*************** Material,Sinks And Addons Sections Get Services **************************/
 //Quote MaterialList
 QuotematerialList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionMaterialList?versionID=' + verId)
 }
 //Quote SinkList
 QuotesinksList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionSinkList?versionID=' + verId)
 }
 //Quote FaucetList
 QuotefaucetsList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionFaucetList?versionID=' + verId)
 }
 //Quote ApplianceList
 QuoteappliancesList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionApplianceList?versionID=' + verId)
 }
 //Quote ConsumablesList
 QuoteconsumablesList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionConsumablesList?versionID=' + verId)
 }
 //Quote ToolsList
 QuotetoolsList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionToolsList?versionID=' + verId)
 }
 //Quote AddonsList
 QuoteaddonsList(verId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QEdit/ActionVersionAddonList?versionID=' + verId)
 }
 //Quote ActivitiesList
 QuoteactivitiesList(versionID:number,phaseId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/QuoteBiddingActivityList?versionID=' + versionID + '&phaseId=' + phaseId)
 }
 
// Created Quote
Preparecustomermodel(header, model) {
  let typeID = header.Version.CustTypeID;
  header.Version.Customer = model;
  header.Version.Customer.TypeID = typeID == 0 ? model.TypeID : typeID;
  header.CustomerID = model.ID;
  header.Version.CustomerID = model.ID;
  header.Version.Financed = model.Financed;
  header.Address1 = (header.Address1 == null || header.Address1 == "") ? model.BillAddress : header.Address1;
  header.Address2 = (header.Address2 == null || header.Address2 == "") ? model.BillAddress1 : header.Address2;
  header.City = (header.City == null || header.City == "") ? model.BillCity : header.City;
  header.State = (header.State == null || header.State == "") ? model.BillState : header.State;
  header.Zipcode = (header.Zipcode == null || header.Zipcode == "") ? model.BillZipCode : header.Zipcode;
  header.Version.TaxID = 0;
  header.IsCheck = 1;
  header.Version.FeeID = model.FeeID;
  header.Version.RefFee = model.Fee;
  header.Version.FeeTypeID = model.FeeTypeID;
  header.Version.Financed = model.Financed;
  if (typeID == 4) {//Retail
      header.Version.PriceListID = (header.Version.PriceListID == 0 || header.Version.PriceListID == undefined) ? model.PriceListID : header.Version.PriceListID;
      let SalesPersonID = (model.SalesPersonID != 0 || model.SalesPersonID != undefined) ? model.SalesPersonID : header.SalesPersonID;
      header.SalesPersonID = SalesPersonID == 0 ? this.getloginuserId() : SalesPersonID;

      let EstimatorID = (model.EstimatorID != 0 || model.EstimatorID != undefined) ? model.EstimatorID : header.EstimatorID;
      header.EstimatorID = EstimatorID == 0 ? 0 : EstimatorID;

      let ProjManagerID = (model.ProjectManagerID != 0 || model.ProjectManagerID != undefined) ? model.ProjectManagerID : header.ProjectManagerID;
      header.ProjectManagerID = ProjManagerID == 0 ? 0 : ProjManagerID;

      header.Version.PayTypeID = model.PayTermsID != 0 ? 2 : 1;
      header.Version.PaymentTermID = model.PayTermsID;
      header.Version.TaxID = model.SalesTaxID;
     // if (_qname) { header.QuoteName = model.Name; }
  } else {
      if (header.Version.ParentCustInfo == undefined || header.Version.ParentCustInfo == null) {
          header.Version.ParentCustInfo = {}; header.Version.ParentCustInfo.Code = ""; header.Version.ParentCustInfo.SelCode = "";
      }
      var hypen = header.Version.ParentAccID == 0 ? "" : " - ";
      var childAccCode = header.Version.ChildAccID == 0 ? "" : header.Version.ParentCustInfo.Code + " - ";
      var cust = header.Version.Customer.Name == undefined ? "" : header.Version.Customer.Name;
      var selcode = header.Version.ParentCustInfo.SelCode == undefined ? "" : header.Version.ParentCustInfo.SelCode;
      //if (_qname) { header.QuoteName = selcode + hypen + childAccCode + cust; }
  }
  return header;
}
 Prepareparentcustmodel(header, modelItem) {
  header.Version.AccName = modelItem.SelName + modelItem.ShowHyphen + modelItem.Name;
  header.Version.ParentCustInfo = modelItem;
  header.Version.ChildAccID = modelItem.ParentID == 0 ? 0 : modelItem.ID;
  header.Version.ParentAccID = modelItem.ParentID == 0 ? modelItem.ID : modelItem.ParentID;
  header.Version.PayTypeID = modelItem.PayTermsID != 0 ? 2 : 1;
  header.Version.PaymentTermID = modelItem.PayTermsID;
  header.Version.CustTypeID = modelItem.TypeID;
  header.Version.Financed = modelItem.Financed;
  header.Version.FeeID = modelItem.FeeID;
  header.Version.RefFee = modelItem.Fee;
  header.Version.FeeTypeID = modelItem.FeeTypeID;

  let childAccCode = header.Version.ChildAccID == 0 ? "" : header.Version.ParentCustInfo.Code + " - ";
  let cust = header.Version.Customer.Name == undefined ? "" : header.Version.Customer.Name;

  if (header.Version.IsCustRetail == 0 && header.CustomerID == 0) {
      let parentName = header.Version.ChildAccID == 0 ? header.Version.ParentCustInfo.SelName : header.Version.ParentCustInfo.SelCode;
      let childAccCode = header.Version.ChildAccID == 0 ? "" : " - " + header.Version.ParentCustInfo.Name;
      //if (_qname) { header.QuoteName = parentName + childAccCode; }
  } 
  header.Version.AccountTaxID = modelItem.SalesTaxID;
  header.Version.AccountTaxID = modelItem.SalesTaxID;
  header.SalesPersonID = (header.SalesPersonID == 0 || header.SalesPersonID == undefined) ? this.getloginuserId() : header.SalesPersonID;
  //calpriceList();

  return header;
}
getloginuserId(){
  return 0;
}


//Material Search Lists
ActionSearchMaterials(search:any, typeId:any,pricelistIds:any, depthId:any, finishId:any, searchtypeId:any, proSubGroupId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/ActionSearchMaterials?search=' + search + '&typeId=' + typeId + '&pricelistIds=' + pricelistIds + '&depthId=' + depthId + '&finishId=' + finishId + '&searchtypeId=' + searchtypeId + '&proSubGroupId=' + proSubGroupId)
 }
 //Material Price group List
 ActionPriceGroupList(pricelistId:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/ActionPriceGroupList?pricebookID=' + pricelistId)
 }


/**************SUPPLIERS LIST,INVENTORY DICS LIST *******************/
 ActionGetSupplierList(typeId):Observable<any>{
  return this.http.get<any>(this.url + 'api/accPayble/AccSupplierList?typeId=' + typeId) 
}
ActionInventoryDicLists(typeid:any):Observable<any> {
  let typeIdList = [typeid];
  return this.http.get<any>(this.url + 'api/admin/InventoryDicLists?typeIdList=' + typeIdList)
}

ActionGetsubproductgrouplist(typeid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/product/productSubGroupList?typeID=' + typeid + '&groupId=0') 
}

/*************Discount list****************/
ActionGetQuoteMasterList(typeID:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/QuoteAdmin/MasterList?typeID=' + typeID ) 
}

getdiscountlist(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/DiscountList?versionId=' + versionid) 
}

/*************Sales Tax list****************/
getaccounttaxlist(typeID:number, CustTypeID:number):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/AccountTaxList?typeID=' + typeID + '&custTypeID=' + CustTypeID, ) 
}


/*************Fees and Charges list****************/
getquotemasterlist(typeID:number):Observable<any> {
  return this.http.get<any>(this.url + 'api/QuoteAdmin/MasterList?typeID=' + typeID) 
}






}
