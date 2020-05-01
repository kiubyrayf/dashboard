import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
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

  @Input() empresalist: Array<object> = [];
  //public empresas = new EmpresaModelNew();
  public border_validation = false;
  public regForm: FormGroup;
  public title = 'registration page';
  public form: any;
 

  constructor(
      private route: Router, public empresaService: EmpresasService
    ) {
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

  save(form: NgForm) {
    /*if (!form.valid) {
      return false;
    }
    return true;*/
    console.log(this.regForm);
  }

  ngOnInit() {  }

  addEmpresa() {
  /* const empresa = new EmpresaModelNew(
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
    );*/
    const empresar = {
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
     this.empresalist.push(empresar);
     console.log(this.empresalist);
     

   /*  this.regForm.patchValue({
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
     console.log(this.regForm);*/

     /* registrarEmpresa() {
    if (this.regForm.invalid) {
      return;
    }
    
    this.empresaService.crearEmpresa(empresa)
      .subscribe( resp => {
        console.log(resp);
      });
  }*/
  }
}
