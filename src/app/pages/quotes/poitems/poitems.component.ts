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

  ngOnInit() {
   console.log(this.PoItemList);
  }
 
  async ActionEditPOItem(info:any) { 
    let poitem = info;
   const modal = await this.Modalcntrl.create({
     component: PoeditComponent,
     componentProps: poitem,
   })
   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
         if (detail !== null) {
           if(detail.data.issave == true){
            poitem =  detail.data.componentProps;
           }
         }
      });
   return await modal.present();
 }
 
}
