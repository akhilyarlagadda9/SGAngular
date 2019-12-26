import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-areasummary',
  templateUrl: './areasummary.component.html',
  styleUrls: ['./areasummary.component.scss'],
  inputs: [`VersionId`]
})
export class AreasummaryComponent implements OnInit {
  arealist: any = []; VersionId: any;
  constructor(private qservice: QuoteService) { }

  ngOnInit() {
    this.qservice.ActionQuoteAreaList(this.VersionId).subscribe(data => { this.arealist = data })
  }

}
