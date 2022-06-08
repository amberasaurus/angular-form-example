import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { environmentNameFactory } from './form-validator.service';

export interface EnvironmentForm {
  name: FormControl<string>;
  type: FormControl<string>;
  zones: FormArray<FormGroup<ZoneForm>>;
}

export interface ZoneForm {
  name: FormControl<string>;
  maxCapacity: FormControl<number>;
  animals: FormArray<FormGroup<AnimalForm>>;
}

export interface AnimalForm {
  name: FormControl<string>;
  species: FormControl<string>;
  lifeStage: FormControl<string>;
}

@Injectable({ providedIn: 'root' })
export class FormService {
  form: FormGroup<{
    environments: FormArray<FormGroup<EnvironmentForm>>;
  }> = this.fb.group({
    environments: this.fb.array<FormGroup<EnvironmentForm>>([]),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  public getEnvironmentFormGroup(): FormGroup<EnvironmentForm> {
    return this.fb.group<EnvironmentForm>(
      {
        name: this.fb.control('', [
          Validators.required,
          environmentNameFactory(this.form.controls.environments),
        ]),
        type: this.fb.control('', [Validators.required]),
        zones: this.fb.array<FormGroup<ZoneForm>>([]),
      },
      {
        validators: [],
      }
    );
  }

  public addEnvironment(env: FormGroup<EnvironmentForm>) {
    this.form.controls.environments.push(env);
  }

  public getCurrentEnvironments(): FormArray<FormGroup<EnvironmentForm>> {
    return this.form.controls.environments;
  }

  public getZoneFormGroup(): FormGroup<ZoneForm> {
    return this.fb.group<ZoneForm>({
      name: this.fb.control('', [Validators.required]),
      maxCapacity: this.fb.control(0, [Validators.required]),
      animals: this.fb.array<FormGroup<AnimalForm>>([]),
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
  ): FormArray<FormGroup<ZoneForm>> | undefined {
    return this.form.controls.environments.controls[envIndex]?.controls.zones;
  }

  public getAnimalFormGroup(): FormGroup<AnimalForm> {
    return this.fb.group<AnimalForm>({
      name: this.fb.control('', Validators.required),
      species: this.fb.control('', Validators.required),
      lifeStage: this.fb.control('', Validators.required),
    });
  }

  public addAnimalToZoneInEnv(
    envIdx: number,
    zoneName: string | undefined,
    animal: FormGroup<AnimalForm>
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
