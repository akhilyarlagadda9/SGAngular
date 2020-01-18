import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss'],
})
export class AddareaComponent implements OnInit {
  Version: any;quote : any;
  areas: any
  areasaveStatus: string;
  constructor(public Modalcntrl: ModalController) { }
  ngOnInit() {
    debugger;
  }
  ActionAddArea() {
    debugger;
    let jobTypeId = 0
    var ids = this.Version.JobTypeID != null ? this.Version.JobTypeID.split(',') : 0;
    if (ids != 0) { jobTypeId = ids[0]; }
    let newarea = {
      ID: 0, VersionID: this.Version.ID, Isactive: 1, IsPriceGrp: 1, NoOfUnits: 1, JobTypeID: jobTypeId, CoID: this.Version.LatestCoID,
      PhaseID: 0, PhaseCode: 0,
    };
    this.areas.push(newarea);
    console.log(this.areas);
  }
  ActionSaveBatchAreas() {
    let ischkareas = this.checkactivieareas();
    if (ischkareas) {
        this.areasaveStatus = "loading...";
        let areaindex = this.quote.areaIndex;
    //     let areaId = qprms.viewtypeId == 2 ? 0 : $scope.arealists[areaindex].ID;
    //     let unitschgareaIds = getunitschangedareas($scope.arealists);
    //     let userId = getloginuserId();
    //     let versionid = $scope.quote.header.Version.ID;
    //     resetcheckuncheck();
    //     let parameter = JSON.stringify($scope.arealists);
    //     $http.post(serviceBase + 'api/QSave/ActionSaveAreaList?versionId=' + versionid + '&areaId=' + areaId + '&userId=' + userId + "&areaIds=" + '', parameter, { headers: { 'Content-Type': 'application/json' } }).then(function (results) {
    //         //reset areas
    //         if (qprms.viewtypeId == 2) {
    //             initphaseareas();
    //             $scope.quote.header.Version.VersionAreaList = $scope.quote.header.Version.AreaList;
    //             $scope.areasaveStatus = "";
    //             swal({ title: "UPDATED SUCCESSFULLY.", timer: 2000, showConfirmButton: false }, function () { swal.close(); $("#addarea").hide(); });
    //         } else {
    //             let resultareas = qsgetquoteareas(versionid, 0);
    //             if (_qscope.mode != 'draw') {
    //                 $scope.quote.header.Version.AreaList = resultareas;
    //             }
    //             let currentareas = $scope.quote.header.Version.AreaList;
    //             preapreareas(currentareas, resultareas);
    //             preapreareas($scope.quote.header.Version.VersionAreaList, resultareas);
    //             _qscope.quote.header.Version.AreaList = currentareas; qprms.areas = currentareas;
    //             saveareasummary(unitschgareaIds, versionid, userId);
    //         }
    //     });
    // } else {
    //     swal('Please select at least one Area !');
    }
}
checkactivieareas() {
    for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].Isactive == 1) {
            return true;
        }
    }
}
  ActionCloseAddArea() {
    this.Modalcntrl.dismiss({
    });
  }

}
