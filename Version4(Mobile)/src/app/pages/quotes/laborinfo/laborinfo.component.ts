import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-laborinfo',
  templateUrl: './laborinfo.component.html',
  styleUrls: ['./laborinfo.component.scss'],
})
export class LaborinfoComponent implements OnInit {
  labor: any;
  Des = "";
  item: any;

  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService, private formBuilder: FormBuilder, private postservice : QuotepostService ) { }

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
  
  ActionSaveLabor(labor:any) {
    this.postservice.Actionsavelabor(labor).subscribe(data => {
      this.item = data.laborList;
      this.ActionCloseLabor(true);
    })
  }
  ActionCloseLabor(issave:boolean) {
    if(issave == true){
      let labor = { Labor : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: labor,
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
