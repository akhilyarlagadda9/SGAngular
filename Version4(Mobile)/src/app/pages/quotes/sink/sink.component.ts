import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { OverlayEventDetail } from '@ionic/core';
@Component({
  selector: 'app-sink',
  templateUrl: './sink.component.html',
  styleUrls: ['./sink.component.scss'],
})
export class SinkComponent implements OnInit {
  sinkfaucet: any;
  //registerForm: FormGroup;
  submitted = false;
  //Description = "";
  sinklist: any = [];
  constructor(public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private postservice : QuotepostService) { }
  sinkinfo = this.navParams.data;
  ngOnInit() {
   
  }
  ActionSetMargin(typeId: number, model: any, type: string) {
    this.sinkfaucet = this.quoterep.margincalculations(typeId, model, type);
    this.sinkfaucet.Amount = this.quoterep.calcitemamt(this.sinkfaucet.Qty, this.sinkfaucet.UnitPrice);
    this.sinkfaucet.Amt = this.sinkfaucet.Amount;
  }
  ActionSetAmount() {
    this.sinkfaucet.Amount = this.quoterep.calcitemamt(this.sinkfaucet.Qty, this.sinkfaucet.UnitPrice);
    this.sinkfaucet.Amt = this.sinkfaucet.Amount;
  }
  ActionSaveSink(form:NgForm){
    debugger;
    this.submitted = true;
    if (form.valid) {
    this.postservice.Actionsavepartsink(this.sinkfaucet).subscribe(data => {
     // this.sinklist = data.sinkfaucetList;
      this.ActionCloseSink(false);
    })
  }
  }
  ActionCloseSink(issave:boolean) {
    let sink = { Sink : this.sinklist}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: sink,
      issave: issave
    });
  }


  async ActionSearchSelect(ev: any, typeid, typeid2) {
    let obj = {
      searchTypeId: typeid, producttypeId: typeid2, search: this.sinkinfo.Des == undefined ? "" : this.sinkinfo.Des
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
          this.sinkfaucet = this.quoterep.Resetsink(this.sinkfaucet,detail.data.componentProps);
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



 // get f() { return this.registerForm.controls; }

}