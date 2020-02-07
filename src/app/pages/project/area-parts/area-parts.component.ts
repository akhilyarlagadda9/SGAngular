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
  flagtoCheckResStatus:boolean = false;
  constructor(public Modalcntrl: ModalController,
    public popoverCntrl: PopoverController, private navParams: NavParams,private alertCtrl: AlertController) { }

  ngOnInit() {
    if(this.objAreaInfo.PhasePartList.length>0){
      this.arrAreaInfo = this.objAreaInfo.PhasePartList;
      let checkCount = 0;
      this.arrAreaInfo.forEach(element => {
      if(element.IsChgFlag == true){
        checkCount++;
      }
    });
    this.flagtoCheckResStatus = checkCount==this.arrAreaInfo.length?true:false;
    }
    else{
      this.flagtoCheckResStatus= false;
    }
  }

  ActionAll(){
    let arrList = this.objAreaInfo.PhasePartList;
    this.flagtoCheckResStatus = !this.flagtoCheckResStatus;
    for (var i = 0; i < arrList.length; i++) {
     arrList[i].IsChgFlag = this.flagtoCheckResStatus;
   }
   this.flagtoCheckResStatus = !this.flagtoCheckResStatus;
   }
   ActionIsselectAll(){
     let arrList = this.objAreaInfo.PhasePartList;
     let count = 0;
     arrList.forEach(element => {
      if(element.IsChgFlag == true){
        count++;
      }
     });
      this.flagtoCheckResStatus = count==arrList.length?true:false;
   }
//Saving operation
    ActionRunFilter() {
     for(let i in this.objAreaInfo.PhasePartList){
        if(this.objAreaInfo.PhasePartList[i].IsChgFlag == true){
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
