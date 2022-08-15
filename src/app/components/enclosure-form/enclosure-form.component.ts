import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Environment, FormService, Enclosure } from 'src/app/services/form.service';
import { formHasUnacceptableErrors } from '../../utils/forms';

@Component({
  selector: 'app-enclosure-form',
  templateUrl: './enclosure-form.component.html',
  styleUrls: ['./enclosure-form.component.scss'],
})
export class EnclosureFormComponent {
  enclosureForm: Enclosure;
  currentEnvironments: FormArray<Environment>;
  selectedEnvironment = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  isNew = true;

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.enclosureForm = this.formService.getEnclosureFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    route.data
      .pipe(
        map((data) => ({ enclosure: data['enclosure'], env: data['environment'] })),
        filter((data) => !!data.enclosure)
      )
      .subscribe(({ enclosure, env }: { enclosure: Enclosure; env: Environment }) => {
        this.enclosureForm.patchValue(enclosure.value);

        enclosure.controls.animals.controls.forEach((animal) => {
          const animalFormGroup = this.formService.getAnimalFormGroup();
          animalFormGroup.patchValue(animal.value);
          this.enclosureForm.controls.animals.push(animalFormGroup);
        });

        this.isNew = false;

        // TODO handle undefined
        this.selectedEnvironment.setValue(env.value.id || '');
      });
  }

  submit(): void {
    if (this.isNew && this.selectedEnvironment.value) {
      this.formService.addEnclosureToEnvironment(
        this.selectedEnvironment.value,
        this.enclosureForm
      );
    } else {
      // TODO: handle undefined better
      this.formService.patchEnclosure(
        this.selectedEnvironment.value || '',
        this.enclosureForm.value.id || '',
        this.enclosureForm
      );
    }

    this.router.navigate(['']);
  }

  enclosureHasUnacceptableErrors() {
    return formHasUnacceptableErrors(this.enclosureForm.controls, ['unsafeEnclosure'])
  }
}
