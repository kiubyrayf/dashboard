import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, ElementRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, NgForm, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { BusinessInterface } from 'src/app/interface/business/business.interface';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  styleUrls: ['./info-business.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InfoBusinessComponent implements OnInit {
  @Output() data: EventEmitter<any>;
  @Output() businessDataOutput: EventEmitter<any>;

  @Output() flagData: EventEmitter<any>;
  public flagDataInfo: boolean;
  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;
  public businessData: BusinessInterface;
  private empresaList: any;
  public isBorderValidate = false;
  public Fform: FormGroup;
  public empresa: EmpresaModel;
  public imgData: any;
  // convenience getter for easy access to form fields
  get f() { return this.Fform.controls; }

  constructor(
      private route: Router,
      private activeRoute: ActivatedRoute,
      private empresaService: EmpresasService,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef
    ) {
      this.data = new EventEmitter();
      this.businessDataOutput = new EventEmitter();

      this.flagData = new EventEmitter();
      this.flagDataInfo = false;

      this.empresaList = {};
      this.createForm();
  }

  // create form
  createForm() {
    this.Fform = this.fb.group({
      name: ['', Validators.required, ],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ],
      phoneNumber: ['', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      requestServiceByMail: [false],
      selfFormat: [false],
      logo: ['', Validators.required, ],
    });
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.flagDataInfo = true;
      this.empresaService.getEmpresa(id).subscribe(
        (resp) => {
          this.flagData.emit(this.flagDataInfo);
          this.businessData = resp.data[0];
          console.log(this.businessData);
          this.businessDataOutput.emit(this.businessData);
          this.Fform.patchValue( this.businessData);
         // this.logoName = this.businessData.logo;
      });
    }
  }

  imgUData(event) {
    this.imgData = event;
    console.log('componente info: ' + this.imgData);
  }
  addEmpresa() {
    const empresa = {
      name: this.Fform.get('name').value,
      email: this.Fform.get('email').value,
      phoneNumber: this.Fform.get('phoneNumber').value,
      logo: this.Fform.get('logo').setValue(this.imgData),
      address: {
        street: this.Fform.get('address').value.street,
        number: this.Fform.get('address').value.number,
        cp: this.Fform.get('address').value.cp,
        municipality: this.Fform.get('address').value.municipality,
        suburb: this.Fform.get('address').value.suburb,
      },
      // tslint:disable-next-line: max-line-length
      requestServiceByMail: (this.Fform.get('requestServiceByMail').value !== '') ? this.Fform.get('requestServiceByMail').value : false,
      selfFormat: this.Fform.get('selfFormat').value
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' ) {
        this.warning();
        this.Fform.get('logo').setValue('');
        this.urlImg = '';
        this.fileName = '';
        this.isFileUploaded = false;
      } else {
        this.Fform.get('logo').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        this.fileName =  event.target.files[0].name;
        reader.onload = ( e: any) => { // called once readAsDataURL is completed
          this.urlImg = e.target.result;
        };
        this.isFileUploaded = true;
      }
    }
  }

  fileInputLogoTouched() {
    this.Fform.controls.logo.markAsDirty();
    this.Fform.controls.logo.markAsTouched();
    this.Fform.controls.logo.setErrors({invalid: true});
    this.isFileUploaded = false;
  }

  warning() {
    Swal.fire({
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }

}
