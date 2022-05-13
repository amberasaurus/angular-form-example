import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environmentNameValidator } from './form-validator.service';

@Injectable({ providedIn: 'root' })
export class FormService {
  form = this.fb.group({
    environments: this.fb.array([]),
    validators: [],
  });

  constructor(private fb: FormBuilder) {}

  public getEnvironmentFormGroup(): FormGroup {
    return this.fb.group(
      {
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        zones: this.fb.array([]),
      },
      {
        validators: [environmentNameValidator],
      }
    );
  }

  public addEnvironment(env: FormGroup) {
    (this.form.get('environments') as FormArray).push(env);
  }

  private getZoneFormGroup(): FormGroup {
    return this.fb.group({
      name: [],
      maxCapacity: [],
      animals: this.fb.array([]),
    });
  }

  private getAnimalFormGroup(): FormGroup {
    return this.fb.group({
      name: [],
      species: [],
      lifeStage: [],
    });
  }
}
