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
ActionQuickActList(startDate:any, endDate:string, search:string, actTypeId:number, userId:number, resIds:string):Observable<any> {
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
//ActivityInfo List
ActivityInfo(activityId:number, actTypeId:number, startDate:any, endDate:any):Observable<any> {
  console.log(activityId);console.log(actTypeId);
  console.log(startDate);console.log(endDate);
  return this.http.get<any>(this.url +  'api/Project/ActivityInfo?activityId=' + activityId + "&actTypeId=" + actTypeId + "&startDate=" + startDate + "&endDate=" + endDate)
}
//Approved Job List
ApprovedJobList(search:string,typeId:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ApprovedJobList?search=' + search + '&typeId=' + typeId)
}
//Phase List
PhaseList(versionID:number):Observable<any> {
  console.log(versionID);
  return this.http.get<any>(this.url +  'api/Project/PhaseList?versionID=' + versionID)
}
//Status List
ActionStatusList():Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActivityStatusList')
}
//Area List
ActionAreaList(versionID:number,phaseID:number):Observable<any> {debugger;
  return this.http.get<any>(this.url +  'api/Project/AreaList?versionID=' + versionID + '&phaseID=' + phaseID)
}



//POST SERVICES

//Activity Save Function
ActionSaveActivityInfo(model:any):Observable<any> {
  var parameter = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/Project/SaveActivityInfo', parameter, { headers: { 'Content-Type': 'application/json' } })
}

}
