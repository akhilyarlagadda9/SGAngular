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
import { AreainfoComponent } from '../areainfo/areainfo.component';


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
  entryComponents: [CreatequoteComponent,QuoteeditComponent,HeadereditComponent,HeaderinfoComponent,PoitemsComponent,CommhubComponent,PrintsComponent,JobdesComponent,AreainfoComponent],
  declarations: [QuotePage, CreatequoteComponent,
    QuoteeditComponent,HeadereditComponent,HeaderinfoComponent,PoitemsComponent,CommhubComponent,PrintsComponent,JobdesComponent,AreainfoComponent]
})
export class QuotePageModule {}
