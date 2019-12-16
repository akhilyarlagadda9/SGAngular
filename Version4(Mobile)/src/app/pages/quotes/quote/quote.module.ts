import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
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
import { AddmatComponent } from '../materialinfo/addmat/addmat.component';
import { TemplateComponent } from '../template/template.component';
import { CustitemComponent, itemsearchComponent } from '../custitem/custitem.component';
import { CustomersearchComponent } from '../customersearch/customersearch.component';
import { ManagementsummaryComponent,DiscountComponent,taxComponent,feeComponent} from '../managementsummary/managementsummary.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        component: QuotePage
      },
    ])
  ],
  entryComponents: [CreatequoteComponent,AdditionalitemserachComponent,DiscountComponent,feeComponent,taxComponent, itemsearchComponent,  CustomersearchComponent,CustitemComponent, TemplateComponent, AddmatComponent, 
    TileinfoComponent, FaucetsComponent, MeasurementsComponent, 
    MaterialinfoComponent, CutoutinfoComponent, EdgeinfoComponent, 
    SplashComponent, AddoninfoComponent, SinkComponent,
    QuoteeditComponent,HeadereditComponent,HeaderinfoComponent,
    PoitemsComponent,CommhubComponent,PrintsComponent,
    JobdesComponent,AreainfoComponent,PoeditComponent,
    JobdesceditComponent,CustomereditComponent,CommhubeditComponent,
    CustomerinfoComponent,AddareaComponent,CustomersearchComponent,ManagementsummaryComponent,additemComponent],
    

  declarations: [QuotePage,AdditionalitemserachComponent,taxComponent,feeComponent,DiscountComponent, itemsearchComponent,CustitemComponent, TemplateComponent, AddmatComponent, TileinfoComponent, FaucetsComponent, MeasurementsComponent, MaterialinfoComponent, CutoutinfoComponent, EdgeinfoComponent, SplashComponent, AddoninfoComponent, SinkComponent, CreatequoteComponent,QuoteeditComponent,
    HeadereditComponent,HeaderinfoComponent,PoitemsComponent,
    CommhubComponent,PrintsComponent,JobdesComponent,
    AreainfoComponent,PoeditComponent,JobdesceditComponent,
    CustomereditComponent,CommhubeditComponent,CustomerinfoComponent,AddareaComponent,CustomersearchComponent,ManagementsummaryComponent,additemComponent]
})
export class QuotePageModule {}
