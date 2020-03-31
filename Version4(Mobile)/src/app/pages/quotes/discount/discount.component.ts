import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { NgForm } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  DiscountTypeList: any = [];UserId:number;
  VersionId: any;
  DiscountList: any;
  areaId: number;SummaryTypeID:number;
  //tax: any;
  disclist: any;
  TaxTypeList: any = [];
  Version: any;
  //header: any;
  coId: number;
  FeeTypeList: any = [];
  AreaList: any = [];
  DiscTypes1: any = [{ ID: 1, Name: "%" }, { ID: 2, Name: "$" }];


  constructor(public alertController: AlertController, private modelCntrl: ModalController,
     private getservice: QuotegetService, private service: QuoteService, 
     private quoterep: QuoterepService,private authService:AuthService) { }

  ngOnInit() {
    this.Version = JSON.parse(this.Version);
    this.VersionId = this.Version.ID;
    this.ActionChangeDiscountList();
    if(this.SummaryTypeID == 1){ // discount
      this.GetQuoteDiscoutList();
    }
    if(this.SummaryTypeID == 2){ // for tax
      this.ActionTaxPopup();
    }
    if(this.SummaryTypeID == 3){ // for fees and charges
     this.ActionFeePopup();
  }
  this.authService.GetStoredLoginUser().then((data) =>{
    this.UserId = data == null ? 0 : data.logInUserID;
  });
  }
  //#region Discount
  ActionChangeDiscountList() {
    let result = this.getservice.ActionGetQuoteMasterList(2).subscribe(
      data => { this.DiscountTypeList = data });
  }
  ActionChangeDiscount(Id,details) {
    let modelItem = this.DiscountTypeList.find(s => s.ID == Id); 
    if (modelItem != null || modelItem != undefined) {
      details.DiscVal = modelItem.Value;
      details.DiscTypeID = modelItem.RefTypeID;
      details.Name = modelItem.Name;
    }
  }
  ActionAddDiscount() {
    let typeId = this.Version.CoID > 0 ? 1 : 0;
    let obj = {
      ID: 0, DiscVal: 0, DiscTypeID: 0, Name: "", VersionID: this.Version.ID, Isactive: 1,
      TypeID: typeId, CoID: this.Version.CoID
    };
  }
  ActionSaveQuoteDiscount = function () {
    //this.Version.discPopover = false;
    let results = this.service.qpactionsavediscount(this.DiscountList, this.Version.ID, this.Version.AreaID, this.Version.Tax).subscribe(data => {
      this.Version = this.quoterep.ResetVersionSummary(this.Version, data.VersionSummary,this.SummaryTypeID);
      this.ActionToClosePop(true);
    });
  }
  GetQuoteDiscoutList() {
    let result = this.getservice.getdiscountlist(this.VersionId).subscribe(
      data => {this.DiscountList = data; });
  }
  ActionGetTax(id,typeId) {
    let info = this.TaxTypeList.find(s => s.ID == id);
    if (info != null) {
      this.Version.TaxName = info.Name;
      if(typeId == 1){this.Version.Tax = info.Tax;}
    }
  }
  
  //#endregion
