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

 //Production Type List
 QuoteMasterList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/MasterList?typeID=' + typeID)
}
 //Price List
 CustPriceList(typeID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/QuoteAdmin/CustPriceList?typeID=' + typeID)
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


/********** Pricebook Lists *************/

//Edge,Splash,Cutout,Labor List
qsgetpricelistitems(pricelistId:any):Observable<any> {
   let typeIdList = []; typeIdList.push(5); typeIdList.push(6); typeIdList.push(10); typeIdList.push(7);
  return this.http.get<any>(this.url +  'api/Quote/FabDropDownList?id=' + pricelistId + 'typeIds' + typeIdList)
}
//Sink,Faucet,Labor,Add on,Tile,Appliance,Tool,Consumables Lists
qsgetpricelistproductItems(pricelistId:any, producttypeId:any, searchTypeId:any, search:string):Observable<any> {
   let parameterAry = [pricelistId, producttypeId, 0, searchTypeId, search];
  return this.http.get<any>(this.url +  'api/Quote/SearchPriceItemList?modelAry=' + parameterAry)
}


}
