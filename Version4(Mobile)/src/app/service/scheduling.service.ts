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
ActionQuickActList(startDate:any, endDate:any, search:string, actTypeId:number, userId:number, resIds:string):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActionQuickActList?startDate=' + startDate + "&endDate=" + endDate + "&search=" + search + '&actTypeId=' + actTypeId + "&userId=" + userId + "&resIds=" + resIds)
}
//ActivityType List
ActivityTypeList(moduleID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActivityTypeList?moduleID=' + moduleID)
}
//Activity Status List
ActivityStatusList():Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActivityStatusList')
}
//ActivityType Resource List
ActivityTypeResourceList(actTypeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActivityTypeResourceList?actTypeId=' + actTypeId)
}

}
