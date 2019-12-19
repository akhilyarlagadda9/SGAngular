import { Component, OnInit, TypeProvider } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-cutoutinfo',
  templateUrl: './cutoutinfo.component.html',
  styleUrls: ['./cutoutinfo.component.scss'],
})
export class CutoutinfoComponent implements OnInit {
  cutout: any;
  registerForm: FormGroup;
  submitted = false;
  priceListID: any;
  cutoutlist: any = [];
  constructor(private formBuilder: FormBuilder, public Modalcntrl: ModalController, private getservice: QuotegetService, private quoterep: QuoterepService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
    this.ActionSelectCutout()
  }

  ActionSetMargin(typeId: number, model: any, type: string) {
    this.cutout = this.quoterep.margincalculations(typeId, model, type);
    this.cutout.Amount = this.quoterep.calcitemamt(this.cutout.LF, this.cutout.Unitprice);
    this.cutout.Amt = this.cutout.Amount;
  }
  ActionSetAmount() {
    this.cutout.Amount = this.quoterep.calcitemamt(this.cutout.LF, this.cutout.Unitprice);
    this.cutout.Amt = this.cutout.Amount;
  }

  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  ActionFabSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  ActionSelectCutout() {
    let typeIdList = []; typeIdList.push(10);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(
      data => { this.cutoutlist = data[0] },
      error => console.log(error));
  }
}
