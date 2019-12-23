import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmat',
  templateUrl: './addmat.component.html',
  styleUrls: ['./addmat.component.scss'],
})
export class AddmatComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(public Modalcntrl : ModalController ) { }

  ngOnInit() {
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  ActionSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
}

}
