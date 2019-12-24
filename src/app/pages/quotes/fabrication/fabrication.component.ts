import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-fabrication',
  templateUrl: './fabrication.component.html',
  styleUrls: ['./fabrication.component.scss'],
})
export class FabricationComponent implements OnInit {
  fabrication: any;
  item: any;

  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService, private postservice : QuotepostService) { }

  ngOnInit() {}

  ActionSetMargin(typeId:number,model:any,type:string){
    this.fabrication = this.quoterep.margincalculations(typeId,model,type);
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }
   ActionSetAmount(){
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }

   ActionSaveFabrication(fab:any) {
    this.postservice.Actionsavepartfabrication(fab).subscribe(data => {
      this.item = data.PartFabList;
      this.ActionCloseFabrication(true);
    })
  }

  ActionCloseFabrication(issave : boolean) {
    if(issave == true){
      let fabrication = { Fab : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: fabrication,
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
