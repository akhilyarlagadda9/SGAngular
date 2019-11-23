import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QuotePage } from '../quote/quote.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl:NavController) {}

  ActionLoadQuote(){
    this.navCtrl.navigateRoot('/home/quotelist');
   }
  


}
