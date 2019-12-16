import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuoterepService {
  constructor() { }
  private _interfacesource = new Subject<any>();
  interface$ = this._interfacesource.asObservable();
  SendInfo(info: any) {
    this._interfacesource.next(info);
  }

  //**************************************ADD ITEMS*********************************************/

  AddPartMatItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let partmat: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, Tax: matcent, ID: Number, IsChgFlag: 1, ParentID: Number,
      SaveFlag: 1, Isactive: 1, IsActive: 1, JobQty: Number, IsOptional: Number, MaterialID: Number,
      PriceByID: Number, SelfPriceBy: Number, Margin: Number, Sqft: Number, Qty: Number,
      WF: Number, DiscAmt: 0, IsPrint: 1, IsChg: 0,LaborTaxVal: Number,
      LaborUnitCost: Number, LaborMargin: Number, LaborUnitPrice: Number,  Amount: Number,

    }
    return partmat;
  }
  AddEdgeItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let partmat: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, Tax: matcent, ID: Number, IsChgFlag: 1, ParentID: Number,
      SaveFlag: 1, Isactive: 1, IsActive: 1, JobQty: Number, IsOptional: Number, 
      EdgeProfileID:Number, EdgeProfile:Number, Description: 'Finished Edge',DiscAmt: 0, IsPrint: 1, IsChg: 0,
      Inches:Number,LF:Number,UnitPrice: Number, Margin: Number,UnitCost: Number,Amount: Number,
    }
    return partmat;
  }

  //************************************** ITEM CALC *********************************************/
  calcitemamt(qty, price) {
    let amount: any; if (qty != 0 && price != 0) { amount = (qty * price); } 
    amount = this.roundToTwo(amount);return amount;
  }
  calcsqft(w: number, h: number) {
    let sqft = 0;
    if (w != 0 && h != 0) { sqft = this.roundToTwo((w * h) / 144); } return sqft;
  }
  calcmargin(cost, price) {
    let margin = 0;
    if (price > 0) { margin = this.roundToTwo(((price - cost) / price) * 100); } return margin;
  }
  calccost(margin, price) {
    let cost = 0;
    if (price > 0) { cost = this.roundToTwo(price * (1 - (margin / 100))); } return cost;
  }
  calcprice(cost, margin) {
    let price = cost;
    let temp = (1 - (margin / 100)); if (temp > 0) { price = this.roundToTwo(cost / temp); } return price;
  }
  margincalculations(typeId, details, type) {
    let cost = 0, price = 0, margin = 0;
    switch (type) {
      case "Fab":
        cost = details.UnitCost; price = details.LaborUnitPrice; margin = details.Margin;
        break;
      case "splashSF":
        cost = details.SFCost; price = details.SFPrice; margin = details.SFMargin;
        break;
      case "splashLF":
        cost = details.UnitCost; price = details.UnitPrice; margin = details.LFMargin;
        break;
      case "edge": case "sink": case "fat": case "labor": case "addon": case "tile": case "mat":
        cost = details.UnitCost; price = details.UnitPrice; margin = details.Margin;
        if (details.TaxVal > 0) { cost += this.roundToTwo(cost * (details.TaxVal / 100)); }
        break;
      case "cutout":
        cost = details.UnitCost; price = details.Unitprice; margin = details.Margin;
        break;
      case "matfab":
        cost = details.LaborUnitCost; price = details.LaborUnitPrice; margin = details.LaborMargin;
        if (details.LaborTaxVal > 0) { cost += this.roundToTwo(cost * (details.LaborTaxVal / 100)); }
        break;
    }
    if (typeId == 1 || typeId == 2) {
      this.PopulatePrice(type, cost, price, margin, details);
    } else {
      if (cost > 0 && price > 0) { // Find Margin
        this.PopulateMargin(type, cost, price, margin, details);
      }
      else if (cost <= 0 && price > 0) {  // Find Cost
        this.PopulateCost(type, cost, price, margin, details);
      }
    }
    return details;

  }
  PopulatePrice(type: string, cost: number, price: number, margin: number, details: any) {
    var priceVal = this.calcprice(cost, margin);
    switch (type) {
      case "Fab": case "matfab":
        details.LaborUnitPrice = priceVal;
        break;
      case "splashSF":
        details.SFPrice = priceVal;
        break;
      case "splashLF": case "edge": case "sink": case "fat": case "labor": case "addon": case "tile": case "mat":
        details.UnitPrice = priceVal;
        break;
      case "cutout":
        details.Unitprice = priceVal;
        break;
    }
  }
  PopulateMargin(type: string, cost: number, price: number, margin: number, details: any) {
    var marVal = this.calcmargin(cost, price);
    switch (type) {
      case "Fab": case "edge": case "cutout": case "sink": case "fat": case "labor": case "addon": case "tile": case "mat":
        details.Margin = marVal;
        break;
      case "splashSF":
        details.SFMargin = marVal;
        break;
      case "splashLF":
        details.LFMargin = marVal;
        break;
      case "matfab":
        details.LaborMargin = marVal;
        break;
    }
  }
  PopulateCost(type: string, cost: number, price: number, margin: number, details: any) {
    var costVal = this.calccost(margin, price);
    switch (type) {
      case "Fab": case "splashLF": case "edge": case "cutout": case "sink": case "fat": case "labor": case "addon": case "tile": case "mat":
        details.UnitCost = costVal; if (type == "mat") { details.Cost = costVal; }
        break;
      case "splashSF":
        details.SFCost = costVal;
        break;
      case "matfab":
        details.LaborUnitCost = costVal;
        break;
    }
  }
  roundToTwo(num: any) {
   return Math.round(num * 1e2) / 1e2;
  }
  roundSqft(sqft: number) {
    return Math.sqrt(sqft);
  }



}
