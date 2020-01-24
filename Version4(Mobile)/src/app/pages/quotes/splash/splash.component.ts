import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  splash: any;
  splashlist: any = [];
  priceListID: any;
  itemlist: any;

  constructor(public Modalcntrl: ModalController, private getservice: QuotegetService, private quoterep: QuoterepService, private service: QuoteService) { }
  ngOnInit() {
    this.ActionSplashTypes();
  }
  ActionSetSqft() {
    this.splash.Sqft = this.quoterep.calcsqft(this.splash.Width, this.splash.Height);
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
  ActionSplashTypes() {
    let typeIdList = []; typeIdList.push(6);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(
      data => { this.splashlist = data[0]; console.log(this.splashlist) },
      error => console.log(error));
  }
  ActionPopulateSplash(Id:any){
    let splash = this.splashlist.find(s => s.ID == Id);
    if (splash != null && splash != undefined) {
      this.splash = this.quoterep.Setsplash(this.splash, splash);
    }
  }
  ActionSaveSplash(form: NgForm) {
    if (form.valid) {
      this.service.ActionSavePartSplash(this.splash).subscribe(data => {
        this.itemlist = data.SplashList.filter(x => x.PartID === this.splash.PartID);
        this.ActionCloseSplash(true);
      })
    }
  }


  ActionCloseSplash(issave: boolean) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.itemlist,
      issave: issave
    });
  }
}
