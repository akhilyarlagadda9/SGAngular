import { Component, OnInit, TypeProvider } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-cutoutinfo',
  templateUrl: './cutoutinfo.component.html',
  styleUrls: ['./cutoutinfo.component.scss'],
})
export class CutoutinfoComponent implements OnInit {
  cutout: any;
  priceListID: any;
  cutoutlist: any = [];
  constructor(private navCntrl: NavParams, public Modalcntrl: ModalController, private getservice: QuotegetService, private quoterep: QuoterepService, private service : QuoteService) { }
  TypeID = this.navCntrl.data.TypeID;
  ngOnInit() {
    this.ActionSelectCutout()
    console.log(this.TypeID)
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


/*   get f() { return this.registerForm.controls; }  

  ActionSaveCutOut(cut:any){
  this.submitted = true;
  if (this.registerForm.valid) {
    this.postservice.Actionsavepartcutout(cut).subscribe(data => {
      this.item = data.CutList;
      this.ActionCloseCutout(true);
    })
}
} */

ActionSaveCutOut(form:NgForm){
  if (form.valid) {
  this.service.ActionSavePartCutout(this.cutout).subscribe(data => {
    this.cutoutlist = data.CutList.filter(x => x.PartID === this.cutout.PartID && x.TypeID == this.cutout.TypeID);
    this.ActionCloseCutout(true);
  })
}
}

  ActionCloseCutout(issave : boolean) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.cutoutlist,
      issave: issave
    });
   
  }
  ActionSelectCutout() {
    let typeIdList = []; typeIdList.push(10);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(
      data => { this.cutoutlist = data[0] },
      error => console.log(error));
  }
}
