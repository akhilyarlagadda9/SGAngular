import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
//import { QuotepostService } from 'src/app/service/quotepost.service';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-edgeinfo',
  templateUrl: './edgeinfo.component.html',
  styleUrls: ['./edgeinfo.component.scss'],
})
export class EdgeinfoComponent implements OnInit {
  edge:any = "";
  priceListID: any;
  edgelist: any;
  

  constructor(public Modalcntrl : ModalController,private quoterep: QuoterepService,private getservice: QuotegetService,  private service : QuoteService) { }

  ngOnInit() {
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
  
  ActionSelectEdge() {
    let typeIdList = []; typeIdList.push(5); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.edgelist = data[0] ; console.log(this.edgelist);},
      error => console.log(error));
  }

  

  /* ActionSaveEdge(edg:any){
  ActionSaveEdge(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.postservice.ActionsavepartEdge(this.edge).subscribe(data => {
     // this.item = data.EdgeList;
      this.ActionCloseEdge(false);
    });
  }
    
  } */

  ActionSaveEdge(form:NgForm){
    if (form.valid) {
    this.service.ActionSavePartEdge(this.edge).subscribe(data => {
      this.edgelist = data.EdgeList.filter(x => x.PartID === this.edge.PartID);
      this.ActionCloseEdge(false);
    })
  }
  }
  ActionCloseEdge(issave:boolean) {
    
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.edgelist,
      issave: issave
    });
    }
}
