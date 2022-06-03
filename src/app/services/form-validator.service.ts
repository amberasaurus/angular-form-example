import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { ZoneTemp } from '../types/types';

export function environmentNameValidator(
  group: AbstractControl
): ValidationErrors | null {
  const environments = group.parent as FormArray;

  // ['foo', 'bar', 'foo']

  // TODO: figure this out
  // if (!environments) {
  //   return null;
  // }

  // const names = environments?.value.map((env: { name: string }) => env.name);
  // console.log(names);

  // const set = new Set(names);
  // console.log(set);

  // if (names.length !== set.size) {
  //   return {
  //     duplicateName: true,
  //   };
  // }

  return null;
}

export function zoneCapacityValidator(
  control: FormControl<ZoneTemp | undefined>
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
