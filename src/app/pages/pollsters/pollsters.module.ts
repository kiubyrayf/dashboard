import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { PollstersRoutingModule } from './pollsters-routing.module';
import { PollsterComponent } from './pollster/pollster.component';
import { PollstersComponent } from './pollsters/pollsters.component';

@NgModule({
  declarations: [
    PollsterComponent,
    PollstersComponent
  ],
  imports: [
    CommonModule,
    PollstersRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    NgbPaginationConfig
  ]
})
export class PollstersModule { }
