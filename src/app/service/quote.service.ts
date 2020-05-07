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
  ActionPartInfo(versionId:number,phaseId:number,areaId:number,partId:number,mode:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/QEdit/ActionPartInfo?versionId=' + versionId + '&phaseId=' + phaseId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
  ActionQuoteAreaList(versionID:number,phaseID:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuoteAreaList?versionID=' + versionID + "&phaseID=" + phaseID) 
  }
  ActionQuickPartList(versionId:number,phaseId:number,areaId:number,partId:number,mode:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuickPartList?versionId=' + versionId +'&phaseId=' + phaseId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
 
  ActionGetInvoiceList(custID:number, quoteID:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/accReceivable/QuoteInvoiceList?custID=' + custID + "&quoteID=" + quoteID) 
  }
  ActionGetPaymentList(custID:number, quoteID:number):Observable<any>{
    return this.http.get<any>(this.url + 'api/accReceivable/ProjectPmtList?custID=' + custID + "&proID=" + quoteID) 
  }
   ActionGetQuoteAreas(verId:number,mode:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionVersionAreaList?versionID=' + verId + '&mode=' + mode)
  }
  GetCustomerContacts(custId:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/QuoteRep3/GetCustomerContacts?custId=' + custId)
  }
  POImageDelete(id:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/Quote/POImageDelete?id=' + id)
    }

    POItemDelete(id:number):Observable<any> {
      return this.http.post<any>(this.url +  'api/QSave/ActionRemovePOItems?Id=' + id,{})
   }
   GetAreaSummaryList(verId,mode):Observable<any>{
     mode = mode == undefined ? 0 : mode;
     return this.http.get<any>(this.url + 'api/QEdit/ActionVersionAreaSummaryList?versionID=' + verId + "&mode=" + mode)
   }
//#region JobView
ActionGetPhaseList(versionId: number): Observable<any> {
  return this.http.get<any>(this.url + 'api/Project3/ActionGetPhaseList?versionId=' + versionId)
}
//#endregion
  
  //#endregion
//#region  List From Admin
LeadDictionaryLists(typeIdList):Observable<any> {
  return this.http.get<any>(this.url +  'api/lead/LeadDictionaryLists?typeIdList=' + typeIdList)
}
getCustomerSearchList(search:string, typeId:Number):Observable<any> {
  return this.http.get<any>(this.url +  'api/customer/GetCustomerSearchList?search=' + search + "&typeId=" + typeId)
 }
 qsgetallcustomersearchlist(search:string, typeId:number, custTypeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/customer/GetAllCustomerSearchList?search=' + search + "&typeId=" + typeId + "&custTypeID=" + custTypeID)
 }
 getpricelists(typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + "&typeId=" + typeId)
}
CustomerDictionayList(tIdList:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Customer/CustomerDictionayList?typeIdList=' + tIdList)
}
CustTypeResourceList(parentId:number,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustTypeResourceList?parentID=' + parentId + '&typeId=' + typeId)
}
QuoteMasterList(typeID:number):Observable<any> {;
  return this.http.get<any>(this.url +  'api/QuoteAdmin/MasterList?typeID=' + typeID)
}
GetAdminProjectTypes(typeID:number):Observable<any> {;
  return this.http.get<any>(this.url +  'api/QuoteAdmin/MasterList?typeID=' + typeID)
}
CustPriceList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + typeID)
}
SelTypePrefInfo(custTypeId:number,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/SelTypePrefInfo?custTypeId=' + custTypeId + "&typeId=" + typeId)
}
  QuoteDictionaryLists(tIdList:any):Observable<any> {
    return this.http.get<any>(appUrl +  'api/QuoteAdmin/QuoteDictionaryLists?typeIdList=' + tIdList)
  }
  ActionGetProjectTypes(typeId:any):Observable<any> {
    return this.http.get<any>(this.url + 'api/Project/ProjectProcessList?typeId=' + typeId,) 
  }
  //#endregion
