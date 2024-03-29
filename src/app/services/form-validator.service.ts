import { AbstractControl, ValidationErrors } from '@angular/forms';
import { availableSpecies } from '../constants';
import { FormService, Enclosure } from './form.service';

export function enclosureCapacityFactory(formService: FormService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const enclosure = formService.getEnclosureById(
      control.value.selectedHabitat,
      control.value.selectedEnclosure,
    );

    if (!enclosure) {
      return null;
    }

    let newAnimal = true;

    // animal already in enclosure?
    if (
      control.value.selectedAnimal &&
      enclosure.controls.animals.controls.find(
        (animal) => animal.value.id === control.value.selectedAnimal,
      )
    ) {
      newAnimal = false;
    }

    const animals = enclosure.value.animals;
    const maxCapacity = enclosure.value.maxCapacity;

    if (animals && maxCapacity && newAnimal && animals.length === maxCapacity) {
      control.get('selectedEnclosure')?.setErrors({
        maxCapacity: true,
      });
    } else {
      control.get('selectedEnclosure')?.setErrors(null);
    }

    return null;
  };
}

// TODO: Can we clean this up? rename to unsafe enclosure
export function enclosureSafetyValidator(
  group: AbstractControl,
): ValidationErrors | null {
  if (!group.value) {
    return null;
  }
  const enclosure = group as Enclosure;
  // Clear "dead" errors
  enclosure.controls.animals.controls.forEach((animal) => {
    if (animal.errors) {
      delete animal.errors['dead'];
    }
  });

  const adultHypercarnivores = enclosure.controls.animals.controls.filter(
    (a) => {
      let animalRawValue = a.getRawValue();

      return (
        availableSpecies[animalRawValue.species].type === 'Hypercarnivore' &&
        animalRawValue.lifeStage === 'Adult'
      );
    },
  );

  const otherAnimals = enclosure.controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();
    return availableSpecies[animalRawValue.species].type !== 'Hypercarnivore';
  });

  if (adultHypercarnivores.length >= 1 && otherAnimals.length >= 1) {
    otherAnimals.forEach((deadAnimal) => {
      deadAnimal.setErrors({ dead: true });
    });

    return {
      unsafeEnclosure: true,
    };
  }

  const adultCarnivores = enclosure.controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();

    return (
      availableSpecies[animalRawValue.species].type === 'Carnivore' &&
      animalRawValue.lifeStage === 'Adult'
    );
  });

  const herbivores = enclosure.controls.animals.controls.filter((a) => {
    let animalRawValue = a.getRawValue();
    return availableSpecies[animalRawValue.species].type === 'Herbivore';
  });

  if (adultCarnivores.length >= 1 && herbivores.length >= 1) {
    herbivores.forEach((deadHerbivore) => {
      deadHerbivore.setErrors({ dead: true });
    });

    return {
      unsafeEnclosure: true,
    };
  }

  return null;
}

export function minCapacityValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const numAnimals = control.parent?.get('animals')?.value.length;
  if (control.value < numAnimals) {
    return {
      minCapacity: true,
    };
  }
  return null;
}
