import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  url = "http://localhost:1758/"; 
  //url = "http://64.251.30.12:50005/StoneApp.WebAPI/"
  constructor(private http: HttpClient) { }
  
  ActionQuoteList(search:string,statusId:number,index:number,noOfRecords:number,accessmode:number,userempid:number,sortTypeId:number,sortby:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QList/ActionQuoteList?search=' + search + "&statusId=" + statusId + "&index=" + index + "&noOfRecords=" + noOfRecords + "&preferenceId=" + accessmode + "&userRefId=" + userempid + "&sortTypeId=" + sortTypeId + "&quoteSortId=" + sortby) 
  }
  ActionQuoteInfo(quoteid:number,quoteNo:string,versionId:number,customerId:number,accountId:number,parAccountId:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionHeaderInfo?quoteId=' + quoteid + '&quoteNo=' + quoteNo + '&versionId=' + versionId + '&customerId=' + customerId + '&accountId=' + accountId + '&parAccountId=' + parAccountId) 
  }
  ActionQuickAreaList(versionId:number,areaId:number,partId:number,mode:number): Observable<any> {
    return this.http.get<any>(this.url +  'api/QEdit/ActionQuickAreaList?versionId=' + versionId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
  ActionPartInfo(versionId:number,areaId:number,partId:number,mode:number):Observable<any>{
    return this.http.get<any>(this.url +  'api/QEdit/ActionPartInfo?versionId=' + versionId + '&areaId=' + areaId + "&partId=" + partId + "&mode=" + mode) 
  }
/********** COMMON LISTS ******************/

}
