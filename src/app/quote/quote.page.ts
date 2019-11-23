import { Component, OnInit } from '@angular/core';
import {QuoteService} from 'src/app/service/quote.service'

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {
  quotelist: any[] = [];
  pageindex:number= 0;
  qsearchobj:{
   search: string,statusId: number,index: number,noOfRecords:number,
   accessmode:number,sortTypeId:number,sortby:number
 };
  constructor(private service:QuoteService) { }

  ngOnInit() {
    this.ActionQuoteList();
  }
  ActionQuoteList() {
    // set obj
    this.setquoteobj("", 0, 0, 25);
    let obj = this.qsearchobj;
    //get list from db
   let result = this.service.ActionQuoteList(obj.search,obj.statusId,obj.index,obj.noOfRecords,obj.accessmode,0,obj.sortTypeId,obj.sortby).subscribe(
    data => {
       this.quotelist = data;
    },
    error => console.log(error));
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

}
