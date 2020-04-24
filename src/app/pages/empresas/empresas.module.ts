import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { GeneralComponent } from './general/general.component';
import { EmpresaComponent } from './empresa/empresa.component';



@NgModule({
  declarations: [
    GeneralComponent,
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class EmpresasModule { }
