import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

interface AllValidationErrors {
  controlName: string;
  errorName: string;
  errorValue: any;
}

interface FormGroupControls {
  [key: string]: AbstractControl;
}

function getFormValidationErrors(
  controls: FormGroupControls,
): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach((key) => {
    const control = controls[key];
    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors | null = controls[key].errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((keyError) => {
        errors.push({
          controlName: key,
          errorName: keyError,
          errorValue: controlErrors[keyError],
        });
      });
    }
  });
  return errors;
}

export function formHasUnacceptableErrors(
  controls: FormGroupControls,
  acceptableErrors: string[],
) {
  const errors = getFormValidationErrors(controls);
  return (
    errors.filter((e) => !acceptableErrors.includes(e.errorName)).length > 0
  );
}
