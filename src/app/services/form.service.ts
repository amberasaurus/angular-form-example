import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  form = this.fb.group({
    environments: this.fb.array([]),
    species: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  public getEnvironmentFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      type: [''],
      zones: this.fb.array([]),
    });
  }

  public addEnvironment(env: FormGroup) {
    (this.form.get('environments') as FormArray).push(env);
  }

  private getSpeciesFormGroup(): FormGroup {
    return this.fb.group({
      name: [],
      emoji: [],
      prey: this.fb.array([]),
      type: [],
    });
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
