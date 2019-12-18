import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
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

  get f() { return this.registerForm.controls; }


  ActionSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
}

}
