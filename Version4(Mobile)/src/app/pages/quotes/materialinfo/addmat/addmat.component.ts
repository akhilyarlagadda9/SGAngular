import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';

declare var _qscope: any;

@Component({
  selector: 'app-addmat',
  templateUrl: './addmat.component.html',
  styleUrls: ['./addmat.component.scss'],
})
export class AddmatComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  shownGroup = 0;
  public verId : any;
  MaterialList :any = [];

  constructor(public Modalcntrl : ModalController, private getservice: QuotegetService,private navParams: NavParams, ) { }

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




toggleGroup(group) {
  if (this.isGroupShown(group)) {
      this.shownGroup = 0;
  } else {
      this.shownGroup = group;
  }
};

isGroupShown(group) {
  return this.shownGroup === group;
};

}
