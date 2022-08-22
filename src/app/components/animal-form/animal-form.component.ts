import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { enclosureCapacityFactory } from 'src/app/services/form-validator.service';
import {
  Animal,
  Enclosure,
  Environment,
  FormService,
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
  availableEnclosures: Observable<FormArray<Enclosure> | undefined>;
  currentEnvironments: FormArray<Environment>;

  originalEnvId: string = '';
  originalEnclosureId: string = '';

  animalFormSelections = new FormGroup(
    {
      selectedEnvironment: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedEnclosure: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedAnimal: new FormControl<string>('', {
        nonNullable: true,
      }),
    },
    { validators: [enclosureCapacityFactory(this.formService)] },
  );

  isNew = true;

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    // TODO: need to handle moving animal between env/enclosures

    route.data
      .pipe(
        map((data) => ({
          enclosure: data['enclosure'],
          env: data['environment'],
          animal: data['animal'],
        })),
        filter((data) => !!data.animal),
      )
      .subscribe(({ enclosure, env, animal }) => {
        this.animalForm.patchValue(animal.value);
        this.isNew = false;

        this.animalFormSelections.patchValue({
          selectedAnimal: animal.value.id,
          selectedEnvironment: env.value.id,
          selectedEnclosure: enclosure.value.id,
        });

        this.originalEnvId = env.value.id;
        this.originalEnclosureId = enclosure.value.id;
      });

    this.availableEnclosures =
      this.animalFormSelections.controls.selectedEnvironment.valueChanges.pipe(
        startWith(this.animalFormSelections.controls.selectedEnvironment.value),
        tap((envId) => {
          if (this.animalFormSelections.value.selectedEnvironment !== envId) {
            this.animalFormSelections.patchValue({ selectedEnclosure: '' });
          }
        }),
        switchMap((e) =>
          of(this.formService.getEnvironmentById(e)?.controls.enclosures),
        ),
      );
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.isNew) {
      this.formService.addAnimalToEnclosure(
        this.animalFormSelections.controls.selectedEnvironment.value,
        this.animalFormSelections.controls.selectedEnclosure.value,
        this.animalForm,
      );
    } else {
      // TODO: handle undefined better

      if (
        this.originalEnvId !==
          this.animalFormSelections.controls.selectedEnvironment.value ||
        this.originalEnclosureId !==
          this.animalFormSelections.controls.selectedEnclosure.value
      ) {
        this.formService.removeAnimalFromEnclosure(
          this.originalEnvId,
          this.originalEnclosureId,
          this.animalForm.value.id || '',
        );
        this.formService.addAnimalToEnclosure(
          this.animalFormSelections.controls.selectedEnvironment.value,
          this.animalFormSelections.controls.selectedEnclosure.value,
          this.animalForm,
        );
      } else {
        this.formService.patchAnimal(
          this.animalFormSelections.controls.selectedEnvironment.value || '',
          this.animalFormSelections.controls.selectedEnclosure.value || '',
          this.animalForm.value.id || '',
          this.animalForm,
        );
      }
    }

    this.router.navigate(['']);
  }

  deleteAnimal() {
    // TODO: switch to material dialog
    const confirmed = confirm('Are you sure you want to delete this animal?');
    if (confirmed) {
      this.formService.removeAnimalFromEnclosure(
        this.animalFormSelections.controls.selectedEnvironment.value,
        this.animalFormSelections.controls.selectedEnclosure.value,
        this.animalForm.value.id || '',
      );

      this.router.navigate(['']);
    }
  }
}
