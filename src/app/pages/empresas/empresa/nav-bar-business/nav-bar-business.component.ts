import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavBarBusinessComponent implements OnInit {

  empresa: EmpresaModel;

  constructor() {
   }

  ngOnInit() { }

}
