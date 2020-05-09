import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, ElementRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
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
  //@ViewChild('fileInput') fileInput: ElementRef;
  @Output() data: EventEmitter<any>;
  @Output() businessDataOutput: EventEmitter<any>;
  
  @Output() flagData: EventEmitter<any>;
  public flagDataInfo: boolean;

  public businessData: BusinessInterface;
  private empresaList: any;
  public isBorderValidate = false;
  public regForm: FormGroup;
  public title = 'registration page';
  public form: any;
  public empresa: EmpresaModel;

  public fileName: string;
  public logoName: string;

  constructor(
      private route: Router,
      private activeRoute: ActivatedRoute,
      private empresaService: EmpresasService,
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
    this.regForm = new FormGroup({
      name: new FormControl('', Validators.required, ),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], ),
      phoneNumber: new FormControl('', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ),
      address: new FormGroup({
        street: new FormControl('', Validators.required, ),
        number: new FormControl('', Validators.required, ),
        cp: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{5}$')], ),
        municipality: new FormControl('', Validators.required, ),
        suburb: new FormControl('', Validators.required, ),
      }),
      requestServiceByMail: new FormControl(false),
      selfFormat: new FormControl(false),
      logo: new FormControl('', Validators.required, ),
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
          this.regForm.patchValue( this.businessData);
          this.logoName = this.businessData.logo;
      });
    }
  }
  onChange($event) {
    this.regForm.get($event.currentTarget.name).setValue($event.currentTarget.checked);
   // this.regForm.get('schedule').value[e.currentTarget.name] = e.currentTarget.value;
  }

  addEmpresa() {
    const empresa = {
      name: this.regForm.get('name').value,
      email: this.regForm.get('email').value,
      phoneNumber: this.regForm.get('phoneNumber').value,
      logo: this.regForm.get('logo'),
      address: {
        street: this.regForm.get('address').value.street,
        number: this.regForm.get('address').value.number,
        cp: this.regForm.get('address').value.cp,
        municipality: this.regForm.get('address').value.municipality,
        suburb: this.regForm.get('address').value.suburb,
      },
      // tslint:disable-next-line: max-line-length
      requestServiceByMail: (this.regForm.get('requestServiceByMail').value !== '') ? this.regForm.get('requestServiceByMail').value : false,
      selfFormat: this.regForm.get('selfFormat').value
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
  warning() {
    Swal.fire({
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }
  readFile(event) {
   
    if ( event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' ) {
        this.warning();
        this.regForm.get('logo').setValue('');
      } else {
        
         this.fileName = file.name;
         this.regForm.get('logo').setValue(file);
        this.logoName = '';
       
      }
    }
  }

}
