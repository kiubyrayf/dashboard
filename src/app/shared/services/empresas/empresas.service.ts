import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from '../../model/empresas/empresa.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {

  constructor(private http: HttpClient) { }
}

export Class modelo {
  nombre: string;
}
