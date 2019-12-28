import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
  inputs: [`Version`]
})
export class OtherComponent implements OnInit {
  selectedtabtype: number;
  public Version: any;
  SinkList: any;
  FaucetList: any;
  ApplianceList: any;
  ConsumableList: any;
  ToolList: any;
  OtherList: any;
  MaterialList: any;

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetMaterialList();
    this.GetSinkList();
    this.GetFaucetList();
    this.GetApplianceList();
    this.GetConsumablesList();
    this.GetToolsList();
    this.GetAddonsList();
  }

   //Tab selection Function
   ActionLoadTabInfo(componet: any){
    this.selectedtabtype = componet;
  }
  //Material List Function
  GetMaterialList() {
    this.getservice.QuotematerialList(this.Version.ID).subscribe(
      data => { this.MaterialList = data; }
    );
  }
  //Sink List Function
  GetSinkList() {
    this.getservice.QuotesinksList(this.Version.ID).subscribe(
      data => { this.SinkList = data; }
    );
  }
 //Faucet List Function
 GetFaucetList() {
  this.getservice.QuotefaucetsList(this.Version.ID).subscribe(
    data => { this.FaucetList = data; }
  );
}
//Appliance List Function
GetApplianceList() {
  this.getservice.QuoteappliancesList(this.Version.ID).subscribe(
    data => { this.ApplianceList = data; }
  );
}
//Consumables List Function
GetConsumablesList() {
  this.getservice.QuoteconsumablesList(this.Version.ID).subscribe(
    data => { this.ConsumableList = data; }
  );
}
//Tool List Function
GetToolsList() {
  this.getservice.QuotetoolsList(this.Version.ID).subscribe(
    data => { this.ToolList = data; }
  );
}
//Tool List Function
GetAddonsList() {
  this.getservice.QuoteaddonsList(this.Version.ID).subscribe(
    data => { this.OtherList = data; }
  );
}


}
