import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { ImgUploadSComponent } from 'src/app/shared/components/img-upload-s/img-upload-s.component';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    ImgUploadSComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
   NgbPaginationConfig
  ]
})
export class UsersModule { }