//#region Fees and Charges
ActionFeePopup() {
  //this.header.Version.copyroundoff = angular.copy(this.header.Version.RoundOff);
  let amount = this.Version.TotalAmt + this.Version.RoundOff + this.Version.TaxAmt - this.Version.DiscountAmt;
  this.Version.copynetamt = amount;
  this.Version.refPopover = false;
  this.Version.refPopover = true;
  this.getservice.getquotemasterlist(17).subscribe(
    data => { this.FeeTypeList = data });
  console.log(this.FeeTypeList)
}
ActionChangeFeeType(id) {
  let modelItem: any = '';
  modelItem =  this.FeeTypeList.find(s => s.ID == id); 
  if (modelItem != '' && modelItem != null) {
    this.Version.RefFee = modelItem.Value;
    this.Version.FeeTypeID = modelItem.RefTypeID;
  }
}
ActionRoundAmount(typeid) {
  let amount = this.Version.copynetamt, round = 0;
  if (amount == Math.floor(amount)) {
    if (typeid == 0) { amount -= 1; round = -1; } else { amount += 1; round = 1; }
  } else {
    if (typeid == 0) { round = Math.floor(amount) - amount; amount = Math.floor(amount); } else { round = Math.ceil(amount) - amount; amount = Math.ceil(amount); }
  }
  this.Version.copynetamt = amount;
  this.Version.copyroundoff = this.quoterep.roundToTwo(this.quoterep.convertToFloat(this.Version.copyroundoff) + round);
}
ActionSaveReferralFee = function () {
  this.Version.RoundOff = this.quoterep.convertToFloat(this.Version.copyroundoff);
  this.Version.refPopover = false;
  let model: any = {}, version = this.Version;
  model.ID = version.ID;
  model.UserID =  this.UserId;
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
  this.service.qpactionsavereferralfee(model, this.Version.AreaID).subscribe(data => {
  this.Version = this.quoterep.ResetVersionSummary(this.Version, data.VersionSummary,this.SummaryTypeID);
  this.ActionToClosePop(true);
});
}
//#endregion
  //#region  Sales Tax
  
  ActionTaxPopup() {
    this.getservice.getaccounttaxlist(3, this.Version.CustTypeID).subscribe(
      data => { this.TaxTypeList = data;
        if(this.TaxTypeList.length > 0){
          this.Version.TaxID= this.Version.TaxID == 0 ? this.TaxTypeList[0].ID : this.Version.TaxID;
          this.ActionGetTax(this.Version.TaxID,0);
        }
        });
    console.log(this.TaxTypeList)
  }

  ActionSaveSalesTax = function (form: NgForm) {
    if (form.valid) {
      let model: any = {}, version = this.Version;
      model.ID = version.ID;
      model.UserID = this.UserId;
      version.TaxCode = version.TaxCode == true ? 1 : 0;
      model.TaxCode = version.TaxCode;
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
      this.service.qpactionsavesalestax(model, this.Version.AreaID).subscribe(results =>{
        if (results != null && results.VersionSummary != undefined) {
          this.Version = this.quoterep.ResetVersionSummary(this.Version, results.VersionSummary,this.SummaryTypeID);
        } else {
         // this.quoterep.calcversionsummary31(version);
        }
        results.Root = 'Tax';
        this.ActionToClosePop(true);
      });
     
    }
  }
  ActionCheckUncheckTaxCode = function (event) {
    if (event == true) {
      this.Version.MatPercent = 100;
      this.Version.FabPercent = 100;
      this.Version.GradePercent = 100;
      this.Version.AddonPercent = 100;
      this.Version.AppliancePercent = 100;
      this.Version.OtherPercent = 100;
      this.Version.LaborPercent = 100;
      this.Version.TilePercent = 100;
      this.Version.CabinetPercent = 100;
      this.Version.CarpetPercent = 100;
      this.Version.FloorPercent = 100;
      this.Version.ConsumablePercent = 100;
    } else {
      this.Version.Tax = 0;
      this.Version.MatPercent = 0;
      this.Version.FabPercent = 0;
      this.Version.GradePercent = 0;
      this.Version.AddonPercent = 0;
      this.Version.AppliancePercent = 0;
      this.Version.OtherPercent = 0;
      this.Version.LaborPercent = 0;
      this.Version.TilePercent = 0;
      this.Version.CabinetPercent = 0;
      this.Version.CarpetPercent = 0;
      this.Version.FloorPercent = 0;
      this.Version.ConsumablePercent = 0;
      //this.quote.header.header.Version.Tax = 0;
      //this.ActionChangeQuoteTax(this.header.Version);
    }
  }
  //#endregion
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
      //this.IsUpdated = versummary.ReviewFlag;
      // this.quoterep.resetversionsummary(this.area, this.header, versummary);
      // if (this.coId > 0) {
      //     versummary = this.service.qscosummary(this.coId);
      //     this.quoterep.resetversionlistsummary(this.coId, this.header.VersionList, versummary); //check this code
      // }
      //searchobj.QCFlag = true;
    }
  }
  area(area: any, header: any, versummary: any) {
    throw new Error("Method not implemented.");
  }
ActionSaveSummary(form,typeId) {
    switch (typeId) {
      case 1:this.ActionSaveQuoteDiscount();break;
      case 2:this.ActionSaveSalesTax(form);break;
      case 3:this.ActionSaveReferralFee();break;
    }
  }
  ActionToClosePop(issave: boolean) {
    this.modelCntrl.dismiss({
      'dismissed': true,
      componentProps: this.Version,
      issave: issave
    });
  }
}
