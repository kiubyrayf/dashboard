import { Component, OnInit } from '@angular/core';
import {EmpresasService} from '../../../shared/services/empresas/empresas.service';
import {EmpresaModel} from '../../../shared/model/empresas/empresa.model';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public empresas = [];
  cargando = false;
  closeResult: string;

  constructor(private empresaService: EmpresasService, config: NgbModalConfig, private modalService: NgbModal ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.cargando = true;
    this.empresaService.getEmpresas().subscribe((resp) => {
      this.empresas = resp.data;
      this.cargando = false;
      console.log(resp.data);

    });
    /*this.empresaService.post().subscribe( response =>
      console.log('Respuesta del servicio', response)
    );*/
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
