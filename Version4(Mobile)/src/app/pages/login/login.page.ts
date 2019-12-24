import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:{
    UserName: string,PasswordHash: string
  };
  ErrorMsg:string;
  constructor(private navCtrl: NavController, private authservise: AuthService) { }
  ngOnInit() {
   this.user={ UserName: "",PasswordHash: ""};
  }

  ActionLogin() {
    this.navCtrl.navigateRoot('/home');
  //  this.authservise.ActionLogin(this.user).subscribe(data=>{
  //    if(data != null){
  //     this.authservise.SetUserModel(data);
  //     this.ActionCompanyInfo();
  //     this.navCtrl.navigateRoot('/home');
  //    }else{
       
  //       this.ErrorMsg = "Incorrect UserName and Password!";
  //    }
  //  })
    
  }

  ActionCompanyInfo(){
    this.authservise.GetCompanyInfo().subscribe(data => {
      this.authservise.SetCompanyStorage(data);
    });
  }
}
