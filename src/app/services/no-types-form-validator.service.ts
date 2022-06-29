import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function zoneNameValidatorFactory(form: FormGroup) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      form.get('zones')?.value.find((zone: any) => zone.name === control.value)
    ) {
      return {
        duplicateZoneName: true,
      };
    }
    return null;
  };
}
