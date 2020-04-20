import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TestComponent} from './test.component';
import {TestRoutingModule} from './test-routing.module';

import { InfoBusinessComponent } from './info-business/info-business.component';
import { ContactBusinessComponent} from './contact-business/contact-business.component';
import { PaymentBusinessComponent} from './payment-business/payment-business.component';
import { NavBarBusinessComponent} from './nav-bar-business/nav-bar-business.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [];

@NgModule({
    declarations: [
        NavBarBusinessComponent,
        PaymentBusinessComponent,
        ContactBusinessComponent,
        InfoBusinessComponent,
        TestComponent
    ],
    imports: [
        TestRoutingModule,
        ReactiveFormsModule,
        ArchwizardModule,
        CommonModule
    ],
    exports: [RouterModule]
})

export class TestModule {}
