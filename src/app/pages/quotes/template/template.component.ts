import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  submitted = false;
  Description = "";
  TypeID = this.navCntrl.data.TypeID;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
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
 
  ActionSaveTemplate(temp:any) {
    this.postservice.Actionsavelabor(temp).subscribe(data => {
      this.item = data.laborList;
      this.ActionCloseTemplate(true);
    })
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
