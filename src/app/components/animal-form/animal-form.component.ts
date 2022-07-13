import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { zoneCapacityFactory } from 'src/app/services/form-validator.service';
import {
  Animal,
  Environment,
  FormService,
  Zone,
} from 'src/app/services/form.service';
import { availableLifeStages, availableSpecies } from '../../constants';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalFormComponent implements OnInit {
  animalForm: Animal;
  availableSpecies = Object.values(availableSpecies);
  availableLifeStages = availableLifeStages;
  availableZones: Observable<FormArray<Zone> | undefined>;
  currentEnvironments: FormArray<Environment>;

  originalEnvId: string = '';
  originalZoneId: string = '';

  animalFormSelections = new FormGroup(
    {
      selectedEnvironment: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedZone: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedAnimal: new FormControl<string>('', {
        nonNullable: true,
      }),
    },
    { validators: [zoneCapacityFactory(this.formService)] }
  );

  isNew = true;

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    // TODO: need to handle moving animal between env/zones

    route.data
      .pipe(
        map((data) => ({
          zone: data['zone'],
          env: data['environment'],
          animal: data['animal'],
        })),
        filter((data) => !!data.animal)
      )
      .subscribe(({ zone, env, animal }) => {
        this.animalForm.patchValue(animal.value);
        this.isNew = false;

        this.animalFormSelections.patchValue({
          selectedAnimal: animal.value.id,
          selectedEnvironment: env.value.id,
          selectedZone: zone.value.id,
        });

        this.originalEnvId = env.value.id;
        this.originalZoneId = zone.value.id;
      });

    this.availableZones =
      this.animalFormSelections.controls.selectedEnvironment.valueChanges.pipe(
        startWith(this.animalFormSelections.controls.selectedEnvironment.value),
        tap((envId) => {
          if (this.animalFormSelections.value.selectedEnvironment !== envId) {
            this.animalFormSelections.patchValue({ selectedZone: '' });
          }
        }),
        switchMap((e) =>
          of(this.formService.getEnvironmentById(e)?.controls.zones)
        )
      );
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.isNew) {
      this.formService.addAnimalToZone(
        this.animalFormSelections.controls.selectedEnvironment.value,
        this.animalFormSelections.controls.selectedZone.value,
        this.animalForm
      );
    } else {
      // TODO: handle undefined better

      if (
        this.originalEnvId !==
          this.animalFormSelections.controls.selectedEnvironment.value ||
        this.originalZoneId !==
          this.animalFormSelections.controls.selectedZone.value
      ) {
        this.formService.removeAnimalFromZone(
          this.originalEnvId,
          this.originalZoneId,
          this.animalForm.value.id || ''
        );
        this.formService.addAnimalToZone(
          this.animalFormSelections.controls.selectedEnvironment.value,
          this.animalFormSelections.controls.selectedZone.value,
          this.animalForm
        );
      } else {
        this.formService.patchAnimal(
          this.animalFormSelections.controls.selectedEnvironment.value || '',
          this.animalFormSelections.controls.selectedZone.value || '',
          this.animalForm.value.id || '',
          this.animalForm
        );
      }
    }

    this.router.navigate(['']);
  }
}
