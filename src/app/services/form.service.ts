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

  public addZoneToEnvironment(envIndex: number, zone: FormGroup) {
    const env = this.form.controls.environments.controls[envIndex];
    if (env) {
      env.controls.zones.push(zone);
    }
  }

  public getZonesForEnvironment(
    envIndex: number
  ): FormArray<FormGroup<Zone>> | undefined {
    return this.form.controls.environments.controls[envIndex]?.controls.zones;
  }

  public getAnimalFormGroup(): FormGroup<Animal> {
    return this.fb.group<Animal>({
      name: this.fb.control('', Validators.required),
      species: this.fb.control('', Validators.required),
      lifeStage: this.fb.control('', Validators.required),
    });
  }

  public addAnimalToZoneInEnv(
    envIdx: number,
    zoneName: string | undefined,
    animal: FormGroup<Animal>
  ) {
    // TODO: looking up by name might not be the best approach
    const zoneIndex = this.form.controls.environments.controls[
      envIdx
    ]?.controls.zones.controls.findIndex(
      (zone) => zone.controls.name.value === zoneName
    );
    if (envIdx !== -1 && zoneIndex !== -1) {
      const env = this.form.controls.environments.controls[envIdx];
      const zone = env.controls.zones.controls[zoneIndex];

      zone.controls.animals.push(animal);
    }
  }
}
