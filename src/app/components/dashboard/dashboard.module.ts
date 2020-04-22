import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultComponent } from './default/default.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { UniversityComponent } from './university/university.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { ServerComponent } from './server/server.component';
import { ProjectComponent } from './project/project.component';
import { TestComponent } from './test/test.component';
import { NavBarBusinessComponent } from './test/nav-bar-business/nav-bar-business.component';
import { ContactBusinessComponent } from './test/contact-business/contact-business.component';
import { InfoBusinessComponent } from './test/info-business/info-business.component';
import { PaymentBusinessComponent } from './test/payment-business/payment-business.component';
import { ArchwizardModule } from 'angular-archwizard';
import { TimepickerComponent } from '../base/timepicker/timepicker.component';

@NgModule({
  declarations: [
    DefaultComponent,
    ECommerceComponent,
    UniversityComponent,
    BitcoinComponent,
    ServerComponent,
    ProjectComponent,
    TestComponent,
    NavBarBusinessComponent,
    ContactBusinessComponent,
    InfoBusinessComponent,
    PaymentBusinessComponent,
    TimepickerComponent
  ],
  exports: [
    DefaultComponent,
    ECommerceComponent,
    UniversityComponent,
    BitcoinComponent,
    ServerComponent,
    ProjectComponent,
    TestComponent,
    NavBarBusinessComponent,
    ContactBusinessComponent,
    InfoBusinessComponent,
    PaymentBusinessComponent,
    TimepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    DashboardRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    ArchwizardModule,
  ]
})
export class DashboardModule { }
