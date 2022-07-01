import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

export type Environment = FormGroup<{
  name: FormControl<string>;
  type: FormControl<string>;
  zones: FormArray<Zone>;
}>;

export type Zone = FormGroup<{
  name: FormControl<string>;
  maxCapacity: FormControl<number>;
  animals: FormArray<Animal>;
}>;

export type Animal = FormGroup<{
  name: FormControl<string>;
  species: FormControl<string>;
  lifeStage: FormControl<string>;
}>;

@Injectable({ providedIn: 'root' })
export class FormService {
  form = this.fb.group({
    environments: this.fb.array<Environment>([]),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  public getEnvironmentFormGroup(): Environment {
    return this.fb.group(
      {
        name: this.fb.control('', [
          Validators.required,
          // environmentNameFactory(this.form.controls.environments),
        ]),
        type: this.fb.control('', [Validators.required]),
        zones: this.fb.array<Zone>([]),
      },
      {
        validators: [],
      }
    );
  }

  public addEnvironment(env: Environment) {
    this.form.controls.environments.push(env);
  }

  public getCurrentEnvironments() {
    return this.form.controls.environments;
  }

  public getEnvironmentByName(name: string) {
    const envs = this.getCurrentEnvironments().controls;
    return envs.find((env) => env.value.name === name);
  }

  public getZoneByName(envName: string, zoneName: string) {
    const env = this.getEnvironmentByName(envName);
    const zones = env?.controls.zones.controls;
    return zones?.find((zone) => zone.value.name === zoneName);
  }

  public getAnimalByName(
    envName: string,
    zoneName: string,
    animalName: string
  ) {
    const zone = this.getZoneByName(envName, zoneName);
    const animals = zone?.controls.animals.controls;
    return animals?.find((animal) => animal.value.name === animalName);
  }

  public getZoneFormGroup() {
    return this.fb.group(
      {
        name: this.fb.control('', [Validators.required]),
        maxCapacity: this.fb.control(0, [Validators.required]),
        animals: this.fb.array<Animal>([]),
      },
      { validators: [] }
    );
  }

  public addZoneToEnvironment(env: Environment, zone: Zone) {
    env.controls.zones.push(zone);
  }

  public getZonesForEnvironment(envIndex: number) {
    return this.form.controls.environments.controls[envIndex]?.controls.zones;
  }

  public getAnimalFormGroup() {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      species: this.fb.control('', Validators.required),
      lifeStage: this.fb.control('', Validators.required),
    });
  }

  public addAnimalToZone(zone: Zone, animal: Animal) {
    zone.controls.animals.push(animal);
  }
}
