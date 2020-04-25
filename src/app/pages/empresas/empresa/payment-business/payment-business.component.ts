import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-payment-business',
  templateUrl: './payment-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PaymentBusinessComponent implements OnInit {
  public payForm: FormGroup;
  public submitted = false;
  public allData = FormData;
  public form: any;

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.payForm = new FormGroup({
      closingDocument: new FormControl('', Validators.required, ),
      serviceWarranty: new FormControl('', Validators.required, ),
      servicesPrice: new FormGroup({
        foreign: new FormControl('', Validators.required, ),
        viaticForeign:  new FormControl('', Validators.required, ),
        local:  new FormControl('', Validators.required, ),
        viaticLocal: new FormControl('', Validators.required, ),
        visitNotRealized:  new FormControl('', Validators.required, ),
        visitRealized:  new FormControl('', Validators.required, ),
        endingPrice:  new FormControl('', Validators.required, ),
        disscount:  new FormControl('', Validators.required, )
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.payForm.valid) {
      return false;
    }
    return true;
  }

  success() {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Your all steps done!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  ngOnInit() {  }
}