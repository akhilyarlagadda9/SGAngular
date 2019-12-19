import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotegetService {

  //url = "http://localhost:1758/"; 
  url = "http://64.251.30.12:50005/StoneApp.WebAPI/"
  constructor(private http: HttpClient) { }
  
  //Company Info service
  GetCompanyInfo():Observable<any> {
    return this.http.get<any>(this.url +  'api/myAccount/CompanyInfo')
  }
  //Login Info Services
  authServiceFactory(UserID:any, PermissionID:any, ModuleID:any):Observable<any> {
     return this.http.get<any>(this.url +  'api/user/UserPermission?UserID=' + UserID + '&PermissionID=' + PermissionID + '&ModuleID=' + ModuleID)
  }
  ActionLogin(loginData :any): Observable<any> {
    var loginInfo = JSON.stringify(loginData),deferred = $q.defer();
    return this.http.post<any>(this.url + 'api/login/ActionLogin', loginInfo, { headers: { 'Content-Type': 'application/json' } })
    return deferred.promise;
   }

//   getCompanyInfo = function () {
//     return $http.get(serviceBase + 'api/myAccount/CompanyInfo').then(function (results) {
//         return results;
//     });
// };

// authServiceFactory.UserPermission = function (UserID, PermissionID, ModuleID) {
//   return $http.get(serviceBase + 'api/user/UserPermission?UserID=' + UserID + '&PermissionID=' + PermissionID + '&ModuleID=' + ModuleID).then(function (results) {
//       return results;
//   });
// };

// authServiceFactory.ActionLogin = function (loginData) {
//   var loginInfo = JSON.stringify(loginData), deferred = $q.defer();
//   return $http.post(serviceBase + 'api/login/ActionLogin', loginInfo, { headers: { 'Content-Type': 'application/json' } }).success(function (response) { deferred.resolve(response); }).error(function (err, status) { deferred.reject(err); });
//   return deferred.promise;
// }



}

