import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';
import { AuditService } from '../service/audit.service';
import { Audit } from '../Model/audit.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaderToShow: any; CompanyInfo: any = { ID: 0, Name: "" }; UserInfo: any = { logInUserID: 0, loginUserName: "" };
  userAccess: any = { quote: 1, calendar: 1 };
  constructor(private navCtrl: NavController, public loadingController: LoadingController,
    private authservise: AuthService, private storage: Storage, private auditService: AuditService) {

  }
  ngOnInit() {
    if (history.state.audt) {
      history.state.audt.reqEndTime = new Date().getTime();
      history.state.audt.reqDuration = (history.state.audt.reqEndTime - history.state.audt.reqStartTime) / 1000;
      this.auditService.modifyForAuditSave(history.state.audt);
    }
    this.LoadCompanyAndUser();
  }

  ActionLoadModule(path: string) {
    let viewName = "";
    if (path == "/home/quotelist") {
      viewName = "Quote To QuoteList";
    }
    else {
      viewName = "Scheduling";
    }
    let audt = new Audit();
    audt.reqStartTime = new Date().getTime();
    audt.viewName = viewName;
    const strFullAddress = this.auditService.geocodeAddress();
    strFullAddress.then(res => {
      audt.location = res;
      this.navCtrl.navigateRoot(path, { state: { audt } });
    }).catch(error => {
      audt.location = error;
      this.navCtrl.navigateRoot(path, { state: { audt } });
    });
  }

  ActionLogout() {
    this.navCtrl.navigateRoot('/login');
  }

  LoadCompanyAndUser() {
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

}
