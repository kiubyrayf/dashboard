import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { EmpresaModelNew } from 'src/app/shared/model/empresas/empresa.model';
import { BusinessInterface } from '../../../../interface/business/business.interface';
@Component({
  selector: 'app-nav-bar-business',
  templateUrl: './nav-bar-business.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavBarBusinessComponent implements OnInit {

  private empresaInfo: BusinessInterface;
  private infoBusinessData: any;
  private infoContactData: any;

  constructor() {
   }

  ngOnInit() { }

  infoBusiness(event) {
    this.infoBusinessData = event;
    console.log(event);
  }
  infoContact(event) {
    this.infoContactData = event;
    console.log(event);

    // Supongamos que ya tienes toda la informacion

    const formData = new FormData();
    formData.append('name', this.infoBusinessData);
    formData.append('contact', JSON.stringify(this.infoContactData));
    formData.append('logo', this.infoBusinessData.logo.value); // checar como se envia

    // haces el posteo

  }

}
