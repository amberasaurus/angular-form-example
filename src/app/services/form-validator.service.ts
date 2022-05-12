import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function environmentNameValidator(
  group: AbstractControl
): ValidationErrors | null {
  const environments = group.parent as FormArray;
  console.log(environments);
  // ['foo', 'bar', 'foo']

  if (!environments) {
    return null;
  }

  const names = environments?.value.map((env: { name: string }) => env.name);
  console.log(names);

  const set = new Set(names);
  console.log(set);

  if (names.length !== set.size) {
    return {
      duplicateName: true,
    };
  }

  return null;
}
