import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';
import { FileUploader } from 'ng2-file-upload';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-payment-business',
  templateUrl: './payment-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PaymentBusinessComponent implements OnInit {
  @Output() data: EventEmitter<any>;
  private empresaList: any;
  public payForm: FormGroup;
  public submitted = false;
  public allData = FormData;
  public form: any;

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
  }

  createForm() {
    this.payForm = new FormGroup({
      closingDocument: new FormControl('', Validators.required, ),
      serviceWarranty: new FormControl(''),
      servicesPrice: new FormGroup({
        foreign: new FormControl('', Validators.required, ),
        viaticForeign:  new FormControl('', Validators.required, ),
        local:  new FormControl('', Validators.required, ),
        viaticLocal: new FormControl('', Validators.required, ),
        visitNotRealized:  new FormControl('', Validators.required, ),
        visitRealized:  new FormControl('', Validators.required, ),
        endingPrice:  new FormControl('', Validators.required, ),
        disscount:  new FormControl('', Validators.required, )
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
      title: 'Your all steps done!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  warning() {
    Swal.fire({
      type: 'warning',
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }

  ngOnInit() {  }

  addEmpresa() {
    const empresa = {
      closingDocument: this.payForm.get('closingDocument'),
      servicesPrice: {
        foreign: this.payForm.get('servicesPrice').value.foreign,
        viaticForeign: this.payForm.get('servicesPrice').value.viaticForeign,
        local: this.payForm.get('servicesPrice').value.local,
        viaticLocal: this.payForm.get('servicesPrice').value.viaticLocal,
        visitNotRealized: this.payForm.get('servicesPrice').value.visitNotRealized,
        visitRealized: this.payForm.get('servicesPrice').value.visitRealized,
        endingPrice: this.payForm.get('servicesPrice').value.endingPrice,
        disscount: this.payForm.get('servicesPrice').value.disscount,
      },
      serviceWarranty: (this.payForm.get('serviceWarranty').value !== '') ? this.payForm.get('serviceWarranty').value : false,
    };
     this.empresaList = empresa;
    this.data.emit(this.empresaList);
    console.log(this.empresaList);
  }
  readFile(event) {
    if ( event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' &&  file.type !== 'application/pdf') {
        this.warning();
        this.form.get('closingDocument').setValue('');
      } else {
        this.payForm.get('closingDocument').setValue(file);
      }

    }
  }
}
