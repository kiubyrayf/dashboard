import { Component, OnInit, AfterViewInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';

declare const $;

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit, AfterViewInit {
  @Output() data: EventEmitter<any>;
  private empresaList: any;
  public contactForm: FormGroup;
  public border_validation = false;
  public form: any;
  public title = 'contact registration page';

  constructor(private route: Router, private fb: FormBuilder) {
    this.data = new EventEmitter();
    this.empresaList = {};
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = new FormGroup({
      job:  new FormControl('', Validators.required, ),
      phoneNumber:  new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentPerson: new FormControl('', Validators.required, ),
      fax:  new FormControl('', [Validators.required ] ),
      schedule: new FormGroup({
        mondayStart: new FormControl(''),
        mondayEnd: new FormControl(''),
        tuesdayStart: new FormControl(''),
        tuesdayEnd: new FormControl(''),
        wednesdayStart: new FormControl(''),
        wednesdayEnd: new FormControl(''),
        thursdayStart: new FormControl(''),
        thursdayEnd: new FormControl(''),
        fridayStart: new FormControl(''),
        fridayEnd: new FormControl(''),
        saturdayStart: new FormControl(''),
        saturdayEnd: new FormControl(''),
      }),
    });
  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('.clockpicker').clockpicker({
        donetext: 'Cerrar'
      });
    });
  }

   addEmpresa(){
    const empresa = {
      job: this.contactForm.get('job').value,
      phoneNumber: this.contactForm.get('phoneNumber').value,
      email: this.contactForm.get('email').value,
      paymentPerson: this.contactForm.get('paymentPerson').value,
      fax: this.contactForm.get('fax').value,
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
}
