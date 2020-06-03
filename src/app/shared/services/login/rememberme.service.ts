import { Injectable } from '@angular/core';
import { Rememberme } from '../../../interface/services/login/rememberme.interface';

@Injectable({
  providedIn: 'root'
})
export class RemembermeService {

  private data: Rememberme | any;
  private name: string;
  constructor() {
    this.name = '_credentials';
  }

  // Get the credentials from localStorage
  getCredentials() {
    this.data = localStorage.getItem(this.name);
    if (this.data !== null) {
      this.unprotectCredentials();
    } else {
      this.data = {
        username: null,
        password: null,
        rememberme: false
      };
    }
    return this.data;
  }

  // Set credentials in localStorage
  setCredentials(data: Rememberme) {
    this.data = data;
    this.protectCredentials();
    localStorage.setItem(this.name, JSON.stringify(this.data));
  }

  // Remove all the saved credentials
  removeCredentials() {
    localStorage.removeItem(this.name);
  }

  // Unprotect credentials by base64
  unprotectCredentials() {
    this.data = JSON.parse(this.data);
    this.data.username = atob(this.data.username);
    this.data.password = atob(this.data.password);
  }

  // Protect credentials by base64
  protectCredentials() {
    this.data.username = btoa(this.data.username);
    this.data.password = btoa(this.data.password);
  }

}
