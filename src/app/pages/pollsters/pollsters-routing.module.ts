import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsterComponent } from './pollster/pollster.component';
import { PollstersComponent } from './pollsters/pollsters.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'encuestadores',
      component: PollstersComponent,
      data: {
        title: 'Encuestadores',
        breadcrumb: 'Encuestadores'
      }
    },
    {
      path: 'encuestador/:id',
      component: PollsterComponent,
      data: {
        title: 'Encuestador',
        breadcrumb: 'Encuestador'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollstersRoutingModule { }
