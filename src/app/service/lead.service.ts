import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class LeadService {
  url = appUrl;
  constructor(private http: HttpClient) { }
  //#region getlist
  // Get Follow-Up Calendar Activities
  LeadFollowUpActList(followupId, userId, custTypeId, salesRepID, actTypeId, startDate, endDate, search): Observable<any> {
    return this.http.get<any>(this.url + 'api/lead/LeadFollowUpActList?followupId=' + followupId + "&userId=" + userId + "&custTypeId=" + custTypeId + "&salesRepID=" + salesRepID + "&actTypeId=" + actTypeId + "&startDate=" + startDate + "&endDate=" + endDate + "&search=" + search)
  }
  // Lead search list
  LeadSearchList(search, typeId): Observable<any> {//send typeid =2;
    return this.http.get<any>(this.url + 'api/lead/LeadSearchList?search=' + search + "&typeId=" + typeId)
  }
  // Activity list
  GetActivityTypeList(moduleID): Observable<any> {//send moduleID = 10;
    return this.http.get<any>(this.url + 'api/Project/ActivityTypeList?moduleID=' + moduleID)
  }
  // Message Status list
  GetMessageStatusList(typeID): Observable<any> {//send typeID = 11;
    return this.http.get<any>(this.url + 'api/QuoteAdmin/MasterList?typeID=' + typeID)
  }
  //Status List
  GetStatusList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/Project/ActivityStatusList')
  }
  //Lead Activity type List
  LeadActTypeList(moduleId: any, seltypeId:any): Observable<any> {
    return this.http.get<any>(this.url + 'api/lead/LeadActTypeList?moduleID=' + moduleId + "&seltypeId=" + seltypeId)
  }
  //Lead Activity Info
  GetLeadActivityInfo(activityId, startDate, endDate): Observable<any> {
    return this.http.get<any>(this.url + 'api/lead/LeadActivityInfo?activityId=' + activityId + "&startDate=" + startDate + "&endDate=" + endDate)
  }
  //Lead Activity type List
  GetSalesRepDetails(Id): Observable<any> {
    return this.http.get<any>(this.url + 'api/lead/SalesPersonDetails?Id=' + Id)
  }
  GetParentAccListWithType(typeId): Observable<any> {
    return this.http.get<any>(this.url + 'api/Customer/ParentAccListWithType?typeId=' + typeId)
  }
  //get Lead Info
  GetLeadInfo(Id):Observable<any>{
    return this.http.get<any>(this.url + 'api/lead/LeadInfo?Id=' + Id)
  }
  //#endregion
  //#region Save Functions
  //Action Save Lead Activity
  ActionSaveLeadActivity(model: any): Observable<any> {
    var info = JSON.stringify(model);
    return this.http.post<any>(this.url + 'api/lead/SaveLeadActivityInfo', info, { headers: { 'Content-Type': 'application/json' } })
  }
  //ActionSaveLead
  ActionSaveLead(model: any): Observable<any> {
    var leadInfo = JSON.stringify(model);
    return this.http.post<any>(this.url + 'api/lead/SaveLead', leadInfo, { headers: { 'Content-Type': 'application/json' } })
  }
  //sendleadmessage
  ActionSendLeadMessage(model: any): Observable<any> {
    var parameter = JSON.stringify(model);
    return this.http.post<any>(this.url + 'api/lead/SendLeadMessage', parameter, { headers: { 'Content-Type': 'application/json' } })
  }
  //#endregion
}
