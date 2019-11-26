import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import {QuoteService} from 'src/app/service/quote.service'
@Component({
  selector: 'app-quoteedit',
  templateUrl: './quoteedit.component.html',
  styleUrls: ['./quoteedit.component.scss'],
})
export class QuoteeditComponent implements OnInit {
  quoteId:number;
  quoteno:string;
  qprmsobj = this.navParams.data;
  header:any;
  constructor(public Modalcntrl : ModalController,private navParams: NavParams,private service:QuoteService, ) { }

  ngOnInit() {
    debugger;
    this.ActionQuoteInfo();
    this.ActionAreaList();
  }

ActionQuoteInfo(){
  let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid,this.qprmsobj.quoteno,this.qprmsobj.versionid,0,0,0).subscribe(
    data => {
       this.header = data;
    },
    error => console.log(error));
}
ActionAreaList(){
  let result = this.service.ActionAreaList(this.qprmsobj.quoteid,this.qprmsobj.versionid,0).subscribe(
    data => {
       this.header.Version = data;
    },
    error => console.log(error));
}
  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
}
