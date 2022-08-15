import { Injectable } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { enclosureNameValidatorFactory } from './no-types-form-validator.service';

@Injectable({ providedIn: 'root' })
export class NoTypeFormService {
  form: FormGroup;
  constructor(private fb: NonNullableFormBuilder) {
    this.form = fb.group({
      enclosures: fb.array([]),
    });
  }

  public getEnclosureFormGroup(): FormGroup {
    return this.fb.group(
      {
        name: this.fb.control('', [
          Validators.required,
          enclosureNameValidatorFactory(this.form),
        ]),
        maxCapacity: this.fb.control(0, [Validators.required]),
        animals: this.fb.array([]),
      },
      { validators: [] }
    );
  }

  public addEnclosure(enclosure: FormGroup) {
    (this.form.get('enclosures') as FormArray).push(enclosure);
  }
}
