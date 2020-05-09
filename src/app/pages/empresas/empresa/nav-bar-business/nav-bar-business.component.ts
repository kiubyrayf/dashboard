import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { EmpresaModelNew, EmpresaModel } from 'src/app/shared/model/empresas/empresa.model';
import { BusinessInterface } from '../../../../interface/business/business.interface';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { HttpInterface } from 'src/app/interface/services/http/http.response.interface';
import { Router } from '@angular/router';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})

export class NavBarBusinessComponent implements OnInit {

 // @Input() empresaInfo: BusinessInterface;

  public businessDataOutputInfo: BusinessInterface;
  public flagDataOuputInfo: boolean;
  private infoBusinessData: any;
  private infoContactData: any;
  private infoPayData: any;
  // private infoB: any;

  constructor( private empresaService: EmpresasService,  private router: Router ) {
    this.businessDataOutputInfo = null;
    this.flagDataOuputInfo = false;
  }

  ngOnInit() { }
  success() {
    Swal.fire({
      // type: 'success',
      title: 'Exitoso',
      text: 'La empresa se a creado corrrectamente',
      icon: 'success',
      showConfirmButton: true,
    });
  }
  
  infoBusiness(event) {
    this.infoBusinessData = event;
  }
  infoContact(event) {
    this.infoContactData = event;
  }
  
  infoPay(event) {
    this.infoPayData = event;
    const formData = new FormData();
    formData.append('name', this.infoBusinessData.name);
    formData.append('email', this.infoBusinessData.email);
    formData.append('phoneNumber', this.infoBusinessData.phoneNumber);
    formData.append('requestServiceByMail', this.infoBusinessData.requestServiceByMail);
    formData.append('selfFormat', this.infoBusinessData.selfFormat);
    formData.append('logo', this.infoBusinessData.logo.value);
    formData.append('address', JSON.stringify(this.infoBusinessData.address));
    formData.append('contact', JSON.stringify(this.infoContactData));
    formData.append('closingDocument', this.infoPayData.closingDocument);
    formData.append('serviceWarranty', this.infoPayData.serviceWarranty);
    formData.append('servicesPrice', JSON.stringify(this.infoPayData.servicesPrice));
    
    // imprimir en colola form data
   
     formData.forEach((value, key) => {
       console.log('key %s: value %s', key, value);
     });

    if (this.flagDataOuputInfo !== true) {
      return this.empresaService.crearEmpresa(formData).subscribe( (resp: HttpInterface) => {

        if (resp.status === 1) {
          this.success();
          this.router.navigate(['/empresas/general']);
        } else if (resp.status === 0) {
          Swal.fire({
            title: 'Creacion de empresa incorrecta',
            text: `${resp.message}`,
            icon: 'warning',
            showConfirmButton: true,
          });
          this.router.navigate(['/empresas/general']);
        }
      }, ( error: any ) => {
        console.log(error);
        console.log(error.messege);
      });
    } else {
      return this.empresaService.actualizarEmpresa(formData, this.businessDataOutputInfo.id).subscribe( (resp: HttpInterface) => {

        if (resp.status === 1) {
          Swal.fire({
            title: 'Se actulizo empresa correctamente',
            text: `${resp.message}`,
            icon: 'success',
            showConfirmButton: true,
          });
          this.router.navigate(['/empresas/general']);
        } else if (resp.status === 0) {
          Swal.fire({
            title: 'Creacion de empresa incorrecta',
            text: `${resp.message}`,
            icon: 'warning',
            showConfirmButton: true,
          });
          this.router.navigate(['/empresas/general']);
        }
      }, ( error: any ) => {
        console.log(error);
        console.log(error.messege);
      });
    }
  }

  businessDataOutput($event) {
    this.businessDataOutputInfo = $event;
  }

  flagDataOuput($event) {
    this.flagDataOuputInfo = $event;
  }
}
