import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, startWith, switchMap } from 'rxjs';
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

        this.animalFormSelections.controls.selectedEnvironment.setValue(
          env.value.id
        );
        this.animalFormSelections.controls.selectedZone.setValue(zone.value.id);
      });

    this.availableZones =
      this.animalFormSelections.controls.selectedEnvironment.valueChanges.pipe(
        startWith(this.animalFormSelections.controls.selectedEnvironment.value),
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
      this.formService.patchAnimal(
        this.animalFormSelections.controls.selectedEnvironment.value || '',
        this.animalFormSelections.controls.selectedZone.value || '',
        this.animalForm.value.id || '',
        this.animalForm
      );
    }

    this.router.navigate(['']);
  }
}
