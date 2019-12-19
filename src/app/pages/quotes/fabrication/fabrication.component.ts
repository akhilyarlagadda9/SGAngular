import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-fabrication',
  templateUrl: './fabrication.component.html',
  styleUrls: ['./fabrication.component.scss'],
})
export class FabricationComponent implements OnInit {
  fabrication: any;

  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService) { }

  ngOnInit() {}

  ActionSetMargin(typeId:number,model:any,type:string){
    this.fabrication = this.quoterep.margincalculations(typeId,model,type);
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }
   ActionSetAmount(){
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }

   ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
