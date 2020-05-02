import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { EmpresaModelNew } from 'src/app/shared/model/empresas/empresa.model';
import { BusinessInterface } from '../../../../interface/business/business.interface';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})

export class NavBarBusinessComponent implements OnInit {

  private empresaInfo: BusinessInterface;
  private infoBusinessData: any;
  private infoContactData: any;
  private infoPayData: any;


  constructor( private empresaService: EmpresasService ) {
  }

  ngOnInit() { }

  infoBusiness(event) {
    this.infoBusinessData = event;
  }
  infoContact(event) {
    this.infoContactData = event;
  }
  infoPay(event) {
    this.infoPayData = event;
    // Supongamos que ya tienes toda la informacion

    const formData = new FormData();

    formData.append('name', this.infoBusinessData.name);
    formData.append('email', this.infoBusinessData.email);
    formData.append('phoneNumber', this.infoBusinessData.phoneNumber);
    formData.append('requestServiceByMail', this.infoBusinessData.requestServiceByMail);
    formData.append('selfFormat', this.infoBusinessData.selfFormat);
    formData.append('logo', this.infoBusinessData.logo.value); // checar como se envia
    formData.append('address', JSON.stringify(this.infoBusinessData.address)); // checar como se envia
    formData.append('contact', JSON.stringify(this.infoContactData)); // checar como se envia
    formData.append('closingDocument', this.infoPayData.closingDocument.value); // checar como se envia
    formData.append('serviceWarranty', this.infoPayData.serviceWarranty);
    formData.append('servicesPrice', JSON.stringify(this.infoPayData.servicesPrice)); // checar como se envia
    // tslint:disable-next-line: no-debugger
    debugger;

    formData.forEach((value, key) => {
      console.log('key %s: value %s', key, value);
      });

    return this.empresaService.crearEmpresa(formData).subscribe( resp => {
      console.log(resp);
    });
  
  }

}
