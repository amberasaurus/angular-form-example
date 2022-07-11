import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { availableSpecies } from '../constants';
import { FormService, Zone } from './form.service';

// export function environmentNameFactory(environments: FormArray) {
//   return (control: AbstractControl): ValidationErrors | null => {
//     if (environments.value.find((env: any) => env.name === control.value)) {
//       return {
//         duplicateEnvironmentName: true,
//       };
//     }
//     return null;
//   };
// }

// TODO: fix
export function zoneCapacityFactory(formService: FormService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const zone = formService.getZoneById(
      control.value.selectedEnvironment,
      control.value.selectedZone
    );

    if (!zone) {
      return null;
    }

    let newAnimal = true;

    // animal already in zone?
    if (
      control.value.selectedAnimal &&
      zone.controls.animals.controls.find(
        (animal) => animal.value.id === control.value.selectedAnimal
      )
    ) {
      newAnimal = false;
    }

    const animals = zone.value.animals;
    const maxCapacity = zone.value.maxCapacity;

    if (animals && maxCapacity && newAnimal && animals.length === maxCapacity) {
      control.get('selectedZone')?.setErrors({
        maxCapacity: true,
      });
    } else {
      control.get('selectedZone')?.setErrors(null);
    }

    return null;
  };
}

export function zoneSafetyValidator(
  group: AbstractControl
): ValidationErrors | null {
  if (!group.value) {
    return null;
  }

  const adultCarnivores = (
    group as unknown as Zone
  ).controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();

    return (
      availableSpecies[animalRawValue.species].type === 'Carnivore' &&
      animalRawValue.lifeStage === 'Adult'
    );
  });

  const herbivores = (
    group as unknown as Zone
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
