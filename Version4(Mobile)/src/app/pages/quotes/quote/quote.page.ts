import { Component, OnInit,Pipe } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CreatequoteComponent } from 'src/app/pages/quotes/createquote/createquote.component'
import { QuoteeditComponent } from 'src/app/pages/quotes/quoteedit/quoteedit.component'

import {QuoteService} from 'src/app/service/quote.service'


@Pipe({
  name: 'filter'
})
@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  constructor(private service:QuoteService, public Modalcntrl : ModalController, private navCtrl : NavController, private loadingController : LoadingController) { }
 
  quotelist: any[] = [];
 // pageindex:number= 0;
  qsearchobj:{
   search: string,statusId: number,index: number,noOfRecords:number,
   accessmode:number,sortTypeId:number,sortby:number,searchmode:number
 };
 qprmsobj:{
  quoteid: number,quoteno: string,versionid: number,customerid:number,
  accountid:number,childaccid:number,phaseid:number,viewtypeid:number,header:any
};



  ngOnInit() {
    this.ActionQuoteList();
  }
  ActionGoToHome(){
    this.navCtrl.navigateRoot('/home');
  }
  /***** QUOTELIST-INDEFINITE, SEARCHQUOTE *****/
  ActionQuoteList() {
    // set obj
    this.setquoteobj("", 0, 0, 25,0);
    this.GetQuoteList(undefined);     
  }
  ActionSearch(q: string){
    this.setquoteobj(q, 0, 0, 25,1);
    this.GetQuoteList(undefined);
  }
   AtiondoInfinite(event) {
    this.qsearchobj.index = this.qsearchobj.index+1;
    this.qsearchobj.searchmode = 0;
    this.GetQuoteList(event);
   
  }
  setquoteobj(search, statusid, index, noOfRecords,searchmode){
    this.qsearchobj = {
    search: search,searchmode:searchmode,
    statusId: statusid,
    index: index,
    noOfRecords:noOfRecords,
    accessmode:1,
    sortTypeId:0,sortby:0};
   }
 GetQuoteList(event){
  let obj = this.qsearchobj;
  //get list from db
 let result = this.service.ActionQuoteList(obj.search,obj.statusId,obj.index,obj.noOfRecords,obj.accessmode,0,obj.sortTypeId,obj.sortby).subscribe(
  data => {this.quotelist = obj.searchmode == 1 ? data : this.quotelist.concat(data);this.hideLoader(); },
  error => console.log(error));
  if(event){
    event.target.complete();
  }
}
async hideLoader() {
  this.loadingController.dismiss();
}
/***** QUOTEEDIT *****/
async ActionQuoteEdit(header) {
  let version = header.VersionList.filter(x => x.ID === header.VersionID)[0];
  //let version = header.VersionList.filter(s => {if(header.VersionID == s.ID){return s;} });
  this.qprmsobj={
    quoteid: header.ID,quoteno: header.QuoteNo,versionid: header.VersionID,customerid:version.CustomerID,
    accountid:version.ParentAccID,childaccid:version.ChildAccID,phaseid:0,viewtypeid:0,header:header
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





