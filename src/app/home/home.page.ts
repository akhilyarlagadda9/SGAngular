import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaderToShow: any;

  constructor(private navCtrl:NavController, public loadingController: LoadingController) {}

  ActionLoadModule(path:string){
    this.navCtrl.navigateRoot(path);
   }
  
   ActionLogout(){
    this.navCtrl.navigateRoot('/login');
   }

   showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

}
