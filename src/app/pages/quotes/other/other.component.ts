import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
  inputs: [`Version`]
})
export class OtherComponent implements OnInit {
  selectedtabtype: number;
  public Version: any;

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {

  }

   //Tab selection Function
   ActionLoadTabInfo(componet: any){
    this.selectedtabtype = componet;
  }
}
