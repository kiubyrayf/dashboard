import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessInterface } from 'src/app/interface/business/business.interface';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-payment-business',
  templateUrl: './payment-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PaymentBusinessComponent implements OnInit, OnChanges {
  @Output() data: EventEmitter<any>;
  @Input() businessData: BusinessInterface;
  @Input() flagDataInfo: boolean;

  private empresaList: any;
  public payForm: FormGroup;
  public submitted = false;
  // public allData = FormData;
  public form: any;
  public filesUp: any = [];
  // convenience getter for easy access to form fields
  get f() { return this.payForm.controls; }

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
  }

  createForm() {
    this.payForm = this.fb.group({
      closingDocument: ['', Validators.required, ],
      serviceWarranty: [''],
      servicesPriceChecker: this.fb.group({
        foreign: ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        viaticForeign:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        local:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        viaticLocal: ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        visitNotRealized:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        visitRealized:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        endingPrice:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        disscount:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]]
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.payForm.valid) {
      return false;
    }
    return true;
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
  warning() {
    Swal.fire({
      // type: 'warning',
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }

  ngOnInit() {  }
  ngOnChanges(): void {
    if (this.flagDataInfo === true) {
     /*  this.payForm.get('servicesPrice').get('foreign').patchValue(this.businessData.servicesPrice.foreign);
      this.payForm.get('servicesPrice').get('disscount').patchValue(this.businessData.servicesPrice.disscount);
      this.payForm.get('servicesPrice').get('endingPrice').patchValue(this.businessData.servicesPrice.endingPrice);
      this.payForm.get('servicesPrice').get('local').patchValue(this.businessData.servicesPrice.local);
      this.payForm.get('servicesPrice').get('viaticForeign').patchValue(this.businessData.servicesPrice.viaticForeign);
      this.payForm.get('servicesPrice').get('viaticLocal').patchValue(this.businessData.servicesPrice.viaticLocal);
      this.payForm.get('servicesPrice').get('visitNotRealized').patchValue(this.businessData.servicesPrice.visitNotRealized);
      this.payForm.get('servicesPrice').get('visitRealized').patchValue(this.businessData.servicesPrice.visitRealized);
      this.payForm.get('serviceWarranty').patchValue(this.businessData.serviceWarranty);
      this.payForm.get('closingDocument').patchValue(this.businessData.closingDocument);
      console.log(this.businessData.closingDocument[0]); */
    }
  }
  addEmpresa() {
    const empresa = {
      closingDocument: this.payForm.get('closingDocument').value,
      servicesPriceChecker: {
        foreign: this.payForm.get('servicesPriceChecker').value.foreign,
        viaticForeign: this.payForm.get('servicesPriceChecker').value.viaticForeign,
        local: this.payForm.get('servicesPriceChecker').value.local,
        viaticLocal: this.payForm.get('servicesPriceChecker').value.viaticLocal,
        visitNotRealized: this.payForm.get('servicesPriceChecker').value.visitNotRealized,
        visitRealized: this.payForm.get('servicesPriceChecker').value.visitRealized
      },
      serviceWarranty: (this.payForm.get('serviceWarranty').value !== '') ? this.payForm.get('serviceWarranty').value : false,
    };
     this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
  readFile(event) {
    const file = event.target.files;
    if (file) {
      for (let i = 0; i > file.length; i++) {
        const files = {
          id: '',
          name: '',
          file: '',
          url: ''
        };
        this.filesUp.push(file[i]);
        files.id = file[i].id;
        files.name = file[i].name;
        files.file = file[i].file;

        const reader = new FileReader();
        reader.onload = ( e: any) => {
          files.url = e.target.result + '';
          this.filesUp.push(files);
          console.log(this.filesUp);
        };
        reader.readAsDataURL( event.target.file[i]);
      }
    }
    event.srcElement.value = null;
    /*if ( event.target.files.length > 0) {
      const file = event.target.files;
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' &&  file.type !== 'application/pdf') {
        this.warning();
        this.form.get('closingDocument').setValue('');
      } else {
        // this.payForm.get('closingDocument').setValue(file);
      }

    }*/
  }
}
