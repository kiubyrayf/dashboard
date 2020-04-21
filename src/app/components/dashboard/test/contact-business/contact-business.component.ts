import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from './mustMatch';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit {

  // timepicker
  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (value.hour < 12) {
      return {tooEarly: true};
    }
    if (value.hour > 13) {
      return {tooLate: true};
    }
    return null;
  });

  public contactForm: FormGroup;
  public form: any;

  constructor(private route: Router, private fb: FormBuilder) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      emailAdd: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  ngOnInit() {  }

  
}
