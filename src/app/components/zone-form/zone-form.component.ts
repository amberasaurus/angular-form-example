import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Environment, FormService, Zone } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})
export class ZoneFormComponent {
  zoneForm: Zone;
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
    this.zoneForm = this.formService.getZoneFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    route.data
      .pipe(
        map((data) => ({ zone: data['zone'], env: data['environment'] })),
        filter((data) => !!data.zone)
      )
      .subscribe(({ zone, env }: { zone: Zone; env: Environment }) => {
        this.zoneForm.patchValue(zone.value);

        zone.controls.animals.controls.forEach((animal) => {
          const animalFormGroup = this.formService.getAnimalFormGroup();
          animalFormGroup.patchValue(animal.value);
          this.zoneForm.controls.animals.push(animalFormGroup);
        });

        this.isNew = false;

        // TODO handle undefined
        this.selectedEnvironment.setValue(env.value.id || '');
      });
  }

  submit(): void {
    if (this.isNew && this.selectedEnvironment.value) {
      this.formService.addZoneToEnvironment(
        this.selectedEnvironment.value,
        this.zoneForm
      );
    } else {
      // TODO: handle undefined better
      this.formService.patchZone(
        this.selectedEnvironment.value || '',
        this.zoneForm.value.id || '',
        this.zoneForm
      );
    }

    this.router.navigate(['']);
  }

  formHasUnacceptableErrors() {
    return this.formService.formHasUnacceptableErrors(this.zoneForm.controls, ['unsafeZone'])
  }
}
