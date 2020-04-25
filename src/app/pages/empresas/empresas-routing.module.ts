import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { InfoBusinessComponent } from './empresa/info-business/info-business.component';
import { ContactBusinessComponent } from './empresa/contact-business/contact-business.component';
import { PaymentBusinessComponent } from './empresa/payment-business/payment-business.component';

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
      {
        path: 'info',
        component: InfoBusinessComponent ,
        data: {
          title: 'info',
          breadcrumb: 'info'
        }
      },
      {
        path: 'contacto',
        component: ContactBusinessComponent,
        data: {
          title: 'contacto',
          breadcrumb: 'contacto'
        }
      },
      {
        path: 'payment',
        component: PaymentBusinessComponent,
        data: {
          title: 'payment',
          breadcrumb: 'payment'
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
