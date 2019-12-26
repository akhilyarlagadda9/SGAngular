import { Component, OnInit,Input } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service'
import { NumberValueAccessor } from '@angular/forms';

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
 selectedtabtype: Number= 1;
 qprmsobj = this.navParams.data;
 headerInfo:any;Version:any;
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
         console.log(this.headerInfo);
        },
      error => console.log(error));
  }
  ActionCloseQuoteInfo() {
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = 0;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  ActionQuickLoad(componet: any) {
    this.selectedtabtype = componet;
  }
}
