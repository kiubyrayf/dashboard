import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoBusinessComponent } from './info-business/info-business.component';
import { ContactBusinessComponent } from './contact-business/contact-business.component';
import { PaymentBusinessComponent } from './payment-business/payment-business.component';
import {TestComponent} from './test.component';

const routes: Routes = [
    { path: 'info', component: InfoBusinessComponent },
    { path: 'contacto', component: ContactBusinessComponent },
    { path: 'payment', component: PaymentBusinessComponent },
    { path: 'test', redirectTo: '/test', component: TestComponent },
    { path: '**', component: TestComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TestRoutingModule {}
