import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-managementsummary',
  templateUrl: './managementsummary.component.html',
  styleUrls: ['./managementsummary.component.scss'],
})
export class ManagementsummaryComponent implements OnInit {

  constructor(private service: QuoteService, public Modalcntrl: ModalController, private popoverCntrl: PopoverController) { }

  ngOnInit() { }

  ActionCloseSummaryEdit() {
    this.Modalcntrl.dismiss({
      'dismissed': true,
    });
  }

  async ActionDiscSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: DiscountComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

  async ActionTaxSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: taxComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

  async ActionFeeSelect(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: feeComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

  async ActionEditPaymentSchedule(ev: any) {
    let obj = {}
    const popover = await this.popoverCntrl.create({
      component: PaymentScheduleComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
    });
    return await popover.present();
  }

}
@Component({
  //selector: 'app-itemsearchComponent',
  template: `
  <ion-header>
    <ion-toolbar style="height:37px;top:-8px;left:-10px;">
      <ion-title style="font-size:15px;">Job Discount(S)</ion-title>
      <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-row style="height:360px">
  <ion-col>
      <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Discount</ion-label>
      <ion-select class="btninfo" interface="popover" [(ngModel)]="discname" name="discname"
        (ionChange)="ActionChangeDiscount()">
        <ion-select-option *ngFor="let disc of DiscountTypeList" [value]="discname"> {{disc.Name}}</ion-select-option>
      </ion-select>
      </ion-item>
      <ion-item>
        <ion-label class="labelfont" position="floating" color="primary">Value($/%)</ion-label>
        <ion-input type="text" class="labelfont" value="0"></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="floating" color="primary"></ion-label>
        <ion-select [(ngModel)]="name" class="labelfont">
           <ion-select-option *ngFor="let disc of DiscTypes1" [value]="name"> {{disc.Name}}</ion-select-option>
        </ion-select></ion-item>
        <ion-item style="margin-left: -4%;">
          <ion-checkbox style="margin-left: 4%;"></ion-checkbox>
          <ion-label style="margin-left: 5px;">Tax</ion-label>
      </ion-item>
  </ion-col>
</ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class DiscountComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  DiscountTypeList: any = [];

  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
    this.ActionSearchParentAccount();
    this.ActionChangeDiscount();
  }
  ActionSearchParentAccount() { }
  DiscTypes1: any = [{ ID: 1, Name: "%" }, { ID: 2, Name: "$" }];

  ActionChangeDiscount() {
    let result = this.service.QuoteMasterList(2).subscribe(
      data => { this.DiscountTypeList = data },
      error => console.log(error));
  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}

@Component({
  //selector: 'app-itemsearchComponent',
  template: `
    <ion-header>
      <ion-toolbar style="height:37px;top:-8px;left:-10px;">
        <ion-title style="font-size:15px;">Sales Tax(%)</ion-title>
        <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
        <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-row style="height:360px">
    <ion-col>
          <ion-item>
          <ion-label class="labelfont" position="floating" color="primary">Customer Tax Code:</ion-label>
        <ion-select class="btninfo" interface="popover" [(ngModel)]="taxname" name="taxname" (ionChange)="ActionChangeQuoteTax()">
            <ion-select-option *ngFor="let mat of TaxTypeList " [value]="taxname"></ion-select-option>
        </ion-select>
        </ion-item>
        <ion-item><ion-input type="text" class="labelfont" value="0"></ion-input> </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Material:</ion-label>
        <ion-input type="text" class="labelfont" value="0"><ion-row style="margin-right: 3px;">%</ion-row></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Fabrication:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input>
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Edge,Cutouts:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Sink,Faucet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Appliance:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Add on:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Labor:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Tile:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Cabinet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Carpet:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Wood Floor:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Consumable:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
        <ion-item>
        <ion-label class="labelfont" position="stacked" color="primary">Tool:</ion-label>
        <ion-input type="text" class="labelfont" value="100"><ion-row style="margin-right: 3px;">%</ion-row></ion-input> 
        </ion-item>
    </ion-col>
  </ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class taxComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  TaxTypeList: any = [];
  header: any;
  Version: any;

  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
    this.ActionSearchParentAccount();
    this.ActionChangeQuoteTax();
  }
  ActionSearchParentAccount() { }

  ActionChangeQuoteTax() {
    let result = this.service.Accounttaxlist(3, this.Version.CustTypeID).subscribe(
      data => { this.TaxTypeList = data },
      error => console.log(error));
  }

  ActionToClosePop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}

@Component({
  //selector: 'app-itemsearchComponent',
  template: `
          <ion-header>
            <ion-toolbar style="height:37px;top:-8px;left:-10px;">
              <ion-title style="font-size:15px;">Charges</ion-title>
              <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
              <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-row style="height:360px">
          <ion-col>
             <ion-item>
                <ion-label class="labelfont" position="floating" color="primary">Fees</ion-label>
                <ion-select class="btninfo" interface="popover" [(ngModel)]="discname" name="discname" (ionChange)="ActionChangeFeeType()">
                    <ion-select-option *ngFor="let mat of FeeTypeList " [value]="discname">{{mat.Name}}</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label class="labelfont" position="floating" color="primary"></ion-label>
                <ion-input type="text" class="labelfont" value="0"></ion-input>
                </ion-item>
                <ion-item>
                <ion-label class="labelfont" position="floating" color="primary"></ion-label>
                <ion-select [(ngModel)]="name" class="labelfont">
                   <ion-select-option *ngFor="let disc of DiscTypes1" [value]="name"> {{disc.Name}}</ion-select-option>
                </ion-select>
              </ion-item>
                <ion-item style="margin-left: -4%;">
                  <ion-checkbox style="margin-left: 4%;"></ion-checkbox>
                  <ion-label style="margin-left: 5px;">FeeTax</ion-label>
              </ion-item>
              <ion-item>
            <ion-label class="labelfont" position="floating" color="primary">Net Total W/O Round Off: </ion-label>
            <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
            </ion-item>
            <ion-item>
            <ion-label class="labelfont" position="floating" color="primary">Round Off:</ion-label>
            <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
            </ion-item>
            <ion-item>
              <ion-range value="20">
                <ion-icon slot="start" size="small" name="remove"></ion-icon>
                <ion-icon slot="end" name="add"></ion-icon>
              </ion-range>
            </ion-item>
            <ion-item>
            <ion-label class="labelfont" position="floating" color="primary">Net Total:</ion-label>
            <ion-input type="text" class="labelfont" value="$ 1,365.01" readonly="readonly"></ion-input> 
            </ion-item>
          </ion-col>
        </ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class feeComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  FeeTypeList: any = [];
  constructor(private Modalcntrl: ModalController, private navParams: NavParams, private popoverCntrl: PopoverController, private service: QuotegetService) { }
  ngOnInit() {
    this.ActionSearchParentAccount();
    this.ActionChangeFeeType();
  }
  ActionSearchParentAccount() { }
  DiscTypes1: any = [{ ID: 1, Name: "%" }, { ID: 2, Name: "$" }];

  ActionChangeFeeType() {
    let result = this.service.QuoteMasterList(17).subscribe(
      data => { this.FeeTypeList = data },
      error => console.log(error));
  }
  ActionToClosePop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}

@Component({
  //selector: 'app-itemsearchComponent',
  template: `
  <ion-header>
    <ion-toolbar style="height:37px;top:-8px;left:-10px;">
      <ion-title style="font-size:15px;">Payment Schedule</ion-title>
      <ion-button slot="end" color="success" size="small" class="pob2" (click)="ActionToClosePop()">Save</ion-button>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" class="pob">X</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-row style="height:360px width:200px">
  <ion-col>
  <ion-row>
      <ion-checkbox class="marg-all" color="primary"></ion-checkbox>
      <ion-label class="margtb">C.O.D</ion-label>
    </ion-row>
  <ion-item>
      <ion-label class="labelfont" position="floating" color="primary">Deposit(%)</ion-label>
      <ion-select>
        <ion-select-option>0</ion-select-option>
        <ion-select-option>5</ion-select-option>
        <ion-select-option>10</ion-select-option>
        <ion-select-option>15</ion-select-option>
        <ion-select-option>20</ion-select-option>
        <ion-select-option>25</ion-select-option>
        <ion-select-option>30</ion-select-option>
        <ion-select-option>35</ion-select-option>
        <ion-select-option>40</ion-select-option>
        <ion-select-option>45</ion-select-option>
        <ion-select-option>50</ion-select-option>
        <ion-select-option>55</ion-select-option>
        <ion-select-option>60</ion-select-option>
        <ion-select-option>65</ion-select-option>
        <ion-select-option selected>70</ion-select-option>
        <ion-select-option>75</ion-select-option>
        <ion-select-option>80</ion-select-option>
        <ion-select-option>85</ion-select-option>
        <ion-select-option>90</ion-select-option>
        <ion-select-option>95</ion-select-option>
        <ion-select-option>100</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label class="labelfont" position="floating" color="primary">Due Before Template(%)</ion-label>
      <ion-select>
        <ion-select-option>0</ion-select-option>
        <ion-select-option>5</ion-select-option>
        <ion-select-option>10</ion-select-option>
        <ion-select-option>15</ion-select-option>
        <ion-select-option>20</ion-select-option>
        <ion-select-option>25</ion-select-option>
        <ion-select-option selected>30</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
    <ion-label class="labelfont" position="floating" color="primary">Final Payment(%):</ion-label>
    <ion-input type="text" class="labelfont" value="0" readonly></ion-input>
    </ion-item>
  </ion-col>
  <ion-col>
  <ion-row>
      <ion-checkbox class="marg-all" color="primary"></ion-checkbox>
      <ion-label class="margtb">NET Terms</ion-label>
    </ion-row>
  <ion-item>
  <ion-label class="labelfont" position="floating" color="primary"></ion-label>
      <ion-select>
        <ion-select-option>AR PREF n15</ion-select-option>
        <ion-select-option>AR STD n10</ion-select-option>
        <ion-select-option selected>COD</ion-select-option>
        <ion-select-option>HOLD</ion-select-option>
        <ion-select-option>LOWES</ion-select-option>
        <ion-select-option>Net 15 Days</ion-select-option>
        <ion-select-option>Net 30 Days</ion-select-option>
        <ion-select-option>Net 45 Days</ion-select-option>
        <ion-select-option>Net 60 Days</ion-select-option>
        <ion-select-option>On Receipt</ion-select-option>
        <ion-select-option>PREPAY</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-col>
</ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class PaymentScheduleComponent implements OnInit {

  constructor( private popoverCntrl: PopoverController) { }
  ngOnInit() {}

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }
}



