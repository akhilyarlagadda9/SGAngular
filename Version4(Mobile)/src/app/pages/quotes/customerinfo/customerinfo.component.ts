import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-customerinfo',
  templateUrl: './customerinfo.component.html',
  //styleUrls: ['./customerinfo.component.scss'],
  inputs:[`customer`,`contacts`,`SelectedTypeID`]
})
export class CustomerinfoComponent implements OnInit {
  public customer: any;
  public contacts: any;
  public SelectedTypeID: number;
  constructor(private Modalcntrl : ModalController) { }
  ngOnInit() {
   // this.customer = this.custComponent.customerinfo;
  }
  async ActionEditCustomer() {
    let custinf = this.customer;
    custinf.ContactList = this.contacts;
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent,
      componentProps: custinf,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if(detail.data.issave == true){
          this.customer =  detail.data.componentProps;
          this.contacts = detail.data.componentProps.ContactList;
        }
      }
   });
    return await modal.present();
  }
  
}
