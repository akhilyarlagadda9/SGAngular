import { Component, OnInit} from '@angular/core';
import { ModalController, NavParams, PopoverController, } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custitem',
  templateUrl: './custitem.component.html',
  styleUrls: ['./custitem.component.scss'],
})
export class CustitemComponent implements OnInit {
  public items: any = [];
  registerForm: FormGroup;
  submitted = false;

  constructor(public Modalcntrl : ModalController,private navCntrl:NavParams, private popoverCntrl :PopoverController ) {
    this.items = [
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" }
    ];
   }
  TypeID = this.navCntrl.data.TypeID;
  SearchTypeID:number;
searchResults:any = [];

  ngOnInit() {}

  ActionToClose() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.Modalcntrl.dismiss({
      'dismissed': true
    });
  }
  async ActionSearchSelect(ev: any) {
    let obj={}
   const popover = await this.popoverCntrl.create({
     component: itemsearchComponent,
     event: ev,
     translucent: true,
     componentProps:obj,
     cssClass: "popover_class"
   });
   return await popover.present();
 }

 

 filterItems(searchTerm) {
  return this.items.filter(item => {
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
}

ActionSubmit(){
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
}

  
}
}
@Component({
  //selector: 'app-itemsearchComponent',
  template:`
  <ion-header >
    <ion-toolbar style="height:37px;top:-8px;left:-10px;">
      <ion-title style="font-size:15px;">Customer Details</ion-title>
      <ion-button slot="end" color="success" size="small" style="font-size:13px; height:17px;width: 58px;">Select</ion-button>
      <ion-button slot="end" color="danger" size="small" (click)="ActionToClosePop()" style="font-size:13px; height:17px;width: 22px;">X</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-row style="height:360px">
  <ion-col>
  <ion-list>
        <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" 
        value="Customer is Responsible for any drywall/paint repair that will happen at install">
           1. Customer is Responsible for any drywall/paint repair that will happen at install.
        </ion-label></ion-row>
        <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           2. Customer is Responsible for cooktop reconnection
       </ion-label></ion-row>
       <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           3. Customer is Responsible for plumbing Reconnection and dishwasher mounting.
       </ion-label></ion-row>
       <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           4. Customer is Responsible for providing accurate Make and Model Specifications for existing sink/faucet.
       </ion-label></ion-row>
       <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           5. Customer is Responsible for removing the existing tile backsplash.
       </ion-label></ion-row>
       <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           6. Customer is Responsible for supplying a template or detailed drawing for pickup piece/fabrication only.
       </ion-label></ion-row>
       <ion-row><ion-checkbox color="primary" style="height: 13px;width: 13px;top: 2px;"></ion-checkbox>
        <ion-label style="width: 290px;font-size: 12px;margin-left: 4px;" value="Customer is Responsible for cooktop reconnection">
           7. Customer is Responsible for the removal of existing countertops.
       </ion-label></ion-row>
      </ion-list>
  </ion-col>
</ion-row>`,
  //styleUrls: ['./customeredit.component.scss'],
})
export class itemsearchComponent implements OnInit {
  searchObj = this.navParams.data;
  searchResults = [];
  constructor(private Modalcntrl : ModalController,private navParams : NavParams,private popoverCntrl :PopoverController ) { }
  ngOnInit() {this.ActionSearchSelect();}
  ActionSearchSelect(){
    }

    ActionToClosePop() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.popoverCntrl.dismiss({
        'dismissed': true
      });
    }
  }

