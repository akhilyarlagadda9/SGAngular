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
 //Fabrication,Measurements Save Function
 Actionsavepartfabrication(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartFabrication', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Splash Save Function
 Actionsavepartsplash(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartSplash', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Edge Save Function
 ActionsavepartEdge(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartEdge', model, { headers: { 'Content-Type': 'application/json' } })
}
 //Cutout Save Function
 Actionsavepartcutout(item: any): Observable<any> {
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
 Actionsavepartlabor(item: any): Observable<any> {
  var model = JSON.stringify(item);
  return this.http.post<any>(this.url + 'api/QSave/ActionSavePartLabor', model, { headers: { 'Content-Type': 'application/json' } })
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

/******************Material Lists******************/
ActionGetMaterialList(verId:number):Observable<any>{
  return this.http.get<any>(this.url + 'api/QEdit/ActionVersionMaterialList?versionID=' + verId) 
}
ActionGetCountertypeList():Observable<any>{debugger;
  let typeIdList = []; typeIdList.push(5);
  return this.http.get<any>(this.url + 'api/QuoteAdmin/QuoteDictionaryLists?typeIdList=' + typeIdList,) 
}


}
