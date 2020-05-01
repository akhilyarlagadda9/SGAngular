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
   //Search for Account
   qsgetparentaccountswithtype(typeId:number,search:string):Observable<any>{
    return this.http.get<any>(this.url +  'api/customer/GetParentAccListWithType?typeId=' + typeId + "&search=" + search)
   }
   //DropDown For Acount
   qsgetparentaccounts(custtypeId:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/Customer/ParentAccListWithType?typeId=' + custtypeId)
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
