import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuoteService } from 'src/app/service/quote.service';
import { AuthService } from 'src/app/service/auth.service';

declare var _qscope;

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss'],
})
export class AddareaComponent implements OnInit {
  Version: any; quote: any; userId: number;
  areas: any
  areasaveStatus: string;
  selectedareaId: any;
  arealists: any = [];
  resultareas: any;
  constructor(public Modalcntrl: ModalController, private service: QuoteService, private authService: AuthService) { }
  ngOnInit() {
    this.authService.GetStoredLoginUserID().then((resultId) => { this.userId = resultId; });
  }
  ActionAddArea() {
    let jobTypeId = 0
    var ids = this.Version.JobTypeID != null ? this.Version.JobTypeID.split(',') : 0;
    if (ids != 0) { jobTypeId = ids[0]; }
    let newarea = {
      ID: 0, VersionID: this.Version.ID, Isactive: 1, IsPriceGrp: 1, NoOfUnits: 1, JobTypeID: jobTypeId, CoID: this.Version.LatestCoID,
      PhaseID: 0, PhaseCode: 0,
    };
    this.arealists.push(newarea);
  }
  ActionSaveBatchAreas() {
    this.checkactivieareas();
    // ischkareas = ischkareas == undefined ? true :ischkareas;
    //if (ischkareas) {
    let areaId = this.selectedareaId;
    //let unitschgareaIds = this.getunitschangedareas(this.arealists);
    this.service.ActionSaveAreaList(this.Version.ID, areaId, this.userId, this.arealists).subscribe(data => {
      this.service.ActionGetQuoteAreas(this.Version.ID, 0).subscribe(results => {
      this.resultareas = results;
        _qscope.quote.Version.AreaList = this.resultareas;
        let currentareas = _qscope.quote.Version.AreaList;
        //this.preapreareas(currentareas, resultareas);
        //this.preapreareas(this.Version.VersionAreaList, resultareas);
        //_qscope.quote.Version.AreaList = currentareas;
        this.ActionCloseAddArea(true);
        //this.saveareasummary(unitschgareaIds, versionid, userId);
      });
    });
  }

  getunitschangedareas(areas) {
    let areaids = '', allareaids = '', ischk = false;
    for (let i = 0; i < areas.length; i++) {
      if (areas[i].UnitChg == 1) {//no of units changes
        areaids += areas[i].ID + ',';
      }
      if (areas[i].IsActiveChg == true) { ischk = true; }
      allareaids += areas[i].ID + ',';
    }
    if (ischk) {
      areaids = allareaids;
    }
    return areaids;
  }
  checkactivieareas() {
    for (let i = 0; i < this.arealists.length; i++) {
      let area = this.arealists[i];
      if (area.JsonMaterial != undefined && area.JsonMaterial != null && typeof (area.JsonMaterial) == 'object') { area.JsonMaterial = JSON.stringify(area.JsonMaterial); }
    }
  }
  preapreareas(currentareas, resultareas) {
    for (let i = 0; i < resultareas.length; i++) {
      let valid = this.resetsetarea(currentareas, resultareas[i]);
      if (!valid) {
        currentareas.push(resultareas[i]);
      }
    }
  }
  resetsetarea(currentareas, area) {
    let valid = false;
    for (let i = 0; i < currentareas.length; i++) {
      if (currentareas[i].ID == area.ID) {
        currentareas[i].Name = area.Name;
        currentareas[i].NoOfUnits = area.NoOfUnits;
        currentareas[i].SrNo = area.SrNo;
        return true;
      }
    }
    return valid;
  }
  ActionCloseAddArea(issave) {
    let areas = {arealists:this.resultareas}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps: areas,
      issave: issave
    });
  }

}
