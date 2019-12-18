import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddmatComponent } from './addmat/addmat.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-materialinfo',
  templateUrl: './materialinfo.component.html',
  styleUrls: ['./materialinfo.component.scss'],
})
export class MaterialinfoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Description="";
  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController ) { }

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

  /***** MATERIAL DETAILS *****/
  async ActionCreateAddMaterial() {
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent
    });
    return await modal.present();
  }

  get f() { return this.registerForm.controls; }


  ActionSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
}
}
