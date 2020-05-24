import { Component, OnInit, Output, Input, SkipSelf, forwardRef, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ImgInfoService } from '../../services/img-info.service';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-img-upload-s',
  templateUrl: './img-upload-s.component.html',
  styleUrls: ['./img-upload-s.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImgUploadSComponent),
      multi: true
    }
  ]/* viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => {
      return container;
    },
    deps: [[new SkipSelf(), ControlContainer]],
  }] */
})
export class ImgUploadSComponent implements  OnInit {

  public fileName: any;
  public urlImg: any;
  public isFileUploaded: boolean;

  @ViewChild('fInput') fInput: ElementRef;
  
  @Input() groupName: string;
  @Output() fileInfo: EventEmitter<any>;
  Fform: FormGroup;

  get f() { return this.Fform.controls; }

  constructor( private fb: FormBuilder, private parentContainer: ControlContainer, private imgService: ImgInfoService) {
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
        this.fileInfo.emit(file);
        // this.fInput.nativeElement
      }
    }
  }

  fileInputLogoTouched() {
    console.log(this.fInput);
    this.Fform.controls.logo.markAsDirty();
    this.Fform.controls.logo.markAsTouched();
    this.Fform.controls.logo.setErrors({invalid: true});
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

  //Aqui es donde se va a meter valires al service, llames a este metodo cualquiera que este subscrito va a actualizarse automaticamente
  setValue(message:string)
  {
    this.imgService.setData("Ejemplo");
  }

}
