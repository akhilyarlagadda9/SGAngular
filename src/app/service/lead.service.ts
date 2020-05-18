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

  //Action Save Lead Activity
  ActionSaveLeadActivity(model: any): Observable<any> {
    var info = JSON.stringify(model);
    return this.http.post<any>(this.url + 'api/lead/SaveLeadActivityInfo', info, { headers: { 'Content-Type': 'application/json' } })
  }
  /////****MEETING TYPE LIST PASTE THIS FUNCTION IN TS FILE *****/
//   this.MeetingTypes = [
//     {
//         ID: 1,
//         Name: 'Phone Call',
//         IconClass: 'fa-phone'
//     },
//     {
//         ID: 2,
//         Name: 'Email',
//         IconClass: 'fa-envelope-o'
//     }, {
//         ID: 3,
//         Name: 'Meeting',
//         IconClass: 'fa-briefcase'
//     },
//  {
//      ID: 4,
//      Name: 'In Person',
//      IconClass: 'fa-user-md'
//  }];
}
