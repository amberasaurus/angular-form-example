import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { availableSpecies } from '../constants';
import { Zone } from '../types/types';
import { EnvironmentForm, ZoneForm } from './form.service';

export function environmentNameFactory(
  environments: FormArray<FormGroup<EnvironmentForm>>
) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (environments.value.find((env) => env.name === control.value)) {
      return {
        duplicateEnvironmentName: true,
      };
    }
    return null;
  };
}

export function zoneCapacityValidator(
  control: FormControl<Zone | undefined>
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const animals = control.value.animals;

  if (animals.length >= control.value.maxCapacity) {
    return {
      maxCapacity: true,
    };
  }

  return null;
}

export function zoneSafetyValidator(
  group: AbstractControl<ZoneForm>
): ValidationErrors | null {
  if (!group.value) {
    return null;
  }

  const adultCarnivores = (
    group as unknown as FormGroup<ZoneForm>
  ).controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();

    return (
      availableSpecies[animalRawValue.species].type === 'Carnivore' &&
      animalRawValue.lifeStage === 'Adult'
    );
  });

  const herbivores = (
    group as unknown as FormGroup<ZoneForm>
  ).controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();
    return availableSpecies[animalRawValue.species].type === 'Herbivore';
  });

  if (adultCarnivores.length >= 1 && herbivores.length >= 1) {
    herbivores
      .filter((h) => {
        let animalRawValue = h.getRawValue();
        return animalRawValue.lifeStage === 'Adult';
      })
      .forEach((deadHerbivore) => {
        deadHerbivore.setErrors({ deadHerbivore: true });
        console.log({ deadHerbivore });
      });

    return {
      safeZone: false,
    };
  }

  return null;
}

// adult carnivores eat adult herbivores
// adult carnivores eat unaccompanied babies
// unaccompanied = no adults of same species in the same zone
// t-rexes eat anything except other t-rexes (even accompanied babies)
