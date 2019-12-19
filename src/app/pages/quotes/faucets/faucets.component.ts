import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faucets',
  templateUrl: './faucets.component.html',
  styleUrls: ['./faucets.component.scss'],
})
export class FaucetsComponent implements OnInit {
  faucet: any;
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder) { }
  registerForm: FormGroup;
  submitted = false;
  Description = "";
  faucetinfo = this.navParams.data;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
  }
  ActionSetMargin(typeId: number, model: any, type: string) {
    debugger;
    this.faucet = this.quoterep.margincalculations(typeId, model, type);
    this.faucet.Amount = this.quoterep.calcitemamt(this.faucet.Qty, this.faucet.UnitPrice);
    this.faucet.Amt = this.faucet.Amount;
  }
  ActionSetAmount() {
    debugger;
    this.faucet.Amount = this.quoterep.calcitemamt(this.faucet.Qty, this.faucet.UnitPrice);
    this.faucet.Amt = this.faucet.Amount;
  }
  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  async ActionSearchSelect(ev: any, typeid, typeid2) {
    let obj = { searchTypeId: typeid, producttypeId: typeid2, search: this.faucetinfo.Des == undefined ? "" : this.faucetinfo.Des }
    const popover = await this.popoverCntrl.create({
      component: AdditionalitemserachComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    return await popover.present();
  }

  ActionFaucetSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
}
