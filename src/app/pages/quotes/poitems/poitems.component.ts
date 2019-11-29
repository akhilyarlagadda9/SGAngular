import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-poitems',
  templateUrl: './poitems.component.html',
  styleUrls: ['./poitems.component.scss'],
})
export class PoitemsComponent implements OnInit {
@Input() public versionId;


  constructor() { }

  ngOnInit() {
console.log(this.versionId );

  }

}
