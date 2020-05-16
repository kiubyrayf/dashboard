import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
  constructor(private fb: FormBuilder) {

    this.createForm();
  }

  ngOnInit(): void {
    this.roles = ['Admin', 'Mesa de Control', 'Capturista'];
  }
   // create form
  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required, ],
      middle: ['', Validators.required, ],
      lastname: ['', Validators.required, ],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ],
      password: ['', [Validators.required, Validators.minLength(6)], ],
     // confirmPassword: ['', [Validators.required], ],
      photography: ['', Validators.required, ],
      business: ['', Validators.required, ],
      rol: ['null', Validators.required, ],
    }, /* {
      validator: MustMatch('password', 'confirmPassword')
    }*/);
  }
  addUser() {}
  readFile(e) {}
}
