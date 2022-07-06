import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
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
export class AnimalFormComponent implements OnInit, OnDestroy {
  animalForm: Animal;
  availableSpecies = Object.values(availableSpecies);
  availableLifeStages = availableLifeStages;
  availableZones: Observable<FormArray<Zone> | undefined>;
  currentEnvironments: FormArray<Environment>;

  selectedEnvironment = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  selectedZone = new FormControl<{ envId: string; zoneId: string }>(
    { envId: '', zoneId: '' },
    {
      nonNullable: true,
      validators: [Validators.required, zoneCapacityFactory(this.formService)],
    }
  );

  isNew = true;
  destroy$ = new Subject<void>();

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
        // DELETE ME comment
        // angular docs say route data subscriptions gets garbage collected so
        // no unsubscribe is needed :)
        // https://angular.io/guide/router-tutorial-toh#observable-parammap-and-component-reuse
        takeUntil(this.destroy$),
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
        this.selectedEnvironment.setValue(env);
        this.selectedZone.setValue(zone);
      });

    this.availableZones = this.selectedEnvironment.valueChanges.pipe(
      startWith(this.selectedEnvironment.value),
      switchMap((e) =>
        of(this.formService.getEnvironmentById(e)?.controls.zones)
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.isNew && this.selectedZone.value) {
      this.formService.addAnimalToZone(
        this.selectedEnvironment.value,
        this.selectedZone.value.zoneId,
        this.animalForm
      );
    } else {
      // TODO: handle undefined better
      this.formService.patchAnimal(
        this.selectedEnvironment.value || '',
        this.selectedZone.value.zoneId || '',
        this.animalForm.value.id || '',
        this.animalForm
      );
    }

    this.router.navigate(['']);
  }
}
