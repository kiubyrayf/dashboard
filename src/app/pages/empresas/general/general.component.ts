import { Component, OnInit } from '@angular/core';
import {EmpresasService} from '../../../shared/services/empresas/empresas.service';
import {EmpresaModel} from '../../../shared/model/empresas/empresa.model';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
