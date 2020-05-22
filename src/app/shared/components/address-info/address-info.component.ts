import { Component, OnInit, SkipSelf, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ControlContainer, FormArray } from '@angular/forms';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => {
      return container;
    },
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})

export class AddressInfoComponent implements OnInit {
  @Input() groupName: string;

  constructor( private fb: FormBuilder, public parentContainer: ControlContainer) {

  }
  ngOnInit(): void {
    if (this.parentContainer.control instanceof FormGroup) {
      this.parentContainer.control.addControl(this.groupName, this.fb.group({
        street: ['', Validators.required, ],
        number: ['', Validators.required, ],
        cp: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{5}$')], ],
        municipality: ['', Validators.required, ],
        suburb: ['', Validators.required, ],
      }));
    }
  }
/*   public findInvalidControlsRecursive(formToInvestigate: FormGroup|FormArray): string[] {
    const invalidControls: string[] = [];
    const recursiveFunc = (form: FormGroup | FormArray) => {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control.invalid) {
              field.reportValidity();
              invalidControls.push(field);
            }
            if (control instanceof FormGroup) {
                recursiveFunc(control);
            } else if ( control instanceof FormArray) {
                recursiveFunc(control);
            }
        });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
} */

}
