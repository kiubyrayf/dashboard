import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare const $;
declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-pollster',
  templateUrl: './pollster.component.html',
  styleUrls: ['./pollster.component.scss']
})
export class PollsterComponent implements OnInit, AfterViewInit {
  public fileName: any;
  public urlImg: any;

  public pollsterForm: FormGroup;
  public roles: string [];
  public isFileUploaded;
 

  // convenience getter for easy access to form fields
  get f() { return this.pollsterForm.controls; }

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.isFileUploaded = false;
  }

  ngOnInit(): void {
    this.roles = ['Foreano', 'Local'];
    console.log(this.pollsterForm.controls.photography);
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
    this.pollsterForm = this.fb.group({
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
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ],
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
  warning() {
    Swal.fire({
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }
  
  onSelectFile(event) { // called each time file input changes
    
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(this.pollsterForm.controls.photography);

      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' ) {
        this.warning();
        this.pollsterForm.get('photography').setValue('');
        this.urlImg = '';
        this.fileName = '';
        this.isFileUploaded = false;
      } else {
        this.pollsterForm.get('photography').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        this.fileName =  event.target.files[0].name;
        reader.onload = ( event) => { // called once readAsDataURL is completed
          this.urlImg = event.target.result;
        };
        this.isFileUploaded = true;
      }
      
    }
  }
}
