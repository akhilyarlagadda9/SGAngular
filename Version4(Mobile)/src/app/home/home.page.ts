import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaderToShow: any;CompanyInfo:any={ID:0,Name:""};UserInfo:any = {logInUserID:0,loginUserName:""}

  constructor(private navCtrl:NavController, public loadingController: LoadingController,private authservise:AuthService) {
   
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
    this.authservise.GetStoredCompany().then((data) =>{
      this.CompanyInfo = data;
      console.log(this.CompanyInfo);
    })
    this.authservise.GetStoredLoginUser().then((data) =>{
      this.UserInfo = data;
      console.log(this.UserInfo);
    })
    
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
