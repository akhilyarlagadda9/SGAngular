import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-area-parts',
  templateUrl: './area-parts.component.html',
  styleUrls: ['./area-parts.component.scss'],
})
export class AreaPartsComponent implements OnInit {
  objAreaInfo: any=this.navParams.data;
  arrChekedItems:any=[];
  arrAreaInfo:any;
  AllCheck:boolean = false;
  constructor(public Modalcntrl: ModalController,
    public popoverCntrl: PopoverController, private navParams: NavParams,private alertCtrl: AlertController) { }

  ngOnInit() {
    let check = this.objAreaInfo.ActPartIds == "" || this.objAreaInfo.ActPartIds == null ? 1 : 0;
    let array = check == 0 ? this.objAreaInfo.ActPartIds.split(",") : [];
    if(this.objAreaInfo.PhasePartList.length>0){

     
      this.arrAreaInfo = this.objAreaInfo.PhasePartList;
      let checkCount = 0;
      this.arrAreaInfo.forEach(element => {
        element.AreaName = element.Area.Name;
        let res = array.find(s => s == element.ID);
        if ((res != null && res != undefined)) {
          element.Check = 1;
          checkCount++;
        }
      // if(element.Check == true){
      //   checkCount++;
      // }
    });
    this.AllCheck = checkCount==this.arrAreaInfo.length?true:false;
    }
    else{
      this.AllCheck= false;
    }
  }

  ActionAll(){
    let arrList = this.objAreaInfo.PhasePartList;
    this.AllCheck = !this.AllCheck;
    for (var i = 0; i < arrList.length; i++) {
     arrList[i].Check = this.AllCheck;
   }
   this.AllCheck = !this.AllCheck;
   }
   ActionIsselectAll(){
     let arrList = this.objAreaInfo.PhasePartList;
     let count = 0;
     arrList.forEach(element => {
      if(element.Check == true){
        count++;
      }
     });
      this.AllCheck = count==arrList.length?true:false;
   }
//Saving operation
    ActionRunFilter() {
     for(let i in this.objAreaInfo.PhasePartList){
        if(this.objAreaInfo.PhasePartList[i].Check == true){
          this.arrChekedItems.push(this.objAreaInfo.PhasePartList[i]);
        }
     }
     this.ActionToClosePop(true);
    }
  //   let Ids = ""; let names = "";
  //   if(this.result.FiterTypeID == 2){
  //     for (let j in this.ResourceList) {
  //       let obj = this.ResourceList[j];
  //       if (obj.Check == 1) {
  //         Ids += obj.ResourceID + ",";
  //         names += obj.ResourceName + ",";
  //       }
  //     }
  //   }else{
  //     let list = this.result.FiterTypeID == 1 ? this.ActTypeList : this.StatusList;
  //     for (let j in list) {
  //       let obj = list[j];
  //       if (obj.Check == 1) {
  //         if(this.result.FiterTypeID == 1){
  //           this.result.CheckedActTypeList.push({id:obj.ID,groupId: 0,title:obj.Name})
  //         }
  //         Ids += obj.ID + ",";
  //         names += obj.Name + ",";
  //       }
  //     }
  //   }
    
  //   this.result.SelIDs = Ids.replace(/(^[,\s]+)|([,\s]+$)/g, '');
  //   this.result.SelNames = names.replace(/(^[,\s]+)|([,\s]+$)/g, '');
  //   this.ActionToClosePop(true);
  // }

  ActionToClosePop(isselect) {
    this.popoverCntrl.dismiss({
      'dismissed': true,
      componentProps: this.arrChekedItems,
      isSelect: isselect
    });
    this.arrChekedItems = []; //releasing the memory
  }

}
