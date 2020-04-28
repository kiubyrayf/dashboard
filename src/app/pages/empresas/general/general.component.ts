import { Component, OnInit } from '@angular/core';
import {EmpresasService} from '../../../shared/services/empresas/empresas.service';
import {EmpresaModel} from '../../../shared/model/empresas/empresa.model';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  empresas: EmpresaModel[] = [];
  cargando = false;
 
  constructor(private empresaService: EmpresasService ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.empresaService.getEmpresas().subscribe((resp) => {
      this.empresas = resp;
      this.cargando = false;
      console.log(resp);
      console.log(this.empresas);
    });
    /*this.empresaService.post().subscribe( response =>
      console.log('Respuesta del servicio', response)
    );*/
  }

}
