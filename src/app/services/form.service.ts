import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';
import {
  minCapacityValidator,
  enclosureSafetyValidator,
} from './form-validator.service';

// Habitat
export type Environment = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  type: FormControl<string>;
  enclosures: FormArray<Enclosure>;
}>;

export type Enclosure = FormGroup<{
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
        enclosures: this.fb.array<Enclosure>([]),
      },
      {
        validators: [],
      },
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

  public getEnclosureById(envId: string, enclosureId: string) {
    const env = this.getEnvironmentById(envId);
    const enclosures = env?.controls.enclosures.controls;
    return enclosures?.find((enclosure) => enclosure.value.id === enclosureId);
  }

  public getAnimalById(envId: string, enclosureId: string, animalId: string) {
    const enclosure = this.getEnclosureById(envId, enclosureId);
    const animals = enclosure?.controls.animals.controls;
    return animals?.find((animal) => animal.value.id === animalId);
  }

  // TODO: rename get to create for all
  public getEnclosureFormGroup(): Enclosure {
    return this.fb.group(
      {
        id: this.fb.control(uuidv4()),
        name: this.fb.control('', [Validators.required]),
        maxCapacity: this.fb.control(0, [
          Validators.required,
          minCapacityValidator,
        ]),
        animals: this.fb.array<Animal>([]),
      },
      { validators: [enclosureSafetyValidator] },
    );
  }

  public addEnclosureToEnvironment(envId: string, enclosure: Enclosure) {
    const env = this.getEnvironmentById(envId);
    env?.controls.enclosures.push(enclosure);
  }

  public getEnclosuresForEnvironment(envIndex: number) {
    return this.form.controls.environments.controls[envIndex]?.controls
      .enclosures;
  }

  public getAnimalFormGroup(): Animal {
    return this.fb.group({
      id: this.fb.control(uuidv4()),
      name: this.fb.control('', Validators.required),
      species: this.fb.control('', Validators.required),
      lifeStage: this.fb.control('', Validators.required),
    });
  }

  public addAnimalToEnclosure(
    envId: string,
    enclosureId: string,
    animal: Animal,
  ) {
    const enclosure = this.getEnclosureById(envId, enclosureId);
    enclosure?.controls.animals.push(animal);
  }

  public patchAnimal(
    envId: string,
    enclosureId: string,
    animalId: string,
    newAnimal: Animal,
  ) {
    const animal = this.getAnimalById(envId, enclosureId, animalId);
    animal?.patchValue(newAnimal.value);
  }

  public patchEnclosure(
    envId: string,
    enclosureId: string,
    newEnclosure: Enclosure,
  ) {
    const enclosure = this.getEnclosureById(envId, enclosureId);
    enclosure?.patchValue(newEnclosure.value);
  }

  public patchEnvironment(envId: string, newEnv: Environment) {
    const env = this.getEnvironmentById(envId);
    env?.patchValue(newEnv.value);
  }

  public removeAnimalFromEnclosure(
    envId: string,
    enclosureId: string,
    animalId: string,
  ) {
    const enclosure = this.getEnclosureById(envId, enclosureId);
    const animalIdx = enclosure?.controls.animals.controls.findIndex(
      (animal) => animal.value.id === animalId,
    );
    if (animalIdx !== undefined && animalIdx >= 0) {
      enclosure?.controls.animals.removeAt(animalIdx);
    }
  }
}
