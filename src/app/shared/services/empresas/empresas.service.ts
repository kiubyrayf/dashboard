import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get(`${this.config.api}/business?page=${page}`); // business?page=2&name=XTEN&id=46
  }
  getEmpresa(id: any): Observable<any> {
    return this.http.get(`${this.config.api}/business?id=${id}`); // business?page=2&name=XTEN&id=46
  }
  crearEmpresa(empresa): Observable<any> {
    return this.http.post(`${this.config.api}/business`, empresa);
  }
  borrarBusiness(id: string): Observable<any> {
   return this.http.delete(`${this.config.api}/business?id=${id}`);
  }
  actualizarEmpresa(empresa, id) {
    return this.http.put(`${this.config.api}/business?id=${id}`, empresa);
  }
}
