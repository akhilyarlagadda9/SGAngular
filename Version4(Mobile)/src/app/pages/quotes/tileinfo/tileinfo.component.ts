import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-tileinfo',
  templateUrl: './tileinfo.component.html',
  styleUrls: ['./tileinfo.component.scss'],
})
export class TileinfoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  labor:any;  tile: any;  cabinet: any; carpet: any; appliance: any;  consumable: any;  tool: any;

  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController, private popoverCntrl :PopoverController,private navParams : NavParams,private quoterep:QuoterepService, private postservice : QuotepostService ) { }

  tileinfo = this.navParams.data;
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      add: ['', Validators.required],
  });
  }


  ActionSetMargin(typeId:number,model:any,type:string){
    this.labor = this.quoterep.margincalculations(typeId,model,type);
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
   }
   ActionSetAmount(){
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
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
   return await popover.present();
 }

 ActionToClosePop() {
  this.popoverCntrl.dismiss({
    'dismissed': true
  });
}


get f() { return this.registerForm.controls; }  

ActionSaveTile(tile:any){
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



