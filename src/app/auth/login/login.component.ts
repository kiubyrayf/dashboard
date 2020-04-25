import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/login/auth.service';
import { HttpInterface } from 'src/app/interface/services/http/http.response.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  recuerdame: boolean = false;
  public loginForm: FormGroup;
  public errorMessage = "Ingrese usuario y contraseña";
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    ) {
      this.loginForm = fb.group({
        user: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        recuerdame: ['', ,]

    });
  }

  login() { 
   this.auth.login( this.loginForm.value['user'], this.loginForm.value['password']).subscribe((response) => {
     debugger;
    if (response.status === 1) {
      let user = [{user: this.loginForm.value['user'], role: "", var:""}]; 
      localStorage.setItem(this.auth._SESSION_USER_DATA, JSON.stringify(user))
      localStorage.setItem(this.auth._SESSION_TOKEN_NAME, JSON.stringify(response.data));
      this.router.navigate(['dashboard/default']);
    }
    this.errorMessage = response.message;
    });
  }
}
