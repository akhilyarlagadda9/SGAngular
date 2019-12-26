import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  measure: any;
  constructor(private formBuilder: FormBuilder, public Modalcntrl: ModalController, private postservice : QuotepostService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      add: ['', Validators.required],
    });
  }

  ActionSaveMeasurement(size:any){
  this.submitted = true;
  if (this.registerForm.valid) {
    this.postservice.Actionsavepartfabrication(size).subscribe(data => {
      this.measure = data.TileList;
      this.ActionCloseMeasurement(true);
    })
}
}
  ActionCloseMeasurement(issave:boolean) {
    if(issave == true){
      let sizes = { PartFab : this.measure}
      this.Modalcntrl.dismiss({
        'dismissed': true,
        componentProps: sizes,
        issave: issave
      });
    }else{
      this.Modalcntrl.dismiss({
        'dismissed': true,
        issave: issave
      });
    }
  }

  get f() { return this.registerForm.controls; }




}
