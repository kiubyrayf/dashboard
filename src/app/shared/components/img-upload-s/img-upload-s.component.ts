import { Component, OnInit, Output, Input, SkipSelf } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-img-upload-s',
  templateUrl: './img-upload-s.component.html',
  styleUrls: ['./img-upload-s.component.scss'],
  /* viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => {
      return container;
    },
    deps: [[new SkipSelf(), ControlContainer]],
  }] */
})
export class ImgUploadSComponent implements OnInit {

  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;
  
  @Input() groupName: string;
  Fform: FormGroup;
  constructor( private fb: FormBuilder, private parentContainer: ControlContainer) {
    this.isFileUploaded = false;
  }
 
  ngOnInit(): void {
    /* if (this.parentContainer.control instanceof FormGroup) {
      this.parentContainer.control.addControl(this.groupName, new FormControl(['', Validators.required, ]));
    } */
  }
  onSelectFile(event) { // called each time file input changes
/*     if (event.target.files && event.target.files.length > 0) {
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
    });*/
  }
}
 