import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Zone } from '../types/types';
import { EnvironmentForm } from './form.service';

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
