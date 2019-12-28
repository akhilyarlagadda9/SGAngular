import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tileinfo',
  templateUrl: './tileinfo.component.html',
  styleUrls: ['./tileinfo.component.scss'],
})
export class TileinfoComponent implements OnInit {
  labor:any;  tile: any;  cabinet: any; carpet: any; appliance: any;  consumable: any;  tool: any;

  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController, private popoverCntrl :PopoverController,private navParams : NavParams,private quoterep:QuoterepService, private postservice : QuotepostService ) { }

  tileinfo = this.navParams.data;
  
  ngOnInit() {
  }


  ActionSetMargin(typeId:number,model:any,type:string){
    this.labor = this.quoterep.margincalculations(typeId,model,type);
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
   }
   ActionSetAmount(){
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
   }
  async ActionSearchSelect(ev: any,typeid,productId) {
    let obj={searchTypeId:typeid,producttypeId:productId,search: this.tileinfo.Des == undefined ? "" : this.tileinfo.Des}
   const popover = await this.popoverCntrl.create({
     component: AdditionalitemserachComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   popover.onDidDismiss().then((detail: OverlayEventDetail) => {
    if (detail !== null) {
      if(detail.data.isselect == true){
        this.labor = this.quoterep.Resetsink(this.labor,detail.data.componentProps);
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



/* ActionSaveTile(tile:any){
  this.submitted = true;
  if (this.registerForm.valid) {
    this.postservice.Actionsaveparttile(tile).subscribe(data => {
      this.tile = data.TileList;
      this.cabinet = data.CabinetList;
      this.carpet = data.CarpetList;
      this.appliance = data.ApplianceList;
      this.consumable = data.ConsumableList;
      this.tool = data.ToolList;
      this.ActionCloseTile(true);

  });
}
} */

ActionSaveTile(form:NgForm){
  if (form.valid) {
  this.postservice.Actionsavepartsink(this.labor).subscribe(data => {
   // this.sinklist = data.sinkfaucetList;
    this.ActionCloseTile(false);
  })
}
}


ActionCloseTile(issave:boolean) {
  if(issave == true){
    let tile = { Tile : this.tile, Cabinet : this.cabinet, Carpet : this.carpet, Appliance : this.appliance, Consumable : this.consumable, Tool : this.tool}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: tile,
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



