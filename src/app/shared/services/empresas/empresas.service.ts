import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from '../../../config/index';
import { RequestOptions } from '@angular/http';

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

  crearEmpresaTest(empresa): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data;',
      'name': empresa.name,
      'contact': JSON.stringify(empresa.contact),
      'email': empresa.email,
      'phoneNumber': empresa.phoneNumber
      //..Aqui se ponen los de mas, cuando el param es un objeto se usa json stringify
     });
    let options = { headers: headers };
    
    //Se meten los headrs al post
    return this.http.post(`${this.config.api}/business`, empresa, options);
  }
}
