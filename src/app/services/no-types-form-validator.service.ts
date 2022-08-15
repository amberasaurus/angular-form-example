import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function enclosureNameValidatorFactory(form: FormGroup) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      form
        .get('enclosures')
        ?.value.find((enclosure: any) => enclosure.name === control.value)
    ) {
      return {
        duplicateEnclosureName: true,
      };
    }
    return null;
  };
}
