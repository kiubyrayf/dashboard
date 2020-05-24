import { Injectable } from '@angular/core';
import { Observable, observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgInfoService {
  private message = new BehaviorSubject('');
  public sharedMessage = this.message.asObservable();

  constructor() { 
  }

  setData(message: string) {
    this.message.next(message);
  }
  
}
