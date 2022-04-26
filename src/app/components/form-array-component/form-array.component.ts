import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from 'src/app/state/reducers';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: 'form-array.component.html',
})
export class DynamicFormArrayComponent implements OnInit {
  @Input()
  set data(values: Address[] | undefined) {
    while (this.addressFormArray.controls.length) {
      this.addressFormArray.removeAt(0);
    }

    if (values) {
      values.forEach((address) => {
        this.addressFormArray.push(this.createAddressFormGroup(address));
      });
    }
  }

  @Output() addAddress = new EventEmitter<void>();

  addressFormGroup: FormGroup = this.fb.group({
    addresses: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  createAddressFormGroup(address: Address) {
    return this.fb.group({
      street: [address.street],
      city: [address.city],
      state: [address.state],
    });
  }

  get addressFormArray(): FormArray {
    return this.addressFormGroup.get('addresses') as FormArray;
  }
}
