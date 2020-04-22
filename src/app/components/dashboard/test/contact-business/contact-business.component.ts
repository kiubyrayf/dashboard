import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html',
  styleUrls: ['./contact-businness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBusinessComponent implements OnInit {

  public contactForm: FormGroup;
  public border_validation = false;
  public form: any;
  public title = 'contact registration page';

  constructor(private route: Router, private fb: FormBuilder) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      job: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', Validators.required],
      paymentPerson: ['', Validators.required],
      fax: ['', Validators.required],
      schedule: this.fb.group({
        mondayStart: ['', , ],
        mondayEnd: ['', , ],
        tuesdayStart: ['', , ],
        tuesdayEnd: ['', , ],
        wednesdayStart: ['', , ],
        wednesdayEnd: ['', , ],
        thursdayStart: ['', , ],
        thursdayEnd: ['', , ],
        fridayStart: ['', , ],
        fridayEnd: ['', , ],
        saturdayStart: ['', , ],
        saturdayEnd: ['', , ],
      }),
    });
  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;
  }

  ngOnInit() {  }

}
