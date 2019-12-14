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
    typeId: any;

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {
  }

  async ActionEditJobDesc(typeId:any) {
    //let des = typeId == 1 ?this.version.Description: this.version.PrivateNote;
    let ver = {TypeID: typeId,version:this.version}
    const modal = await this.Modalcntrl.create({
      component: JobdesceditComponent,
      componentProps: ver,
    })
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null) {
            if(detail.data.issave == true){
              if(typeId == 1){
                this.version.Description =  detail.data.componentProps.Description;
              }
             else{
              this.version.PrivateNote =  detail.data.componentProps.Description;
             }
              
            }
          }
       });
    return await modal.present();
  }
  
}
