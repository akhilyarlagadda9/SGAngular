import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component'
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-jobdes',
  templateUrl: './jobdes.component.html',
  styleUrls: ['./jobdes.component.scss'],
  inputs:[`version`]
})
export class JobdesComponent implements OnInit {
    public version: any;

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}


  async ActionEditJobDesc() {
     let ver = this.version;
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent,
      componentProps: ver,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null) {
            if(detail.data.issave == true){
              this.version =  detail.data.componentProps;
            }
          }
       });
    return await modal.present();
  }
  
}
