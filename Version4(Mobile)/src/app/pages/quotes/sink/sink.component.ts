import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-sink',
  templateUrl: './sink.component.html',
  styleUrls: ['./sink.component.scss'],
})
export class SinkComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Description="";

  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,private popoverCntrl :PopoverController,private navParams : NavParams,) { }
  sinkinfo = this.navParams.data;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
  });
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:this.sinkinfo,
    });
  }


  async ActionSearchSelect(ev: any,typeid,typeid2) {
    let obj={
      searchTypeId:typeid,producttypeId:typeid2,search: this.sinkinfo.Des == undefined ? "" : this.sinkinfo.Des
    }
   const popover = await this.popoverCntrl.create({
     component: AdditionalitemserachComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }

 ActionToClosePop() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.popoverCntrl.dismiss({
    'dismissed': true
  });
 
}

get f() { return this.registerForm.controls; }


  ActionSinkSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
}
}