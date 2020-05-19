import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit, OnChanges {

  private empresaList: any;
  public contactForm: FormGroup;
  public contactList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup()  {
    return (this.contactForm.get('contact') as FormArray).controls;
  }
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      contact: this.fb.array([this.createContact()])
    });
  }

  ngOnInit() {
    this.contactList = this.contactForm.get('contact') as FormArray;
  }
  ngOnChanges(): void {
   // this.contactForm.patchValue(this.businessData.contact);

     /*  this.contactForm.get('job').patchValue(this.businessData.contact.job);
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
 */
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
    const contact: any = [];
    let i = 0;
    for (let contacts of this.contactFormGroup) {
     // console.log('1' + this.getContactsFormGroup(i).get('paymentPerson').value);
     // console.log('2' + this.contactForm.get(['contact', i]).get('paymentPerson').value);
     contact.push({
        job: this.contactForm.get(['contact', i]).get('job').value,
        phoneNumber: this.contactForm.get(['contact', i]).get('phoneNumber').value,
        email: this.contactForm.get(['contact', i]).get('email').value,
        paymentPerson: this.contactForm.get(['contact', i]).get('paymentPerson').value,
        fax: this.contactForm.get(['contact', i]).get('fax').value,
        schedule: {
          mondayStart: this.contactForm.get(['contact', i]).get('schedule').value.mondayStart,
          mondayEnd: this.contactForm.get(['contact', i]).get('schedule').value.mondayEnd,
          tuesdayStart: this.contactForm.get(['contact', i]).get('schedule').value.tuesdayStart,
          tuesdayEnd: this.contactForm.get(['contact', i]).get('schedule').value.tuesdayEnd,
          wednesdayStart: this.contactForm.get(['contact', i]).get('schedule').value.wednesdayStart,
          wednesdayEnd: this.contactForm.get(['contact', i]).get('schedule').value.wednesdayEnd,
          thursdayStart: this.contactForm.get(['contact', i]).get('schedule').value.thursdayStart,
          thursdayEnd: this.contactForm.get(['contact', i]).get('schedule').value.thursdayEnd,
          fridayStart: this.contactForm.get(['contact', i]).get('schedule').value.fridayStart,
          fridayEnd: this.contactForm.get(['contact', i]).get('schedule').value.fridayEnd,
          saturdayStart: this.contactForm.get(['contact', i]).get('schedule').value.saturdayStart,
          saturdayEnd: this.contactForm.get(['contact', i]).get('schedule').value.saturdayEnd,
          sundayStart: this.contactForm.get(['contact', i]).get('schedule').value.sundayStart,
          sundayEnd: this.contactForm.get(['contact', i]).get('schedule').value.sundayEnd,
        },
      });
      i++;
    }
    this.contactList = contact;
  }
}
