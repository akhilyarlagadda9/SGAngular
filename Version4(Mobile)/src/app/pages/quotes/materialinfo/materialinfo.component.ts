import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddmatComponent } from './addmat/addmat.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-materialinfo',
  templateUrl: './materialinfo.component.html',
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
  constructor(public Modalcntrl: ModalController) { }

  ngOnInit() {

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
    let sel= { material : materialId == 0 ? {ID : 0} : this.material, partinfo: this.partinfo, areaInfo : this.areaInfo, Version:this.Version, priceListID : this.priceListID}
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent,
      componentProps: sel,
    });
    return await modal.present();
  }

  ActionSubmit(form: NgForm) {
    this.submitted = true;
  }
}
