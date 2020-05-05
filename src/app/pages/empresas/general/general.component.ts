import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {EmpresasService} from '../../../shared/services/empresas/empresas.service';
import {EmpresaModel} from '../../../shared/model/empresas/empresa.model';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpInterface } from 'src/app/interface/services/http/http.response.interface';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [NgbPaginationConfig]
})
export class GeneralComponent implements OnInit {


  public empresas = [];
  cargando = false;
  closeResult: string;

  public page: number; //current page
  public collectionSize: number ; //  total de items - pageSize -  cuantos items por pagina 
  public advancePages: number;
  public totalPages: number;

  constructor(private empresaService: EmpresasService, config: NgbModalConfig, private modalService: NgbModal ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.advancePages = 1;
    this.page = 1;
  }

  ngOnInit(): void {
    this.cargando = true;
    this.mostrarEmpresa( this.page);
  }

  pageChange( e: number ) {
    this.page = e;
    this.mostrarEmpresa( this.page);
  }

  mostrarEmpresa(page) {
    this.empresaService.getEmpresas(this.page).subscribe((resp: HttpInterface) => {
      this.empresas = resp.data;
      this.collectionSize = resp.pages.totalRegisters;
      this.totalPages = resp.pages.totalPages;
      this.cargando = false;
    });
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
