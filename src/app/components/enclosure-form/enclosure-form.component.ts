import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Enclosure, Habitat, FormService } from 'src/app/services/form.service';
import { formHasUnacceptableErrors } from '../../utils/forms';

@Component({
  selector: 'app-enclosure-form',
  templateUrl: './enclosure-form.component.html',
  styleUrls: ['./enclosure-form.component.scss'],
})
export class EnclosureFormComponent {
  enclosureForm: Enclosure;
  currentHabitats: FormArray<Habitat>;
  selectedHabitat = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  isNew = true;

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.enclosureForm = this.formService.getEnclosureFormGroup();
    this.currentHabitats = this.formService.getCurrentHabitats();

    route.data
      .pipe(
        map((data) => ({
          enclosure: data['enclosure'],
          hab: data['habitat'],
        })),
        filter((data) => !!data.enclosure),
      )
      .subscribe(
        ({ enclosure, hab }: { enclosure: Enclosure; hab: Habitat }) => {
          this.enclosureForm.patchValue(enclosure.value);

          enclosure.controls.animals.controls.forEach((animal) => {
            const animalFormGroup = this.formService.getAnimalFormGroup();
            animalFormGroup.patchValue(animal.value);
            this.enclosureForm.controls.animals.push(animalFormGroup);
          });

          this.isNew = false;

          // TODO handle undefined
          this.selectedHabitat.setValue(hab.value.id || '');
        },
      );
  }

  submit(): void {
    if (this.isNew && this.selectedHabitat.value) {
      this.formService.addEnclosureToHabitat(
        this.selectedHabitat.value,
        this.enclosureForm,
      );
    } else {
      // TODO: handle undefined better
      this.formService.patchEnclosure(
        this.selectedHabitat.value || '',
        this.enclosureForm.value.id || '',
        this.enclosureForm,
      );
    }

    this.router.navigate(['']);
  }

  enclosureHasUnacceptableErrors() {
    return formHasUnacceptableErrors(this.enclosureForm.controls, [
      'unsafeEnclosure',
    ]);
  }
}
