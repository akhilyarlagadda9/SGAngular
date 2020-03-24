import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';

declare var platform: string;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: {
    UserName: string, PasswordHash: string
  };
  ErrorMsg: string;
  constructor(private navCtrl: NavController, private authservise: AuthService, 
    private plt: Platform, private storage: Storage) {

  }
  ngOnInit() {
    this.user = { UserName: "", PasswordHash: "" };
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
    let info = this.SetUserModel(this.user);
   await this.storage.set("UserInfo", info);
   await this.storage.set("loguserId", info.logInUserID);
  const company = await this.storage.set("CompanyInfo", CompanyInfo);
   this.navCtrl.navigateRoot('/home');
  }

  SetUserModel(data) {
    let userModel = {
      isAuth: true, logInUserID: data.ID, logInUserEmpID: data.ReferenceID,
      loginUserName: data.FirstName, logInUserEmail: data.Email, logInUserIsAdmin: data.IsAdmin,
      logInUserSignature: (data.Signature == null || data.Signature == undefined) ? "" : data.Signature,
      userModules: data.ModuleList, userPermissions: data.UserPermissions, quotePermissions: data.QuotePermissions,
      quoteaccess :[],salestrackeraccess:[],jobaccess:[],calendaraccess:[],
    }; 
    let permissions =  data.UserPermissions;
    for (var i = 0; i < permissions.length; i += 1) {
      if (permissions[i].PermissionID == 71 && permissions[i].ModuleID == 3) { userModel.quoteaccess = permissions[i]; }
      if (permissions[i].PermissionID == 83 && permissions[i].ModuleID == 3) { userModel.salestrackeraccess = permissions[i]; }
      if (permissions[i].PermissionID == 65 && permissions[i].ModuleID == 4) { userModel.jobaccess = permissions[i]; }
      if (permissions[i].PermissionID == 66 && permissions[i].ModuleID == 4) { userModel.calendaraccess = permissions[i]; }
  }
  return userModel;
  }


  
}
