import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { QuoterepService } from 'src/app/service/quoterep.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  fab:any;countertypes: any = [];fablist: any;
  constructor(public Modalcntrl: ModalController, private service: QuoteService, private quoterep: QuoterepService) { }
  ngOnInit() {
    this.GetCounterTypes();
  }
  GetCounterTypes() {
    let typeIdList = []; typeIdList.push(5);
    this.service.QuoteDictionaryLists(typeIdList).subscribe(data => { this.countertypes = data[0]; });
  }
  ActionSetSqft(size, typeid) {
    size.Sqft = this.quoterep.calcsqft(size.Width, size.Height);
    this.ActionSetFabSqft();

  }
  ActionSetFabSqft() {
    const sum = this.fab.MeasureList.reduce((sum, current) => sum + current.Sqft, 0);
    this.fab.PartSqft = sum;
  }
  ActionDelete(index:number){
    this.fab.MeasureList.splice(index, 1);
    this.ActionSetFabSqft();
  }
  ActionSaveMeasurement() {
      this.service.Actionsavepartfabrication(this.fab).subscribe(data => {
        this.fablist = data.FabList.filter(x => x.PartID === this.fab.PartID);
        this.ActionToClose(true);
      })
  }
  ActionAddSize(){
    let size= this.quoterep.AddMeasurementItem();
     this.fab.MeasureList.push(size);
   }
 
  ActionToClose(issave: boolean) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: this.fablist,
      issave: issave
    });
  }

  //get f() { return this.registerForm.controls; }




}
