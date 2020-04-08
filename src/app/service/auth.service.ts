import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // userModel:any;
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
  // SetUserModel(data) {
  //   this.storage.set("loguserId", data.ID);
  //   this.storage.set("UserInfo", data.FirstName);
  //   let userModel = {
  //     isAuth: true, logInUserID: data.ID, logInUserEmpID: data.ReferenceID,
  //     loginUserName: data.FirstName, logInUserEmail: data.Email, logInUserIsAdmin: data.IsAdmin,
  //     logInUserSignature: (data.Signature == null || data.Signature == undefined) ? "" : data.Signature,
  //     userModules: data.ModuleList, userPermissions: data.UserPermissions, quotePermissions: data.QuotePermissions,
  //     quoteaccess :[],salestrackeraccess:[],jobaccess:[],calendaraccess:[],
  //   }; 
  //   console.log(userModel);
  //   let permissions =  data.UserPermissions;
  //   for (var i = 0; i < permissions.length; i += 1) {
  //     if (permissions[i].PermissionID == 71 && permissions[i].ModuleID == 3) { userModel.quoteaccess = permissions[i]; }
  //     if (permissions[i].PermissionID == 83 && permissions[i].ModuleID == 3) { userModel.salestrackeraccess = permissions[i]; }
  //     if (permissions[i].PermissionID == 65 && permissions[i].ModuleID == 4) { userModel.jobaccess = permissions[i]; }
  //     if (permissions[i].PermissionID == 66 && permissions[i].ModuleID == 4) { userModel.calendaraccess = permissions[i]; }
  // }
  //   this.storage.set("usermodel", userModel);  
  // }
  async GetStoredCompany() {
    const keyVal = await this.storage.get("CompanyInfo");
    return keyVal;
  }
  async GetStoredLoginUser() {
    return await this.storage.get("UserInfo").then(result => {;
    return result;
    });
  }
  async GetStoredLoginUserID() {
    const keyVal = await this.storage.get("loguserId");
    return keyVal;
  }
  async GetStoredUserModuleAccess() {
    const keyVal = await this.storage.get("userModuleAccess");
    return keyVal;
  }
  async GetStoredQuoteAccess() {
    const keyVal = await this.storage.get("quoteaccess");
    return keyVal;
  }
  async GetStoredCalAccess() {
    const keyVal = await this.storage.get("calendaraccess");
    return keyVal;
  }

  
}

