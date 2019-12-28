import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-addoninfo',
  templateUrl: './addoninfo.component.html',
  styleUrls: ['./addoninfo.component.scss'],
})
export class AddoninfoComponent implements OnInit {
  other: any;
  item: any;

  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder, private postservice: QuotepostService) { }

  Description = "";
  addoninfo = this.navParams.data;

  ngOnInit() {
  }
   //Margin Calculation
  ActionSetMargin(typeId: number, model: any, type: string) {
    this.other = this.quoterep.margincalculations(typeId, model, type);
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
    this.other.Amt = this.other.Amount;
  }
   //Total amount Calculation
  ActionSetAmount() {
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
    this.other.Amt = this.other.Amount;
  }
 //Search Function
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
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if(detail.data.isselect == true){
          this.other = this.quoterep.Resetsink(this.other,detail.data.componentProps);
        }
      }
   });
    return await popover.present();
  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
/*   get f() { return this.registerForm.controls; } */

  
/*  ActionSaveAddon(oth:any) {
  this.postservice.Actionsaveaddon(oth).subscribe(data => {
    this.item = data.otherList;
    this.ActionCloseAddon(true);
  })
} */

//Addon Save Function
ActionSaveAddon(form:NgForm){
  if (form.valid) {
  this.postservice.Actionsaveaddon(this.other).subscribe(data => {
   // this.sinklist = data.sinkfaucetList;
    this.ActionCloseAddon(false);
  })
}
}


//Addon Close Function
ActionCloseAddon(issave) {
  if(issave == true){
    let oth = { other : this.item}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: oth,
      issave: issave
    });
  }else{
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave
    });
  }
}
}