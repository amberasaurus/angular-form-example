import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { environmentNameValidator } from './form-validator.service';

export interface Environment {
  name: FormControl<string>;
  type: FormControl<string>;
  zones: FormArray<FormGroup<Zone>>;
}

export interface Zone {
  name: FormControl<string>;
  maxCapacity: FormControl<number>;
  animals: FormArray<FormGroup<Animal>>;
}

export interface Animal {
  name: FormControl<string>;
  species: FormControl<string>;
  lifeStage: FormControl<string>;
}

@Injectable({ providedIn: 'root' })
export class FormService {
  form: FormGroup<{
    environments: FormArray<FormGroup<Environment>>;
  }> = this.fb.group({
    environments: this.fb.array<FormGroup<Environment>>([]),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  public getEnvironmentFormGroup(): FormGroup<Environment> {
    return this.fb.group<Environment>(
      {
        name: this.fb.control('', [Validators.required]),
        type: this.fb.control('', [Validators.required]),
        zones: this.fb.array<FormGroup<Zone>>([]),
      },
      {
        validators: [environmentNameValidator],
      }
    );
  }

  public addEnvironment(env: FormGroup<Environment>) {
    this.form.controls.environments.push(env);
  }

  public getCurrentEnvironments(): FormArray<FormGroup<Environment>> {
    return this.form.controls.environments;
  }

  public getZoneFormGroup(): FormGroup<Zone> {
    return this.fb.group<Zone>({
      name: this.fb.control('', [Validators.required]),
      maxCapacity: this.fb.control(0, [Validators.required]),
      animals: this.fb.array<FormGroup<Animal>>([]),
    });
  }

  public addZoneToEnvironment(envName: string, zone: FormGroup) {
    const env = this.findEnvironmentByName(envName);
    if (env) {
      env.controls.zones.push(zone);
    }
  }

  public getZonesForEnvironment(
    envName: string
  ): FormArray<FormGroup<Zone>> | undefined {
    return this.form.controls.environments.controls.find(
      (env) => env.controls.name.value === envName
    )?.controls.zones;
  }

  public getAnimalFormGroup(): FormGroup<Animal> {
    return this.fb.group<Animal>({
      name: this.fb.control(''),
      species: this.fb.control(''),
      lifeStage: this.fb.control(''),
    });
  }

  private findEnvironmentByName(
    name: string
  ): FormGroup<Environment> | undefined {
    return this.getCurrentEnvironments().controls.find(
      (env) => env.controls.name.value === name
    );
  }
}
