import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-img-upload-s',
  templateUrl: './img-upload-s.component.html',
  styleUrls: ['./img-upload-s.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],

})
export class ImgUploadSComponent implements OnInit {

  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;
  private Fform: FormGroup;

  @Input() dataImgUrl: any;

  get f() { return this.Fform.controls; }

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {
    this.Fform = this.parent.form;
    this.isFileUploaded = false;

  }

  ngOnInit(): void {
    const logo = new FormControl('', Validators.required);
    const file = new FormGroup({logo});
    this.Fform.addControl('logo', file);
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      // this.Fform.valid = true;
      if (file.type !== 'image/png'  && file.type !== 'image/jpeg' && file.type !== 'image/jpg' ) {
        this.warning();
        this.Fform.get('logo').setValue('');
        this.urlImg = '';
        this.fileName = '';
        this.isFileUploaded = false;
      } else {
        this.Fform.get('logo').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        this.fileName =  event.target.files[0].name;
        reader.onload = ( e: any) => { // called once readAsDataURL is completed
          this.urlImg = e.target.result;
        };
        this.isFileUploaded = true;
        this.dataImgUrl.emit(file);
      }
    } else {
      // no funca
      this.Fform.controls.fileImg.markAsDirty();
      this.Fform.controls.fileImg.markAsTouched();
      this.Fform.controls.fileImg.setErrors({invalid: true});
      this.isFileUploaded = false;
      console.log(this.Fform.controls.fileImg);
    }
  }
  warning() {
    Swal.fire({
      title: 'Alerta',
      text: 'Selecciona un documento tipo JPG o PNG',
      icon: 'warning',
      showConfirmButton: true,
    });
  }
}
