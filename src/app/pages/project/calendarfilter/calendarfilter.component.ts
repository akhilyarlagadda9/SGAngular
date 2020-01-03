import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { FilterPipe } from 'src/app/FilterPipe';
import { SchedulingService } from 'src/app/service/scheduling.service';

@Component({
  selector: 'app-calendarfilter',
  templateUrl: './calendarfilter.component.html',
  //styleUrls: ['./calendarfilter.component.scss'],
  providers: [FilterPipe]
})
export class CalendarfilterComponent implements OnInit {

  filterObj = this.navParams.data; searchableList: any;
  ActTypeTypeList: any; ResourceList: any = [];result:any;
  constructor(private schService: SchedulingService, private navParams: NavParams,
    private popoverCntrl: PopoverController, private FilterPipe: FilterPipe) {
    this.searchableList = ['Name'];
  }
  ngOnInit() {
    this.result = {
      ActTypeId: this.filterObj.ActTypeId, ResourceIds: this.filterObj.ResourceIds,
      ResourceNames: this.filterObj.ResourceNames,ActivityType:this.filterObj.ActivityType
    };
    this.ActTypeTypeList = this.filterObj.ActTypeTypeList;
    this.GetResourceList();
  }
  ActivityTypeResourceList(Id: number,name:string) {
    this.result.ActTypeId = Id;
    this.result.ActivityType = name;
    this.GetResourceList();
  }
  GetResourceList(){
    this.schService.ActivityTypeResourceList( this.result.ActTypeId).subscribe(data => {
      this.ResourceList = data;
      this.PrepareResources();
    });
  }
  PrepareResources() {
    let check = this.filterObj.ResourceIds == "" || this.filterObj.ResourceIds == null ? 1 : 0;
    let array = check == 0 ? this.filterObj.ResourceIds.split(",") : [];
    console.log(array);
    for (let i in this.ResourceList) {
      let resource = this.ResourceList[i];
      let res = array.find(s => s == resource.ResourceID);
      if (check == 1 || (res != null && res != undefined)) {
        this.ResourceList[i].Check = 1;
      }
    }
  }
  ActionRunFilter() {
    let resIds = ""; let resNames = "";
    //  let filterList = this.ResourceList.filter(function(item) {
    //   return  item.Check == 1;
    // });
    for (let j in this.ResourceList) {
      let obj = this.ResourceList[j];
      if (obj.Check == 1) {
        resIds += obj.ResourceID + ",";
        resNames += obj.ResourceName + ",";
      }
    }
    this.result.ResourceIds = resIds.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    this.result.ResourceNames = resNames.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    this.ActionToClosePop(true);
  }
  ActionToClosePop(isselect) {
     if(isselect == true){
      this.popoverCntrl.dismiss(this.result);
    }else{
      this.popoverCntrl.dismiss();
    }
  }

}
