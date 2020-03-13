import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-additionalitemserach',
  templateUrl: './additionalitemserach.component.html',
  styleUrls: ['./additionalitemserach.component.scss'],
})
export class AdditionalitemserachComponent implements OnInit {
  searchobj = this.navParams.data;
  listItems = []; info: any;
  constructor(private getservice: QuotegetService, private modelCntrl: ModalController, private navParams: NavParams, private quoterep: QuoterepService) { }


  ngOnInit() {
    console.log(this.searchobj);
    this.ActionlistItems();
  }



  ActionToClosePop(isselect) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modelCntrl.dismiss({
      'dismissed': true,
      componentProps: this.info,
      isselect: isselect
    });
  }


  ActionSelectItem(Id: any) {
    let info = this.listItems.find(s => s.ID == Id);
    if (info != null && info != undefined) {
      if (this.searchobj.producttypeId == 8) {
        this.info = this.quoterep.Setsink(this.info, info);
      }
      else if (this.searchobj.producttypeId == 9) {
        this.info = this.quoterep.SetFaucet(this.info, info);
      }
      else if (this.searchobj.producttypeId == 11) {
        this.info = this.quoterep.SetAddon(this.info, info);
      }
      else {
        this.info = this.quoterep.SetTile(this.info, info);
      }

      // this.partinfo.CutoutList[index] = this.quoterep.SetCutout(this.partinfo.CutoutList[index], cutout);
    }
    this.ActionToClosePop(true)
  }
  ActionlistItems() {
    this.getservice.qsgetpricelistproductItems(this.searchobj.pricelistId, this.searchobj.producttypeId, this.searchobj.searchTypeId, this.searchobj.search).subscribe(data => {
      this.listItems = data
    });
  }

  ActionPopulateParentInfo(item: any) {
    this.info = item;
    this.ActionToClosePop(true);
  }
}

