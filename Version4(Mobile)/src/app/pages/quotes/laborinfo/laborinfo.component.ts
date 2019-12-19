import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-laborinfo',
  templateUrl: './laborinfo.component.html',
  styleUrls: ['./laborinfo.component.scss'],
})
export class LaborinfoComponent implements OnInit {
  labor: any;

  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService ) { }

  ngOnInit() {}
  ActionSetMargin(typeId:number,model:any,type:string){
    this.labor = this.quoterep.margincalculations(typeId,model,type);
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
   }
   ActionSetAmount(){
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty,this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
   }
  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
