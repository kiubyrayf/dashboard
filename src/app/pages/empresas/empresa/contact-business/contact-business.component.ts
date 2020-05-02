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
        sundayStart: new FormControl(''),
        sundayEnd: new FormControl(''),
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
        autoclose: true,
      }).find('input').change((e) => {
        this.contactForm.get('schedule').value[e.currentTarget.name] = e.currentTarget.value;
       /* if (e.currentTarget.formControlName === 'mondayStart') {
          this.contactForm.get('schedule').value.mondayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'mondayEnd') {
          this.contactForm.get('schedule').value.mondayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'tuesdayStart') {
          this.contactForm.get('schedule').value.tuesdayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'tuesdayEnd') {
          this.contactForm.get('schedule').value.tuesdayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'wednesdayStart') {
          this.contactForm.get('schedule').value.wednesdayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'wednesdayEnd') {
          this.contactForm.get('schedule').value.wednesdayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'thursdayStart') {
          this.contactForm.get('schedule').value.thursdayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'thursdayEnd') {
          this.contactForm.get('schedule').value.thursdayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'fridayStart') {
          this.contactForm.get('schedule').value.fridayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'fridayEnd') {
          this.contactForm.get('schedule').value.fridayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'saturdayStart') {
          this.contactForm.get('schedule').value.saturdayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'saturdayEnd') {
          this.contactForm.get('schedule').value.saturdayEnd = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'sundayStart') {
          this.contactForm.get('schedule').value.sundayStart = e.currentTarget.value;
        }
        if (e.currentTarget.formControlName === 'sundayEnd') {
          this.contactForm.get('schedule').value.sundayEnd = e.currentTarget.value;
        }*/
      });
    });
  }

   addEmpresa() {
    const empresa = {
      job: this.contactForm.get('job').value,
      phoneNumber: this.contactForm.get('phoneNumber').value,
      email: this.contactForm.get('email').value,
      paymentPerson: this.contactForm.get('paymentPerson').value,
      fax: this.contactForm.get('fax').value,
      schedule: {
        // tslint:disable-next-line: max-line-length
        mondayStart: (this.contactForm.get('schedule').value.mondayStart !== '') ? this.contactForm.get('schedule').value.mondayStart : null,
        mondayEnd: (this.contactForm.get('schedule').value.mondayEnd !== '') ? this.contactForm.get('schedule').value.mondayEnd : null,
        // tslint:disable-next-line: max-line-length
        tuesdayStart: (this.contactForm.get('schedule').value.tuesdayStart !== '') ? this.contactForm.get('schedule').value.tuesdayStart : null,
        tuesdayEnd: (this.contactForm.get('schedule').value.tuesdayEnd !== '') ? this.contactForm.get('schedule').value.tuesdayEnd : null,
        // tslint:disable-next-line: max-line-length
        wednesdayStart: (this.contactForm.get('schedule').value.wednesdayStart !== '') ? this.contactForm.get('schedule').value.wednesdayStart : null,
        // tslint:disable-next-line: max-line-length
        wednesdayEnd: (this.contactForm.get('schedule').value.wednesdayEnd !== '') ? this.contactForm.get('schedule').value.wednesdayEnd : null,
        // tslint:disable-next-line: max-line-length
        thursdayStart: (this.contactForm.get('schedule').value.thursdayStart !== '') ? this.contactForm.get('schedule').value.thursdayStart : null,
        // tslint:disable-next-line: max-line-length
        thursdayEnd: (this.contactForm.get('schedule').value.thursdayEnd !== '') ? this.contactForm.get('schedule').value.thursdayEnd : null,
        // tslint:disable-next-line: max-line-length
        fridayStart: (this.contactForm.get('schedule').value.fridayStart !== '') ? this.contactForm.get('schedule').value.fridayStart : null,
        fridayEnd: (this.contactForm.get('schedule').value.fridayEnd !== '') ? this.contactForm.get('schedule').value.fridayEnd : null,
        // tslint:disable-next-line: max-line-length
        saturdayStart: (this.contactForm.get('schedule').value.saturdayStart !== '') ? this.contactForm.get('schedule').value.saturdayStart : null,
        // tslint:disable-next-line: max-line-length
        saturdayEnd: (this.contactForm.get('schedule').value.saturdayEnd !== '') ? this.contactForm.get('schedule').value.saturdayEnd : null,
        // tslint:disable-next-line: max-line-length
        sundayStart: (this.contactForm.get('schedule').value.sundayStart !== '') ? this.contactForm.get('schedule').value.sundayStart : null,
        sundayEnd: (this.contactForm.get('schedule').value.sundayEnd !== '') ? this.contactForm.get('schedule').value.sundayEnd : null,
      },
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
}
