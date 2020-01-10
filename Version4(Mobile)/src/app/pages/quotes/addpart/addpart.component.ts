import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { AddmatComponent } from '../materialinfo/addmat/addmat.component';

@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.scss'],
})
export class AddpartComponent implements OnInit {
  VersionId: any;
  priceListID: any;
  MaterialList: any = [];
  CountertypeList: any = [];
  SplashList: any = [];
  EdgeList: any = [];
  CutoutList: any = [];

  constructor(public Modalcntrl: ModalController, public popoverCntrl: PopoverController, private service: QuoteService, private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetMaterialList();
    this.GetCounterList();
    this.GetPriceListItems();
  }
  GetMaterialList() {
    let result = this.service.ActionGetMaterialList(this.VersionId).subscribe(data => {
      this.MaterialList = data;
    })
  }
  GetCounterList() {
    let result = this.service.ActionGetCountertypeList().subscribe(data => {
      this.CountertypeList = data[0];
    })
  }
  GetPriceListItems() {
    let typeIdList = []; typeIdList.push(5); typeIdList.push(6); typeIdList.push(10); typeIdList.push(7);
    let result = this.getservice.qsgetpricelistitems(this.priceListID, typeIdList).subscribe(data => {
      this.SplashList = data[1];
      this.EdgeList = data[0];
      this.CutoutList = data[2];
    })
  }
  ActionCloseAddPart() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
    });
  }



  /***************POPOVERS ******************/
  async ActionAddSize(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: AddSizesComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    return await popover.present();
  }


  async ActionAddMaterial() {
    const modal = await this.Modalcntrl.create({
      component: AddmatComponent
    });
    return await modal.present();
  }

}

/***************Additional popups***********************/


@Component({
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title class="titleheader">Measurements</ion-title>
    <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
    <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-row>
    <ion-col size="5">
    <ion-input type="text" class="border-btm"></ion-input>
    </ion-col>
    <ion-col size="7" class="ion-no-padding">
    <ion-row class="ion-no-padding">
      <ion-col size="3">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
      <ion-col size="1" class="ion-text-center ion-padding-top"> X
      </ion-col>
      <ion-col size="3">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
      <ion-col size="1" class="ion-text-center ion-padding-top"> =
     </ion-col>
      <ion-col size="4">
       <ion-input type="text" class="border-btm"></ion-input>
      </ion-col>
    </ion-row>
 </ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="3"><u class="color-blue">Add+</u></ion-col>
    <ion-col class="ion-text-right">0.00</ion-col>
  </ion-row>  
</ion-content>`,
  styleUrls: ['./addpart.component.scss'],
})
export class AddSizesComponent implements OnInit {

  constructor(private Modalcntrl: ModalController, public popoverCntrl: PopoverController, private service: QuotegetService) { }

  ngOnInit() {

  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }

}