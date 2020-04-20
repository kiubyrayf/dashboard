import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { UniversityComponent } from './university/university.component';
// import { BitcoinComponent } from './bitcoin/bitcoin.component';
// import { ServerComponent } from './server/server.component';
// import { ProjectComponent } from './project/project.component';
import { TestComponent } from './test/test.component';
import { InfoBusinessComponent } from './test/info-business/info-business.component';
import { ContactBusinessComponent } from './test/contact-business/contact-business.component';
import { PaymentBusinessComponent } from './test/payment-business/payment-business.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent,
        data: {
          title: 'Default',
          breadcrumb: 'Default'
        }
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'Test',
          breadcrumb: 'test'
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
      // {
      //   path: 'e-commerce',
      //   component: ECommerceComponent,
      //   data: {
      //     title: 'E-commerce',
      //     breadcrumb: 'E-commerce'
      //   }
      // },
      // {
      //   path: 'university',
      //   component: UniversityComponent,
      //   data: {
      //     title: 'University',
      //     breadcrumb: 'University'
      //   }
      // },
      // {
      //   path: 'bitcoin',
      //   component: BitcoinComponent,
      //   data: {
      //     title: 'Crypto',
      //     breadcrumb: 'Crypto'
      //   }
      // },
      // {
      //   path: 'server',
      //   component: ServerComponent,
      //   data: {
      //     title: 'Server',
      //     breadcrumb: 'Server'
      //   }
      // },
      // {
      //   path: 'project',
      //   component: ProjectComponent,
      //   data: {
      //     title: 'Project',
      //     breadcrumb: 'Project'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
