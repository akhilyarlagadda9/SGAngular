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
    var loginInfo = JSON.stringify(loginData);
    return this.http.post<any>(this.url + 'api/login/ActionLogin', loginInfo, { headers: { 'Content-Type': 'application/json' } })
   }

}

