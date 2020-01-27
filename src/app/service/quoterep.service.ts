import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuoterepService {
  header: any;
  constructor() { }
  private _interfacesource = new Subject<any>();
  interface$ = this._interfacesource.asObservable();
  SendInfo(info: any) {
    this._interfacesource.next(info);
  }

  //**************************************ADD ITEMS*********************************************/
  SetInitMaterial(versionId){
    let material = {
      ID: 0, VersionID: versionId, CoID: 0, PriceByID: 0, FinishID: 0, DepthID: 0, UserID: 0, Tax: 0, ProductItemID: 0, ProSubGroupID: 0, DepthTypeID: 0, FinishTypeID: 0, SlabTypeID: 0, SupplierID: 0,Mstep:1,
      Color: '', Finish: '', Depth: '', SlabType: '', ProSubGroup: '', TaxVal: 0, Cost: 0, CostDiscount: 0, UnitCost: 0, UnitPrice: 0, Margin: 0, Sqft: 0, DeliveryFee: 0, SupplierName: '', SlabList: [], SearchChkFlag: 1,
      WF:'',RiskLevelID : 0, RiskLevel :'', RiskLevels: "",
  }; return material;
  }
  AddPartMatItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let partmat: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, Tax: matcent, ID: Number, IsChgFlag: 1, ParentID: Number,
      SaveFlag: 1, Isactive: 1, IsActive: 1, JobQty: Number, IsOptional: Number, MaterialID: Number,
      PriceByID: Number, SelfPriceBy: Number, Margin: 0, Sqft: 0, Qty: 0,
      WF: 0, DiscAmt: 0, IsPrint: 1, IsChg: 0, LaborTaxVal: Number,
      LaborUnitCost: 0, LaborMargin: 0, LaborUnitPrice: 0, Amount: 0, Amt: 0, UnitPrice: 0,UnitCost: 0,

    }
    return partmat;
  }
  AddEdgeItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number) {
    let edge: any = {
      PartID: partId, AreaID: areaId, VersionID: verId, CoID: coId, CoSrNo: coSrno, Tax: matcent, ID: 0, IsChgFlag: 1, ParentID: Number,
      SaveFlag: 1, Isactive: 1, IsActive: 1, JobQty: Number, IsOptional: Number,
      EdgeProfileID: Number, EdgeProfile: Number, Description: 'Finished Edge', DiscAmt: 0, IsPrint: 1, IsChg: 0,
      Inches: Number, LF: 0, UnitPrice: 0, Margin: 0, UnitCost: 0, Amount: 0,Amt: 0
    }
    return edge;
  }
  AddCutoutItem(partId: number, areaId: number, verId: number, coId: number, coSrno: string, matcent: number, loadId: number) {
    let cutout: any = {
      JobDes: '', JobQty: 1,
      AreaID:areaId, VersionID: verId,PartID:partId, CoID: 0, CoSrNo: 0, ID: 0, IsChgFlag: 1, ParentID: 0, SaveFlag: 1, LF: 1, IsPrint: 1, SrNo: 0, ProductItemID: 0,
      Unitprice: 0, IsOptional: 0, Tax: 0, Isactive: 1, CutOutTypeID: loadId, DiscAmt: 0, IsChg: 0, IsDefault: 1, Amt: 0, ShapeID: 0, SIndex: 0,
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
      IsOptional: 0, DiscAmt: 0, PartSqft: 0, WF: 0, MaterialID: 0, MeasureList: [], IsChg: 0, Isactive: 1, LaborUnitPrice: 0, UnitCost: 0,Amount:0,
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
    partmat.UnitPrice = price;
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
    splashtype.Splash = selsplashtype.Description; 
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
      cuttype.Amt = selcuttype.Price;
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
  getdefaultrisklevelprice1(pricebook, typeid) {
    let obj = { cost: 0, margin: 0, price: 0 };
    if (pricebook != undefined && pricebook != null) {
      let risklevels = pricebook.RisklevelValues;
        if (typeof (risklevels) == 'string') { risklevels = JSON.parse(pricebook.RisklevelValues); }
        let RiskLevelID = pricebook.IsDefaultRiskLevel == 3 ? 79 : pricebook.IsDefaultRiskLevel == 2 ? 78 : 77;
        if (risklevels != null && risklevels != "null" && risklevels != "") {
            if (RiskLevelID == 77) {//low           
                this.setfabdefaultLowcost(obj, risklevels, typeid);
            } else if (RiskLevelID == 78) {//medium
              this.setfabdefaultMedcost(obj, risklevels, typeid);
            } else if (RiskLevelID == 79) {//high
              this.setfabdefaultHighcost(obj, risklevels, typeid);
            }
        }
    }
    return obj;
}
 setfabdefaultLowcost(obj, risklevels, typeid) {
  obj.cost = typeid == 0 ? risklevels.LowFabCost : typeid == 1 ? risklevels.LowTempCost : risklevels.LowInstallCost;
  obj.margin = typeid == 0 ? risklevels.LowFabMargin : typeid == 1 ? risklevels.LowTempMargin : risklevels.LowInstallMargin;
  obj.price = typeid == 0 ? this.roundToTwo(risklevels.LowFabPrice) : typeid == 1 ? this.roundToTwo(risklevels.LowTempPrice) : this.roundToTwo(risklevels.LowInstallPrice);
}
 setfabdefaultMedcost(obj, risklevels, typeid) {
  obj.cost = typeid == 0 ? risklevels.MedFabCost : typeid == 1 ? risklevels.MedTempCost : risklevels.MedInstallCost;
  obj.margin = typeid == 0 ? risklevels.MedFabMargin : typeid == 1 ? risklevels.MedTempMargin : risklevels.MedInstallMargin;
  obj.price = typeid == 0 ? this.roundToTwo(risklevels.MedFabPrice) : typeid == 1 ? this.roundToTwo(risklevels.MedTempPrice) : this.roundToTwo(risklevels.MedInstallPrice);
}
 setfabdefaultHighcost(obj, risklevels, typeid) {
  obj.cost = typeid == 0 ? risklevels.HighFabCost : typeid == 1 ? risklevels.HighTempCost : risklevels.HighInstallCost;
  obj.margin = typeid == 0 ? risklevels.HighFabMargin : typeid == 1 ? risklevels.HighTempMargin : risklevels.HighInstallMargin;
  obj.price = typeid == 0 ? this.roundToTwo(risklevels.HighFabPrice) : typeid == 1 ? this.roundToTwo(risklevels.HighTempPrice) : this.roundToTwo(risklevels.HighInstallPrice);
}
  //************************************** ITEM CALC *********************************************/
  calcitemamt(qty, price) {
    let amount: number = 0; if (qty != 0 && price != 0) { amount = (qty * price); }
    amount = this.roundToTwo(amount); 
    return amount;
  }
  calcsqft(w: number, h: number) {
    let sqft = 0;
    if (w != 0 && h != 0) { sqft = this.roundToTwo((w * h) / 144); } return sqft;
  }
  calcslabsqft(slab) {
    let slabsqft = 0; if (slab.Sqft != 0) { slabsqft += this.roundToTwo(slab.Sqft * slab.NoOfSlabs); } return this.roundToTwo(slabsqft);
  }
  calcsqftwithwastefactor(sqft, wf) {
    let sqftwf = sqft; if (sqft != 0 && wf != 0) { sqftwf = Number(this.roundToTwo(sqft + (sqft * (wf / 100)))); } return sqftwf;
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
    return Number(Math.round(num * 1e2) / 1e2);
  }
  roundSqft(sqft: number) {
    return Math.sqrt(sqft);
  }



/************MATERIAL SEARCH & POPULATION **************/
  popultaesearchiteminfo(material, subproductgroups, productItem) {
    material.ProductType = productItem.SlabType;
    material.DepthID = productItem.ThicknessID == 0 ? 24 : productItem.ThicknessID;
    material.FinishID = productItem.FinishID == 0 ? 23 : productItem.FinishID;
    material.Depth = productItem.ThicknessID == 0 ? "3 CM" : productItem.Thickness;
    material.Finish = productItem.FinishID == 0 ? "Polished" : productItem.Finish;
    material.SupplierID = productItem.SupplierID;
    material.SupplierName = productItem.SupplierName;
    material.ItemNO = productItem.ItemNO;
    material.StoneType = productItem.StoneType;
    material.SlabTypeID = productItem.SlabTypeID == 0 ? 75 : productItem.SlabTypeID;
    material.SlabType = productItem.SlabTypeID == 0 ? "Slab" : productItem.SlabType;
    material.RiskLevelID = productItem.RiskLevelID == 0 ? 77 : productItem.RiskLevelID;
    material.RiskLevel = material.RiskLevelID == 77 ? "LOW" : material.RiskLevelID == 78 ? "MEDIUM" : material.RiskLevelID == 79 ? "HIGH" : "LOW";
    if (material.ID == 0) {        
        material.UnitCost = productItem.Cost; material.Cost = productItem.Cost;
        material.UnitPrice = productItem.Price;
       //material.Margin = productItem.Margin;
        material.TaxVal = productItem.Tax;
        if (productItem.Margin == 0 && material.Margin != 0) {
          this.margincalculations(2, material, 'mat');
        } else {
            material.Margin = productItem.Margin;
        }
        if (productItem.WF != 0) { material.WF = productItem.WF; }
        //material.PriceByID = productItem.PriceByTypeID == 1 ? 2 : productItem.PriceByTypeID;
        material.PriceByID = productItem.PriceByTypeID;
        if (material.ID == 0) {
            this.preparefabrisklevels(material);
        }
    } 
    material.Cost = material.Cost != 0 ? Number(material.Cost).toFixed(2) : material.Cost;
    material.UnitCost = material.UnitCost != 0 ? Number(material.UnitCost).toFixed(2) : material.UnitCost;
    material.UnitPrice = material.UnitPrice != 0 ? Number(material.UnitPrice).toFixed(2) : material.UnitPrice;
    material.Margin = material.Margin != 0 ? Number(material.Margin).toFixed(2) : material.Margin;
    material.TaxVal = material.TaxVal != 0 ? Number(material.TaxVal).toFixed(2) : material.TaxVal;
    material.MinPrice = productItem.MinPrice;
    material.MaxPrice = productItem.MaxPrice;
    material.DeliveryFee = productItem.DeliveryFee;
    material.Color = productItem.Description;
    material.ProductItemID = productItem.ProductItemID;
    material.PriceGroupID = productItem.GroupID;
    this.populateSlabSizes(material.SlabList, productItem);  
    this.productselection(material, subproductgroups, productItem.ProSubGroupID);
    this.calcmaterialwasteamt(material);
    return material;
}

preparefabrisklevels(material) {
  let cost = 0, margin = 0, price = 0;
  if (material.RiskLevels != null) {
      if (material.RiskLevelID == 77) {//low
          cost += material.RiskLevels.LowTempCost + material.RiskLevels.LowFabCost + material.RiskLevels.LowInstallCost;
          margin += material.RiskLevels.LowTempMargin + material.RiskLevels.LowFabMargin + material.RiskLevels.LowInstallMargin;
          price += this.roundToTwo(material.RiskLevels.LowTempPrice) + this.roundToTwo(material.RiskLevels.LowFabPrice) + this.roundToTwo(material.RiskLevels.LowInstallPrice);
      } else if (material.RiskLevelID == 78) {//medium
          cost += material.RiskLevels.MedTempCost + material.RiskLevels.MedFabCost + material.RiskLevels.MedInstallCost;
          margin += material.RiskLevels.MedTempMargin + material.RiskLevels.MedFabMargin + material.RiskLevels.MedInstallMargin;
          price += this.roundToTwo(material.RiskLevels.MedTempPrice) + this.roundToTwo(material.RiskLevels.MedFabPrice) + this.roundToTwo(material.RiskLevels.MedInstallPrice);
      } else if (material.RiskLevelID == 79) {//high
          cost += material.RiskLevels.HighTempCost + material.RiskLevels.HighFabCost + material.RiskLevels.HighInstallCost;
          margin += material.RiskLevels.HighTempMargin + material.RiskLevels.HighFabMargin + material.RiskLevels.HighInstallMargin;
          price += this.roundToTwo(material.RiskLevels.HighTempPrice) + this.roundToTwo(material.RiskLevels.HighFabPrice) + this.roundToTwo(material.RiskLevels.HighInstallPrice);
      }
  }
  material.LaborUnitCost = cost;
  material.LaborMargin = margin;
  material.LaborUnitPrice = price;
  return material;
}
populateSlabSizes(slabs, productItem) {
  for (let i = 0; i < slabs.length; i++) {
      let item = slabs[i];
      if (item.Width == 0 || item.Width == undefined) { item.Width = productItem.Width; }
      if (item.Length == 0 || item.Length == undefined) { item.Length = productItem.Height; }
      item.Sqft = this.calcsqft(item.Width, item.Length);
  }
}
productselection(materialobj, subproductgroups, id) {
  if (materialobj != undefined && subproductgroups != undefined && subproductgroups != null) {
      var selectedIndex = subproductgroups.map(function (obj) { return obj.ID; }).indexOf(parseInt(id));
      let productsubgroup = selectedIndex != -1 ? subproductgroups[selectedIndex] : 0;
      materialobj.ProSubGroup = productsubgroup;
      materialobj.ProSubGroupID = productsubgroup.ID;
  }
  return materialobj;
}
calcmaterialwasteamt(material){
  let slabobj = this.calcslabstotalsqft(material.SlabList);
    material.SlabSqft = slabobj.slabsqft;
    material.totalslabno = slabobj.slabcount;
    let finishedwfsqft = this.calcsqftwithwastefactor(material.Sqft, material.WF);
    let finishedwasteamt = this.roundToTwo((material.SlabSqft - finishedwfsqft) * material.UnitPrice);
    material.finishedamt = this.roundToTwo(finishedwfsqft * material.UnitPrice);
    material.finishedwasteamt =this. roundToTwo(finishedwasteamt);
    material.totalslbAmt = this.roundToTwo(material.SlabSqft * material.UnitPrice)
    material.totalslbSf = material.SlabSqft;
    return material;
}
calcslabstotalsqft(slabs) {
  let itemobj = { slabsqft: 0, slabcount: 0 };
  if (slabs != null) {
      let sf = 0, count = 0;
      for (let i = 0; i < slabs.length; i++) { sf += this.calcslabsqft(slabs[i]); count += Number(slabs[i].NoOfSlabs); }
      itemobj.slabsqft = sf; itemobj.slabcount = count;
  }
  return itemobj;
}

/************************************ACTION CONTROLLER**********************************************/
approvechecklist(data) {
  let alertobj = { alert: false };
  let checklists = JSON.parse(data.header.Version.JobScope);
  if (checklists != null) {
    this.checkheaderinfo(this.header, checklists, alertobj);
    this.checkareasinfo(this.header.Version.AreaList, checklists, alertobj);
  }
  return alertobj.alert;
}
checkheaderinfo(header, checklists, alertobj) {
  for (let i = 0; i < checklists.length; i++) {
      let scopeobj = checklists[i];
      if (scopeobj.IsCheck == 1) {
          if (scopeobj.TypeID == 0) { this.checkjobinfo(header, scopeobj, alertobj); }
          else if (scopeobj.TypeID == 1) { this.checkjobcontactinfo(header.QuoteContacts, scopeobj, alertobj); }
      }
  }
}
checkjobinfo(header, scopeobj, alertobj) {
  let scopedesc = ''; header.CheckFlag = false;
  if (scopeobj.AddressIsCheck == 1) { if (header.Address1 == null || header.Address1 == '') { header.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Address" } }
  if (scopeobj.Address2IsCheck == 1) { if (header.Address2 == null || header.Address2 == '') { header.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Address2" } }
  if (scopeobj.CityIsCheck == 1) { if (header.City == null || header.City == '') { header.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No City" } }
  if (scopeobj.StateIsCheck == 1) { if (header.State == null || header.State == '') { header.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No State" } }
  if (scopeobj.ZipcodeIsCheck == 1) { if (header.Zipcode == null || header.Zipcode == '') { header.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Zipcode" } }
  header.scopedescription = scopedesc;
}
checkjobcontactinfo(contacts, scopeobj, alertobj) {
  if (contacts != null) {
      for (let i = 0; i < contacts.length; i++) {
          let scopedesc = ''; contacts[i].CheckFlag = false;
          if (scopeobj.NameIsCheck == 1) { if (contacts[i].Name == null || contacts[i].Name == '') { contacts[i].CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Name" } }
          if (scopeobj.TitleIsCheck == 1) { if (contacts[i].Title == null || contacts[i].Title == '') { contacts[i].CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Title" } }
          if (scopeobj.PhoneIsCheck == 1) { if (contacts[i].Phone == null || contacts[i].Phone == '') { contacts[i].CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Phone No" } }
          if (scopeobj.FaxIsCheck == 1) { if (contacts[i].Fax == null || contacts[i].Fax == '') { contacts[i].CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Fax" } }
          if (scopeobj.EmailIsCheck == 1) { if (contacts[i].Email == null || contacts[i].Email == '') { contacts[i].CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Email" } }
          contacts[i].scopedescription = scopedesc;
      }
  }
}
checkareasinfo(areas, checklists, alertobj) {
  for (let i = 0; i < areas.length; i++) {
      let area = areas[i];
      if (area.PartList == null || area.PartList.length == 0) {
          alertobj.alert = true;
      } else {
          this.checkareainfo(area, checklists, alertobj);
      }       
  }
}
checkareainfo(area, checklists, alertobj) {
  for (let i = 0; i < checklists.length; i++) {
      let scopeobj = checklists[i];
      if (scopeobj.IsCheck == 1 && scopeobj.TypeID > 1) {
          if (scopeobj.IsCheck == 1 && scopeobj.TypeID == 2) { this.areachecklist(area, scopeobj, alertobj) }
          this.partchecklist(area.PartList, scopeobj, alertobj);
      }
  }
}
areachecklist(area, scopeobj, alertobj) {
  let scopedesc = ''; area.CheckFlag = false;
  if (scopeobj.DefaultNameIsCheck == 1) { if (area.Name == "Area1" || area.Name == null) { area.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " - No Area Name" } }
  if (scopeobj.NoofUnitsIsCheck == 1) { if (area.NoOfUnits == 0) { area.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No # of Units" } }
  area.scopedescription = scopedesc;
}
partchecklist(partlist, scopeobj, alertobj) {
  for (var i = 0; i < partlist.length; i++) {
      if (scopeobj.TypeID == 3) { this.partitemscheck(partlist[i].PartMaterialList, 8, scopeobj, alertobj); }
      if (scopeobj.TypeID == 4) { this.partitemscheck(partlist[i].PartFabList, 1, scopeobj, alertobj); }
      if (scopeobj.TypeID == 5) { this.partitemscheck(partlist[i].SplashList, 2, scopeobj, alertobj); }
      if (scopeobj.TypeID == 6) { this.partitemscheck(partlist[i].EdgeList, 3, scopeobj, alertobj); }
      if (scopeobj.TypeID == 7) { this.partitemscheck(partlist[i].CutoutList, 4, scopeobj, alertobj); }
      if (scopeobj.TypeID == 8) { this.partitemscheck(partlist[i].SinkList, 5, scopeobj, alertobj); }
      if (scopeobj.TypeID == 9) { this.partitemscheck(partlist[i].FaucetList, 6, scopeobj, alertobj); }
      if (scopeobj.TypeID == 10) { this.partitemscheck(partlist[i].ApplianceList, 7, scopeobj, alertobj); }
  }
}
partitemscheck(itemlist, typeId, scopeobj, alertobj) {
  if (itemlist.length > 0) {
      for (var i = 0; i < itemlist.length; i++) {
          this.itemcheck(itemlist[i], typeId, scopeobj, alertobj);
      }
  } else {
      alertobj.alert = true;
  }
}
itemcheck(item, typeId, scopeobj, alertobj) {
  switch (typeId) {
      case 1: //Fab  
      this.validatepartfabscope(item, typeId, scopeobj, alertobj);
          break;
      case 2: //Splash
      this.validatepartsplashscope(item, typeId, scopeobj, alertobj);
          break;
      case 3: //Edge
      this.validatepartedgescope(item, typeId, scopeobj, alertobj);
          break;
      case 4: //Cutout
      this.validatepartcutoutscope(item, typeId, scopeobj, alertobj);
          break;
      case 5: //Sink
      this.validatepartsinkscope(item, typeId, scopeobj, alertobj);
          break;
      case 6: case 7://Faucet & Appliance
      this.validatepartfaucetscope(item, typeId, scopeobj, alertobj);
          break;
      case 8://Material
      this.validatepartmaterialscope(item, typeId, scopeobj, alertobj);
          break;
  }
}
validatepartmaterialscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.ProductItemIsCheck == 1) {
      if (item.ProSubGroupID == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Sub Group" }
  }
  if (scopeobj.DepthIsCheck == 1) {
      if (item.DepthID == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Depth" }
  }
  if (scopeobj.FinishIsCheck == 1) {
      if (item.FinishID == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Finish" }
  }
  if (scopeobj.ColorIsCheck == 1) {
      if (item.MaterialName == '' || item.MaterialName == null) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Depth" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.UnitPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.SupplierIsCheck == 1) {
      if (item.SupplierID == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Supplier" }
  }
  if (scopeobj.SlabTypeIsCheck == 1) {
      if (item.SlabTypeID == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Slab Type" }
  }
  if (scopeobj.PriceBySFIsCheck == 1) { //0-Sqft; 1-Slab; 2-Wgt.Avg.Sqft
      if (item.PriceByID != 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Price By SqFt" }
  }  
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.WFIsCheck == 1) {
      if (item.WF == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Waste Factor" }
  }
  item.scopedescription = scopedesc;
}
validatepartfabscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.FabSqftIsCheck == 1) {
      if (item.PartSqft == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Sqft" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.LaborUnitPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}
validatepartsplashscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.NameIsCheck == 1) {
      if (item.Splash == '' || item.Splash == null) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Splash" }
  }
  if (scopeobj.HeightIsCheck == 1) {
      if (item.Height == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Height" }
  }
  if (scopeobj.SplashSqftIsCheck == 1) {
      if (item.Sqft == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Sqft" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.SFPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}
validatepartedgescope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.DescriptionIsCheck == 1) {
      if (item.EdgeProfile == '' || item.EdgeProfile == null) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Edge" }
  }
  if (scopeobj.EdgeLnftIsCheck == 1) {
      if (item.LF == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Lnft" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.UnitPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}
validatepartcutoutscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.DescriptionIsCheck == 1) {
      if (item.Type == '' || item.Type == null) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Cut Out" }
  }
  if (scopeobj.CutoutLnftIsCheck == 1) {
      if (item.LF == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Lnft" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.Unitprice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}
validatepartsinkscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.ProductIsCheck == 1) {
      if (item.Description == null || item.Description == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Sink" }
  }
  if (scopeobj.QtyIsCheck == 1) {
      if (item.Qty == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Qty" }
  }
  if (scopeobj.MakeIsCheck == 1) {
      if (item.Make == null || item.Make == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Make" }
  }
  if (scopeobj.ModelIsCheck == 1) {
      if (item.Model == null || item.Model == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Model" }
  }
  if (scopeobj.CustomerSupplyIsCheck == 1) {
      if (item.IsSupply == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Customer Supply: No" }
  }
  if (scopeobj.IsAtShopIsCheck == 1) {
      if (item.IsAtShop == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Sink is at shop: No" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.UnitPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}
validatepartfaucetscope(item, typeId, scopeobj, alertobj) {
  let scopedesc = ''; item.CheckFlag = false;
  if (scopeobj.ProductIsCheck == 1) {
      if (item.Description == null || item.Description == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Faucet" }
  }
  if (scopeobj.QtyIsCheck == 1) {
      if (item.Qty == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Qty" }
  }
  if (scopeobj.MakeIsCheck == 1) {
      if (item.Make == null || item.Make == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Make" }
  }
  if (scopeobj.ModelIsCheck == 1) {
      if (item.Model == null || item.Model == '') { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Model" }
  }
  if (scopeobj.NoofHolesIsCheck == 1 && typeId == 6) {
      if (item.NoOfHoles == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No of Holes: No" }
  }
  if (scopeobj.PriceIsCheck == 1) {
      if (item.UnitPrice == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Price" }
  }
  if (scopeobj.TaxIsCheck == 1) {
      if (item.Tax == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , No Tax" }
  }
  if (scopeobj.OptIsCheck == 1) {
      if (item.IsOptional == 0) { item.CheckFlag = true; alertobj.alert = true; scopedesc = scopedesc + " , Not Optional" }
  }
  item.scopedescription = scopedesc;
}


}
