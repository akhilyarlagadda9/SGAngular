import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'

@Component({
  selector: 'app-qlayout',
  templateUrl: './qlayout.component.html',
  styleUrls: ['./qlayout.component.scss'],
})
export class QlayoutComponent implements OnInit {

  constructor(public Modalcntrl: ModalController,private navParams: NavParams, private service: QuoteService,
  private navCtrl: NavController) { }
 quoteId: number;
 quoteno: string;
 shownGroup = 1;
 qprmsobj = this.navParams.data;
 headerInfo:any;Version:any;
 selectedtabtype:number = 1;
 QuoteVersionID:number = this.qprmsobj.versionid; 

  ngOnInit() {
    this.ActionQuoteInfo();
  }
  ActionGoToHome(){
    this.ActionCloseQuoteInfo();
    this.navCtrl.navigateRoot('/home');
  }
  ActionQuoteInfo(){
    let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid,this.qprmsobj.quoteno,this.qprmsobj.versionid,0,0,0).subscribe(
      data => {
         this.headerInfo = data;
         this.headerInfo.Version = this.headerInfo.VersionList.filter(x => x.ID === this.qprmsobj.versionid)[0];
         this.Version = this.headerInfo.Version;
        },
      error => console.log(error));
  }
  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

}
