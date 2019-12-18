import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-poedit',
  templateUrl: './poedit.component.html',
  styleUrls: ['./poedit.component.scss'],
})
export class PoeditComponent implements OnInit {

  constructor(public Modalcntrl : ModalController,private navParams : NavParams) { }
   poitem = this.navParams.data;

  ngOnInit() {
    this.poitem.AttachmentList = this.poitem.AttachmentList == null  || this.poitem.AttachmentList == undefined ? [] : this.poitem.AttachmentList;
  }

  ActionSavePOItem() {
    this.ActionClosePOItem(true);
  }

  ActionClosePOItem(issave) { 
    let obj = {poitem:this.poitem}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:obj,
      issave:issave
    });
  }
  ActionUploadPoAttach(event: any) {
   if (event.target.files && event.target.files[0]) {
     let file = event.target.files[0];
       var reader = new FileReader();
       reader.onload = (event: any) => {
         let model = {ID:0,Path:file.name}
        this.poitem.AttachmentList.push(model);
       }
       reader.readAsDataURL(event.target.files[0]);
   }
 }
}
