import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-addoninfo',
  templateUrl: './addoninfo.component.html',
  styleUrls: ['./addoninfo.component.scss'],
})
export class AddoninfoComponent implements OnInit {
  other: any;
  item: any;

  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder, private postservice: QuotepostService) { }
  registerForm: FormGroup;
  submitted = false;
  Description = "";
  addoninfo = this.navParams.data;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
  }
   //Margin Calculation
  ActionSetMargin(typeId: number, model: any, type: string) {
    this.other = this.quoterep.margincalculations(typeId, model, type);
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
  }
   //Total amount Calculation
  ActionSetAmount() {
    this.other.Amount = this.quoterep.calcitemamt(this.other.Qty, this.other.UnitPrice);
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
    return await popover.present();
  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
  get f() { return this.registerForm.controls; }

  //Addon Save Function
 ActionSaveAddon(oth:any) {
  this.postservice.Actionsaveaddon(oth).subscribe(data => {
    this.item = data.otherList;
    this.ActionCloseAddon(true);
  })
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