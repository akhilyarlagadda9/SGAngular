import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { AuthService } from 'src/app/service/auth.service';

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
  constructor(private navCtrl: NavController, private authservise: AuthService, private plt: Platform) {

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
        this.ActionCompanyInfo();
        this.authservise.SetUserModel(data);
        this.navCtrl.navigateRoot('/home');
      } else {
        this.ErrorMsg = "Incorrect UserName and Password!";
      }
    })

  }

  ActionCompanyInfo() {
    this.authservise.GetCompanyInfo().subscribe(data => {
      this.authservise.SetCompanyStorage(data);
    });
  }
}
