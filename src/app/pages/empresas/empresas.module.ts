import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { GeneralComponent } from './general/general.component';
import { EmpresaComponent } from './empresa/empresa.component';

import { NavBarBusinessComponent } from './empresa/nav-bar-business/nav-bar-business.component';
import { InfoBusinessComponent } from './empresa/info-business/info-business.component';
import { ContactBusinessComponent } from './empresa/contact-business/contact-business.component';
import { PaymentBusinessComponent } from './empresa/payment-business/payment-business.component';
import { TimepickerComponent } from '../../components/base/timepicker/timepicker.component';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../components/icons/feather-icon/feather-icon.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    GeneralComponent,
    EmpresaComponent,
    InfoBusinessComponent,
    ContactBusinessComponent,
    PaymentBusinessComponent,
    TimepickerComponent,
    NavBarBusinessComponent,
    FeatherIconComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgbModule,
    FileUploadModule,
  ],
  providers: [
   NgbPaginationConfig
  ]
})
export class EmpresasModule { }
