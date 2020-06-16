import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { QuotePage } from './quote.page';
import { CreatequoteComponent } from 'src/app/pages/quotes/createquote/createquote.component';
import { QuoteeditComponent } from 'src/app/pages/quotes/quoteedit/quoteedit.component';
import { HeadereditComponent } from 'src/app/pages/quotes/headeredit/headeredit.component';
import { HeaderinfoComponent } from '../headerinfo/headerinfo.component';
import { PoitemsComponent } from '../poitems/poitems.component';
import { CommhubComponent } from '../commhub/commhub.component';
import { PrintsComponent } from '../prints/prints.component';
import { JobdesComponent } from '../jobdes/jobdes.component';
import { AreainfoComponent, additemComponent} from '../areainfo/areainfo.component';
import { PoeditComponent } from '../poedit/poedit.component';
import { JobdesceditComponent } from '../jobdescedit/jobdescedit.component';
import { CustomereditComponent } from '../customeredit/customeredit.component';
import { CommhubeditComponent } from '../commhubedit/commhubedit.component';
import {CommonEditMailHubComponent} from '../common-edit-mail-hub/common-edit-mail-hub.component';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdditionalitemserachComponent } from '../additionalitemserach/additionalitemserach.component';
// item popups
import { SinkComponent } from '../sink/sink.component';
import { AddoninfoComponent, } from '../addoninfo/addoninfo.component';
import { SplashComponent } from '../splash/splash.component';
import { EdgeinfoComponent } from '../edgeinfo/edgeinfo.component';
import { CutoutinfoComponent } from '../cutoutinfo/cutoutinfo.component';
import { MaterialinfoComponent } from '../materialinfo/materialinfo.component';
import { MeasurementsComponent } from '../measurements/measurements.component';
import { FaucetsComponent } from '../faucets/faucets.component';
import { TileinfoComponent } from '../tileinfo/tileinfo.component';
import { CustomerinfoComponent } from '../customerinfo/customerinfo.component';
import { AddareaComponent } from '../addarea/addarea.component';
import { AddmatComponent, SearchComponent } from '../materialinfo/addmat/addmat.component';
import { TemplateComponent } from '../template/template.component';
import { CustitemComponent, itemsearchComponent } from '../custitem/custitem.component';
import { CustomersearchComponent } from '../customersearch/customersearch.component';
import { ManagementsummaryComponent,PaymentScheduleComponent,taxComponent,feeComponent} from '../managementsummary/managementsummary.component';
import { FabricationComponent } from '../fabrication/fabrication.component';
import { LaborinfoComponent } from '../laborinfo/laborinfo.component';
import { MapComponent } from '../../map/map.component';
import { QlayoutComponent } from '../qlayout/qlayout.component';
import { ArealayoutComponent } from '../arealayout/arealayout.component';
import { QnavigationComponent } from '../qnavigation/qnavigation.component';
import { AccountsComponent, NewtranComponent } from '../accounts/accounts.component';
import { ActivitiesComponent } from '../../common/activities/activities.component';
import { AddpartComponent, AddSizesComponent } from '../addpart/addpart.component';
import { AreasummaryComponent } from '../areasummary/areasummary.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { DiscountComponent } from '../discount/discount.component';

import { OtherComponent } from '../other/other.component';
import { MaileditComponent } from '../mailedit/mailedit.component';
import { ActionquoteComponent } from '../actionquote/actionquote.component';
import { AddmeasComponent } from '../materialinfo/addmeas/addmeas.component';
import { QuickquoteComponent } from '../quickquote/quickquote.component';
import {LeadEditComponent} from '../LeadEdit/LeadEdit.component';
// import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
// import { File } from '@ionic-native/file/ngx';
// import { FileTransfer} from '@ionic-native/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ReactiveFormsModule,
    //HttpHeaders ,
    RouterModule.forChild([
      {
        path: '',
        component: QuotePage
      },
    ]),
  ],
  // providers:[
  //   DocumentViewer,
  //   File,
  //   FileTransfer,
  // ],
  entryComponents: [CreatequoteComponent,AddmeasComponent,SearchComponent,ActionquoteComponent,
    TransactionComponent,NewtranComponent,AccountsComponent,PaymentScheduleComponent,
    AdditionalitemserachComponent,DiscountComponent,feeComponent,
    taxComponent, itemsearchComponent,  CustomersearchComponent,
    CustitemComponent, TemplateComponent, AddmatComponent, 
    TileinfoComponent, FaucetsComponent, MeasurementsComponent, 
    MaterialinfoComponent, CutoutinfoComponent, EdgeinfoComponent, 
    SplashComponent, AddoninfoComponent, SinkComponent,
    QuoteeditComponent,HeadereditComponent,HeaderinfoComponent,
    PoitemsComponent,PrintsComponent,
    JobdesComponent,AreainfoComponent,PoeditComponent,
    JobdesceditComponent,CustomereditComponent,CommhubeditComponent, CommonEditMailHubComponent,
    CustomerinfoComponent,AddareaComponent,CustomersearchComponent,
    ManagementsummaryComponent,additemComponent,ActivitiesComponent,AreasummaryComponent,
    FabricationComponent,LaborinfoComponent,MapComponent,QlayoutComponent,ArealayoutComponent,QnavigationComponent,OtherComponent,
     AddpartComponent, AddSizesComponent,MaileditComponent, QuickquoteComponent,AddmeasComponent,LeadEditComponent,CommhubComponent],
  declarations: [QuotePage,AddmeasComponent, SearchComponent, ActionquoteComponent, 
    TransactionComponent,AccountsComponent,NewtranComponent,PaymentScheduleComponent,AdditionalitemserachComponent,
    taxComponent,feeComponent,DiscountComponent, itemsearchComponent,
    CustitemComponent, TemplateComponent, AddmatComponent, TileinfoComponent, 
    FaucetsComponent, MeasurementsComponent, MaterialinfoComponent, 
    CutoutinfoComponent, EdgeinfoComponent, SplashComponent, AddoninfoComponent, 
    SinkComponent, CreatequoteComponent,QuoteeditComponent,
    HeadereditComponent,HeaderinfoComponent,PoitemsComponent,
    PrintsComponent,JobdesComponent,
    AreainfoComponent,PoeditComponent,JobdesceditComponent,
    CustomereditComponent,CommhubeditComponent,CustomerinfoComponent,CommonEditMailHubComponent,
    AddareaComponent,CustomersearchComponent,ManagementsummaryComponent,ActivitiesComponent,AreasummaryComponent,
    additemComponent,additemComponent,FabricationComponent,LaborinfoComponent,MapComponent,QnavigationComponent,
    QlayoutComponent,ArealayoutComponent,OtherComponent,AddpartComponent,AddSizesComponent,MaileditComponent, QuickquoteComponent,AddmeasComponent,LeadEditComponent,CommhubComponent]
})
export class QuotePageModule {}
