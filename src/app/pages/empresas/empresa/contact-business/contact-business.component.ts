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

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('.clockpicker').clockpicker({
        autoclose: true,
      }).find('input').change((e) => {
        this.contactForm.get('schedule').value[e.currentTarget.name] = e.currentTarget.value;
      });
    });
  }

  createMondayStart() {
    if (this.contactForm.get('schedule').value.mondayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.mondayStart);
      return  date.toISOString();
    } else {
      return null;

    }
  }
  createMondayEnd() {
    if (this.contactForm.get('schedule').value.mondayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.mondayEnd);
      return date.toISOString();
    } else {
      return null;

    }
  }
  createTuesdayStart() {
    if (this.contactForm.get('schedule').value.tuesdayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.tuesdayStart);
      return  date.toISOString();
    } else {
      return  null;

    }
  }
  createTuesdayEnd() {
    if (this.contactForm.get('schedule').value.tuesdayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.tuesdayEnd);
      
      return date.toISOString();
    } else {
      return null;

    }
  }
  createWednesdayStart() {
    if (this.contactForm.get('schedule').value.wednesdayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.wednesdayStart);
      return  date.toISOString();
    } else {
      return  null;

    }
  }
  createWednesdayEnd() {
    if (this.contactForm.get('schedule').value.wednesdayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.wednesdayEnd);
      return   date.toISOString();
    } else {
      return  null;

    }
  }
  createThursdayStart() {
    if (this.contactForm.get('schedule').value.thursdayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.thursdayStart);
      return  date.toISOString();
    } else {
      return null;

    }
  }
  createThursdayEnd() {
    if (this.contactForm.get('schedule').value.thursdayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.thursdayEnd);
      return date.toISOString();
    } else {
      return null;

    }
  }
  createFridayStart() {
    if (this.contactForm.get('schedule').value.fridayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.fridayStart)
      return date.toISOString();
    } else {
      return  null;

    }
  }
  createFridayEnd() {
    if (this.contactForm.get('schedule').value.fridayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.fridayEnd);
      return  date.toISOString();
    } else {
      return null;

    }
  }
  createSaturdayStart() {
    if (this.contactForm.get('schedule').value.saturdayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.saturdayStart);
      return  date.toISOString();
    } else {
      return null;

    }
  }
  createSaturdayEnd() {
    if (this.contactForm.get('schedule').value.saturdayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.saturdayEnd);
      return  date.toISOString();
    } else {
      return  null;

    }
  }
  createSundayStart() {
    if (this.contactForm.get('schedule').value.sundayStart !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.sundayStart);
      return  date.toISOString();
    } else {
      return  null;

    }
  }
  createSundayEnd() {
    if (this.contactForm.get('schedule').value.sundayEnd !== '') {
      const date = new Date( '2020-01-01T' + this.contactForm.get('schedule').value.sundayEnd);
      return   date.toISOString();
    } else {
      return  null;
    }
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
        mondayStart: this.createMondayStart(),
        mondayEnd: this.createMondayEnd(),
        tuesdayStart: this.createTuesdayStart(),
        tuesdayEnd: this.createTuesdayEnd(),
        wednesdayStart: this.createWednesdayStart(),
        wednesdayEnd: this.createWednesdayEnd(),
        thursdayStart: this.createThursdayStart(),
        thursdayEnd: this.createThursdayEnd(),
        fridayStart: this.createFridayStart(),
        fridayEnd: this.createFridayEnd(),
        saturdayStart: this.createSaturdayStart(),
        saturdayEnd: this.createSaturdayEnd(),
        sundayStart: this.createSundayStart(),
        sundayEnd: this.createSundayEnd(),
      },
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
    console.log(this.empresaList);
  }
}
