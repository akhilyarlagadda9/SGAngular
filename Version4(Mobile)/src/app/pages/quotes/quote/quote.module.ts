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
  entryComponents: [CreatequoteComponent,QuoteeditComponent,HeadereditComponent],
  declarations: [QuotePage, CreatequoteComponent,
    QuoteeditComponent,HeadereditComponent]
})
export class QuotePageModule {}
