import { Component, OnInit, SimpleChanges,Output, EventEmitter} from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';
declare var _qscope :any;
@Component({
  selector: 'app-areasummary',
  templateUrl: './areasummary.component.html',
  styleUrls: ['./areasummary.component.scss'],
  inputs: [`VersionId`]
})
export class AreasummaryComponent  {
  arealist: any = []; VersionId: any;
  selectedevent="";
  @Output() areaevent = new EventEmitter<any>();
  constructor(private qservice: QuoteService) { }


  ngOnChanges(changes: SimpleChanges) {
    this.ActionAreaList();
}
ActionAreaList(){
  this.qservice.ActionQuoteAreaList(this.VersionId).subscribe(data => { this.arealist = data;
    this.SetDefaultArea();
  })
}
  SetDefaultArea() {
    _qscope.quote.Version.AreaList = this.arealist;
    _qscope.quote.Version.AreaID = 0;
  }

  ActionAreaSelect(areaId) {
    _qscope.quote.Version.AreaID = areaId;
    this.selectedevent = "success"
     this.areaevent.emit( this.selectedevent);
  }
}
