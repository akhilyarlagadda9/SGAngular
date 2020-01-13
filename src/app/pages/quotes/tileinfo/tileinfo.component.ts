import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-tileinfo',
  templateUrl: './tileinfo.component.html',
  styleUrls: ['./tileinfo.component.scss'],
})
export class TileinfoComponent implements OnInit {
  tile: any;
  itemlist: any = [];
  constructor(private formBuilder: FormBuilder, public Modalcntrl: ModalController, private popoverCntrl: PopoverController, private navParams: NavParams, private quoterep: QuoterepService, private service: QuoteService) { }



  ngOnInit() {
  }


  ActionSetMargin(typeId: number, model: any, type: string) {
    this.tile = this.quoterep.margincalculations(typeId, model, type);
    this.tile.Amount = this.quoterep.calcitemamt(this.tile.Qty, this.tile.UnitPrice);
    this.tile.Amt = this.tile.Amount;
  }
  ActionSetAmount() {
    this.tile.Amount = this.quoterep.calcitemamt(this.tile.Qty, this.tile.UnitPrice);
    this.tile.Amt = this.tile.Amount;
  }
  async ActionSearchSelect(ev: any, typeid, productId) {
    let obj = { searchTypeId: typeid, producttypeId: productId, search: this.tile.Des == undefined ? "" : this.tile.Des }
    const popover = await this.popoverCntrl.create({
      component: AdditionalitemserachComponent,
      event: ev,
      translucent: true,
      componentProps: obj,
      cssClass: "popover_class"
    });
    popover.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        if (detail.data.isselect == true) {
          this.tile = this.quoterep.SetTile(this.tile, detail.data.componentProps);
        }
      }
    });
    return await popover.present();
  }

  ActionToClosePop() {
    this.popoverCntrl.dismiss({
      'dismissed': true
    });
  }

  ActionSaveTile(form: NgForm) {
    if (form.valid) {
      this.service.ActionSaveTile(this.tile).subscribe(data => {
        this.RefreshtileList(data);
      })
    }
  }
  RefreshtileList(data){
    switch (this.tile.TypeID) {
      case 12: this.itemlist = data.TileList.filter(x => x.PartID === this.tile.PartID); break;
      case 13:this.itemlist = data.CabinetList.filter(x => x.PartID === this.tile.PartID); break;
      case 14: this.itemlist = data.CarpetList.filter(x => x.PartID === this.tile.PartID); break;
      case 16:this.itemlist = data.FloorList.filter(x => x.PartID === this.tile.PartID); break;
      case 17:this.itemlist = data.ConsumableList.filter(x => x.PartID === this.tile.PartID); break;
      case 18: this.itemlist = data.ApplianceList.filter(x => x.PartID === this.tile.PartID); break;
      case 19: this.itemlist = data.ToolList.filter(x => x.PartID === this.tile.PartID); break;
    }
    this.ActionCloseTile(true);
  }

  ActionCloseTile(issave: boolean) {
    if (issave == true) {
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: this.itemlist,
        issave: issave
      });
    }
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave
    });
  }
}



