import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

// Habitat
export type Environment = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  type: FormControl<string>;
  zones: FormArray<Zone>;
}>;

// Enclosure
export type Zone = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  maxCapacity: FormControl<number>;
  animals: FormArray<Animal>;
}>;

export type Animal = FormGroup<{
  id: FormControl<string>;
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
        id: this.fb.control(uuidv4()),
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

  public getEnvironmentById(id: string) {
    const envs = this.getCurrentEnvironments().controls;
    return envs.find((env) => env.value.id === id);
  }

  public getZoneById(envId: string, zoneId: string) {
    const env = this.getEnvironmentById(envId);
    const zones = env?.controls.zones.controls;
    return zones?.find((zone) => zone.value.id === zoneId);
  }

  public getAnimalById(envId: string, zoneId: string, animalId: string) {
    const zone = this.getZoneById(envId, zoneId);
    const animals = zone?.controls.animals.controls;
    return animals?.find((animal) => animal.value.id === animalId);
  }

  // TODO: rename get to create for all
  public getZoneFormGroup(): Zone {
    return this.fb.group(
      {
        id: this.fb.control(uuidv4()),
        name: this.fb.control('', [Validators.required]),
        maxCapacity: this.fb.control(0, [Validators.required]),
        animals: this.fb.array<Animal>([]),
      },
      { validators: [] }
    );
  }

  public addZoneToEnvironment(envId: string, zone: Zone) {
    const env = this.getEnvironmentById(envId);
    env?.controls.zones.push(zone);
  }

  public getZonesForEnvironment(envIndex: number) {
    return this.form.controls.environments.controls[envIndex]?.controls.zones;
  }

  public getAnimalFormGroup(): Animal {
    return this.fb.group({
      id: this.fb.control(uuidv4()),
      name: this.fb.control('', Validators.required),
      species: this.fb.control('', Validators.required),
      lifeStage: this.fb.control('', Validators.required),
    });
  }

  public addAnimalToZone(envId: string, zoneId: string, animal: Animal) {
    const zone = this.getZoneById(envId, zoneId);
    zone?.controls.animals.push(animal);
  }

  public patchAnimal(
    envId: string,
    zoneId: string,
    animalId: string,
    newAnimal: Animal
  ) {
    const animal = this.getAnimalById(envId, zoneId, animalId);
    animal?.patchValue(newAnimal.value);
  }

  public patchZone(envId: string, zoneId: string, newZone: Zone) {
    const zone = this.getZoneById(envId, zoneId);
    zone?.patchValue(newZone.value);
  }

  public patchEnvironment(envId: string, newEnv: Environment) {
    const env = this.getEnvironmentById(envId);
    env?.patchValue(newEnv.value);
  }
}
