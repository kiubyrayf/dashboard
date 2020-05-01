import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from '../../model/empresas/empresa.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from '../../../config/index';

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {
  private config: any;

  constructor(private http: HttpClient) {
    this.config = Config;
  }

  getEmpresas(): Observable<any> {
    return this.http.get(`${this.config.api}/business?page=1&name=XTEN&id=8`);
  }

  crearEmpresa(empresa: EmpresaModel): Observable<any> {
    return this.http.post(`${this.config.api}/business`, empresa);
  }

 /* private crearArreglo(empresasObj: object) {
    const empresas: EmpresaModel[] = [];

    if (empresasObj === null) {
      return [];
    }

    Object.keys(empresasObj).forEach((key) => {
      const empresa: EmpresaModel = empresasObj[key];
      empresa.id = key; // empresa deberia tener un id
      empresas.push(empresa);
    });
    return empresas;
  }*/

}
