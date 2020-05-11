import { Component, OnInit, AfterViewInit, ViewEncapsulation, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { BusinessInterface } from 'src/app/interface/business/business.interface';
import * as moment from 'moment';

declare const $;

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit, AfterViewInit, OnChanges {
  @Output() data: EventEmitter<any>;
  
  @Input() businessData: BusinessInterface;
  @Input() flagDataInfo: boolean;

  private empresaList: any;
  public contactForm: FormGroup;
  public border_validation = false;
  public form: any;
  public title = 'contact registration page';

  constructor(private route: Router, private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private empresaService: EmpresasService
    ) {
    this.data = new EventEmitter();
    this.empresaList = {};
    this.createContactForm();
    this.businessData = null;
    this.flagDataInfo = false;
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

  showSundayStart() {
    if ( this.businessData.contact.schedule.sundayStart !== null) {
      return  moment.utc(this.businessData.contact.schedule.sundayStart).format('HH:mm');
    } else {
      return null;

    }
  }
  ngOnChanges(): void {
    if (this.flagDataInfo === true) {
      // this.contactForm.patchValue(this.businessData.contact);
      
      this.contactForm.get('job').patchValue(this.businessData.contact.job);
      this.contactForm.get('phoneNumber').patchValue(this.businessData.contact.phoneNumber);
      this.contactForm.get('email').patchValue(this.businessData.contact.email);
      this.contactForm.get('paymentPerson').patchValue(this.businessData.contact.paymentPerson);
      this.contactForm.get('fax').patchValue(this.businessData.contact.fax);

      this.contactForm.get('schedule').get('mondayStart').patchValue(moment.utc(this.businessData.contact.schedule.mondayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('mondayEnd').patchValue(moment.utc(this.businessData.contact.schedule.mondayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('tuesdayStart').patchValue(moment.utc(this.businessData.contact.schedule.tuesdayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('tuesdayEnd').patchValue(moment.utc(this.businessData.contact.schedule.tuesdayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('wednesdayStart').patchValue(moment.utc(this.businessData.contact.schedule.wednesdayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('wednesdayEnd').patchValue(moment.utc(this.businessData.contact.schedule.wednesdayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('thursdayStart').patchValue(moment.utc(this.businessData.contact.schedule.thursdayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('thursdayEnd').patchValue(moment.utc(this.businessData.contact.schedule.thursdayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('fridayStart').patchValue(moment.utc(this.businessData.contact.schedule.fridayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('fridayEnd').patchValue(moment.utc(this.businessData.contact.schedule.fridayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('saturdayStart').patchValue(moment.utc(this.businessData.contact.schedule.saturdayStart).format('HH:mm'));
      this.contactForm.get('schedule').get('saturdayEnd').patchValue(moment.utc(this.businessData.contact.schedule.saturdayEnd).format('HH:mm'));

      this.contactForm.get('schedule').get('sundayStart').patchValue(this.showSundayStart());
      this.contactForm.get('schedule').get('sundayEnd').patchValue(moment.utc(this.businessData.contact.schedule.sundayEnd).format('HH:mm'));

    }
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
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.mondayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return null;

    }
  }
  createMondayEnd() {
    if (this.contactForm.get('schedule').value.mondayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.mondayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return isoDate;
    } else {
      return null;

    }
  }
  createTuesdayStart() {
    if (this.contactForm.get('schedule').value.tuesdayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.tuesdayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return  null;

    }
  }
  createTuesdayEnd() {
    if (this.contactForm.get('schedule').value.tuesdayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.tuesdayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return isoDate;
    } else {
      return null;

    }
  }
  createWednesdayStart() {
    if (this.contactForm.get('schedule').value.wednesdayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.wednesdayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return  null;

    }
  }
  createWednesdayEnd() {
    if (this.contactForm.get('schedule').value.wednesdayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.wednesdayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return   isoDate;
    } else {
      return  null;

    }
  }
  createThursdayStart() {
    if (this.contactForm.get('schedule').value.thursdayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.thursdayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return null;

    }
  }
  createThursdayEnd() {
    if (this.contactForm.get('schedule').value.thursdayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.thursdayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return isoDate;
    } else {
      return null;

    }
  }
  createFridayStart() {
    if (this.contactForm.get('schedule').value.fridayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.fridayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return isoDate;
    } else {
      return  null;

    }
  }
  createFridayEnd() {
    if (this.contactForm.get('schedule').value.fridayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.fridayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return null;

    }
  }
  createSaturdayStart() {
    if (this.contactForm.get('schedule').value.saturdayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.saturdayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return null;

    }
  }
  createSaturdayEnd() {
    if (this.contactForm.get('schedule').value.saturdayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.saturdayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return  null;

    }
  }
  createSundayStart() {
    if (this.contactForm.get('schedule').value.sundayStart !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.sundayStart);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return  isoDate;
    } else {
      return  null;

    }
  }
  createSundayEnd() {
    if (this.contactForm.get('schedule').value.sundayEnd !== '') {
      const nowDate = moment().format('YYYY-MM-DD');
      const date = new Date( `${nowDate} ` + this.contactForm.get('schedule').value.sundayEnd);
      const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return   isoDate;
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
  }
}
