import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { EmpresaComponent } from './empresa/empresa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'general',
        component: GeneralComponent,
        data: {
          title: 'General',
          breadcrumb: 'General'
        }
      },
      {
        path: 'empresa/:id',
        component: EmpresaComponent,
        data: {
          title: 'Empresa',
          breadcrumb: 'Empresa'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
