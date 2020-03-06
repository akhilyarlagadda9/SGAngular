import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  DiscountTypeList: any = [];
  VersionId: any;
  DiscountList: any = [];
  areaId: number;
  tax: any;
  disclist: any;
  TaxTypeList: any= [];
  Version: any;
  header: any;
  coId: number;
  FeeTypeList: any= [];
  AreaList:any=[];
  


  constructor( public alertController: AlertController,private popoverCntrl: PopoverController,private getservice: QuotegetService,private service: QuoteService,private quoterep: QuoterepService) { }

  ngOnInit() {
    this.ActionChangeDiscountList(); 
    this.GetValueList();
    this.ActionTaxPopup ();
    this.ActionFeePopup();
  }

  ActionChangeDiscountList() {
    let result = this.getservice.ActionGetQuoteMasterList(2).subscribe(
      data => { this.DiscountTypeList = data });
      console.log(this.DiscountTypeList)
  }

  ActionToClosePop(issave: boolean) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps: this.disclist,
      issave: issave
    });
  }
  ActionChangeDiscount (details, type) {
    let modelItem = {Value:Number,RefTypeID:Number, Name:String};
    this.DiscountTypeList.map(function (elem) { if (elem.ID == details.DiscID) { modelItem = elem; return elem } { return 0 } });
    if (modelItem != null || modelItem != undefined) {
        details.DiscVal = modelItem.Value;
        details.DiscTypeID = modelItem.RefTypeID;
        details.Name = modelItem.Name;
    }
}

  DiscTypes1: any = [{ ID: 1, Name: "%" }, { ID: 2, Name: "$" }];

  
  GetValueList() {
    let result = this.getservice.getdiscountlist(this.VersionId).subscribe(
      data => { this.DiscountList = data });
      console.log(this.DiscountList)
  }

  /* ActionSaveDisc(form: NgForm) {
    if (form.valid) {
      this.service.ActionSaveDiscount(this.VersionId,this.Version.AreaID, this.Version.Tax).subscribe(data => {
        this.DiscountList = this.DiscountList.filter(x => x.VersionId === this.VersionId);
        this.ActionToClosePop(true);
      })
    }
  } */

  ActionSaveQuoteDiscount = function () {
    this.header.Version.discPopover = false;
    let results = this.service.qpactionsavediscount(this.DiscountList, this.versionId, this.Version.AreaID, this.header.Version.Tax);
    this.header.Version.QuoteAreaDiscList = this.getservice.getdiscountlist(this.versionId).subscribe(
      data => { this.DiscountList = data });
    if (results != null && results.VersionSummary != null) {
        this.resetversioninfo(results.VersionSummary);
    } else {
        this.quoterep.calcversionsummary31(this.header.Version.QuoteAreaDiscList);
    }       
    //calcversionsummary($scope.quote.header.Version);
    //calcversionsummary31();
    results.Root = 'Discount';
    //swal({ title: "UPDATED SUCCESSFULLY.", timer: 500, showConfirmButton: false });
    this.presentAlert()
    this.ActionToClosePop(true);
}

  CheckUncheckTaxCode = function () {
    if (this.header.Version.TaxCode == 0) {
        this.header.Version.Tax = 0;
        this.header.Version.MatPercent = 0;
        this.header.Version.FabPercent = 0;
        this.header.Version.GradePercent = 0;
        this.header.Version.AddonPercent = 0;
        this.header.Version.AppliancePercent = 0;
        this.header.Version.OtherPercent = 0;
        this.header.Version.LaborPercent = 0;
        this.header.Version.TilePercent = 0;
        this.header.Version.CabinetPercent = 0;
        this.header.Version.CarpetPercent = 0;
        this.header.Version.FloorPercent = 0;
        this.header.Version.ConsumablePercent = 0;
    } else {
        //this.quote.header.header.Version.Tax = 0;
        this.header.Version.MatPercent = 100;
        this.header.Version.FabPercent = 100;
        this.header.Version.GradePercent = 100;
        this.header.Version.AddonPercent = 100;
        this.header.Version.AppliancePercent = 100;
        this.header.Version.OtherPercent = 100;
        this.header.Version.LaborPercent = 100;
        this.header.Version.TilePercent = 100;
        this.header.Version.CabinetPercent = 100;
        this.header.Version.CarpetPercent = 100;
        this.header.Version.FloorPercent = 100;
        this.header.Version.ConsumablePercent = 100;
        //this.ActionChangeQuoteTax(this.header.Version);
    }
}



ActionTaxPopup () {
  let result = this.getservice.getaccounttaxlist(3, this.Version.CustTypeID).subscribe(
    data => { this.TaxTypeList = data });
    console.log(this.TaxTypeList)
}

