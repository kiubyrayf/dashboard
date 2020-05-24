import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-pollster',
  templateUrl: './pollster.component.html',
  styleUrls: ['./pollster.component.scss']
})
export class PollsterComponent implements OnInit {

  public Fform: FormGroup;
  public roles: string [];
  public flagData: boolean;
  // convenience getter for easy access to form fields
  get f() { return this.Fform.controls; }

  constructor(private fb: FormBuilder,  private activeRoute: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit(): void {
    this.roles = ['Foreano', 'Local'];
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.flagData = true;
    }
  }

  // create form
  createForm() {
    this.Fform = this.fb.group({
      name: ['', Validators.required, ],
      middle: ['', Validators.required, ],
      lastname: ['', Validators.required, ],
      birthPlace: ['', Validators.required, ],
      birthDate: ['', Validators.required, ],
      ifeFolio: ['', Validators.required, ],
      address: this.fb.group({
        street: ['', Validators.required, ],
        number: ['', Validators.required, ],
        cp: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{5}$')], ],
        municipality: ['', Validators.required, ],
        suburb: ['', Validators.required, ],
      }),
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      cellPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      errandsPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      preference: ['null', Validators.required, ],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
      rol: ['null', Validators.required, ],
      viatics: ['', Validators.required, ],
      bank: ['', Validators.required, ],
      nameOwner: ['', Validators.required, ],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,19}$')] ],
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
      photography: ['', Validators.required, ],
    });
  }

  addPollster() {}
 

}
