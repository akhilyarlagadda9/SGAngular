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
ActionAreaList(versionID:number,phaseID:number):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/AreaList?versionID=' + versionID + '&phaseID=' + phaseID)
}
//Phase Area List
ActionPhasePartList(versionID:number, phaseID:number, actTypeId:any,partIds:any,areaIds:any):Observable<any> {debugger;
  return this.http.get<any>(this.url +  'api/project3/ActionPhasePartList?versionID=' + versionID + '&phaseID=' + phaseID + "&actTypeId=" + actTypeId + "&partIds=" + partIds + "&areaIds=" + areaIds)
}

GetActTypeInfo(actTypeId, startDate):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/GetActTypeInfo?actTypeId=' + actTypeId + '&startDate=' + startDate)
}
GetDuration(hrs, min,startDate,endDate,type):Observable<any> {
  return this.http.get<any>(this.url + 'api/Project/AddDuration?hrs=' + hrs + '&minutes=' + min + "&startDate=" + startDate + '&endDate=' + endDate + '&type=' + type)
}
//Resource List With Dates
ActTypeResListWithDates(actTypeId:any, startDate:any, endDate:any):Observable<any> {
  return this.http.get<any>(this.url +  'api/Project/ActTypeResListWithDates?actTypeId=' + actTypeId + "&startDate=" + startDate + "&endDate=" + endDate)
}



//POST SERVICES

//Activity Save Function
FollowUpStatus(model:any):Observable<any> {
  var parameter = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/Project/FollowUpStatus', parameter, { headers: { 'Content-Type': 'application/json' } })
}

ActionSaveActivityInfo(model:any):Observable<any> {
  var parameter = JSON.stringify(model);
  return this.http.post<any>(this.url + 'api/Project/SaveActivityInfo', parameter, { headers: { 'Content-Type': 'application/json' } })
}

}
