import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { EmpresaModelNew } from '../../../../shared/model/empresas/empresa.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  encapsulation: ViewEncapsulation.None
})

export class InfoBusinessComponent implements OnInit {

  @Output() data: EventEmitter<any>;
  private empresaList: any;
  public isBorderValidate = false;
  public regForm: FormGroup;
  public title = 'registration page';
  public form: any;
  constructor(
      private route: Router, public empresaService: EmpresasService
    ) {
      this.data = new EventEmitter();
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
      requestServiceByMail: new FormControl(''),
      selfFormat: new FormControl(''),
      logo: new FormControl('', Validators.required, ),
    });

  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;
    console.log(this.regForm);
  }

  ngOnInit() {  }

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
      selfFormat: (this.regForm.get('selfFormat').value !== '') ? this.regForm.get('selfFormat').value : false,
    };
     this.empresaList = empresa;
    this.data.emit(this.empresaList);
  }

}
