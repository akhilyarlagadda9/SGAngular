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
//#region Get
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
 
  ActionGetInvoiceList(custID:number, quoteID:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/accReceivable/QuoteInvoiceList?custID=' + custID + "&quoteID=" + quoteID) 
  }
  ActionGetPaymentList(custID:number, quoteID:number):Observable<any>{
    return this.http.get<any>(this.url + 'api/accReceivable/ProjectPmtList?custID=' + custID + "&proID=" + quoteID) 
  }
  ActionGetQuoteAreas(verId: any, mode:any): Observable<any> {
    return this.http.get<any>(this.url + 'api/QEdit/ActionVersionAreaList?versionID=' + verId + "&mode=" + mode)
  }
  
  //#endregion
//#region  List From Admin
  QuoteDictionaryLists(tIdList:any):Observable<any> {
    return this.http.get<any>(appUrl +  'api/QuoteAdmin/QuoteDictionaryLists?typeIdList=' + tIdList)
  }
  ActionGetProjectTypes(typeId:any):Observable<any> {
    return this.http.get<any>(this.url + 'api/Project/ProjectProcessList?typeId=' + typeId,) 
  }
  //#endregion
//#region Save Methods
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
ActionSaveMaterialInvSlabList(slabList: any): Observable<any> {
  var model = JSON.stringify(slabList);
  return this.http.post<any>(this.url + 'api/Quote/SaveMaterialInvSlabList', model, { headers: { 'Content-Type': 'application/json' } })
}
//#endregion
//#region  Material
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
//#endregion
//#region  Comm Hub
ActionTemplateList(typeId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/TemplateList?typeId=' + typeId) 
}
ActionNoteInfo(Id:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/NoteInfo?Id=' + Id) 
}
ActionCustomerContactList(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CustomerContactList?versionid=' + versionid) 
}
ActiongettemplateList(typeId:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/TemplateList?typeId=' + typeId)
} 
ActionGetEmailsEmployeeList(contactList):Observable<any> {
  var parameter = JSON.stringify(contactList);
  return this.http.post<any>(this.url + 'api/Quote/GetEmailsEmployeeList', parameter, { headers: { 'Content-Type': 'application/json' } })
}
ActionEmailList():Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/EmailList')
}
ActionGetQuoteCustContactList(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CustomerContactList?versionid=' + versionid) 
} 
qsendEmail(model): Observable<any> {
  var parameter = JSON.stringify(model);
  console.log(parameter);
  return this.http.post<any>(this.url + 'api/Quote/ActionSendMail' + model,{ headers: { 'Content-Type': "application/json;charset=utf-8" } })
}
//#endregion
//#region Save methods Quote Actions and Summary
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
ActionSaveAreaList(versionid: any,areaId:any,userId:any,arealist:any): Observable<any> {
  let parameter = JSON.stringify(arealist);
  return this.http.post<any>(this.url +  'api/QSave/ActionSaveAreaList?versionId=' + versionid + '&areaId=' + areaId + '&userId=' + userId + "&areaIds=" + '', parameter, { headers: { 'Content-Type': 'application/json' } })
}
qpactionsavediscount(versionId:number,areaId:number,tax:any): Observable<any> {
  var model = JSON.stringify(versionId);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveDiscount?versionId=' + versionId + '&areaId=' + areaId + '&tax=' + tax, model, { headers: { 'Content-Type': 'application/json' } })
}
qpactionsavesalestax(model, areaId): Observable<any> {
  var data = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveSalesTax?areaId=' + areaId, data,{ headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}
qscosummary(coId): Observable<any> {
  var data = JSON.stringify(coId);
  return this.http.post<any>(this.url + 'api/Drawing/CoVersionInfo?coId=' + coId,{ headers: { 'Content-Type': "application/json;charset=utf-8" } })
}
qpversioncommissioninfo(salesrepId, info): Observable<any> {
  var data = JSON.stringify(info);
  return this.http.post<any>(this.url + 'api/QEdit/GetCommissionDetails?salesrepId=' + salesrepId,{ headers: { 'Content-Type': "application/json;charset=utf-8" } })
}
qpactionsavereferralfee(model, areaId): Observable<any> {
  var data = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveReferralFee?areaId=' + areaId, model,{ headers: { 'Content-Type': "application/json;charset=utf-8" } })
}
//#endregion
//#region Get methods For Summary
//#endregion
}
