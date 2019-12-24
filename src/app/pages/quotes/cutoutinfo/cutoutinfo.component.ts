import { Component, OnInit, TypeProvider } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuotepostService } from 'src/app/service/quotepost.service';

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
  item: any;
  constructor(private formBuilder: FormBuilder,private navCntrl: NavParams, public Modalcntrl: ModalController, private getservice: QuotegetService, private quoterep: QuoterepService, private postservice : QuotepostService) { }
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

  ActionSaveCutOut(cut:any) {
    this.postservice.Actionsavepartcutout(cut).subscribe(data => {
      this.item = data.CutList;
      this.ActionCloseCutout(true);
    })
  }

  ActionCloseCutout(issave : boolean) {
    if(issave == true){
      let cutout = { cutout : this.item}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: cutout,
        issave: issave
      });
    }else{
      this.Modalcntrl.dismiss({
        'dismissed': true,
        issave: issave
      });
    }
  }
  ActionSelectCutout() {
    let typeIdList = []; typeIdList.push(10);
    this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(
      data => { this.cutoutlist = data[0] },
      error => console.log(error));
  }
}
