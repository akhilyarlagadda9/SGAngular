import { Component, OnInit, Version } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotepostService } from 'src/app/service/quotepost.service';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-poedit',
  templateUrl: './poedit.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {
  poitem: any;
  index: any;
  ID: any;
  salespersons: any;
  ParentID: number;

  constructor(public Modalcntrl: ModalController, private postservice: QuotepostService, private getservice: QuotegetService) { }
  ngOnInit() {
    this.GetSalesPersonList();
    this.poitem.AttachmentList = this.poitem.AttachmentList == null || this.poitem.AttachmentList == undefined ? [] : this.poitem.AttachmentList;
  }
  GetSalesPersonList() {
    this.getservice.getsalespersons(this.ParentID, 3).subscribe(
      data => { debugger; this.salespersons = data; }
    );
  }

  ActionSavePOItem() {
    this.postservice.ActionSavePoItem(this.poitem).subscribe(data => {
      this.ID = data;
      this.ActionClosePOItem(true);
    })
  }
  ActionClosePOItem(issave) {
    let item = { poitem: this.poitem, index: this.index, ID: this.ID }
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: item,
      issave: issave
    });
  }
  ActionUploadPoAttach(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        let model = { ID: 0, Path: file.name }
        this.poitem.AttachmentList.push(model);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
