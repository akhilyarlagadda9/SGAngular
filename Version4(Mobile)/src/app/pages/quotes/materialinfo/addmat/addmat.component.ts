import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { OverlayEventDetail } from '@ionic/core';
import { AddmeasComponent } from '../addmeas/addmeas.component';

declare var _qscope: any;

@Component({
  selector: 'app-addmat',
  templateUrl: './addmat.component.html',
  styleUrls: ['./addmat.component.scss'],
})
export class AddmatComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  shownGroup :any;
  public verId : any;
  MaterialList :any = [];
  Progress:number=0;
  checkThis:number=1;
  versionId:number;
  areaId:number;
  partId:number;
  mode:number;
  partList:any=[];
  Matcost: any;
  material:any;
  partinfo: any;
  areaInfo: any;
  Version: any;
  

  constructor(public Modalcntrl : ModalController, private popoverCntrl: PopoverController,private quoterep: QuoterepService, private getservice: QuotegetService,private navParams: NavParams,private service: QuoteService ) { }

  ngOnInit() {
    //this.ActionSelectMat();
    this.GetPartList()
  }

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

 /*  ActionSelectMat() {
    let typeIdList = []; typeIdList.push(5); 
    this.getservice.qsgetpricelistitems(this.priceListID,typeIdList).subscribe(
      data => { this.edgelist = data[0] ; console.log(this.edgelist);},
      error => console.log(error));
  } */

  GetPartList() {
    this.service.ActionQuickPartList(this.versionId, this.areaId, this.partId, this.mode).subscribe(
      data => { this.partList = data; console.log(this.partList); }
    );
  }

  ActionSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
}


ActionSetMargin(typeId: number, model: any, type: string) {
  this.material = this.quoterep.margincalculations(typeId, model, type);
  this.material.Amount = this.quoterep.calcmargin(this.material.UnitCost, this.material.Margin);
  this.material.Amt = this.Matcost.Amount;
}

ActionSetAmount() {
  this.material.Amount = this.quoterep.calcitemamt(this.material.Qty, this.material.UnitPrice);
  this.material.Amt = this.material.Amount;
}

ActionSetSqft(size, typeid) {
  size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
}

ActionSetDisc( model: any,) {
  if (this.material.Cost != 0 && this.material.CostDiscount != 0) {
    let cost = Number((this.material.UnitCost * (this.material.CostDiscount / 100)));
    this.material.UnitCost = Number(this.material.Cost - cost);
} else {
  this.material.UnitCost = this.material.Cost;
}
}


toggleGroup(group) {
  if (this.isGroupShown(group)) {
      this.shownGroup = 0;
  } else {
      this.shownGroup = group;
  }
};

isGroupShown(group) {
  return this.shownGroup === group;
};


changeProgress(value) {
  if (this.showProgress(value)) {
      this.Progress = 0;
  } else {
      this.Progress = value;
  }
};

showProgress(value) {
  return this.Progress === value;
};


chngCheck(Check) {
  if (this.isCheck(Check)) {
      this.checkThis = 0;
  } else {
      this.checkThis = Check;
  }
};

isCheck(Check) {
  return this.checkThis === Check;
};

/* async ActionAddMeas() {
  const popover = await this.popoverCntrl.create({
    component: AddMeasComponent,
    translucent: true,
    showBackdrop: false,
    cssClass: "opover_class"
  });
  return await popover.present();
} */

/***** MATERIAL DETAILS *****/
async ActionAddMeas(selName:string, ViewType:string) {
  let sel= {selName:selName, material:this.material,partinfo: this.partinfo,areaInfo : this.areaInfo, ViewType:ViewType, Version:this.Version}
  const modal = await this.Modalcntrl.create({
    component: AddmeasComponent,
    componentProps: sel
  });
  return await modal.present();
}

async ActionSearchSelect(typeid, typeid2) {
  let obj = { searchTypeId: typeid, producttypeId: typeid2, search: this.material.Des == undefined ? "" : this.material.Des }
  const popover = await this.popoverCntrl.create({
    component: SearchComponent,
    translucent: true,
    componentProps: obj,
    cssClass: "popover_class"
  });
  return await popover.present();
}


}

@Component({
  template: `
  <ion-header>
  <ion-toolbar class="toolsty">
    <ion-title class="titleheader2"><b>Description</b></ion-title>
    <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop(false)" class="btnsty">X</ion-button>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-item >
    <ion-row>
    <ion-col size="12" *ngFor="let item of listItems" (click)="ActionSelectItem(item)" class="border-btm">
      <ion-label>
        <h3>{{item.ProSubGroup}}</h3>
        <p></p>
      </ion-label>
    </ion-col>
  </ion-row>
  </ion-item>
</ion-content>`,
  styleUrls: ['./addmat.component.scss'],
})
export class SearchComponent implements OnInit {
  partinfo: any = [];
  navObj = this.navParams.data;
  headerInfo: any;
  info: any;
  searchobj= this.navParams.data;
  listItems = [];
  constructor(private navParams: NavParams,public Modalcntrl: ModalController,private getservice:QuotegetService, private popoverCntrl: PopoverController) { }
  obj: any;
  ngOnInit() {debugger
    this.ActionlistItems()
  }




  ActionToClosePop(isSelect: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      isSelect: isSelect
    });
  }

  ActionSelectItem(model:any){
    this.info = model;
    this.ActionToClosePop(true)
  }
  ActionlistItems() {
   this.getservice.ActionSearchMaterials(this.searchobj.search,this.searchobj.typeId,this.searchobj.pricelistIds,this.searchobj.depthId,this.searchobj.finishId,this.searchobj.searchtypeId, this.searchobj.proSubGroupId).subscribe(data=>{
     this.listItems = data});
  }
  
}
