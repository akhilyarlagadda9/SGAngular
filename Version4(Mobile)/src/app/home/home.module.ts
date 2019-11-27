import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'quotelist',
       // component:QuotePage
        loadChildren: () => import('../pages/quotes/quote/quote.module').then( m => m.QuotePageModule)
      }
    ])
  ],
  declarations: [HomePage,]
})
export class HomePageModule {}
