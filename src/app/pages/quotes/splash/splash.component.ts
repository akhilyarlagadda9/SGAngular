import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  splashlist: any = [];
  priceListID: any;
  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService ) { }

  ngOnInit()  {
    this.ActionSelectSplash(); 
  }

  ActionToClose() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  ActionSelectSplash() {
    let typeIdList = []; typeIdList.push(6); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.splashlist = data[1] },
      error => console.log(error));
  }

}
