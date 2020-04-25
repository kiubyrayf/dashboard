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
  recuerdame: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    ) {
      this.loginForm = fb.group({
        user: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        recuerdame: ['', , ],
    });
  }

  ngOnInit() {
    console.log(atob('YWRtaW5pc3RyYWRvcjEyMzQ1Nj8='));
  }

  login(loginForm: any) {
  
    console.log(loginForm.value);
    console.log(loginForm.valid);

 /* this.auth.login( this.loginForm.value['user'], this.loginForm.value['password']).subscribe (result => {;
     console.log(result.status);
    if (result.status === 1) {
        this.router.navigate(['dashboard/default']);
      }
      console.log('Usuario Invalido ps no valida el token logincomponentTS');
    });*/
 /* this.auth.login( this.loginForm.value['user'], this.loginForm.value['password'])
    .then(async () => {
      await this.auth.validateToken();
      this.router.navigate(['dashboard/default']);
    })
    .catch (() => {
      console.log('Usuario Invalido ps no valida el token logincomponentTS');
    });*/
  }

}
