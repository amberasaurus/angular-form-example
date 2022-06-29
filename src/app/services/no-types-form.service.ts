import { Injectable } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { zoneNameValidatorFactory } from './no-types-form-validator.service';

@Injectable({ providedIn: 'root' })
export class NoTypeFormService {
  form: FormGroup;
  constructor(private fb: NonNullableFormBuilder) {
    this.form = fb.group({
      zones: fb.array([]),
    });
  }

  public getZoneFormGroup(): FormGroup {
    return this.fb.group(
      {
        name: this.fb.control('', [
          Validators.required,
          zoneNameValidatorFactory(this.form),
        ]),
        maxCapacity: this.fb.control(0, [Validators.required]),
        animals: this.fb.array([]),
      },
      { validators: [] }
    );
  }

  public addZone(zone: FormGroup) {
    (this.form.get('zones') as FormArray).push(zone);
  }
}
