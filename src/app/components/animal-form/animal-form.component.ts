import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { enclosureCapacityFactory } from 'src/app/services/form-validator.service';
import {
  Animal,
  Enclosure,
  FormService,
  Habitat,
} from 'src/app/services/form.service';
import { availableLifeStages, availableSpecies } from '../../constants';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalFormComponent implements OnDestroy {
  animalForm: Animal;
  availableSpecies = Object.values(availableSpecies);
  availableLifeStages = availableLifeStages;
  availableEnclosures: Observable<FormArray<Enclosure> | undefined>;
  currentHabitats: FormArray<Habitat>;
  originalHabId: string = '';
  originalEnclosureId: string = '';
  destroy = new Subject<void>();

  animalFormSelections = new FormGroup(
    {
      selectedHabitat: new FormControl<string>('', {
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
    this.currentHabitats = this.formService.getCurrentHabitats();

    // Current habitat/enclosure/animal are read from the route resolver.
    route.data
      .pipe(
        map((data) => ({
          enclosure: data['enclosure'],
          hab: data['habitat'],
          animal: data['animal'],
        })),
        filter((data) => !!data.animal),
        takeUntil(this.destroy),
      )
      .subscribe(({ enclosure, hab, animal }) => {
        this.animalForm.patchValue(animal.value);
        this.isNew = false;

        this.animalFormSelections.patchValue({
          selectedAnimal: animal.value.id,
          selectedHabitat: hab.value.id,
          selectedEnclosure: enclosure.value.id,
        });

        this.originalHabId = hab.value.id;
        this.originalEnclosureId = enclosure.value.id;
      });

    // Update the list of available enclosures when a new habitat is selected.
    this.availableEnclosures =
      this.animalFormSelections.controls.selectedHabitat.valueChanges.pipe(
        startWith(this.animalFormSelections.controls.selectedHabitat.value),
        tap((habId) => {
          if (this.animalFormSelections.value.selectedHabitat !== habId) {
            this.animalFormSelections.patchValue({ selectedEnclosure: '' });
          }
        }),
        switchMap((e) =>
          of(this.formService.getHabitatById(e)?.controls.enclosures),
        ),
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  submit(): void {
    if (this.isNew) {
      this.formService.addAnimalToEnclosure(
        this.animalFormSelections.controls.selectedHabitat.value,
        this.animalFormSelections.controls.selectedEnclosure.value,
        this.animalForm,
      );
    } else {
      // TODO: handle undefined better - throw error?

      // If an animal is moving between habitats/enclosures, we must remove from the old and add to the new.
      if (
        this.originalHabId !==
          this.animalFormSelections.controls.selectedHabitat.value ||
        this.originalEnclosureId !==
          this.animalFormSelections.controls.selectedEnclosure.value
      ) {
        this.formService.removeAnimalFromEnclosure(
          this.originalHabId,
          this.originalEnclosureId,
          this.animalForm.value.id || '',
        );
        this.formService.addAnimalToEnclosure(
          this.animalFormSelections.controls.selectedHabitat.value,
          this.animalFormSelections.controls.selectedEnclosure.value,
          this.animalForm,
        );
      // Otherwise, update the animal in its current habitat/enclosure.
      } else {
        this.formService.patchAnimal(
          this.animalFormSelections.controls.selectedHabitat.value || '',
          this.animalFormSelections.controls.selectedEnclosure.value || '',
          this.animalForm.value.id || '',
          this.animalForm,
        );
      }
    }

    this.router.navigate(['']);
  }
}
