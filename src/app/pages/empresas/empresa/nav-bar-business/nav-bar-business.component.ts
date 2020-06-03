import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { IBusinessGet } from 'src/app/interface/business/ibusiness-get';
import { EmpresasService } from 'src/app/shared/services/empresas/empresas.service';
import { HttpInterface } from 'src/app/interface/services/http/http.response.interface';
import { Router } from '@angular/router';
import { WizardComponent, MovingDirection } from 'angular-archwizard';
import { SeviceBusinessService } from 'src/app/shared/services/empresas/sevice-business.service';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  styleUrls: ['./nav-bar-business.component.scss'],

  encapsulation: ViewEncapsulation.None
})

export class NavBarBusinessComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  public businessDataOutputInfo: IBusinessGet;
  public flagDataOuputInfo: boolean;
  private infoBusinessData: any;
  private infoContactData: any;
  private infoServiceData: any;
  private infoDivisionData: any;
  public setRFCParentInfos: any;
  public serviceListOInfo: any;

  constructor( private empresaService: EmpresasService,  private router: Router,
    private serviceList: SeviceBusinessService ) {
      this.businessDataOutputInfo = null;
      this.flagDataOuputInfo = false;
      this.serviceListOInfo = [];
      this.setRFCParentInfos = [];
      this.serviceListInfo();
  }

  ngOnInit() { }
  success() {
    Swal.fire({
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
  infoService(event) {
    this.infoServiceData = event;
  }

  infoDivision(event) {
    this.infoDivisionData = event;
  }
  infoDivisionES(event) {
    const formData = new FormData();
    formData.append('name', this.infoBusinessData.name);
    formData.append('email', this.infoBusinessData.email);
    formData.append('phoneNumber', this.infoBusinessData.phoneNumber);
    formData.append('requestServiceByMail', this.infoBusinessData.requestServiceByMail);
    formData.append('selfFormat', this.infoBusinessData.selfFormat);
    formData.append('logo', this.infoBusinessData.logo.value);
    formData.append('address', JSON.stringify(this.infoBusinessData.address));
    formData.append('contact', JSON.stringify(this.infoContactData));
    formData.append('closingDocument', this.infoServiceData.closingDocument);
    formData.append('serviceWarranty', this.infoServiceData.serviceWarranty);
    formData.append('servicesPrice', JSON.stringify(this.infoServiceData.servicesPrice));

    // imprimir en  form data
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
      // checar este return
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

  serviceListInfo() {
    return this.serviceList.getServiceList().subscribe(resp => {
      this.serviceListOInfo = resp.data;
    }, err => console.log('HTTP Error Service_LIst', err));
  }
  businessDataOutput($event) {
    this.businessDataOutputInfo = $event;
  }
  flagDataOuput($event) {
    this.flagDataOuputInfo = $event;
  }

  // RFC set Value y RFC stepValidation
  setRFCParentInfo(event) {
    this.setRFCParentInfos = event;
  }
  public canExitStep2: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
      return this.canExitStep();
    }
  }
  canExitStep(): boolean {
    if (this.setRFCParentInfos.length === 0 ) {
      Swal.fire({
        title: 'Alerta',
        text: 'Por favor de llenar las razones sociales!',
        icon: 'warning',
        showConfirmButton: true,
      });
      return false;
    } else {
      return true;
    }
  }
}
