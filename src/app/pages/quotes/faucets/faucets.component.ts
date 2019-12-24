import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-faucets',
  templateUrl: './faucets.component.html',
  styleUrls: ['./faucets.component.scss'],
})
export class FaucetsComponent implements OnInit {
  faucet: any;
  item: any;
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private postservice: QuotepostService, private quoterep: QuoterepService, private formBuilder: FormBuilder) { }
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
    this.faucet = this.quoterep.margincalculations(typeId, model, type);
    this.faucet.Amount = this.quoterep.calcitemamt(this.faucet.Qty, this.faucet.UnitPrice);
    this.faucet.Amt = this.faucet.Amount;
  }
  ActionSetAmount() {
    this.faucet.Amount = this.quoterep.calcitemamt(this.faucet.Qty, this.faucet.UnitPrice);
    this.faucet.Amt = this.faucet.Amount;
  }
  ActionSaveFaucet(fau:any){
    this.postservice.Actionsavepartfaucet(fau).subscribe(data => {
      this.item = data.faucetList;
      this.ActionCloseFaucet(true);
    })
  }
  ActionCloseFaucet(issave:boolean) {
    if(issave == true){
      let faucet = { Faucet : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: faucet,
        issave: issave
      });
    }else{
      this.Modalcntrl.dismiss({
        'dismissed': true,
        issave: issave
      });
    }
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

}
