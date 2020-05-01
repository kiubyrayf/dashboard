import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { EmpresaModelNew } from 'src/app/shared/model/empresas/empresa.model';

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavBarBusinessComponent implements OnInit {

  @Input() empresaInfo: EmpresaModelNew;

  constructor() {
   }

  ngOnInit() { }

}
