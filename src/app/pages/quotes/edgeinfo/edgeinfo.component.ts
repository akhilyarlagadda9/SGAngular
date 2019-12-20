import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edgeinfo',
  templateUrl: './edgeinfo.component.html',
  styleUrls: ['./edgeinfo.component.scss'],
})
export class EdgeinfoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  edge:any = "";
  priceListID: any;
  edgelist: any;

  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,private quoterep: QuoterepService,private getservice: QuotegetService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      EdgeProfile: ['', Validators.required],
  });
    this.ActionSelectEdge(); 
  }

  ActionSetMargin(typeId:number,model:any,type:string){
   this.edge = this.quoterep.margincalculations(typeId,model,type);
   this.edge.Amount = this.quoterep.calcitemamt(this.edge.LF,this.edge.UnitPrice);
   this.edge.Amt = this.edge.Amount;
  }
  ActionSetAmount(){
    this.edge.Amount = this.quoterep.calcitemamt(this.edge.LF,this.edge.UnitPrice);
    this.edge.Amt = this.edge.Amount;
   }
  
  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  ActionSelectEdge() {
    let typeIdList = []; typeIdList.push(5); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.edgelist = data[0] },
      error => console.log(error));
  }

  ActionFaucetSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  }
}
