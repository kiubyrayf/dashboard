import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { IBusinessGet } from 'src/app/interface/business/ibusiness-get';
import { Router } from '@angular/router';
import { IDivision, IcontactDivision } from 'src/app/interface/business/idivision';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-division-business',
  templateUrl: './division-business.component.html',
  styleUrls: ['./division-business.component.scss']
})

export class DivisionBusinessComponent implements OnInit, OnChanges {
  @Output() data: EventEmitter<any>;
  @Input() businessData: IBusinessGet;
  @Input() flagDataInfo: boolean;

  private empresaList: any;
  public contactList: FormArray;
  public divisionList: FormArray;
  public contactsList: any;
  public Fform: FormGroup;

  get divisionFormGroup()  {
    return (this.Fform.get('division') as FormArray).controls;
  }

  constructor(private route: Router, private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
    this.contactsList = [];
  }

  ngOnInit() {
    this.divisionList = this.Fform.get('division') as FormArray;
  }
  ngOnChanges() {
    console.log(this.contactsList);
   
    this.divisionList = this.Fform.get('division') as FormArray;

  }

  createForm() {
    this.Fform = this.fb.group({
      division: this.fb.array([this.createDivision()])
    });
  }
  createDivision(): FormGroup {
    return this.fb.group({
      name:  [''],
      contact: this.fb.array([
        this.createContact()
      ]),
    });

  }
  createContact() {
    return this.fb.group({
      job:  [''],
      phoneNumber:  [''],
      email: [''],
      paymentPerson: [''],
      fax:  [''],
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

  setContact(event) {
    console.log(event);
    const divisionId = event.divisionIndex;
    const contacts = event.contacts;
  
    const newContactArray: FormArray = this.existingContact(contacts);
    /*this.getDivisionFormGroup(divisionId).get('contact').reset(); */
    this.getDivisionFormGroup(divisionId).setControl('contact', newContactArray);
    console.log(this.getDivisionFormGroup(divisionId));
  }

existingContact( contactSet: IcontactDivision[] ) {
    const formArray = this.fb.array([]);
    
    contactSet.forEach(e => {
      formArray.push(this.fb.group({
        job: e.job,
        phoneNumber: e.phoneNumber,
        email: e.email,
        paymentPerson: e.paymentPerson,
        fax: e.fax,
        schedule: this.fb.group({
          mondayStart: e.schedule.mondayStart,
          mondayEnd: e.schedule.mondayEnd,
          tuesdayStart: e.schedule.tuesdayStart,
          tuesdayEnd: e.schedule.tuesdayEnd,
          wednesdayStart: e.schedule.wednesdayStart,
          wednesdayEnd: e.schedule.wednesdayEnd,
          thursdayStart: e.schedule.thursdayStart,
          thursdayEnd: e.schedule.thursdayEnd,
          fridayStart: e.schedule.fridayStart,
          fridayEnd: e.schedule.fridayEnd,
          saturdayStart: e.schedule.saturdayStart,
          saturdayEnd: e.schedule.saturdayEnd,
          sundayStart: e.schedule.mondayStart,
          sundayEnd: e.schedule.mondayEnd,
        })
      }));
    });
    return formArray;
  }

  addDivision() {
    this.divisionList.push(this.createDivision());
  }

  removeDivision(index) {
    this.divisionList.removeAt(index);
  }

  getDivisionFormGroup(index): FormGroup {
    return this.divisionList.controls[index] as FormGroup;
  }

  addEmpresa() {
    const empresa: any = [];
    for (const division of this.divisionFormGroup) {
     empresa.push({
        name: division.get('name').value,
        contact: {
          job: division.get('contact').get('job').value.job,
          phoneNumber: division.get('contact').get('phoneNumber').value.phoneNumber,
          email: division.get('contact').get('email').value.email,
          paymentPerson: division.get('paymentPerson').value.paymentPerson,
          fax: division.get('contact').get('fax').value.fax,
          schedule: {
            /* mondayStart: ,
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
          }
        }
      });
    }
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }

  success() {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Completaste el formulario correctamente',
      text: 'Procesando informacion!',
      showConfirmButton: false
    });
  }
}
