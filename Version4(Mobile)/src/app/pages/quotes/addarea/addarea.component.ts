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
  Version: any;quote : any;userId:number;
  areas: any
  areasaveStatus: string;
  selectedareaId: any;
  arealists: any = [];
  constructor(public Modalcntrl: ModalController, private service : QuoteService,private authService:AuthService) { }
  ngOnInit() {
    this.authService.GetStoredLoginUserID().then((resultId) => {this.userId = resultId});
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
          let resultareas = this.service.ActionGetQuoteAreas(this.Version.ID, 0);
          if (_qscope.mode != 'draw') {
            _qscope.quote.Version.AreaList = resultareas;
          }
          let currentareas = _qscope.quote.Version.AreaList;
         // this.preapreareas(currentareas, resultareas);
      //    this.preapreareas(this.Version.VersionAreaList, resultareas);
        //  _qscope.quote.Version.AreaList = currentareas;
          this.ActionCloseAddArea(true);
          //this.saveareasummary(unitschgareaIds, versionid, userId);
        });
 //   } 
    // else {
    //     swal('Please select at least one Area !');
    // }
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
      if (this.arealists[i].Isactive == 1 && (this.arealists[i].Name == "" || this.arealists[i].Name == null)) {
        this.arealists.splice(i, 1);
      }
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
saveareasummary(unitschgareaIds, versionid, userId){

}


ActionCloseAddArea(issave) {
  this.Modalcntrl.dismiss({
    'dismissed': true,
    componentProps: this.arealists,
    issave: issave
  });
}

}
