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
      PriceByID: Number, SelfPriceBy: Number, Margin: Number, Sqft: 0, Qty: Number,
      WF: Number, DiscAmt: 0, IsPrint: 1, IsChg: 0, LaborTaxVal: Number,
      LaborUnitCost: Number, LaborMargin: Number, LaborUnitPrice: Number, Amount: Number,

    }
    return partmat;
  }
  AddEdgeItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let edge: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, Tax: matcent, ID: Number, IsChgFlag: 1, ParentID: Number,
      SaveFlag: 1, Isactive: 1, IsActive: 1, JobQty: Number, IsOptional: Number,
      EdgeProfileID: Number, EdgeProfile: Number, Description: 'Finished Edge', DiscAmt: 0, IsPrint: 1, IsChg: 0,
      Inches: Number, LF: 0, UnitPrice: Number, Margin: Number, UnitCost: Number, Amount: Number,
    }
    return edge;
  }
  AddCutoutItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, loadId: number) {
    let cutout: any = {
      JobDes: '', JobQty: 1,
      AreaID: 0, VersionID: 0, CoID: 0, CoSrNo: 0, ID: 0, IsChgFlag: 1, ParentID: 0, SaveFlag: 1, LF: 1, IsPrint: 1, SrNo: 0, ProductItemID: 0,
      Unitprice: 0, IsOptional: 0, Tax: 0, Isactive: 1, CutOutTypeID: 0, DiscAmt: 0, IsChg: 0, IsDefault: 1, Amt: 0, ShapeID: 0, SIndex: 0,
    }
    return cutout;
  }
  AddSinkItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let sink: any = {
      ID: 0, PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, Qty: 1, JobQty: 1, CoSrNo: coSrno, UserID: 0, IsQtyUpdate: 0, Tax: matcent, IsOptional: 0, IsPrint: 1, Isactive: 1, IsPrice: 1,
      TypeID: 0, ProductItemID: 0, Description: '', JobDes: '', UnitCost: 0, Margin: 0, UnitPrice: 0, Amount: 0, DiscAmt: 0, IsChgFlag: 1, SaveFlag: 1, IsChg: 0, Notes: '',
    };
    return sink;
  }
  AddFaucetItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let faucet: any = {
      ID: 0, PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, UserID: 0, Qty: 1, IsQtyUpdate: 0, Tax: matcent, IsOptional: 0, IsPrice: 1, Isactive: 1, TypeID: 0,
      ProductItemID: 0, Description: '', JobDes: '', UnitCost: 0, Margin: 0, UnitPrice: 0, Amount: 0, DiscAmt: 0, IsChgFlag: 1, IsChg: 0, IsPrint: 1, JobQty: 1, Notes: '',
    };
    return faucet;
  }
  AddTileItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, loadId: Number, ViewType: string) {
    let tile: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, UserID: 0, ID: 0, Qty: 1, IsQtyUpdate: 0, Tax: matcent, IsOptional: 0, IsPrint: 1,
      IsPrice: 1, Isactive: 1, ProductItemID: 0, Description: '', UnitCost: 0, Margin: 0, UnitPrice: 0, SaveFlag: 1, IsChgFlag: 1,
      Amount: 0, DiscAmt: 0, IsChg: 0, JobDes: '', JobQty: 1, Note: '', ViewType: ViewType, TypeID: loadId,
    };
    return tile;
  }
  AddOtherItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let other: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, UserID: 0, ID: 0, Qty: 1, IsQtyUpdate: 0, Tax: matcent, IsOptional: 0,
      IsPrice: 1, Isactive: 1, TypeID: 0, ProductItemID: 0, Description: '', UnitCost: 0, Margin: 0, UnitPrice: 0, IsPrint: 1,
      Amount: 0, DiscAmt: 0, IsChg: 0, IsChgFlag: 1, JobDes: '', JobQty: 1, Note: '',
    };
    return other;
  }
  // AddTemplateItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, loadId:number, viewtype:string){
  //   let other:any = {
  //     AreaID : areaId, PartID : partId, VersionID : verId, CoID : coId, CoSrNo : coSrno, UserID : 0, ID : 0, Qty : 1, IsQtyUpdate : 0, Tax : matcent, IsOptional : 0,
  //     IsPrice : 1, Isactive : 1, LaborTypeID : 0, ProductItemID : 0, UnitTypeID : 0, Description : '', UnitCost : 0, Margin : 0, UnitPrice : 0,
  //     Amount : 0, DiscAmt : 0, IsChg : 0, IsPrint : 1, IsChgFlag : 1, JobDes : '', ViewTypeID : 0, Note : '', TypeID :loadId, ViewType : viewtype,
  // };
  // return other;
  // }
  AddLaborItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, loadId: number, viewtype: string) {
    let other: any = {
      AreaID: areaId, PartID: partId, VersionID: verId, CoID: coId, CoSrNo: coSrno, UserID: 0, ID: 0, Qty: loadId == 0 ? 1 : 0, IsQtyUpdate: 0, Tax: matcent, IsOptional: 0,
      IsPrice: 1, Isactive: 1, LaborTypeID: 0, ProductItemID: 0, UnitTypeID: 0, Description:  loadId == 0 ? "" : viewtype, UnitCost: 0, Margin: 0, UnitPrice: 0,
      Amount: 0, DiscAmt: 0, IsChg: 0, IsPrint: 1, IsChgFlag: 1, JobDes: '', ViewTypeID: loadId, Note: '', TypeID: loadId, ViewType: viewtype,
    };
    return other;
  }
  AddFabricationItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, ) {
    let fab: any = {
      AreaID: areaId, PartID: partId, VersionID: verId, CoID: coId, CoSrNo: coSrno, ID: 0, Tax: matcent, IsChgFlag: 1, ParentID: 0, SaveFlag: 1, IsActive: 1, Margin: 0, CopyQty: 0,
      IsOptional: 0, DiscAmt: 0, PartSqft: 0, WF: 0, MaterialID: 0, MeasureList: [], IsChg: 0, Isactive: 1, LaborUnitPrice: 0, UnitCost: 0,
      SplashSqft: 0, IsPrint: 1, JobQty: 0, JobSplashSf: 0, Description: 'Standard Fabrication'
    };
    return fab;
  }
  AddMeasurementItem() {
    let sizes = {
      CounterType:"",CounterTypeID:0,Width:0,Height:0,Sqft:0
    };
    return sizes;
  }
  AddSplashItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let splash = {
      TypeID: 0, EdgeTypeID: 0, JobDes: '', ProductItemID: 0, JobQty: 0, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, ID: 0, IsChgFlag: 1, ParentID: 0,
      SaveFlag: 1, IsOptional: 0, SFPrice: 0, CopyQty: 0, IsPrint: 1, Tax: matcent, WF: 0, Sqft: 0, Isactive: 1, Height: 0, Width: 0, LF: 0, UnitPrice: 0, SFCost: 0,
      DiscAmt: 0, MaterialID: 0, IsChg: 0, SplashID: 0, PartID: partId, Description: '',
    };
    return splash;
  }
  AddCustomerItems(partId: number, areaId: number, verId: number, coId: number, coSrno: string) {
    let custitem = {
      JobDes: '', PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, UserID: 0, ID: 0,
      Qty: 1, Isactive: 1, IsPrint: 1, Description: '', IsChg: 0, IsChgFlag: 1,
    };
    return custitem;
  }
  //**************************************SET ITEMS*********************************************/
  SetPartMaterial(partmat, material) {
    partmat.MaterialID = material.ID;
    let price = (material.PriceByID == 0 || material.PriceByID == 1) ? material.UnitPrice : material.WagPrice;
    // partMat.IsPriceChg = material.Unitprice != material.Price ? true : false;
    partmat.Unitprice = price;
    partmat.UnitCost = material.UnitCost;
    partmat.Margin = material.Margin;
    partmat.WF = material.WF;
    partmat.Tax = material.Tax;
    partmat.DiscountID = material.DiscountID;
    partmat.DiscVal = material.DiscVal;
    partmat.DiscTypeID = material.DiscTypeID;
    partmat.IsDiscTax = material.IsDiscTax;
    return partmat;
  }
  SetSizes(size, selectcounter) {
    size.CounterType = selectcounter.Name; size.CounterTypeID = selectcounter.ID;
    return size;
  }
  SetEdge(edgetype, seledgetype) {
    edgetype.EdgeProfile = seledgetype.Description; edgetype.JobDes = seledgetype.Description;
    edgetype.EdgeProfileID = seledgetype.ID;
    if (edgetype.ID == 0) {
      edgetype.IsPriceChg = edgetype.UnitPrice != seledgetype.Price ? true : false;
      edgetype.UnitPrice = seledgetype.Price;
      edgetype.UnitCost = seledgetype.Cost;
      edgetype.Margin = seledgetype.Margin;
    }
    return edgetype;
  }
  Setsplash(splashtype, selsplashtype) {
    splashtype.Splash = selsplashtype.Description; splashtype.JobDes = selsplashtype.Description;
    splashtype.SplashID = selsplashtype.ID;
    //if (splashtype.ID == 0) {
    splashtype.Height = selsplashtype.Height;
    //}
    return splashtype;
  }
  SetCutout(cuttype, selcuttype) {
    cuttype.Type = selcuttype.Description; cuttype.JobDes = selcuttype.Description;
    cuttype.TypeID = selcuttype.ID;
    if (cuttype.ID == 0) {
      cuttype.IsPriceChg = cuttype.Unitprice != selcuttype.Price ? true : false;
      cuttype.Unitprice = selcuttype.Price;
      cuttype.UnitCost = selcuttype.Cost;
      cuttype.Margin = selcuttype.Margin;
    }
    return cuttype;
  }
  Setsink(sink, productItem) {
    sink.Description = productItem.Description;
    sink.JobDes = productItem.Description;
    sink.ProductDescription = productItem.ProductDescription;
    sink.Type = productItem.Group;
    sink.Make = productItem.Make;
    sink.Model = productItem.Model;
    sink.Qty = 1;
    if (sink.ID == 0) {
      sink.IsPriceChg = sink.Unitprice != productItem.Price ? true : false;
      sink.UnitCost = productItem.Cost;
      sink.Margin = productItem.Margin;
      sink.UnitPrice = productItem.Price;
      sink.Amount = sink.UnitPrice;
    }
    sink.NoOfBowls = productItem.NoOfBowls;
    sink.ShapeID = productItem.CutoutShapeID;
    sink.ProductItemID = productItem.ProductItemID;
    return sink;
  }
  SetFaucet(faucet, productItem) {
    faucet.Description = productItem.Description;
    faucet.JobDes = productItem.Description;
    faucet.ProductDescription = productItem.ProductDescription;
    faucet.Type = productItem.Group;
    faucet.Make = productItem.Make;
    faucet.Model = productItem.Model;
    faucet.Qty = 1;
    if (faucet.ID == 0) {
      faucet.IsPriceChg = faucet.Unitprice != productItem.Price ? true : false;
      faucet.UnitCost = productItem.Cost;
      faucet.Margin = productItem.Margin;
      faucet.UnitPrice = productItem.Price;
      faucet.Amount = faucet.UnitPrice;
    }
    faucet.ProductItemID = productItem.ProductItemID;
    faucet.Show = 0;
    return faucet;
  }
  SetAddon(addon, productItem) {
    addon.Description = productItem.Description;
    addon.JobDes = productItem.Description;
    addon.ProductDescription = productItem.ProductDescription;
    addon.Qty = 1;
    if (addon.ID == 0) {
      addon.IsPriceChg = addon.Unitprice != productItem.Price ? true : false;
      addon.UnitCost = productItem.Cost;
      addon.Margin = productItem.Margin;
      addon.UnitPrice = productItem.Price;
      addon.Amount = addon.UnitPrice;
    }
    addon.ProductItemID = productItem.ProductItemID;
    addon.Show = 0;
    return addon;
  }
  SetTile(tile, productItem) {
    tile.Description = productItem.Description;
    tile.ProductDescription = productItem.ProductDescription;
    tile.JobDes = productItem.Description;
    tile.Make = productItem.Make;
    tile.Model = productItem.Model;
    tile.Qty = 1;
    if (tile.ID == 0) {
      tile.IsPriceChg = tile.Unitprice != productItem.Price ? true : false;
      tile.UnitCost = productItem.Cost;
      tile.Margin = productItem.Margin;
      tile.UnitPrice = productItem.Price;
      tile.Amount = tile.UnitPrice;
    }
    tile.ProductItemID = productItem.ProductItemID;
    tile.Show = 0;
    return tile;
  }
  SetCustItem(custitem, productitem) {
    custitem.Description = productitem.Name; custitem.JobDes = productitem.Name;
    custitem.Qty = 1; custitem.Isactive = 1;
    custitem.Show = 0;
    return custitem;
  }


  //************************************** ITEM CALC *********************************************/
  calcitemamt(qty, price) {
    let amount: any; if (qty != 0 && price != 0) { amount = (qty * price); }
    amount = this.roundToTwo(amount); return amount;
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
