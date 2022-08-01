import { AbstractControl, ValidationErrors } from '@angular/forms';
import { availableSpecies } from '../constants';
import { FormService, Zone } from './form.service';

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

// TODO: Can we clean this up? rename to unsafe zone
export function zoneSafetyValidator(
  group: AbstractControl
): ValidationErrors | null {
  if (!group.value) {
    return null;
  }
  // Clear "dead" errors
  (group as unknown as Zone).controls.animals.controls.forEach((animal) => {
    if (animal.errors) {
      delete animal.errors['dead'];
    }
  });

  const adultHypercarnivores = (
    group as unknown as Zone
  ).controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();

    return (
      availableSpecies[animalRawValue.species].type === 'Hypercarnivore' &&
      animalRawValue.lifeStage === 'Adult'
    );
  });

  const otherAnimals = (
    group as unknown as Zone
  ).controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();
    return availableSpecies[animalRawValue.species].type !== 'Hypercarnivore';
  });

  if (adultHypercarnivores.length >= 1 && otherAnimals.length >= 1) {
    otherAnimals.forEach((deadAnimal) => {
      deadAnimal.setErrors({ dead: true });
    });

    return {
      unsafeZone: true,
    };
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
    herbivores.forEach((deadHerbivore) => {
      deadHerbivore.setErrors({ dead: true });
    });

    return {
      unsafeZone: true,
    };
  }

  return null;
}

export function minCapacityValidator(
  control: AbstractControl
): ValidationErrors | null {
  const numAnimals = control.parent?.get('animals')?.value.length;
  if (control.value < numAnimals) {
    return {
      minCapacity: true,
    };
  }
  return null;
}
