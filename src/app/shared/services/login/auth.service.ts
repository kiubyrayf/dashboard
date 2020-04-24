import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Config } from '../../../config/index';
import { HttpInterface } from '../../../interface/services/http/http.response.interface';

export class AuthService {
    private config: any;
    private routes: any;
    private _SESSION_TOKEN_NAME: string;
    private _SESSION_USER_DATA: string;
    public showLoader: boolean = false;

    constructor(
      private httpService: HttpClient
    ) {
      this.config = Config;
      this._SESSION_TOKEN_NAME = '_token';
      this._SESSION_USER_DATA = '_user_data';
      this.routes = {
        validate: 'security/validate',
        login: 'security/auth'
      };
    }

    login(userName: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
          password = btoa(password);
          this.httpService.post(`${this.config.api}${this.routes.login}`, {
            userName,
            password
          }).subscribe((response: HttpInterface) => {
            if (response.status === 200) {
              localStorage.setItem(this._SESSION_TOKEN_NAME, btoa(response.message));
              resolve(true);
            } else {
              reject(false);
            }
          }, (err) => {
            reject(false);
          });
        });
      }
    
    logout(): void {
        localStorage.removeItem(this._SESSION_TOKEN_NAME);
        localStorage.removeItem(this._SESSION_USER_DATA);
        this.showLoader = false;
    }
    
    getToken() {
        let tokenEncoded: string = localStorage.getItem(this._SESSION_TOKEN_NAME);
        let token = (tokenEncoded !== null) ? atob(tokenEncoded) : null;
        return token;
    }
    
    validateToken(): any {
        return new Promise((resolve, reject) => {
            let token = this.getToken();
            if (token === null) {
            localStorage.removeItem(this._SESSION_USER_DATA);
            reject();
            } else {
            // Token validation
            this.httpService.post(`${this.config.api}${this.routes.validate}`, {
                token
            }).subscribe((response: HttpInterface) => {
                if (response.status === 200) {
                this.setUserData(response.message);
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
}
