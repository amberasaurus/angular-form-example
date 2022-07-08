import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormService } from './form.service';

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
      control.value.envId,
      control.value.zoneId
    );

    if (!zone) {
      return null;
    }

    const animals = zone.value.animals;
    const maxCapacity = zone.value.maxCapacity;

    if (animals && maxCapacity && animals.length >= maxCapacity) {
      return {
        maxCapacity: true,
      };
    }
    return null;
  };
}

// export function zoneSafetyValidator(
//   group: AbstractControl
// ): ValidationErrors | null {
//   if (!group.value) {
//     return null;
//   }

//   const adultCarnivores = (
//     group as unknown as FormGroup
//   ).controls.animals.controls.filter((a) => {
//     let animalRawValue = a.getRawValue();

//     return (
//       availableSpecies[animalRawValue.species].type === 'Carnivore' &&
//       animalRawValue.lifeStage === 'Adult'
//     );
//   });

//   const herbivores = (
//     group as unknown as FormGroup<ZoneForm>
//   ).controls.animals.controls.filter((a) => {
//     let animalRawValue = a.getRawValue();
//     return availableSpecies[animalRawValue.species].type === 'Herbivore';
//   });

//   if (adultCarnivores.length >= 1 && herbivores.length >= 1) {
//     herbivores
//       .filter((h) => {
//         let animalRawValue = h.getRawValue();
//         return animalRawValue.lifeStage === 'Adult';
//       })
//       .forEach((deadHerbivore) => {
//         deadHerbivore.setErrors({ deadHerbivore: true });
//         console.log({ deadHerbivore });
//       });

//     return {
//       safeZone: false,
//     };
//   }

//   return null;
// }

// adult carnivores eat adult herbivores
// adult carnivores eat unaccompanied babies
// unaccompanied = no adults of same species in the same zone
// t-rexes eat anything except other t-rexes (even accompanied babies)
