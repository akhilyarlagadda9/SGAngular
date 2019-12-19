import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  splash: any;
  registerForm: FormGroup;
  submitted = false;
  splashlist: any = [];
  priceListID: any;
  constructor(private formBuilder: FormBuilder, public Modalcntrl: ModalController, private getservice: QuotegetService, private quoterep: QuoterepService) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      splash: ['', Validators.required],
    });
    this.ActionSelectSplash();
  }
  ActionSetMargin(typeId: number, model: any, type: string) {
    this.splash = this.quoterep.margincalculations(typeId, model, type);
    this.splash.Amount = this.quoterep.calcitemamt(this.splash.Qty, this.splash.UnitPrice);
    this.splash.Amt = this.splash.Amount;
  }
  ActionSetAmount() {
    this.splash.Amount = this.quoterep.calcitemamt(this.splash.Qty, this.splash.UnitPrice);
    this.splash.Amt = this.splash.Amount;
  }
  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  ActionSelectSplash() {
    let typeIdList = []; typeIdList.push(6);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(
      data => { this.splashlist = data[0] },
      error => console.log(error));
  }

  ActionSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

}
