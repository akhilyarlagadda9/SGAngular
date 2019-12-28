import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-fabrication',
  templateUrl: './fabrication.component.html',
  styleUrls: ['./fabrication.component.scss'],
})
export class FabricationComponent implements OnInit {
  fabrication: any;
  fablist: any;

  constructor(public Modalcntrl : ModalController, private quoterep : QuoterepService, private formBuilder: FormBuilder, private qervice : QuoteService) { }

  ngOnInit() {
  }
  ActionSetMargin(typeId:number,model:any,type:string){
    this.fabrication = this.quoterep.margincalculations(typeId,model,type);
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }
   ActionSetAmount(){
    this.fabrication.Amount = this.quoterep.calcitemamt(this.fabrication.Qty,this.fabrication.UnitPrice);
   }



  /* ActionSaveFabrication(fab:any){
    this.submitted = true;
    if (this.registerForm.valid) {
    this.qervice.Actionsavepartfabrication(fab).subscribe(data => {
      this.fablist = data.PartFabList;
      this.ActionToClose(true);
    })
  }
  } */

  ActionSaveFabrication(form:NgForm){
    if (form.valid) {
    this.qervice.Actionsavepartfabrication(this.fabrication).subscribe(data => {
     // this.sinklist = data.sinkfaucetList;
      this.ActionToClose(false);
    })
  }
  }

  ActionToClose(issave : boolean) {


    let fabrication = { Fab : this.fablist}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: fabrication,
      issave: issave
    });


    // if(issave == true){
    //   let fabrication = { Fab : this.item}
    //   this.Modalcntrl.dismiss({
    //     'dismissed': true,
    //     componentProps: fabrication,
    //     issave: issave
    //   });
    // }else{
    //   this.Modalcntrl.dismiss({
    //     'dismissed': true,
    //     issave: issave
    //   });
    // }
  }
}
