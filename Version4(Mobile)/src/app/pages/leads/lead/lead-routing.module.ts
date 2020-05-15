import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadPage } from './lead.page';

const routes: Routes = [
  {
    path: '',
    component: LeadPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadPageRoutingModule {}
