import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userModel:any;
  url = appUrl;
  constructor(private http: HttpClient, private storage: Storage) { }

  //Company Info service
  GetCompanyInfo(): Observable<any> {
    return this.http.get<any>(this.url + 'api/myAccount/CompanyInfo')
  }
  //Login Info Services
  //   authServiceFactory(UserID:any, PermissionID:any, ModuleID:any):Observable<any> {
  //      return this.http.get<any>(this.url +  'api/user/UserPermission?UserID=' + UserID + '&PermissionID=' + PermissionID + '&ModuleID=' + ModuleID)
  //   }
  ActionLogin(loginData: any): Observable<any> {
    var loginInfo = JSON.stringify(loginData);
    return this.http.post<any>(this.url + 'api/login/ActionLogin', loginInfo, { headers: { 'Content-Type': 'application/json' } })
  }
  SetCompanyStorage(data) {
    this.storage.set("CompanyInfo", data);
  }
  SetUserModel(data) {
    this.userModel = {
      isAuth: true, logInUserID: data.ID, logInUserEmpID: data.ReferenceID,
      loginUserName: data.FirstName, logInUserEmail: data.Email, logInUserIsAdmin: data.IsAdmin,
      logInUserSignature: (data.Signature == null || data.Signature == undefined) ? "" : data.Signature,
      userModules: data.ModuleList, userPermissions: data.UserPermissions, quotePermissions: data.QuotePermissions,
      quoteaccess :[],salestrackeraccess:[],jobaccess:[],calendaraccess:[],
    }
    console.log(this.userModel)
    let permissions =  data.UserPermissions;
    for (var i = 0; i < permissions.length; i += 1) {
      if (permissions[i].PermissionID == 71 && permissions[i].ModuleID == 3) { this.userModel.quoteaccess = permissions[i]; }
      if (permissions[i].PermissionID == 83 && permissions[i].ModuleID == 3) { this.userModel.salestrackeraccess = permissions[i]; }
      if (permissions[i].PermissionID == 65 && permissions[i].ModuleID == 4) { this.userModel.jobaccess = permissions[i]; }
      if (permissions[i].PermissionID == 66 && permissions[i].ModuleID == 4) { this.userModel.calendaraccess = permissions[i]; }
  }
  
    this.storage.set("_usermodel", this.userModel);
  }
  GetStoredCompany() {
    return this.storage.get("CompanyInfo").then((CompanyInfo) => {
      return CompanyInfo;
    });
  }
  GetStoredLoginUser() {
    return this.storage.get("_usermodel").then((usermodel) => {
      return usermodel;
    });
  }
}

