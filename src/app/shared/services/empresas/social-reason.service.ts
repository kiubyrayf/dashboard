import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../../config/index';
import { IsocialReason } from 'src/app/interface/business/isocial-reason';

@Injectable({
  providedIn: 'root'
})
export class SocialReasonService {
  private config: any;

  constructor(private http: HttpClient) {
    this.config = Config;
  }

  getSocialReason(businessId: number): Observable<IsocialReason> {
    return this.http.get<IsocialReason>(`${this.config.api}/business/socialreason?businessId=${businessId}`);
  }

  deleteSocialReason(id: number, businessId: number): Observable<any> {
    return this.http.delete(`${this.config.api}/business/socialreason?businessId=${businessId}&id=${id}`);
  }

  postSocialReason(socialReason): Observable<IsocialReason> {
    return this.http.post<IsocialReason>(`${this.config.api}/business/socialreason`, socialReason);
  }

  putSocialReason(socialReason): Observable<IsocialReason> {
    return this.http.put<IsocialReason>(`${this.config.api}/business/socialreason`, socialReason);
  }
}
