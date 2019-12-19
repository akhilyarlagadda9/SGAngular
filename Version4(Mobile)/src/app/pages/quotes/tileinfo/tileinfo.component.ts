import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tileinfo',
  templateUrl: './tileinfo.component.html',
  styleUrls: ['./tileinfo.component.scss'],
})
export class TileinfoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Description="";
  labor:any;
  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,
    private popoverCntrl :PopoverController,private navParams : NavParams,private quoterep:QuoterepService ) { }
  tileinfo = this.navParams.data;
  TypeID = this.navParams.data.TypeID;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
  });
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  ActionSetMargin(typeId:number,model:any,type:string){
    this.labor = this.quoterep.margincalculations(typeId,model,type);
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
   }
   ActionSetAmount(){
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
   }
  async ActionSearchSelect(ev: any,typeid,typeid2) {
    let obj={searchTypeId:typeid,producttypeId:typeid2,search: this.tileinfo.Des == undefined ? "" : this.tileinfo.Des}
   const popover = await this.popoverCntrl.create({
     component: AdditionalitemserachComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }

 ActionToClosePop() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.popoverCntrl.dismiss({
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