//#region Save Methods
ActionSaveQuote(header: any): Observable<any> {
  var info = JSON.stringify(header);
  return this.http.post<any>(this.url + 'api/QuoteSave/ActionSaveQuote', info, { headers: { 'Content-Type': 'application/json' } })
}
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
//Action Batch Save Parts
ActionSaveBatchParts(versionId, areaId, userId, partslist:any){
  var model = JSON.stringify(partslist);
  return this.http.post<any>(this.url + 'api/QSave/ActionSaveBatchPartList?versionId=' + versionId + "&areaId=" + areaId + '&userId=' + userId, model, { headers: { 'Content-Type': 'application/json' } })
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
ProjectProcessList(typeId:number):Observable<any> {
  console.log(typeId);
  return this.http.get<any>(this.url +  'api/Project/ProjectProcessList?typeId=' + typeId)
}
NotecategoryList(Id:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Quote/NotecategoryList?Id=' + Id)
}
FormsList(typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/FormsList?typeId=' + typeId)
}
CommHubPhaseList(versionID:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/CommHubPhaseList?versionID=' + versionID)
}
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
ActionEmailList():Observable<any> {
  return this.http.get<any>(this.url + 'api/messageCenter/EmailList')
}
ActionGetEmailsEmployeeList(contactList):Observable<any> {
  var parameter = JSON.stringify(contactList);
  return this.http.post<any>(this.url + 'api/Quote/GetEmailsEmployeeList', parameter, { headers: { 'Content-Type': 'application/json' } })
}
ActionGetQuoteCustContactList(versionid:any):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CustomerContactList?versionid=' + versionid) 
} 
ActionCommunicationMessageList1(versionId:number, catId:number, phaseId:number, typeId:number, customerId:number, projectId:number):Observable<any> {
  return this.http.get<any>(this.url + 'api/Quote/CommunicationMessageList1?versionId=' + versionId + "&catagoryId=" + catId + "&phaseId=" + phaseId + "&typeId=" + typeId + "&customerId=" + customerId + '&projectId=' + projectId) 
}

DocHeader(Id:number, versionId:number, categoryId:number, userID:number, subject:number, typeId:number):Observable<any> {
  return this.http.post<any>(this.url + 'api/fileUpload/DocHeader?Id=' + Id + "&versionId=" + versionId + "&categoryId=" + categoryId + "&userID=" + userID + "&subject=" + subject + '&typeId=' + typeId, { headers: { 'Content-Type': 'application/json' }}) 
}
UploadAttatchments(Id:number, versionId:number,typeId:number, quoteno:string, jobstatusId:number):Observable<any> {
  return this.http.get<any>(this.url + 'api/fileUpload/UploadAttatchments?Id=' + Id + "&versionId=" + versionId + "&typeId=" + typeId + "&quoteNo=" + quoteno + "&jobstatusId=" + jobstatusId) 
}
//#region 
SaveQuoteNote(model): Observable<any> {
  var parameter = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/Quote/SaveQuoteNote', parameter,{ headers: { 'Content-Type': "application/json" } })
}
ActionDeleteImage(id):Observable<any>{
  return this.http.post<any>(this.url + 'api/Quote/RemovePic?Id=' + id,{})
}
qsendEmail(model): Observable<any> {
  var parameter = JSON.stringify(model);
  console.log(parameter);
  return this.http.post<any>(this.url + 'api/Quote/ActionSendMail', parameter,{ headers: { 'Content-Type': "application/json" } })
}
//#endregion

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
qpactionsavediscount(discountList,versionId:number,areaId:number,tax:any): Observable<any> {
  var model = JSON.stringify(discountList);
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

//#region   remove function




qppartmaterialremove(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemovePartMaterial?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qppartfabremove(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemovePartFab?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qppartedgeremove(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemovePartEdge?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qppartsplashremove(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemovePartSplash?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qppartcutoutremove(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemovePartCutout?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qpremovesink(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemoveSink?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qpremovefaucet(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemoveFaucet?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}


qpremovelabor(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemoveLabor?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

qpremoveaddon(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemoveAddon?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}
qpremovetile(Id, versionId, areaId): Observable<any> {
  return this.http.post<any>(this.url + 'api/QSave/ActionRemoveTile?Id=' + Id + '&versionId=' + versionId + '&areaId=' + areaId, { headers: { 'Content-Type': 'application/json' } })
}

  
//#endregion
}
