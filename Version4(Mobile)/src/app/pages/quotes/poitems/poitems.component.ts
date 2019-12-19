import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoeditComponent } from '../poedit/poedit.component'
//import { from } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-poitems',
  templateUrl: './poitems.component.html',
  styleUrls: ['./poitems.component.scss'],
  inputs: [`PoItemList`, 'Version', 'ParentID']
})
export class PoitemsComponent implements OnInit {
  public PoItemList: any;
  public Version: any;
  ParentID: number;

  constructor(public Modalcntrl: ModalController) { }

  ngOnInit() {
   
  }

  async ActionEditPOItem(info: any, indx: any) {
    if (info == 0) {
      info = { ID: 0, VersionID: this.Version.ID, POByID: 0, PONumber: 0, PODate: Date, POAmount: 0, AttachmentList: [], ParentID: this.ParentID, POBy:0 }
    }
    let poitem = { poitem: info, index: indx, ParentID : this.Version.CustTypeID };
    const modal = await this.Modalcntrl.create({
      component: PoeditComponent,
      componentProps: poitem,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.componentProps.ID == 0) {
        this.PoItemList.push(detail.data.componentProps.poitem)
      }
      else {
        this.PoItemList[detail.data.componentProps.index] = detail.data.componentProps.poitem;
      }
    });
    return await modal.present();
  }

}
