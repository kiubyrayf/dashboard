import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { IBusinessGet } from 'src/app/interface/business/ibusiness-get';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-payment-business',
  templateUrl: './payment-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PaymentBusinessComponent implements OnInit, OnChanges {
  @Output() data: EventEmitter<any>;
  @Input() businessData: IBusinessGet;
  @Input() flagDataInfo: boolean;
  @Input() serviceListInfo: any;
  
  private empresaList: any;
  public Fform: FormGroup;
  public serviceArray: FormArray;

  // convenience getter for easy access to form fields
  get f() { return this.Fform.controls; }
  get serviceFormGroup()  {
    return (this.Fform.get('services') as FormArray).controls;
  }

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
  }

  createForm() {
    /* // closingDocument: ['', Validators.required, ], */
    this.Fform = this.fb.group({
      services: this.fb.array([this.createServices()]),
      servicesPriceChecker: this.fb.group({
        foreign:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        local:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        viaticForeign:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        viaticLocal:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        visitNotRealized:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
        visitRealized:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]]
      }),
    });
  }
  createServices() {
    return this.fb.group({
      servicesPriceStart:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
      servicesPriceEnd:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
      servicesPriceDisscount:  ['', [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$')]],
      serviceId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.serviceArray = this.Fform.get('services') as FormArray;
  }
  ngOnChanges() {
    if (this.flagDataInfo === true) {
     /*  this.Fform.get('servicesPrice').get('foreign').patchValue(this.businessData.servicesPrice.foreign);
      this.Fform.get('servicesPrice').get('disscount').patchValue(this.businessData.servicesPrice.disscount);
      this.Fform.get('servicesPrice').get('endingPrice').patchValue(this.businessData.servicesPrice.endingPrice);
      this.Fform.get('servicesPrice').get('local').patchValue(this.businessData.servicesPrice.local);
      this.Fform.get('servicesPrice').get('viaticForeign').patchValue(this.businessData.servicesPrice.viaticForeign);
      this.Fform.get('servicesPrice').get('viaticLocal').patchValue(this.businessData.servicesPrice.viaticLocal);
      this.Fform.get('servicesPrice').get('visitNotRealized').patchValue(this.businessData.servicesPrice.visitNotRealized);
      this.Fform.get('servicesPrice').get('visitRealized').patchValue(this.businessData.servicesPrice.visitRealized);
      this.Fform.get('serviceWarranty').patchValue(this.businessData.serviceWarranty);
      this.Fform.get('closingDocument').patchValue(this.businessData.closingDocument);
      console.log(this.businessData.closingDocument[0]); */
    }
    this.serviceArray = this.Fform.get('services') as FormArray;
  }

  // add Service Array from group
  addServices() {
    this.serviceArray.push(this.createServices());
  }
  // remove Service Array from group
  removeServices(index) {
    this.serviceArray.removeAt(index);
  }
  // get the formgroup under Service Array
  getServicesFormGroup(index): FormGroup {
    return this.serviceArray.controls[index] as FormGroup;
  }

  addEmpresa() {
    const empresa = {
      servicesPriceChecker: {
        foreign: this.Fform.get('servicesPriceChecker').value.foreign,
        viaticForeign: this.Fform.get('servicesPriceChecker').value.viaticForeign,
        local: this.Fform.get('servicesPriceChecker').value.local,
        viaticLocal: this.Fform.get('servicesPriceChecker').value.viaticLocal,
        visitNotRealized: this.Fform.get('servicesPriceChecker').value.visitNotRealized,
        visitRealized: this.Fform.get('servicesPriceChecker').value.visitRealized
      },
      services: this.addServicesList(),
    };
    this.empresaList = empresa;
    console.log(this.empresaList);
    this.data.emit(this.empresaList);
  }
  addServicesList() {
    const services: any = [];
    for (const service of this.serviceFormGroup) {
      services.push({
        servicesPriceStart: service.get('servicesPriceStart').value,
        servicesPriceEnd: service.get('servicesPriceEnd').value,
        servicesPriceDisscount: service.get('servicesPriceDisscount').value,
        serviceId: service.get('serviceId').value,
      });
    }
    return services;
  }
}
