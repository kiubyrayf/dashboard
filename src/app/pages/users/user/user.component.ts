import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './mustMatch';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public fileName: string;
  public logoName: string;
  public Fform: FormGroup;
  public roles: string [];
  public flagData: boolean;

  // convenience getter for easy access to form fields
  get f() { return this.Fform.controls; }
  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute) {

    this.createForm();
  }

  ngOnInit(): void {
    this.roles = ['Admin', 'Mesa de Control', 'Capturista'];
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.flagData = true;
    }
  }
   // create form
  createForm() {
    this.Fform = this.fb.group({
      name: ['', Validators.required, ],
      middle: ['', Validators.required, ],
      lastname: ['', Validators.required, ],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
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
