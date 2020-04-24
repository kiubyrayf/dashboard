import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/login/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  public loginForm: FormGroup;

  public errorMessage: any;

  user: string;
  pass: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    )
    {
    this.loginForm = fb.group({
      user: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.auth.login(this.user, this.pass).subscribe (result => {
      console.log('Esto regresa la API');
      console.log(result);
    });
  }

  updateUser(val: string) {
    this.user = val;
    console.log (this.user);
  }

  updatePassword(val: string) {
    this.pass = val;
    console.log (this.pass);
    console.log("usted es del mal");
  }


}
