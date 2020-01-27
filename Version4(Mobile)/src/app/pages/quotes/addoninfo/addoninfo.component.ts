import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-addoninfo',
  templateUrl: './addoninfo.component.html',
  styleUrls: ['./addoninfo.component.scss'],
})
export class AddoninfoComponent implements OnInit {
  other: any;
  otherlist: any;
  priceListID: any;

  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder, private service: QuoteService) { }

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
      pricelistId: this.priceListID, searchTypeId: typeid, producttypeId: typeid2, search: this.other.Description == undefined ? "" : this.other.Description, info : this.other
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
          this.other = this.quoterep.SetAddon(this.other,detail.data.componentProps);
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
  this.service.ActionSaveAddon(this.other).subscribe(data => {
    this.otherlist = data.otherList.filter(x => x.PartID === this.other.PartID);
    this.ActionCloseAddon(true);
  })
}
}


//Addon Close Function
ActionCloseAddon(issave) {
  if(issave == true){
   
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.otherlist,
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