ActionSaveSalesTax = function (form: NgForm) {
  if (form.valid) {
    let model:any = {}, version = this.header.Version;
    model.ID = version.ID;
    model.UserID = 'Test';
    model.Tax = version.Tax;
    model.TaxID = version.TaxID;
    model.MatPercent = version.MatPercent;
    model.FabPercent = version.FabPercent;
    model.GradePercent = version.GradePercent;
    model.AddonPercent = version.AddonPercent;
    model.LaborPercent = version.LaborPercent;
    model.TilePercent = version.TilePercent;
    model.CabinetPercent = version.CabinetPercent;
    model.CarpetPercent = version.CarpetPercent;
    model.FloorPercent = version.FloorPercent;
    model.ConsumablePercent = version.ConsumablePercent;
    model.OtherPercent = version.OtherPercent;
    model.ToolPercent = version.ToolPercent;
    model.TaxCode = version.TaxCode;
    let results = this.service.qpactionsavesalestax(model, this.Version.AreaID);
    if (results != null && results.VersionSummary != undefined) {
        this.resetversioninfo(results.VersionSummary);
    } else {
        this.quoterep.calcversionsummary31(version);
    }
    results.Root = 'Tax';
    this.fabcent = version.FabPercent;//fab
    this.matcent = version.MatPercent;//mat
    this.gradecent = version.GradePercent;//edge,splash,cut
    this.laborcent = version.LaborPercent;//labor
    this.addoncent = version.OtherPercent;//addon
    this.sinkcent = version.AddonPercent;//sink,faucet
    this.tilecent = version.TilePercent;//tile
    this.caPercent = version.CarpetPercent;//carpet
    this.cbPercent = version.CabinetPercent;//cabinet
    this.flPercent = version.FloorPercent;//floor
    this.cosPercent = version.ConsumablePercent;//consumble
    this.appliancePercent = version.AppliancePercent;//appliance
    this.toolPercent = version.ToolPercent;//tool
    //alert({ title: "UPDATED SUCCESSFULLY.", timer: 500, showConfirmButton: false });
    this.presentAlert()
    this.ActionToClosePop(true);
  }
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: 'UPDATED SUCCESSFULLY.',
    buttons: ['OK']
  });

  await alert.present();
}

resetversioninfo(versummary) {
  if (versummary != null) {
      this.header.IsUpdated = versummary.ReviewFlag;
      this.quoterep.resetversionsummary(this.area, this.header, versummary);
      if (this.coId > 0) {
          versummary = this.service.qscosummary(this.coId);
          this.quoterep.resetversionlistsummary(this.coId, this.header.VersionList, versummary); //check this code
      }
      //searchobj.QCFlag = true;
  }
}
  area(area: any, header: any, versummary: any) {
    throw new Error("Method not implemented.");
  }


  ActionFeePopup() {
    //this.header.Version.copyroundoff = angular.copy(this.header.Version.RoundOff);
    let amount = this.header.Version.TotalAmt + this.header.Version.RoundOff + this.header.Version.TaxAmt - this.header.Version.DiscountAmt;
    this.header.Version.copynetamt = amount;
    this.header.Version.refPopover = false;
    this.header.Version.refPopover = true;
    this.getservice.getquotemasterlist(17).subscribe(
      data => { this.FeeTypeList = data });
      console.log(this.FeeTypeList)
}

ActionChangeFeeType(id) {
  let modelItem:any = '';
  this.FeeTypeList.map(function (elem) { if (elem.ID == id) { modelItem = elem; return elem } { return 0 } });
  if (modelItem != '') {
      this.header.Version.RefFee = modelItem.Value;
      this.header.Version.FeeTypeID = modelItem.RefTypeID;
  }
}

ActionRoundAmount(typeid) {
  let amount = this.header.Version.copynetamt, round = 0;
  if (amount == Math.floor(amount)) {
      if (typeid == 0) { amount -= 1; round = -1; } else { amount += 1; round = 1; }
  } else {
      if (typeid == 0) { round = Math.floor(amount) - amount; amount = Math.floor(amount); } else { round = Math.ceil(amount) - amount; amount = Math.ceil(amount); }
  }
  this.header.Version.copynetamt = amount;
  this.header.Version.copyroundoff = this.quoterep.roundToTwo(this.quoterep.convertToFloat(this.header.Version.copyroundoff) + round);
}

ActionSaveReferralFee = function () {
  this.header.Version.RoundOff = this.quoterep.convertToFloat(this.header.Version.copyroundoff);
  this.header.Version.refPopover = false;
  let model:any = {}, version = this.header.Version;
  model.ID = version.ID;
  model.UserID = 'Test';
  model.RefFee = version.RefFee;
  model.IsFeeTax = version.IsFeeTax;
  model.FeeID = version.FeeID;
  model.FeeTypeID = version.FeeTypeID;
  model.IsFeePrint = version.IsFeePrint;
  model.FeeCost = version.FeeCost;
  model.FeeMargin = version.FeeMargin;
  model.FeePrice = version.FeePrice;
  model.FeeAmount = version.FeeAmount;
  model.RoundOff = version.RoundOff;
  model.CustomFeeAmt = version.CustomFeeAmt;
  model.CustomDescription = version.CustomDescription;
  model.MatFee = version.MatFee;
  model.FabFee = version.FabFee;
  model.GradeFee = version.GradeFee;
  model.SinkFaucetFee = version.SinkFaucetFee;
  model.LaborFee = version.LaborFee;
  model.AddonFee = version.AddonFee;
  model.TileFee = version.TileFee;
  model.CabinetFee = version.CabinetFee;
  model.CarpetFee = version.CarpetFee;
  model.FloorFee = version.FloorFee;
  model.ConsumableFee = version.ConsumableFee;
  let results = this.service.qpactionsavereferralfee(model, this.header.Version.AreaID);
  if (results != null && results.VersionSummary != null) {
      this.resetversioninfo(results.VersionSummary);
  } else {
    this.quoterep.calcversionsummary31(version);
  }
  //$scope.ActionCalculateFee();
  this.FeeAndRoundAmt = this.header.Version.RefAmt + this.header.Version.RoundOff;
 
  //this.swal({ title: "UPDATED SUCCESSFULLY.", timer: 500, showConfirmButton: false });
  this.presentAlert();
  this.ActionToClosePop(true);
}
/* resetversioninfo(versummary) {
  this.header.IsUpdated = versummary.ReviewFlag;
  this.quoterep.resetversionsummary(this.area, this.header, versummary);
  if (this.coId > 0) {
      versummary = this.qscosummary(this.coId);
      this.resetversionlistsummary(this.coId, this.header.VersionList, versummary); //check this code
  }
  //searchobj.QCFlag = true;
} */

}
