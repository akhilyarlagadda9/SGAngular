import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaderToShow: any;CompanyInfo:any={ID:0,Name:""};UserInfo:any = {logInUserID:0,loginUserName:""};
  userAccess:any = {quote:1,calendar:1};
  constructor(private navCtrl:NavController, public loadingController: LoadingController,
    private authservise:AuthService, private storage: Storage) {
   
  }
  ngOnInit() {
    this.LoadCompanyAndUser();
  }
  
  ActionLoadModule(path:string){
    this.navCtrl.navigateRoot(path);
   }
  
   ActionLogout(){
    this.navCtrl.navigateRoot('/login');
   }

LoadCompanyAndUser(){
this.authservise.GetStoredLoginUser().then(result => {
  this.UserInfo = result;
  });
  this.authservise.GetStoredCompany().then(result => {
    this.CompanyInfo = result;
    });
    this.authservise.GetStoredUserModuleAccess().then(result => {
      this.userAccess = result;
      });
  }

  
   /* showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  } */

}
