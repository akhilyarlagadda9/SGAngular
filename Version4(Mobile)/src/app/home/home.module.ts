import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { QuotePageModule } from '../quote/quote.module';
import { QuotePage } from '../quote/quote.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,QuotePageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'quotelist',
        component:QuotePage
      //  loadChildren: () => import('../quote/quote.module').then( m => m.QuotePageModule)
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
