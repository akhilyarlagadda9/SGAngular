import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoeditComponent } from '../poedit/poedit.component'
//import { from } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-poitems',
  templateUrl: './poitems.component.html',
  styleUrls: ['./poitems.component.scss'],
  inputs:[`PoItemList`]
})
export class PoitemsComponent implements OnInit {
  public PoItemList: any;
 


  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() { }
 
  async ActionEditPOItem(info:any) {
    let poitem = info;
    if(info != 0){
      poitem.PoItemList = this.PoItemList;
    }
   const modal = await this.Modalcntrl.create({
     component: PoeditComponent,
     componentProps: info,
   })
   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
         if (detail !== null) {
           if(detail.data.issave == true){
            this.PoItemList =  detail.data.componentProps.obj;
           }
         }
      });
   return await modal.present();
 }
 
}
