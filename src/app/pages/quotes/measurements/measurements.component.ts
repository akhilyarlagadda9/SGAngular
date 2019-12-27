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
  registerForm: FormGroup; fab: any;
  submitted = false;
  fablist: any;
  countertypes: any = [];
  constructor(private formBuilder: FormBuilder, public Modalcntrl: ModalController, private qservice: QuoteService, private quoterep: QuoterepService) { }
  ngOnInit() {
    this.GetCounterTypes();
  }
  GetCounterTypes() {
    let typeIdList = []; typeIdList.push(5);
    this.qservice.QuoteDictionaryLists(typeIdList).subscribe(data => { this.countertypes = data[0]; });
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
  ActionSaveMeasurement(fab: any) {
    this.submitted = true;
    //if (this.registerForm.valid) {
      this.qservice.Actionsavepartfabrication(fab).subscribe(data => {
        //this.fablist = data.TileList;
        this.ActionToClose(false);
      })
    //}

  }
  ActionToClose(issave: boolean) {
    let sizes = { PartFab: this.fablist }
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: sizes,
      issave: issave
    });
  }

  get f() { return this.registerForm.controls; }




}
