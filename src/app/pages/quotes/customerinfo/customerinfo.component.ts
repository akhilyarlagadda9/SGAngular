import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.scss'],
  inputs:[`version`,`customer`,`contacts`,`SelectedTypeID`]
})
export class CustomerinfoComponent implements OnInit {
  
  public customer: any;public version: any;
  public contacts: any;
  public SelectedTypeID: number;
  shownGroup = 1;
  constructor(private Modalcntrl : ModalController) { }
  ngOnInit() {
   // this.customer = this.custComponent.customerinfo;
  }
  async ActionEditCustomer() {
    let custinfo = this.customer;
    custinfo.ContactList = this.contacts;
    let copyobj = JSON.parse(JSON.stringify(custinfo))
    let obj = {version:this.version,customerinfo:copyobj,SelectedTypeID:this.SelectedTypeID}
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent,
      componentProps: obj,
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
  
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = 0;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
