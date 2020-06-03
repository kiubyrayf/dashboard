import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../../config/index';
import { IserviceList } from 'src/app/interface/business/serviceBusiness/iservice-list';
import { IserviceBusiness } from 'src/app/interface/business/serviceBusiness/iservice-business';
import { IserviceBusinessPut } from 'src/app/interface/business/serviceBusiness/iservice-business-put';
import { IserviceBusinessPost } from 'src/app/interface/business/serviceBusiness/iservice-business-post';

@Injectable({
  providedIn: 'root'
})
export class SeviceBusinessService {
  private config: any;

  constructor(private http: HttpClient) {
    this.config = Config;
  }

  getServiceList(): Observable<any> {
    return this.http.get(`${this.config.api}/business/services/list`);
  }

  getServiceBusiness(businessId: number): Observable<any> {
    return this.http.get(`${this.config.api}/business/services?businessId=${businessId}`);
  }

  deleteServiceBusiness(id: string, businessId: string): Observable<any> {
    return this.http.delete(`${this.config.api}/business/services?businessId=${businessId}&id=${id}`);
  }

  postSocialReason(ServiceBusiness): Observable<any> {
    return this.http.post(`${this.config.api}/business/services`, ServiceBusiness);
  }

  putServiceBusiness(ServiceBusiness): Observable<any> {
    return this.http.put(`${this.config.api}/business/services`, ServiceBusiness);
  }
}

