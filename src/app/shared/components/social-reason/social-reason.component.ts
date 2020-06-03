import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-social-reason',
  templateUrl: './social-reason.component.html',
  styleUrls: ['./social-reason.component.scss']
})
export class SocialReasonComponent implements OnInit, OnChanges {
  @Output() rfcArray: EventEmitter<any>;
  public Fform: FormGroup;
  public rfcList: FormArray;

  get rfcFormGroup()  {
    return (this.Fform.get('socialReason') as FormArray).controls;
  }

  constructor(private fb: FormBuilder, ) {
    this.Fform = this.fb.group({
      socialReason: this.fb.array([this.createRFC()])
    });
    this.rfcArray = new EventEmitter();
  }

  ngOnInit() {
    this.rfcList = this.Fform.get('socialReason') as FormArray;
  }
  ngOnChanges() {
    this.rfcList = this.Fform.get('socialReason') as FormArray;
  }

  createRFC(): FormGroup {
    return this.fb.group({
      name:  ['', Validators.required, ],
    });

  }

  addRFC() {
    this.rfcList.push(this.createRFC());
  }

  removeRFC(index) {
    this.rfcList.removeAt(index);
  }

  getRFCFormGroup(index): FormGroup {
    return this.rfcList.controls[index] as FormGroup;
  }

  addErfc() {
    const rfc: any = [];
    for (const rfcItem of this.rfcFormGroup) {
     rfc.push({
        name: rfcItem.get('name').value,
      });
    }
    this.rfcArray.emit(rfc);
  }
}
