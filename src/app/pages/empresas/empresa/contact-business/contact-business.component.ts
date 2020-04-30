import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit {
  @Input() _empresa: EmpresaModel;
  public contactForm: FormGroup;
  public border_validation = false;
  public form: any;
  public title = 'contact registration page';

  constructor(private route: Router, private fb: FormBuilder) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = new FormGroup({
      job:  new FormControl('', Validators.required, ),
      phoneNumber:  new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentPerson: new FormControl('', Validators.required, ),
      fax:  new FormControl('', [Validators.required ] ),
      // schedule: new FormGroup({
       // mondayStart: new FormControl(''),
       // mondayEnd: new FormControl(''),
        /*tuesdayStart: ['', , ],
        tuesdayEnd: ['', , ],
        wednesdayStart: ['', , ],
        wednesdayEnd: ['', , ],
        thursdayStart: ['', , ],
        thursdayEnd: ['', , ],
        fridayStart: ['', , ],
        fridayEnd: ['', , ],
        saturdayStart: ['', , ],
        saturdayEnd: ['', , ],*/
      // }),
    });
  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;

  }

  ngOnInit() {
    function jQuery () {
      $('.clockpicker').clockpicker({
        placement: 'bottom',
        align: 'left',
        donetext: 'Cerrar'
      });
    }
   }

}
