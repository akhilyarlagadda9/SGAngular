import { Component, OnInit, TypeProvider } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-cutoutinfo',
  templateUrl: './cutoutinfo.component.html',
  styleUrls: ['./cutoutinfo.component.scss'],
})
export class CutoutinfoComponent implements OnInit {
  priceListID: any;
  cutoutlist: any = [];

  constructor(public Modalcntrl : ModalController,private navCntrl:NavParams,private getservice: QuotegetService ) { }
  TypeID = this.navCntrl.data.TypeID;

  ngOnInit() {
    this.ActionSelectCutout(); 
  }

  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  ActionSelectCutout() {
    let typeIdList = []; typeIdList.push(10); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.cutoutlist = data[0] },
      error => console.log(error));
  }
}
