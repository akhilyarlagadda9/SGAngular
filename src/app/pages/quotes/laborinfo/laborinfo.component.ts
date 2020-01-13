import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-laborinfo',
  templateUrl: './laborinfo.component.html',
  styleUrls: ['./laborinfo.component.scss'],
})
export class LaborinfoComponent implements OnInit {
  labor: any;
  itemlist:any =[];
  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService, private service : QuoteService ) { }
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
