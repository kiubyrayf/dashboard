import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { EmpresaModel } from '../../../../shared/model/empresas/empresa.model';

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  encapsulation: ViewEncapsulation.None
})

export class InfoBusinessComponent implements OnInit {

  @Input() hijo: string;
  public border_validation = false;
  public regForm: FormGroup;
  public title = 'registration page';
  public form: any;
  public empresalist: Array<object> = [];

  constructor(
      private route: Router, public empresaService: EmpresasService
    ) {
        this.createForm();
        console.log(this.hijo);
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

  save() {
    /*if (!form.valid) {
      return false;
    }
    return true;*/
    console.log(this.regForm);
  }

  ngOnInit() {  }

  addEmpresa() {
    const empresa = new EmpresaModel(
      this.regForm.value.name,
      this.regForm.value.email,
      this.regForm.value.phoneNumber,
      this.regForm.value.logo,
      this.regForm.value.address.street,
      this.regForm.value.address.number,
      this.regForm.value.address.cp,
      this.regForm.value.address.municipality,
      this.regForm.value.address.suburb,
      this.regForm.value.requestServiceByMail,
      this.regForm.value.selfFormat,
    );
    const empresari = {
      name: this.regForm.value.name,
      email: this.regForm.value.email,
      phoneNumber: this.regForm.value.phoneNumber,
      logo: this.regForm.value.logo,
      address: {
        street: this.regForm.value.address.street,
        number: this.regForm.value.address.number,
        cp: this.regForm.value.address.cp,
        municipality: this.regForm.value.address.municipality,
        suburb: this.regForm.value.address.suburb,
      },
      
      requestServiceByMail: this.regForm.value.requestServiceByMail,
      selfFormat: this.regForm.value.selfFormat,
    };
     this.empresalist.push(empresari);
     console.log(this.empresalist);
     

     this.regForm.patchValue({
      name: this.regForm.value.name,
      email: this.regForm.value.email,
      phoneNumber: this.regForm.value.phoneNumber,
      logo: this.regForm.value.logo,
      address: {
        street: this.regForm.value.address.street,
        number: this.regForm.value.address.number,
        cp: this.regForm.value.address.cp,
        municipality: this.regForm.value.address.municipality,
        suburb: this.regForm.value.address.suburb,
      },
      
      requestServiceByMail: this.regForm.value.requestServiceByMail,
      selfFormat: this.regForm.value.selfFormat,
     });
  }

 /* registrarEmpresa() {
    if (this.regForm.invalid) {
      return;
    }

    const empresa = new EmpresaModel(
      this.regForm.value.name,
      this.regForm.value.email,
      this.regForm.value.phoneNumber,
      this.regForm.value.requestServiceByMail,
      this.regForm.value.selfFormat,
      this.regForm.value.logo,
      this.regForm.value.address.street,
      this.regForm.value.address.number,
      this.regForm.value.address.cp,
      this.regForm.value.address.municipality,
      this.regForm.value.address.suburb,
    );
    
    
    this.empresaService.crearEmpresa(empresa)
      .subscribe( resp => {
        console.log(resp);
      });
  }*/
}
