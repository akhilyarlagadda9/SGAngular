import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController ,NavParams} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Description="";
  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,private navCntrl:NavParams) { }
  TypeID = this.navCntrl.data.TypeID;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
  });
    console.log(this.TypeID)
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  ActionFabSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  }
}
