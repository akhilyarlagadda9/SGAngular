import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatequoteComponent } from './createquote/createquote.component'
import { QuoteeditComponent } from './quoteedit/quoteedit.component'

import {QuoteService} from 'src/app/service/quote.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  constructor(private service:QuoteService, public Modalcntrl : ModalController) { }

  quotelist: any[] = [];
 // pageindex:number= 0;
  qsearchobj:{
   search: string,statusId: number,index: number,noOfRecords:number,
   accessmode:number,sortTypeId:number,sortby:number
 };
 qprmsobj:{
  quoteid: number,quoteno: string,versionid: number,customerid:number,
  accountid:number,childaccid:number,phaseid:number,viewtypeid:number
};

  ngOnInit() {
    this.ActionQuoteList();
  }

  /***** QUOTELIST-INDEFINITE, SEARCHQUOTE *****/
  ActionQuoteList() {
    // set obj
    this.setquoteobj("", 0, 0, 25);
    this.GetQuoteList();
  }
  ActionSearch(q: string){
    this.setquoteobj(q, 0, 0, 25);
    this.GetQuoteList();
  }
   AtiondoInfinite(event) {
    //this.pageindex = this.pageindex+1;
    this.qsearchobj.index = this.qsearchobj.index+1;
    let obj = this.qsearchobj;
    setTimeout(() => {
      let result = this.service.ActionQuoteList(obj.search,obj.statusId,obj.index,obj.noOfRecords,obj.accessmode,0,obj.sortTypeId,obj.sortby).subscribe(
        data => {
          for(let i=0; i<data.length; i++) {
            this.quotelist.push(data[i]);
          }

        },
        error => console.log(error));
        event.target.complete();
    }, 1);
  }
  setquoteobj(search, statusid, index, noOfRecords){
    this.qsearchobj = {
    search: search,
    statusId: statusid,
    index: index,
    noOfRecords:noOfRecords,
    accessmode:1,
    sortTypeId:0,sortby:0};
   }
 GetQuoteList(){
  let obj = this.qsearchobj;
  //get list from db
 let result = this.service.ActionQuoteList(obj.search,obj.statusId,obj.index,obj.noOfRecords,obj.accessmode,0,obj.sortTypeId,obj.sortby).subscribe(
  data => {
     this.quotelist = data;
  },
  error => console.log(error));
}

/***** QUOTEEDIT *****/
async ActionQuoteEdit(quoteId,quoteno,versionId) {
  this.qprmsobj={
    quoteid: quoteId,quoteno: quoteno,versionid: versionId,customerid:0,
    accountid:0,childaccid:0,phaseid:0,viewtypeid:0
  };
  const modal = await this.Modalcntrl.create({
    component: QuoteeditComponent,
    componentProps: this.qprmsobj,
  });
  return await modal.present();
}

/***** CREATE QUOTE *****/
   async ActionCreateQuote() {
    const modal = await this.Modalcntrl.create({
      component: CreatequoteComponent
    });
    return await modal.present();
  }
 

}





