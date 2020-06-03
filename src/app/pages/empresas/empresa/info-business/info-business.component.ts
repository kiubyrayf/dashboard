import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { IBusinessGet } from 'src/app/interface/business/ibusiness-get';
import * as moment from 'moment';
// import { ImgInfoService } from 'src/app/shared/services/img-info.service';

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
  @Output() setRFCParent: EventEmitter<any>;
  // @Input() imgUpload: string;

  public flagDataInfo: boolean;
  public businessData: IBusinessGet;
  private empresaList: any;
  public Fform: FormGroup;
  public message: string;
  private contacts: Array<any>;
  public imgUploadPhotography: string;
  public imgUploadLogo: string;
  public socialReason:  any;

  // convenience getter for easy access to form fields
  get f() { return this.Fform.controls; }

  constructor(
      private route: Router,
      private activeRoute: ActivatedRoute,
      private empresaService: EmpresasService,
      private fb: FormBuilder,
      // private imgService: ImgInfoService
    ) {
      this.data = new EventEmitter();
      this.businessDataOutput = new EventEmitter();
      this.setRFCParent = new EventEmitter();
      this.flagData = new EventEmitter();
      this.flagDataInfo = false;

      this.empresaList = {};
      this.createForm();
      this.contacts = [];
      this.socialReason = [];
      /* //Aqui te subscrbes al mensaje del servicio, cuando cambies el valor del service con sel setData se va a cambiar solo
      this.imgService.sharedMessage.subscribe(res =>
        this.message = res
      ); */
  }

  createForm() {
    this.Fform = this.fb.group({
      name: ['', Validators.required, ],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
      phoneNumber: ['', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      requestServiceByMail: [false],
      selfFormat: [false],
      serviceWarranty: [false],
      logo: ['', Validators.required, ],
      text: [''],
      address: this.fb.group({
        street: ['', Validators.required, ],
        number: ['', Validators.required, ],
        cp: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{5}$')], ],
        municipality: ['', Validators.required, ],
        suburb: ['', Validators.required, ],
        scheduleStart: ['', Validators.required, ],
        scheduleEnd: ['', Validators.required, ]
      }),
      owner: this.fb.group({
        photography: ['', Validators.required, ],
        firstName: ['', Validators.required, ],
        middleName: ['', Validators.required, ],
        lastName: ['', Validators.required, ],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
      }),
    });
  }

  setOwnerPhotography(event) {
    this.Fform.controls.owner.get('photography').setValue(event);
  }
  setRFC(event) {
    this.socialReason = event;
    this.setRFCParent.emit(this.socialReason);
  }
  setLogo(event) {
    this.Fform.controls.logo.setValue(event);
  }

  // no recuerdo para que era este metodo buscarlo
  addContact(contact) {
    this.contacts.push(contact);
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.flagDataInfo = true;
      this.empresaService.getEmpresa(id).subscribe(
        (resp) => {
          this.flagData.emit(this.flagDataInfo);
          this.businessData = resp.data[0];
          this.businessDataOutput.emit(this.businessData);
          this.Fform.patchValue( this.businessData);
          this.imgUploadPhotography = this.businessData.owner.photography;
          this.imgUploadLogo = this.businessData.logo;
          this.Fform.get('address').get('scheduleStart').patchValue(moment.utc(this.businessData.address.scheduleStart).format('HH:mm'));
          this.Fform.get('address').get('scheduleEnd').patchValue(moment.utc(this.businessData.address.scheduleEnd).format('HH:mm'));
      });
    }
  }

  addEmpresa() {
    const empresa = {
      name: this.Fform.get('name').value,
      email: this.Fform.get('email').value,
      phoneNumber: this.Fform.get('phoneNumber').value,
      logo: this.Fform.get('logo').value,
      text: this.Fform.get('text').value,
      address: {
        street: this.Fform.get('address').value.street,
        number: this.Fform.get('address').value.number,
        cp: this.Fform.get('address').value.cp,
        municipality: this.Fform.get('address').value.municipality,
        suburb: this.Fform.get('address').value.suburb,
        scheduleStart: this.createDateIso(this.Fform.get('address').value.scheduleStart),
        scheduleEnd: this.createDateIso(this.Fform.get('address').value.scheduleEnd)
      },
      owner: {
        photography: this.Fform.get('owner').value.photography,
        firstName: this.Fform.get('owner').value.firstName,
        middleName: this.Fform.get('owner').value.middleName,
        lastName: this.Fform.get('owner').value.lastName,
        email: this.Fform.get('owner').value.email,
      },
      // tslint:disable-next-line: max-line-length
      requestServiceByMail: (this.Fform.get('requestServiceByMail').value !== '') ? this.Fform.get('requestServiceByMail').value : false,
      selfFormat: this.Fform.get('selfFormat').value,
      serviceWarranty:  this.Fform.get('serviceWarranty').value
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
  createDateIso(dateString) {
    if (dateString === '') {
      return null;
    }
    const nowDate = moment().format('YYYY-MM-DD');
    const date = new Date( `${nowDate} ` + dateString);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }
}
