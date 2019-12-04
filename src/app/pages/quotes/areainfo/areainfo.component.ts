import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.scss'],
})
export class AreainfoComponent implements OnInit {
  arealist : any[] = [{id:1,name: 'Area1'},{id:2,name: 'Area2'},{id:3,name: 'Area3'},{id:4,name: 'Area4'},{id:5,name: 'Area5'} ];
  partlist : any[] = [{id:1,name: 'Part1'},{id:2,name: 'Part2'},{id:3,name: 'Part3'},{id:4,name: 'Part4'},{id:5,name: 'Part5'} ];
  constructor() { }
  AreaName:any = this.partlist;
  PartName:any = this.partlist;
  ngOnInit() {
    this.MyDefaultYearIdValue = "1" ;
    this.compareWith = this.compareWithFn;
  }
  /// In declarations : 

compareWith : any ;
MyDefaultYearIdValue : string ;

///// In functions declaration zone

compareWithFn(o1, o2) {
  return o1 === o2;
};


}