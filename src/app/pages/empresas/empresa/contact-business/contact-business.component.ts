import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import * as moment from 'moment';
import { IBusinessGet, IContact } from 'src/app/interface/business/ibusiness-get';

declare const $;

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit, OnChanges {
  @Output() data: EventEmitter<any>;
  @Input() businessData: IBusinessGet;
  @Input() flagDataInfo: boolean;

  private empresaList: any;
  public contactForm: FormGroup;
  public contactList: FormArray;

   // returns all form groups under contacts
  get contactFormGroup()  {
    return (this.contactForm.get('contact') as FormArray).controls;
  }

  constructor(private route: Router, private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private empresaService: EmpresasService
    ) {
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
    this.contactForm = this.fb.group({
      contact: this.fb.array([this.createContact()])
    });
  }

  ngOnInit() {
    this.contactList = this.contactForm.get('contact') as FormArray;
  }

  ngOnChanges() {
    if (this.flagDataInfo === true) {
      this.contactForm.setControl('contact', this.existingContact(this.businessData.contact));
      // this.contactForm.patchValue(this.businessData.contact);
     /*  this.contactForm.get('job').patchValue(this.businessData.contact.job);
      this.contactForm.get('schedule').get('sundayEnd').patchValue(moment.utc(this.businessData.contact.schedule.sundayEnd).format('HH:mm'));
 */
    }
    this.contactList = this.contactForm.get('contact') as FormArray;
  }

  existingContact( contactSet: IContact[] ) { // :FormArray
    const formArray = new FormArray([]);
    contactSet.forEach(e => {
      formArray.push(this.fb.group({
        job: e.job,
        phoneNumber: e.phoneNumber ,
        email: e.email,
        paymentPerson: e.paymentPerson,
        fax: e.fax,
        schedule: this.fb.group({
          mondayStart: moment.utc(e.schedule.mondayStart).format('HH:mm'),
          mondayEnd: moment.utc(e.schedule.mondayEnd).format('HH:mm'),
          tuesdayStart: moment.utc(e.schedule.tuesdayStart).format('HH:mm'),
          tuesdayEnd: moment.utc(e.schedule.tuesdayEnd).format('HH:mm'),
          wednesdayStart: moment.utc(e.schedule.wednesdayStart).format('HH:mm'),
          wednesdayEnd: moment.utc(e.schedule.wednesdayEnd).format('HH:mm'),
          thursdayStart: moment.utc(e.schedule.thursdayStart).format('HH:mm'),
          thursdayEnd: moment.utc(e.schedule.thursdayEnd).format('HH:mm'),
          fridayStart: moment.utc(e.schedule.fridayStart).format('HH:mm'),
          fridayEnd: moment.utc(e.schedule.fridayEnd).format('HH:mm'),
          saturdayStart: moment.utc(e.schedule.saturdayStart).format('HH:mm'),
          saturdayEnd: moment.utc(e.schedule.saturdayEnd).format('HH:mm'),
          sundayStart: moment.utc(e.schedule.mondayStart).format('HH:mm'),
          sundayEnd: moment.utc(e.schedule.mondayEnd).format('HH:mm'),
        })
      }));
    });
    return formArray;
  }

  createContact(): FormGroup {
    return this.fb.group({
      job:  ['', Validators.required, ],
      phoneNumber:  ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      email: ['', [Validators.required, Validators.email]],
      paymentPerson: ['', Validators.required, ],
      fax:  ['' ],
      schedule: this.fb.group({
        mondayStart: [''],
        mondayEnd: [''],
        tuesdayStart: [''],
        tuesdayEnd: [''],
        wednesdayStart: [''],
        wednesdayEnd: [''],
        thursdayStart: [''],
        thursdayEnd: [''],
        fridayStart: [''],
        fridayEnd: [''],
        saturdayStart: [''],
        saturdayEnd: [''],
        sundayStart: [''],
        sundayEnd: [''],
      }),
    });
  }
   // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    return this.contactList.controls[index] as FormGroup;
  }

  addEmpresa() {
    const empresa: any = [];
    for (const contact of this.contactFormGroup) {
     empresa.push({
        job: contact.get('job').value,
        phoneNumber: contact.get('phoneNumber').value,
        email: contact.get('email').value,
        paymentPerson: contact.get('paymentPerson').value,
        fax: contact.get('fax').value,
        schedule: this.generateSchedule(contact.get('schedule').value)
      });
    }
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }

  generateSchedule(contactValue) {
    return {
      mondayStart: this.createDateIso(contactValue.mondayStart),
      mondayEnd: this.createDateIso(contactValue.mondayEnd),
      tuesdayStart: this.createDateIso(contactValue.tuesdayStart),
      tuesdayEnd: this.createDateIso(contactValue.tuesdayEnd),
      wednesdayStart: this.createDateIso(contactValue.wednesdayStart),
      wednesdayEnd: this.createDateIso(contactValue.wednesdayEnd),
      thursdayStart: this.createDateIso(contactValue.thursdayStart),
      thursdayEnd: this.createDateIso(contactValue.thursdayEnd),
      fridayStart: this.createDateIso(contactValue.fridayStart),
      fridayEnd: this.createDateIso(contactValue.fridayEnd),
      saturdayStart: this.createDateIso(contactValue.saturdayStart),
      saturdayEnd: this.createDateIso(contactValue.saturdayEnd),
      sundayStart: this.createDateIso(contactValue.sundayStart),
      sundayEnd: this.createDateIso(contactValue.sundayEnd),
    };
  }
  createDateIso(dateString) {
    if (dateString === '') {
      return null;
    }
    const nowDate = moment().format('YYYY-MM-DD');
    const date = new Date( `${nowDate} ` + dateString);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }
}

