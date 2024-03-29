import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ContactService } from '../../../shared/services/firebase/contact.service';
import { ToastrService } from 'ngx-toastr';
// import { ImgUploadService } from 'src/app/shared/services/img-upload.service';

type UserFields = 'name' | 'surname' | 'mobile' | 'profileImg' | 'age';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewUserComponent implements OnInit {
  contactDetail: any;
  public contactForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'name': '',
    'surname': '',
    'mobile': '',
    'profileImg': '',
    'age': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  // dentro del contrusctor ( aui) , private testService: ImgUploadService
  constructor(private fb: FormBuilder, private router: Router, private contactService: ContactService, private toastr: ToastrService) {
    this.contactForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      mobile: new FormControl(),
      age: new FormControl()
    });
  }

  resetFields() {
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }
  showSuccess() {
    this.toastr.success('User Created!');
  }

  submit(value) {
    this.contactService.createUser(value, this.url)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/contact/contacts']);
          this.showSuccess();
        }
      );
  }

  // FileUpload
  readUrl(event: any) {
    if (event.target.files.length === 0) { return; }
    // Image upload validation
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  cancel() {
    this.router.navigate(['/contact/contacts']);
  }

  ngOnInit() {
    // Aqui se llama al servicio y se cacha la respuesta
    /* let response = this.testService.returnMessage();
    console.log(response) */
   }

}
