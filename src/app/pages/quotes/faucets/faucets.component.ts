import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faucets',
  templateUrl: './faucets.component.html',
  styleUrls: ['./faucets.component.scss'],
})
export class FaucetsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Description="";
  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,private popoverCntrl :PopoverController,private navParams : NavParams ) { }
  faucetinfo = this.navParams.data;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
  });
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  async ActionSearchSelect(ev: any,typeid,typeid2) {
    let obj={searchTypeId:typeid,producttypeId:typeid2,search: this.faucetinfo.Des == undefined ? "" : this.faucetinfo.Des}
   const popover = await this.popoverCntrl.create({
     component: AdditionalitemserachComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }

 ActionFaucetSubmit(){
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
}
}
}
