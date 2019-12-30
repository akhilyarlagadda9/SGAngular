import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})


export class SchedulingService {

  url = appUrl;
  constructor(private http: HttpClient) { }
  
 /*************  GET SERVICES ***************/

//Activity List
getactivityList(startDate:Date, endDate:Date, search:any, actTypeSearchId:any, stageId:any, userId:any, monitorView:any, matTypeId:any, managerId:any, resourceIds:any):Observable<any> {
  stageId = stageId == undefined || stageId == null ? 0 : stageId; managerId = managerId == undefined || managerId == null ? 0 : managerId;
  matTypeId = matTypeId == undefined || matTypeId == null ? 0 : matTypeId;
  return this.http.get<any>(this.url +  'api/Project/ActivityList3?startDate=' + startDate + "&endDate=" + endDate + "&search=" + search + '&actTypeSearchId=' + actTypeSearchId + "&stageId=" + stageId + "&userId=" + userId + "&monitorView=" + monitorView + "&matTypeId=" + matTypeId + "&managerId=" + managerId + "&resourceIds=" + resourceIds)
}


}
