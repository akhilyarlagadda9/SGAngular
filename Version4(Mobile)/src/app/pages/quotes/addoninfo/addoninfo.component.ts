import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addoninfo',
  templateUrl: './addoninfo.component.html',
  styleUrls: ['./addoninfo.component.scss'],
})
export class AddoninfoComponent implements OnInit {
  other: any;
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder) { }
  registerForm: FormGroup;
  submitted = false;
  Description = "";
  addoninfo = this.navParams.data;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
  }
  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.addoninfo,
    });
  }

  ActionSetMargin(typeId: number, model: any, type: string) {
    this.other = this.quoterep.margincalculations(typeId, model, type);
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
  }
  ActionSetAmount() {
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
  }

  async ActionSearchSelect(ev: any, typeid, typeid2) {
    let obj = {
      searchTypeId: typeid, producttypeId: typeid2, search: this.addoninfo.Des == undefined ? "" : this.addoninfo.Des
    }
    const popover = await this.popoverCntrl.create({
      component: AdditionalitemserachComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    return await popover.present();
  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
  get f() { return this.registerForm.controls; }
  ActionSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
}