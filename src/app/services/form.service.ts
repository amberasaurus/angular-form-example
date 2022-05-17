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

  public getCurrentEnvironments(): FormArray {
    return this.form.get('environments') as FormArray;
  }

  public getZoneFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      maxCapacity: ['', [Validators.required]],
      animals: this.fb.array([]),
    });
  }

  public addZoneToEnvironment(envName: string, zone: FormGroup) {
    const env = this.findEnvironmentByName(envName);
    if (env) {
      (env.get('zones') as FormArray).push(zone);
    }
  }

  private getAnimalFormGroup(): FormGroup {
    return this.fb.group({
      name: [],
      species: [],
      lifeStage: [],
    });
  }

  private findEnvironmentByName(name: string) {
    return this.getCurrentEnvironments().controls.find(
      (control) => control.value.name === name
    );
  }
}
