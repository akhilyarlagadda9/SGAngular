import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arealayout',
  templateUrl: './arealayout.component.html',
  styleUrls: ['./arealayout.component.scss'],
  inputs:[`layoutId`]
})
export class ArealayoutComponent implements OnInit {
public layoutId:number;
  constructor() { }

  ngOnInit() {}

}
