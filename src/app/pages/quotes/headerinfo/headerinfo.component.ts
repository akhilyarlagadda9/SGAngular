import { Component, OnInit,Input  } from '@angular/core';

import { QuoteService } from 'src/app/service/quote.service'
import { QuoteeditComponent } from '../quoteedit/quoteedit.component';

@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.scss'],
})
export class HeaderinfoComponent implements OnInit  {
  @Input() public hesderQuoteNo;
  constructor(private service: QuoteService) { }
  
  ngOnInit () {
    debugger;
  }
  ActionQuoteInfo() {
    // let result = this.service.ActionQuoteInfo(this.qprmsobj.quoteid, this.qprmsobj.quoteno, this.qprmsobj.versionid, 0, 0, 0).subscribe(
    //   data => {
    //     this.header = data;
    //   },
    //   error => console.log(error));
  }

}
