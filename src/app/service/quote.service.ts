import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url = appUrl;
  constructor(private http: HttpClient) { }
  
  ActionQuoteList(search:string,statusId:number,index:number,noOfRecords:number,accessmode:number,userempid:number,sortTypeId:number,sortby:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QList/ActionQuoteList?search=' + search + "&statusId=" + statusId + "&index=" + index + "&noOfRecords=" + noOfRecords + "&preferenceId=" + accessmode + "&userRefId=" + userempid + "&sortTypeId=" + sortTypeId + "&quoteSortId=" + sortby) 
  }
  ActionQuoteInfo(quoteid:number,quoteNo:string,versionId:number,customerId:number,accountId:number,parAccountId:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionHeaderInfo?quoteId=' + quoteid + '&quoteNo=' + quoteNo + '&versionId=' + versionId + '&customerId=' + customerId + '&accountId=' + accountId + '&parAccountId=' + parAccountId) 
  }
  ActionVersionInfo1(quoteId:number,versionId:string,salesrepId:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionVersionInfo1?quoteId=' + quoteId + '&versionId=' + versionId + '&salesrepId=' + salesrepId) 
  }
  
  ActionQuickAreaList(versionId:number,areaId:number,partId:number,mode:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuickAreaList?versionId=' + versionId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
  ActionPartInfo(versionId:number,areaId:number,partId:number,mode:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/QEdit/ActionPartInfo?versionId=' + versionId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
  ActionQuoteAreaList(versionID:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuoteAreaList?versionID=' + versionID) 
  }
  ActionQuickPartList(versionId:number,areaId:number,partId:number,mode:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuickPartList?versionId=' + versionId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
/********** COMMON LISTS ******************/

QuoteDictionaryLists(tIdList:any):Observable<any> {
  return this.http.get<any>(appUrl +  'api/QuoteAdmin/QuoteDictionaryLists?typeIdList=' + tIdList)
}

/*****************ACCOUNTS TAB LISTS*****************/
ActionGetInvoiceList(custID:number, quoteID:number):Observable<any>{
  return this.http.get<any>(this.url +  'api/accReceivable/QuoteInvoiceList?custID=' + custID + "&quoteID=" + quoteID) 
}

ActionGetPaymentList(custID:number, quoteID:number):Observable<any>{
  return this.http.get<any>(this.url + 'api/accReceivable/ProjectPmtList?custID=' + custID + "&proID=" + quoteID) 
}

/***********************************************Part Save Methods************************************/
ActionSaveQuoteInfo(header: any): Observable<any> {
  var model = JSON.stringify(header);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveQuoteInfo', model, { headers: { 'Content-Type': 'application/json' } })
}
ActionSaveQuoteCustomer(header: any): Observable<any> {
  var model = JSON.stringify(header);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveQuoteCustomer', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Fabrication,Measurements Save Function
 Actionsavepartfabrication(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartFabrication', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Splash Save Function
 ActionSavePartSplash(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartSplash', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Edge Save Function
 ActionSavePartEdge(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartEdge', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Cutout Save Function
 ActionSavePartCutout(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartCutout', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Sink Save Function
 ActionSaveSink(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveSink', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Faucet Save Function
 ActionSaveFaucet(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveFaucet', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Labor,Template,Install Save Function
 ActionSaveLabor(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveLabor', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Other Save Function
 ActionSaveAddon(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveAddon', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Tile,Appliance,Cabinet,Carpet,Consumable,Tool Save Function
 ActionSaveTile(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveTile', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Customer Items Save Function
 Actionsavepartcustitem(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartCustItem', model, { headers: { 'Content-Type': 'application/json' } })
}
//Sve Part
// ActionSaveAreaLayout(versionId,item: any): Observable<any> {
//   var model = JSON.stringify(item);
//   return this.http.post<any>(this.url + 'api/QSave/ActionSaveAreaLayout?versionId=' + versionId, model, { headers: { 'Content-Type': 'application/json' } })
// }

ActionSavePartItems(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartItems', model, { headers: { 'Content-Type': 'application/json' } })
}


ActionSaveMaterial(areaId,item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveMaterial?areaId=' + areaId, model, { headers: { 'Content-Type': 'application/json' } })
}
/******************Material Lists******************/
ActionGetMaterialList(verId:number):Observable<any>{
  return this.http.get<any>(this.url + 'api/QEdit/ActionVersionMaterialList?versionID=' + verId) 
}
ActionGetCountertypeList():Observable<any>{
  let typeIdList = []; typeIdList.push(5);
  return this.http.get<any>(this.url + 'api/QuoteAdmin/QuoteDictionaryLists?typeIdList=' + typeIdList,) 
}
FabricationRiskLevels(pricelistId):Observable<any>{
  return this.http.get<any>(this.url + 'api/QuoteAdmin/FabricationRiskLevels?pricelistId=' + pricelistId) 
}
ActionVersionMaterial(materialId:any):Observable<any>{
  return this.http.get<any>(this.url + 'api/QEdit/ActionVersionMaterial?materialId=' + materialId) 
}
// Material stock info function
ActionGetProductInfo(productId:any, locId:any, search:any, finishId:any, depthId:any, prosubgroupId:any):Observable<any>{
  return this.http.get<any>(this.url + 'api/inventory/ActionGetProductInfo?productId=' + productId + "&locId=" + locId + "&search=" + search + "&finishId=" + finishId + "&depthId=" + depthId + '&prosubgroupId=' + prosubgroupId) 
}

//Maretial stock info slab list function
ActionInventoryDicLists(typeid:any):Observable<any> {
  let typeIdList = [typeid];
  return this.http.get<any>(this.url + 'api/admin/InventoryDicLists?typeIdList=' + typeIdList) 
}

/********** Material ************/
ActionGetmaterialsearchrecords(search:any, typeId:any, pricelistIds:any, depthId:any, finishId:any, searchtypeId:any,proSubGroupId:any):Observable<any>{
  return this.http.get<any>(this.url + 'api/Quote/ActionSearchMaterials?search=' + search + '&typeId=' + typeId + '&pricelistIds=' + pricelistIds + '&depthId=' + depthId + '&finishId=' + finishId + '&searchtypeId=' + searchtypeId + '&proSubGroupId=' + proSubGroupId) 
}

Actionpricegrouplists(pricelistId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/QuoteAdmin/ActionPriceGroupList?pricebookID=' + pricelistId) 
}

//Supplier list
ActionGetSupplierAddDetails(supID:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/purchase/GetSupplierAddDetails?supplierID=' + supID) 
}

/************PROJECT PROCESS LIST *************/

ActionGetProjectTypes(typeId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Project/ProjectProcessList?typeId=' + typeId,) 
}


/*******ACTIONS APPROVE< BIDDING< DECLINE< *********/

 //Fabrication,Measurements Save Function
 ActionSaveQuoteApproved(version: any): Observable<any> {
  var model = JSON.stringify(version);
  return this.http.post<any>(this.url + 'api/Review/ActionSaveQuoteApproved', model, { headers: { 'Content-Type': 'application/json' } })
}
ActionSendMessage(header: any): Observable<any> {
  var model = JSON.stringify(header);
  return this.http.post<any>(this.url + 'api/Review/SendMessage', model, { headers: { 'Content-Type': 'application/json' } })
}
ActionSaveQuoteDeclined(version: any): Observable<any> {
  var model = JSON.stringify(version);
  return this.http.post<any>(this.url + 'api/Review/ActionSaveQuoteDeclined', model, { headers: { 'Content-Type': 'application/json' } })
}
ActionSaveQuoteCancelled(version: any): Observable<any> {
  var model = JSON.stringify(version);
  return this.http.post<any>(this.url +  'api/Review/ActionSaveQuoteCancelled', model, { headers: { 'Content-Type': 'application/json' } })
}
ActionSaveQuoteBidding(version: any): Observable<any> {
  var model = JSON.stringify(version);
  return this.http.post<any>(this.url +   'api/Review/ActionSaveQuoteBidding', model, { headers: { 'Content-Type': 'application/json' } })
}
/**********SAVE AREASLIST**********/
ActionSaveAreaList(versionid: any,areaId:any,userId:any,arealist:any): Observable<any> {
  let parameter = JSON.stringify(arealist);
  return this.http.post<any>(this.url +  'api/QSave/ActionSaveAreaList?versionId=' + versionid + '&areaId=' + areaId + '&userId=' + userId + "&areaIds=" + '', parameter, { headers: { 'Content-Type': 'application/json' } })
}
ActionGetQuoteAreas(verId: any, mode:any): Observable<any> {
  return this.http.get<any>(this.url + 'api/QEdit/ActionVersionAreaList?versionID=' + verId + "&mode=" + mode)
}


/***************************** Comm.Hub Lists *******************************/
ActionTemplateList(typeId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/TemplateList?typeId=' + typeId) 
}
ActionNoteInfo(Id:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/NoteInfo?Id=' + Id) 
}
ActionCustomerContactList(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CustomerContactList?versionid=' + versionid) 
}

/****************** Material Stock Info Select Function *********************/
ActionSaveMaterialInvSlabList(slabList: any): Observable<any> {
  var model = JSON.stringify(slabList);
  return this.http.post<any>(this.url + 'api/Quote/SaveMaterialInvSlabList', model, { headers: { 'Content-Type': 'application/json' } })
}

/**************Email Template Contact list******************/
//Template List
ActiongettemplateList(typeId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/TemplateList?typeId=' + typeId)
} //send 26 as typeid in ts function

//Email List
ActionEmailList():Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/EmailList')
}

//quote customers
ActionGetQuoteCustContactList(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CustomerContactList?versionid=' + versionid) 
} //send versionid as parameter

//email employee list
ActionGetEmailsEmployeeList(contactList):Observable<any> {
  var parameter = JSON.stringify(contactList);
  return this.http.post<any>(this.url + 'api/Quote/GetEmailsEmployeeList', parameter, { headers: { 'Content-Type': 'application/json' } })
} //result of the customer contanct list must send as parameter to contactlist


}
