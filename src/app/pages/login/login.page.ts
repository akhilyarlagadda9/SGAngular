import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController, private authservise: AuthService) { }
  ngOnInit() {
  }

  ActionLogin() {
    this.authservise.GetCompanyInfo().subscribe(data => {
      this.authservise.SetCompanyStorage(data);
    });
    this.navCtrl.navigateRoot('/home');
  }
}
