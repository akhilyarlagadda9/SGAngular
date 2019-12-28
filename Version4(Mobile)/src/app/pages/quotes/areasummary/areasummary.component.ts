import { Component, OnInit} from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';
declare var _qscope :any;
@Component({
  selector: 'app-areasummary',
  templateUrl: './areasummary.component.html',
  styleUrls: ['./areasummary.component.scss'],
  inputs: [`VersionId`]
})
export class AreasummaryComponent implements OnInit {
  arealist: any = []; VersionId: any;
  areas={
    arealist:[],areaId:0
  }
 // @Output() areaevent = new EventEmitter<any>();
  constructor(private qservice: QuoteService) { }

  ngOnInit() {
    this.qservice.ActionQuoteAreaList(this.VersionId).subscribe(data => { this.arealist = data;
      this.ActionAreaSelect(0);
    })
  }


  ActionAreaSelect(areaId) {
    _qscope.quote.Version.AreaList = this.arealist;
    _qscope.quote.Version.AreaID = areaId;
    // this.areas ={arealist:this.arealist,areaId:areaId };
    // this.areaevent.emit(this.areas);
  }
}
