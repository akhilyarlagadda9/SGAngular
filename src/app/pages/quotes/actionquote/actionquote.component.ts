import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { QuoterepService } from 'src/app/service/quoterep.service';
import { QuoteService } from 'src/app/service/quote.service';
import { AuthService } from 'src/app/service/auth.service';

declare var _qscope: any;

@Component({
  selector: 'app-actionquote',
  templateUrl: './actionquote.component.html',
  styleUrls: ['./actionquote.component.scss'],
})
export class ActionquoteComponent implements OnInit {
  searchobj: any = {};
  header: any;

  constructor(public Modalcntrl: ModalController, private alertCtrl: AlertController, 
    private quoterep: QuoterepService, private service: QuoteService,private authservice:AuthService) { }

  ngOnInit() {}
  async ActionSaveQuoteStatuses(action: any) {
    let name = action.StatusId == 6 ? 'Approve' : action.StatusId == 1 ? 'Bid' : action.StatusId == 2 ? 'Decline' : action.StatusId == 4 ? 'Cancel' : action.ActionName;
    let alrt = "Are you sure you want to " + name + " !";
    const alert = await this.alertCtrl.create({
      header: name,
      message: alrt,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: Cancelled');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.searchobj.QCFlag = true;
            this.ValidandSaveQuoteStatus(action);
          }
        }
      ]
    });
    alert.present();
  }
  ValidandSaveQuoteStatus(action) {
    let version = this.header.Version;
    //version.UserSignature = getloginusersingnature();
    this.quoterep.pushquoteversionvalues(version, action);
    this.quoterep.preparematerials(this.header.Version.MaterialList);//check & remove this        
    if (action.StatusId == 6) {//approved
      version.LayApproval = version.LayApproval == true ? 1 : 0;
      version.CustPickup = version.CustPickup == true ? 1 : 0;
      version.PreferID= version.PreferID == true ? 1 : 0;
      this.service.ActionSaveQuoteApproved(version).subscribe(data => { this.ApprovedAlertPopup(action); });
      
      this.service.ActionSendMessage(this.header);//send msg         
    } else if (action.StatusId == 2) {//declined
      this.service.ActionSaveQuoteDeclined(version).subscribe(data => { this.ApprovedAlertPopup(action); });
    }
    else if (action.StatusId == 4) {//cancelled
      this.service.ActionSaveQuoteCancelled(version).subscribe(data => { this.ApprovedAlertPopup(action); });
    }
    else if (action.StatusId == 1) {//bidding
      this.service.ActionSaveQuoteBidding(version).subscribe(data => { this.ApprovedAlertPopup(action); });
    }
    //versionreload(version.ID, version.CustomerID, version.ChildAccID, version.ParentAccID);
  }
  ActionClosestatus(issave) {
    this.Modalcntrl.dismiss({
      'dismissed': true,
      issave: issave,
      
    });
  }
  async ApprovedAlertPopup(action:any){
    let name = action.StatusId == 6 ? 'Approved' : action.StatusId == 1 ? 'Bid' : action.StatusId == 2 ? 'Declined' : action.StatusId == 4 ? 'Canceled' : action.ActionName;
    let alerttext = name + " " + "Successfully";
    const alert = await this.alertCtrl.create({
      header: alerttext,
      buttons:[
        {
        text: 'OK',
        handler: () => {
          this.ActionClosestatus(true);
        },
      }
      ]
    });
    alert.present();
  }
}
