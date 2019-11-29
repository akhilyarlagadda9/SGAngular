import { Component, OnInit } from '@angular/core';

import { QuoteService } from 'src/app/service/quote.service'

@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.scss'],
})
export class HeaderinfoComponent implements OnInit  {
  constructor(private service: QuoteService) { }
  
  ngOnInit () { }

}
