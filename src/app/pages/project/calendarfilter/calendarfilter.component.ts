import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FilterPipe } from 'src/app/FilterPipe';
import { SchedulingService } from 'src/app/service/scheduling.service';

@Component({
  selector: 'app-calendarfilter',
  templateUrl: './calendarfilter.component.html',
  //styleUrls: ['./calendarfilter.component.scss'],
  providers: [FilterPipe]
})
export class CalendarfilterComponent implements OnInit {
  flagtoCheckResStatus:boolean;
  queryString :any;
   searchableList: any;
   result:any = this.navParams.data;
   ActTypeList: any;StatusList:any;ResourceList: any;
  constructor(private schService: SchedulingService, private navParams: NavParams,
     private FilterPipe: FilterPipe,private modelCntrl:ModalController) {
    this.searchableList = ['Name'];
    this.flagtoCheckResStatus=true;
    if(this.result.FiterTypeID ==1){
      this.flagtoCheckResStatus = false;
    }
  }
  ngOnInit() {
    this.ActionLoadList();
  }
  ActionAll(){
   let arrList = this.checkForLists(this.result.FiterTypeID);
   this.flagtoCheckResStatus = !this.flagtoCheckResStatus;
   for (var i = 0; i < arrList.length; i++) {
    arrList[i].Check = this.flagtoCheckResStatus;
  }
  this.flagtoCheckResStatus = !this.flagtoCheckResStatus;
  }
  ActionIsselectAll(){
    let arrList = this.checkForLists(this.result.FiterTypeID);
    let count = 0;
    arrList.forEach(element => {
     if(element.Check == true){
       count++;
     }
    });
     this.flagtoCheckResStatus = count==arrList.length?true:false;
  }
  checkForLists(intID){
     if(intID ==1){
       return this.ActTypeList;
     }
     else if(intID ==2){
       return this.ResourceList;
     }
     else{
       return this.StatusList;
     }
  }

  ActionLoadList(){
    switch (this.result.FiterTypeID) {
      case 1: {this.ActivityTypeList(); break; }
      case 2: {this.ActionGetResoucreList(); break; }
      case 3: {this.ActionStatusList(); break; }
    }
  }
 //Activity Type List Service
 ActivityTypeList() {
  this.schService.ActivityTypeList(4).subscribe(data => {
    this.ActTypeList = data;
    this.PrepareItems(this.ActTypeList);
  })
}
ActionStatusList() {
  this.schService.ActivityStatusList().subscribe(data => {
    this.StatusList = data;
    this.PrepareItems(this.StatusList);
  })
}
//Resource List Service
ActionGetResoucreList() {
  if(this.result.ActTypeIDs != "" && this.result.ActTypeIDs != null && this.result.ActTypeIDs != undefined){
    this.schService.ActionResourcesByAccTypes(this.result.ActTypeIDs).subscribe(data => {
      this.ResourceList = data;
      this.PrepareResources();
    })
  }
}



  //Resources
  PrepareResources() {
    let check = this.result.SelIDs == "" || this.result.SelIDs == null ? 1 : 0;
    let array = check == 0 ? this.result.SelIDs.split(",") : [];
   // console.log(array);
    for (let i in this.ResourceList) {
      let resource = this.ResourceList[i];
      this.ResourceList[i].Name = this.ResourceList[i].ResourceName;
      let res = array.find(s => s == resource.ResourceID);
      if (check == 1 || (res != null && res != undefined)) {
        this.ResourceList[i].Check = 1;
      }
    }
  }
  ActionRunFilter() {
    let Ids = ""; let names = "";
    if(this.result.FiterTypeID == 2){
      for (let j in this.ResourceList) {
        let obj = this.ResourceList[j];
        if (obj.Check == 1) {
          Ids += obj.ResourceID + ",";
          names += obj.ResourceName + ",";
        }
      }
    }else{
      let list = this.result.FiterTypeID == 1 ? this.ActTypeList : this.StatusList;
      for (let j in list) {
        let obj = list[j];
        if (obj.Check == 1) {
          if(this.result.FiterTypeID == 1){
            this.result.CheckedActTypeList.push({id:obj.ID,groupId: 0,title:obj.Name})
          }
          Ids += obj.ID + ",";
          names += obj.Name + ",";
        }
      }
    }
    
    this.result.SelIDs = Ids.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    this.result.SelNames = names.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    this.ActionToClosePop(true);
  }

  // ActTypes and StatusNames
  PrepareItems(list:any) {
    let check = this.result.SelIDs == "" || this.result.SelIDs == null ? 1 : 0;
    let array = check == 0 ? this.result.SelIDs.split(",") : [];
   // console.log(array);
    for (let i in list) {
      let item = list[i];
      let selItem = array.find(s => s == item.ID);
      if (check == 1 || (selItem != null && selItem != undefined)) {
        list[i].Check = 1;
      }
    }
  }



  ActionToClosePop(isselect) {
    this.modelCntrl.dismiss({
      'dismissed': true,
      componentProps: this.result,
      isSelect: isselect
    });
  }

  // ActivityTypeResourceList(Id: number,name:string) {
  //   this.result.ActTypeId = Id;
  //   this.result.ActivityType = name;
  //   this.GetResourceList();
  // }
  // GetResourceList(){
  //   this.schService.ActivityTypeResourceList( this.result.ActTypeId).subscribe(data => {
  //     this.ResourceList = data;
  //     this.PrepareResources();
  //   });
  // }
}
