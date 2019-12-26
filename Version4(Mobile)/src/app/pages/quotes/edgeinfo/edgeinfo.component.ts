import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

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
  item: any;

  constructor(private formBuilder: FormBuilder,public Modalcntrl : ModalController,private quoterep: QuoterepService,private getservice: QuotegetService, private postservice : QuotepostService) { }

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
  
  ActionSelectEdge() {
    let typeIdList = []; typeIdList.push(5); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.edgelist = data[0] },
      error => console.log(error));
  }

  ActionSaveEdge(edg:any){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.postservice.ActionsavepartEdge(edg).subscribe(data => {
      this.item = data.EdgeList;
      this.ActionCloseEdge(true);
    });
  }
    
  }
  get f() { return this.registerForm.controls; }
  ActionCloseEdge(issave:boolean) {
    if(issave == true){
      let edg = { edge : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: edg,
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
