import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-faucets',
  templateUrl: './faucets.component.html',
  styleUrls: ['./faucets.component.scss'],
})
export class FaucetsComponent implements OnInit {
  faucet: any;
  faucetlist: any = [];
  priceListID: any;
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private service: QuoteService, private quoterep: QuoterepService, private formBuilder: FormBuilder) { }
  Description = "";
  faucetinfo = this.navParams.data;
  ngOnInit() {
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
/*   ActionSaveFaucet(fau:any){
    this.postservice.Actionsavepartfaucet(fau).subscribe(data => {
      this.item = data.faucetList;
      this.ActionCloseFaucet(true);
    })
  } */

  ActionSaveFaucet(form:NgForm){
    if (form.valid) {
    this.service.ActionSaveFaucet(this.faucet).subscribe(data => {
      this.faucetlist = data.faucetList.filter(x => x.PartID === this.faucet.PartID);
     // this.sinklist = data.sinkfaucetList;
      this.ActionCloseFaucet(true);
    })
  }
  }
  ActionCloseFaucet(issave:boolean) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.faucetlist,
      issave: issave
    });
  }

  async ActionSearchSelect(ev: any, typeid, typeid2) {
    let obj = { pricelistId: this.priceListID, searchTypeId: typeid, producttypeId: typeid2, search: this.faucetinfo.Des == undefined ? "" : this.faucetinfo.Des }
    const popover = await this.popoverCntrl.create({
      component: AdditionalitemserachComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if(detail.data.isselect == true){
          this.faucet = this.quoterep.SetFaucet(this.faucet,detail.data.componentProps);
        }
      }
   });
    return await popover.present();
  }

}
