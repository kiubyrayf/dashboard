import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getEmpresas(page: number): Observable<any> {
    return this.http.get(`${this.config.api}/business?page=${page}`); // &name=XTEN&id=8
  }

  crearEmpresa(empresa): Observable<any> {
    return this.http.post(`${this.config.api}/business`, empresa);
  }
}
