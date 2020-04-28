import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/login/auth.service';
import { HttpInterface } from 'src/app/interface/services/http/http.response.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private toaster: ToastrService
    ) {
      this.loginForm = fb.group({
        user: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        recuerdame: ['', , ]
    });
  }

  ngOnInit(): void {
    this.auth.validateToken().then(() => {
      this.router.navigate(['dashboard', 'default']);
    }).catch(() => {
      console.log('invalido');
    });
  }

  login() {
    this.auth.loginPromise(this.loginForm.value['user'], this.loginForm.value['password']).then(() => {
      this.router.navigate(['dashboard', 'default']);
    }).catch(() => {
      this.errorMessage = 'Ingrese usuario y contraseña';
      this.toaster.error(this.errorMessage);
    });
    /*
   this.auth.login(this.loginForm.value['user'], this.loginForm.value['password']).subscribe((response) => {
   if (response.status === 1) {
      localStorage.setItem(this.auth._SESSION_TOKEN_NAME, response.data[0].token);
      localStorage.setItem(this.auth._SESSION_USER_DATA, "user");
      this.router.navigate(['dashboard/default']);
    }
    this.errorMessage = response.message;
    });
  */
  }

}
