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
/* export function useFactory(container: ControlContainer) {
  return container;
} */
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

}
