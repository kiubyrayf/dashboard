import { Component, OnInit, AfterViewInit, ViewEncapsulation, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
      console.log(this.businessData.contact);
      this.contactForm.setControl('contact', this.existingContact(this.businessData.contact));
      for (const contact of this.businessData.contact) {
       
        console.log(contact.job);
      }
      // this.contactForm.patchValue(this.businessData.contact);

     /*  this.contactForm.get('job').patchValue(this.businessData.contact.job);
      this.contactForm.get('schedule').get('sundayEnd').patchValue(moment.utc(this.businessData.contact.schedule.sundayEnd).format('HH:mm'));
 */
    }
  }
  existingContact( contactSet: any[] ): FormArray {
    const formArray = new FormArray([]);
    contactSet.forEach(element => {
      this.fb.group({
        job:  element.job,
       /*  phoneNumber:  ,
        email: ,
        paymentPerson: ,
        fax:  ,
        schedule: this.fb.group({
          mondayStart: ,
          mondayEnd: ,
          tuesdayStart: ,
          tuesdayEnd: ,
          wednesdayStart: ,
          wednesdayEnd: ,
          thursdayStart: ,
          thursdayEnd: ,
          fridayStart: ,
          fridayEnd: ,
          saturdayStart: ,
          saturdayEnd: ,
          sundayStart: ,
          sundayEnd: , */
      });
    });
  }
  ngAfterViewInit() {
   /*  $(document).ready(() => {
      $('.clockpicker').clockpicker({
        autoclose: true,
      }).find('input').change((e) => {
        this.contactForm.get('schedule').value[e.currentTarget.name] = e.currentTarget.value;
      });
    }); */
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

 /*  showSundayStart() {
    if ( this.businessData.contact.schedule.sundayStart !== null) {
      return  moment.utc(this.businessData.contact.schedule.sundayStart).format('HH:mm');
    } else {
      return null;

    }
  } */

  addEmpresa() {
    const empresa: any = [];
    for (const contact of this.contactFormGroup) {
     // console.log('1' + this.getContactsFormGroup(i).get('paymentPerson').value);
     // console.log('2' + this.contactForm.get(['contact', i]).get('paymentPerson').value);
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
   /*  const empresa = {
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
      },      mondayEnd: this.contactForm.get(['contact', i]).get('schedule').value.mondayEnd,

    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList); */
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
