import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';
import { Audit } from 'src/app/Model/audit.model';
import { AuditService } from 'src/app/service/audit.service';
declare var google;
declare var platform: string;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: {
    UserName: string, PasswordHash: string, UserPermissions: any, logInUserIsAdmin: number,
  };
  ErrorMsg: string;
  constructor(private navCtrl: NavController, private authservise: AuthService,
    private plt: Platform, private storage: Storage,private audit:AuditService) {

  }
  ngOnInit() {
    this.user = { UserName: "", PasswordHash: "", UserPermissions: [], logInUserIsAdmin: 0 };
    this.FildPlatform();
    // if (this.plt.is('android')) {
    //   alert("android");
    // } else if (this.plt.is('ios')) {
    //   alert("ios");
    // }
    // else if (this.plt.is('cordova')) {
    //   alert("cordova");
    // }
    // else {
    //   alert("windows");
    // }

  }
  FildPlatform() {
    if (this.plt.is('desktop')) {
      platform = "desktop";
    } else if (this.plt.is('tablet')) {
      platform = "tablet";
    }
    else if (this.plt.is('ipad')) {
      platform = "tablet";
    }
    else {
      platform = "mobile";
    }
  }
  ActionLogin() {
    // this.navCtrl.navigateRoot('/home');
    this.authservise.ActionLogin(this.user).subscribe(data => {
      if (data != null) {
        this.user = data;
        this.ActionCompanyInfo();
        //  this.authservise.SetUserModel(data);
        //this.navCtrl.navigateRoot('/home');
      } else {
        this.ErrorMsg = "Incorrect UserName and Password!";
      }
    })

  }

  ActionCompanyInfo() {
    this.authservise.GetCompanyInfo().subscribe(data => {
      // this.authservise.SetCompanyStorage(data);
      this.setData(data);
    });
  }

  async setData(CompanyInfo) {
    // set user info
    let info = this.SetUserModel(this.user);
    await this.storage.set("UserInfo", info);
    await this.storage.set("loguserId", info.logInUserID);
    // set user Permissions
    this.SetUserPermissions(this.user.UserPermissions, this.user.logInUserIsAdmin);
    //set company info
    const company = await this.storage.set("CompanyInfo", CompanyInfo);
    let audt = new Audit();
    audt.userName = this.user.UserName;
    audt.reqStartTime = new Date().getTime();
    audt.viewName = "LoginToHome"
    // const strFullAddress = this.audit.geocodeAddress();
    // strFullAddress.then(res => {
    //   audt.location = res;
       this.navCtrl.navigateRoot('/home', { state: { audt } });
    // }).catch(error => {
    //   audt.location = error;
    //   this.navCtrl.navigateRoot('/home', { state: { audt } });
    // });
  }


  SetUserModel(data) {
    let userModel = {
      isAuth: true, logInUserID: data.ID, logInUserEmpID: data.ReferenceID,
      loginUserName: data.FirstName, logInUserEmail: data.Email, logInUserIsAdmin: data.IsAdmin,
      logInUserSignature: (data.Signature == null || data.Signature == undefined) ? "" : data.Signature,
      userModules: data.ModuleList, userPermissions: data.UserPermissions, quotePermissions: data.QuotePermissions,

    };
    //   let permissions =  data.UserPermissions;
    //   for (var i = 0; i < permissions.length; i += 1) {
    //     if (permissions[i].PermissionID == 71 && permissions[i].ModuleID == 3) { userModel.quoteaccess = permissions[i]; }
    //     if (permissions[i].PermissionID == 83 && permissions[i].ModuleID == 3) { userModel.salestrackeraccess = permissions[i]; }
    //     if (permissions[i].PermissionID == 65 && permissions[i].ModuleID == 4) { userModel.jobaccess = permissions[i]; }
    //     if (permissions[i].PermissionID == 66 && permissions[i].ModuleID == 4) { userModel.calendaraccess = permissions[i]; }
    // }
    return userModel;
  }
  async SetUserPermissions(permissions: any, isAdmin) {
    let quoteaccess: number, salestrackeraccess: number, jobaccess: number, calendaraccess: number;
    if (isAdmin == 1) {
      quoteaccess = 2; salestrackeraccess = 2, jobaccess = 2, calendaraccess = 2;
    } else {
      for (var i = 0; i < permissions.length; i += 1) {
        if (permissions[i].PermissionID == 71 && permissions[i].ModuleID == 3) {
          quoteaccess = permissions[i].AccessType;
        }
        if (permissions[i].PermissionID == 65 && permissions[i].ModuleID == 4) {
          jobaccess = permissions[i].AccessType;
        }
        if (permissions[i].PermissionID == 66 && permissions[i].ModuleID == 4) {
          calendaraccess = permissions[i].AccessType;

        }
      }
      quoteaccess = quoteaccess == undefined ? 0 : quoteaccess;
      jobaccess = jobaccess == undefined ? 0 : jobaccess;
      calendaraccess = calendaraccess == undefined ? 0 : calendaraccess;
    }
    let useraccess = { quote: quoteaccess, job: jobaccess, calendar: calendaraccess }
    await this.storage.set("userModuleAccess", useraccess);
    await this.storage.set("quoteaccess", quoteaccess);
    // await this.storage.set("salestrackeraccess", salestrackeraccess);
    // await this.storage.set("jobaccess", jobaccess);
    await this.storage.set("calendaraccess", calendaraccess);
  }




}
