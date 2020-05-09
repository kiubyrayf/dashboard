import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';
import { FileUploader } from 'ng2-file-upload';
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

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
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
      title: 'Completaste el formulario correctamente',
      text: 'Procesando informacion!',
      showConfirmButton: false,
      timer: 1500
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
      console.log(this.businessData);
      this.payForm.get('servicesPrice').get('foreign').patchValue(this.businessData.servicesPrice.foreign);
      this.payForm.get('servicesPrice').get('disscount').patchValue(this.businessData.servicesPrice.disscount);
      this.payForm.get('servicesPrice').get('endingPrice').patchValue(this.businessData.servicesPrice.endingPrice);
      this.payForm.get('servicesPrice').get('local').patchValue(this.businessData.servicesPrice.local);
      this.payForm.get('servicesPrice').get('viaticForeign').patchValue(this.businessData.servicesPrice.viaticForeign);
      this.payForm.get('servicesPrice').get('viaticLocal').patchValue(this.businessData.servicesPrice.viaticLocal);
      this.payForm.get('servicesPrice').get('visitNotRealized').patchValue(this.businessData.servicesPrice.visitNotRealized);
      this.payForm.get('servicesPrice').get('visitRealized').patchValue(this.businessData.servicesPrice.visitRealized);

      this.payForm.get('serviceWarranty').patchValue(this.businessData.serviceWarranty);
      // this.payForm.get('closingDocument').patchValue(this.businessData.closingDocument);

    }
  }
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
