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
  enclosureSafetyValidator,
  minCapacityValidator,
} from './form-validator.service';

export type Habitat = FormGroup<{
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
    habitats: this.fb.array<Habitat>([]),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  public getHabitatFormGroup(): Habitat {
    return this.fb.group(
      {
        id: this.fb.control(uuidv4()),
        name: this.fb.control('', [
          Validators.required,
          // habitatNameFactory(this.form.controls.habitats),
        ]),
        type: this.fb.control('', [Validators.required]),
        enclosures: this.fb.array<Enclosure>([]),
      },
      {
        validators: [],
      },
    );
  }

  public addHabitat(hab: Habitat) {
    this.form.controls.habitats.push(hab);
  }

  public getCurrentHabitats() {
    return this.form.controls.habitats;
  }

  public getHabitatById(id: string) {
    const habs = this.getCurrentHabitats().controls;
    return habs.find((hab) => hab.value.id === id);
  }

  public getEnclosureById(habId: string, enclosureId: string) {
    const hab = this.getHabitatById(habId);
    const enclosures = hab?.controls.enclosures.controls;
    return enclosures?.find((enclosure) => enclosure.value.id === enclosureId);
  }

  public getAnimalById(habId: string, enclosureId: string, animalId: string) {
    const enclosure = this.getEnclosureById(habId, enclosureId);
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

  public addEnclosureToHabitat(habId: string, enclosure: Enclosure) {
    const hab = this.getHabitatById(habId);
    hab?.controls.enclosures.push(enclosure);
  }

  public getEnclosuresForHabitat(habIndex: number) {
    return this.form.controls.habitats.controls[habIndex]?.controls.enclosures;
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
    habId: string,
    enclosureId: string,
    animal: Animal,
  ) {
    const enclosure = this.getEnclosureById(habId, enclosureId);
    enclosure?.controls.animals.push(animal);
  }

  public patchAnimal(
    habId: string,
    enclosureId: string,
    animalId: string,
    newAnimal: Animal,
  ) {
    const animal = this.getAnimalById(habId, enclosureId, animalId);
    animal?.patchValue(newAnimal.value);
  }

  public patchEnclosure(
    habId: string,
    enclosureId: string,
    newEnclosure: Enclosure,
  ) {
    const enclosure = this.getEnclosureById(habId, enclosureId);
    enclosure?.patchValue(newEnclosure.value);
  }

  public patchHabitat(habId: string, newHab: Habitat) {
    const hab = this.getHabitatById(habId);
    hab?.patchValue(newHab.value);
  }

  public removeAnimalFromEnclosure(
    habId: string,
    enclosureId: string,
    animalId: string,
  ) {
    const enclosure = this.getEnclosureById(habId, enclosureId);
    const animalIdx = enclosure?.controls.animals.controls.findIndex(
      (animal) => animal.value.id === animalId,
    );
    if (animalIdx !== undefined && animalIdx >= 0) {
      enclosure?.controls.animals.removeAt(animalIdx);
    }
  }

  public removeEnclosureFromHabitat(habId: string, enclosureId: string) {
    const habitat = this.getHabitatById(habId);
    const enclosureIdx = habitat?.controls.enclosures.controls.findIndex(
      (enclosure) => enclosure.value.id === enclosureId,
    );
    if (enclosureIdx !== undefined && enclosureIdx >= 0) {
      habitat?.controls.enclosures.removeAt(enclosureIdx);
    }
  }

  public removeHabitat(habId: string) {
    const habitatIdx = this.form.controls.habitats.controls.findIndex(
      (hab) => hab.value.id === habId,
    );
    if (habitatIdx !== undefined && habitatIdx >= 0) {
      this.form?.controls.habitats.removeAt(habitatIdx);
    }
  }
}
