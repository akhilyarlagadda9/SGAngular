import { Component, OnInit } from '@angular/core';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { QuotegetService } from 'src/app/service/quoteget.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  inputs: [`VersionId`,`PhaseId`]
})
export class ActivitiesComponent implements OnInit {
  VersionId: any;
  PhaseId: any;
  ActivitiesList: any;

  constructor(public Modalcntrl : ModalController,private getservice: QuotegetService) { }

  ngOnInit() {
    this.GetActivitiesList();
  }
 //Activites List Function
  GetActivitiesList() {
    this.getservice.QuoteactivitiesList(this.VersionId,this.PhaseId).subscribe(
      data => { this.ActivitiesList = data; }
    );
  }


}
