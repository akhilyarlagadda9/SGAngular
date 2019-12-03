import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotegetService {

  url = "http://64.251.30.12:50005/StoneApp.WebAPI/"; 
  constructor(private http: HttpClient) { }

  //Lead type List
  getLeadDictionaryLists(typeIdList):Observable<any> {
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
 //Sales Rep List,Estimator List and Project Managers List
  CustTypeResourceList(custTypeId:any, typeId:number):Observable<any> {
    return this.http.get<any>(this.url +  'api/QuoteAdmin/CustTypeResourceList?parentID=' + custTypeId + "&typeId=" + typeId)
 }
 //Production Type List
 QuoteMasterList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/MasterList?typeID=' + typeID)
}
 //Price List
 CustPriceList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + typeID)
}

 

}
