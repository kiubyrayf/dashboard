import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare const $;

@Component({
  selector: 'app-pollster',
  templateUrl: './pollster.component.html',
  styleUrls: ['./pollster.component.scss']
})
export class PollsterComponent implements OnInit, AfterViewInit {
  public fileName: string;
  public logoName: string;
  public pollsterForm: FormGroup;
  public roles: string [];
  public default;
  constructor() {
    this.createForm();
   }

  ngOnInit(): void {
    this.roles = ['Foreano', 'Local'];
  }
  ngAfterViewInit() {
    $(document).ready(() => {
      $('.clockpicker').clockpicker({
        autoclose: true,
      }).find('input').change((e) => {
        this.pollsterForm.get('schedule').value[e.currentTarget.name] = e.currentTarget.value;
      });
    });
  }
  // create form
  createForm() {
    this.pollsterForm = new FormGroup({
      name: new FormControl('', Validators.required, ),
      middle: new FormControl('', Validators.required, ),
      lastname: new FormControl('', Validators.required, ),
      birthPlace: new FormControl('', Validators.required, ),
      birthDate: new FormControl('', Validators.required, ),
      ifeFolio: new FormControl('', Validators.required, ),
      address: new FormGroup({
        street: new FormControl('', Validators.required, ),
        number: new FormControl('', Validators.required, ),
        cp: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{5}$')], ),
        municipality: new FormControl('', Validators.required, ),
        suburb: new FormControl('', Validators.required, ),
      }),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      cellPhone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      errandsPhone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      preference: new FormControl('null', Validators.required, ),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ),
      rol: new FormControl('null', Validators.required, ),
      viatics: new FormControl('', Validators.required, ),
      bank: new FormControl('', Validators.required, ),
      nameOwner: new FormControl('', Validators.required, ),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,19}$')] ),
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
      photography: new FormControl('', Validators.required, ),
    });
  }
  
  addPollster() {}
  readFile(e) {}
}
