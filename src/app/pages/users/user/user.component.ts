import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MustMatch } from './mustMatch';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public fileName: string;
  public logoName: string;
  public userForm: FormGroup;
  public roles: string [];
  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.roles = ['Admin', 'Mesa de Control', 'Capturista'];
  }
   // create form
  createForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required, ),
      middle: new FormControl('', Validators.required, ),
      lastname: new FormControl('', Validators.required, ),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ),
      password: new FormControl('', [Validators.required, Validators.minLength(6)], ),
     // confirmPassword: new FormControl('', [Validators.required], ),
      photography: new FormControl('', Validators.required, ),
      business: new FormControl('', Validators.required, ),
      rol: new FormControl('null', Validators.required, ),
    }, /* {
      validator: MustMatch('password', 'confirmPassword')
    }*/);
  }
  addUser() {}
  readFile(e) {}
}
