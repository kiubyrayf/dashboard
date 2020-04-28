import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel, ContactModel } from '../../model/empresas/empresa.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  post(): Observable<any> {
    const formData = new FormData();
    formData.append('name', 'xtendedit');
    formData.append('contact', '{"id": 26,"job": "developer","phoneNumber": "8122078831","email": "jesus@isydoc.com","paymentPerson": "JESUS", "fax": "8122078831" }');
    formData.append('schedule', '{ "id": 26, "mondayStart": "2020-03-22T01:28:37.000Z","mondayEnd": "2020-03-22T01:28:37.000Z","tuesdayStart": "2020-03-22T01:28:37.000Z","tuesdayEnd": "2020-03-22T01:28:37.000Z","wednesdayStart": "2020-03-22T01:28:37.000Z","wednesdayEnd": "2020-03-22T01:28:37.000Z","thursdayStart": "2020-03-22T01:28:37.000Z","thursdayEnd": "2020-03-22T01:28:37.000Z","fridayStart": "2020-03-22T01:28:37.000Z","fridayEnd": "2020-03-22T01:28:37.000Z","saturdayStart": "2020-03-22T01:28:37.000Z","saturdayEnd": "2020-03-22T01:28:37.000Z","sundayStart": "2020-03-22T01:28:37.000Z"}');
    formData.append('email', 'esus@isydoc.com');
    formData.append('phoneNumber', '8122078831');
    formData.append('address', '{"street": "Rio de Janeiro","number": 315,"suburb": "San Isidro","cp": 66646,"municipality": null}');
    formData.append('requestServiceByMail', '0');
    formData.append('servicesPrice', '{"foreign": "10", "local": "20", "viaticForeign": "30", "viaticLocal": "40", "visitNotRealized": "50","visitRealized": "60","endingPrice": "70", "disscount": "80"}');
    formData.append('closingDocument', '[{"id": 2,"name": "2020225112947982open_mongod.py","file": "https://dev.sieesweb.com/Users/djsolis/Documents/asistemps/siw/backend/files/business/closingDocument/2020225112947982open_m"}]');
    formData.append('serviceWarranty', '0');
    formData.append('logo', 'https://dev.sieesweb.com/Users/djsolis/Documents/asistemps/siw/backend/files/business/closingDocument/2020225112947980google');
    formData.append('selfFormat', '0');

    return this.http.post<any>('https://apidev.sieesweb.com/business', formData, {reportProgress: true, observe: 'events' });
  }
}
