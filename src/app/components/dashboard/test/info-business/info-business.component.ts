import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  encapsulation: ViewEncapsulation.None
})

export class InfoBusinessComponent implements OnInit {
  public border_validation = false;
  public regForm: FormGroup;
  public title = 'registration page';
  public form: any;

  constructor(
    private route: Router
  ) {
    this.createForm();
  }

  // create form
  createForm() {
    this.regForm = new FormGroup({
      firstName: new FormControl('', Validators.required, ),
      email: new FormControl('', Validators.required, ),
      phoneNumber: new FormControl('', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      address: new FormGroup({
        street: new FormControl('', Validators.required, ),
        number: new FormControl('', Validators.required, ),
        cp: new FormControl('', [Validators.required], ),
        municipality: new FormControl('', Validators.required, ),
        suburb: new FormControl('', Validators.required, ),
      }),
      requestServiceByMail: new FormControl(''),
      selfFormat: new FormControl(''),
      logo: new FormControl('', Validators.required, ),
    });
//    console.log(this.regForm.get('address').get('street'));
  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;
  }

  ngOnInit() {  }

}
