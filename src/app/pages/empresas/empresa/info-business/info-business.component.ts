import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { BusinessInterface } from 'src/app/interface/business/business.interface';
import * as moment from 'moment';

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

  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;

  public flagDataInfo: boolean;
  public businessData: BusinessInterface;
  private empresaList: any;
  public Fform: FormGroup;
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
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
      phoneNumber: ['', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')], ],
      requestServiceByMail: [false],
      selfFormat: [false],
      // logo: ['', Validators.required, ],
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
       // photography: ['', Validators.required, ],
        firstName: ['', Validators.required, ],
        middleName: ['', Validators.required, ],
        lastName: ['', Validators.required, ],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')], ],
      }),
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
          this.businessDataOutput.emit(this.businessData);
          this.Fform.patchValue( this.businessData);
         // this.logoName = this.businessData.logo;
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
     // logo: this.Fform.get('logo').value,
      address: {
        street: this.Fform.get('address').value.street,
        number: this.Fform.get('address').value.number,
        cp: this.Fform.get('address').value.cp,
        municipality: this.Fform.get('address').value.municipality,
        suburb: this.Fform.get('address').value.suburb,
        scheduleStart: this.Fform.get('address').value.scheduleStart,
        scheduleEnd: this.Fform.get('address').value.scheduleEnd
      },
      owner: {
        //photography: this.Fform.get('owner').value.photography,
        firstName: this.Fform.get('owner').value.firstName,
        middleName: this.Fform.get('owner').value.middleName,
        lastName: this.Fform.get('owner').value.lastName,
        email: this.Fform.get('owner').value.email,
      },
      // tslint:disable-next-line: max-line-length
      requestServiceByMail: (this.Fform.get('requestServiceByMail').value !== '') ? this.Fform.get('requestServiceByMail').value : false,
      selfFormat: this.Fform.get('selfFormat').value
    };
    this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }
  
}
