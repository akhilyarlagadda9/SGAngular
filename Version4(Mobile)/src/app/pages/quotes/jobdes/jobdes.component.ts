import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component'
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-jobdes',
  templateUrl: './jobdes.component.html',
  styleUrls: ['./jobdes.component.scss'],
  inputs:[`Version`]
})
export class JobdesComponent implements OnInit {

    public Version: any;
    typeId: any;

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {
  }

  async ActionEditJobDesc(typeId:any) {
    let ver = {TypeID: typeId,Version:this.Version}
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent,
      componentProps: ver,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null) {
            if(detail.data.issave == true){
              if(typeId == 1){
                this.Version.Description =  detail.data.componentProps.Description;
              }
             else{
              this.Version.PrivateNote =  detail.data.componentProps.PrivateNote;
             }
              
            }
          }
       });
    return await modal.present();
  }
  
}
