import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ImgInfoService } from '../../services/img-info.service';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-img-upload-s',
  templateUrl: './img-upload-s.component.html',
  styleUrls: ['./img-upload-s.component.scss'],
})

export class ImgUploadSComponent implements  OnInit {

  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;

  @Input() groupName: string;
  @Input() imgUpload: string;
  @Output() fileInfo: EventEmitter<any>;
  Fform: FormGroup;

  get f() { return this.Fform.controls; }

  constructor( private fb: FormBuilder) {
    this.isFileUploaded = false;
    this.Fform = this.fb.group({
      file: ['', Validators.required]
    });
    this.fileInfo = new EventEmitter();
  }

  ngOnInit(): void {
    /* if (this.parentContainer.control instanceof FormGroup) {
      this.parentContainer.control.addControl(this.groupName, new FormControl(['', Validators.required, ]));
    } */
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' ) {
        this.warning();
        this.Fform.get('file').setValue('');
        this.urlImg = '';
        this.fileName = '';
        this.isFileUploaded = false;
      } else {
        this.Fform.get('file').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        this.fileName =  event.target.files[0].name;
        reader.onload = (e: any) => { // called once readAsDataURL is completed
          this.urlImg = e.target.result;
        };
        this.isFileUploaded = true;
        this.fileInfo.emit(file);
      }
    }
  }

  fileInputLogoTouched() {
    this.Fform.controls.file.markAsDirty();
    this.Fform.controls.file.markAsTouched();
    this.Fform.controls.file.setErrors({invalid: true});
    this.isFileUploaded = false;
  }

  warning() {
    Swal.fire({
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }

/*   //Aqui es donde se va a meter valores al service, llames a este metodo cualquiera que este subscrito va a actualizarse automaticamente
  setValue(message:string)
  {
    this.imgService.setData("Ejemplo");
  } */

}
