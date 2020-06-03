import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBusinessGet } from 'src/app/interface/business/ibusiness-get';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-business',
  templateUrl: './document-business.component.html',
  styleUrls: ['./document-business.component.scss']
})
export class DocumentBusinessComponent implements OnInit {
  @Output() data: EventEmitter<any>;
  @Input() businessData: IBusinessGet;
  @Input() flagDataInfo: boolean;

  private empresaList: any;
  public Fform: FormGroup;

  get f() { return this.Fform.controls; }

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.data = new EventEmitter();
    this.empresaList = {};
    this.businessData = null;
    this.flagDataInfo = false;
  }

  ngOnInit(): void {
  }
  createForm() {
    /* // closingDocument: ['', Validators.required, ], */
    this.Fform = this.fb.group({
      closingDocument:  ['', [Validators.required]],
    });
  }

  addEmpresa() {}
}
