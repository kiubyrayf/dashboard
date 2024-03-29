import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Config } from '../../../config/index';
import { HttpInterface } from '../../../interface/services/http/http.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private config: any;
    private routes: any;
    public _SESSION_TOKEN_NAME: string;
    public _SESSION_USER_DATA: string;
    public showLoader = false;

    constructor(
      private httpService: HttpClient
    ) {
      this.config = Config,
      this._SESSION_TOKEN_NAME = 'token',
      this._SESSION_USER_DATA = 'user',
      this.routes = {
        validate: 'auth/validate',
        login: 'auth/login'
      };
    }

    loginPromise(user: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
          this.showLoader = true;
          password = btoa(password);
          this.httpService.post(`${this.config.api}${this.routes.login}`, {
            user,
            password
          }).subscribe((response: HttpInterface) => {
            if (response.status === 1) {
               localStorage.setItem(this._SESSION_TOKEN_NAME, btoa(response.data[0].token));
                this.validateToken().then(() => {
                  resolve(true);
                }).catch((err) => {
                  console.log(err);
                  this.showLoader = false;
                  reject(false);
                });
            } else {
                this.showLoader = false;
                reject(false);
            }
          }, (err) => {
              this.showLoader = false;
              reject(false);
          });
        });
      }

    logout(): void {
        localStorage.removeItem(this._SESSION_TOKEN_NAME);
        localStorage.removeItem(this._SESSION_USER_DATA);
        this.showLoader = false;
    }

    getToken() { // lee el toquen
        const tokenEncoded: string = localStorage.getItem(this._SESSION_TOKEN_NAME);
        const token = (tokenEncoded !== null) ? atob(tokenEncoded) : null;
        return token;
    }

    validateToken(): any {
        return new Promise((resolve, reject) => {
            const token = this.getToken();
            if (token === null) {
              localStorage.removeItem(this._SESSION_USER_DATA);
              reject();
            } else {
            // Token validation
            this.httpService.post(`${this.config.api}${this.routes.validate}`, {
                token
            }).subscribe((response: HttpInterface) => {
              if (response.status === 1) {
              this.setUserData(response.data[0]);
               resolve(true);
                } else {
                  localStorage.removeItem(this._SESSION_USER_DATA);
                  reject(false);
                }
            }, (err) => {
                localStorage.removeItem(this._SESSION_USER_DATA);
                reject(false);
            });
            }
        });
    }

    setUserData(data: any) {
        localStorage.setItem(this._SESSION_USER_DATA, JSON.stringify(data));
    }

    async getUserData() {
      const jsonData = await localStorage.getItem(this._SESSION_USER_DATA);
      return JSON.parse(jsonData);

    }
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null ) ? true : false; // !==
    }
}
