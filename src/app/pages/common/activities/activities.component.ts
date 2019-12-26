import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  inputs: [`VersionId`,`PhaseId`]
})
export class ActivitiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
