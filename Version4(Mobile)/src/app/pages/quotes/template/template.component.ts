import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  labor: any;
  item: any;

  constructor(public Modalcntrl: ModalController, private navCntrl: NavParams, private quoterep: QuoterepService, private formBuilder: FormBuilder, private postservice : QuotepostService) { }
  TypeID = this.navCntrl.data.TypeID;
  ngOnInit() {
    console.log(this.TypeID)
  }
  ActionSetMargin(typeId: number, model: any, type: string) {
    this.labor = this.quoterep.margincalculations(typeId, model, type);
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty, this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
  }
  ActionSetAmount() {
    this.labor.Amount = this.quoterep.calcitemamt(this.labor.Qty, this.labor.UnitPrice);
    this.labor.Amt = this.labor.Amount;
  }


 /*  ActionSaveTemplate(temp:any){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.postservice.Actionsavelabor(temp).subscribe(data => {
      this.item = data.laborList;
      this.ActionCloseTemplate(true);
    })
  }
  } */

  ActionSaveTemplate(form:NgForm){
    if (form.valid) {
    this.postservice.Actionsavelabor(this.labor).subscribe(data => {
     // this.sinklist = data.sinkfaucetList;
      this.ActionCloseTemplate(false);
    })
  }
  }


  ActionCloseTemplate(issave:boolean) {
    if(issave == true){
      let template = { Temp : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: template,
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
