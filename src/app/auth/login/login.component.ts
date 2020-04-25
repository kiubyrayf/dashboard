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
export class LoginComponent implements OnInit {
 
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
        recuerdame: ['', ,]
    });
  }

  ngOnInit() {
    console.log(atob('YWRtaW5pc3RyYWRvcjEyMzQ1Nj8='));
    this.auth.validateToken().then(() => {
      this.router.navigate(['/dashboard/default']);
    }).catch(() => {
      console.log ('cacho aqui');
    });
  }

  login() { 
   this.auth.login( this.loginForm.value['user'], this.loginForm.value['password']).subscribe((response: HttpInterface) => {
     debugger;       
    if (response.status === 1) {
      localStorage.setItem(this.auth._SESSION_TOKEN_NAME, btoa(response.message));
      console.log(response);
    } 
    });
  }
}
