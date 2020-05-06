import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AddmatComponent } from './addmat/addmat.component';
import { NgForm } from '@angular/forms';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-materialinfo',
  //templateUrl: './materialinfo.component.html',
  templateUrl: './materialinfonew.component.html',
  styleUrls: ['./materialinfo.component.scss'],
})
export class MaterialinfoComponent implements OnInit {
  //registerForm: FormGroup;
  submitted = false;
  partinfo: any;
  material: any;
  Version:any;
  areaInfo: any;
  priceListID: any;
  constructor(public Modalcntrl: ModalController,private quoterep:QuoterepService) { }

  ngOnInit() {;

  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  /***** MATERIAL DETAILS *****/
  async ActionCreateAddMaterial(materialId:any, source:string) {

    let matinfo = {ID:materialId,VersionID:this.Version.ID};

   let info = {material:matinfo, priceListID : this.priceListID,AreaID:this.areaInfo.ID};

   // let sel= { material : materialId == 0 ? {ID : 0} :  this.material, partinfo: this.partinfo, areaInfo : this.areaInfo, Version:this.Version, priceListID : this.priceListID}
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent,
      componentProps: info,
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.issave == true && detail.data.componentProps.ID > 0) {
      this.material = this.quoterep.SetPartMaterial(this.material, detail.data.componentProps);
      }
    });
    return await modal.present();
  }

  ActionSubmit(form: NgForm) {
    this.submitted = true;
  }
}
