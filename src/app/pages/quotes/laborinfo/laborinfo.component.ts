import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { OverlayEventDetail } from '@ionic/core';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';

@Component({
  selector: 'app-laborinfo',
  templateUrl: './laborinfo.component.html',
  styleUrls: ['./laborinfo.component.scss'],
})
export class LaborinfoComponent implements OnInit {
  labor: any;
  itemlist:any =[];
  priceListID: any;
  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService, private service : QuoteService, private popoverCntrl: PopoverController ) { }
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
   //Search Function
   async ActionSearchSelect(ev: any, typeid, typeid2) {
    let obj = {
      pricelistId: this.priceListID, searchTypeId: typeid, producttypeId: typeid2, search: this.labor.Description == undefined ? "" : this.labor.Description, info : this.labor
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
          this.labor = this.quoterep.SetAddon(this.labor,detail.data.componentProps);
        }
      }
   });
    return await popover.present();
  }
  ActionSaveLabor(form:NgForm) {
    if (form.valid) {
    this.service.ActionSaveLabor(this.labor).subscribe(data => {
      this.itemlist = data.laborList.filter(x => x.PartID === this.labor.PartID && x.ViewTypeID == this.labor.ViewTypeID);
      this.ActionCloseLabor(true);
    })
  }
  }
  ActionCloseLabor(issave:boolean) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.itemlist,
      issave: issave
    });

   
  }
}
