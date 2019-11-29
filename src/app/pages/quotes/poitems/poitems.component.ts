import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoeditComponent } from '../poedit/poedit.component'
import { from } from 'rxjs';
@Component({
  selector: 'app-poitems',
  templateUrl: './poitems.component.html',
  styleUrls: ['./poitems.component.scss'],
})
export class PoitemsComponent implements OnInit {
@Input() public versionId;


  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {
console.log(this.versionId );

  }
  async ActionEditPOItem() {
    const modal = await this.Modalcntrl.create({
      component: PoeditComponent
    });
    return await modal.present();
  }

 
}
