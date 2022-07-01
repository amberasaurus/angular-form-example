import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { zoneCapacityValidator } from 'src/app/services/form-validator.service';
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

  selectedEnvironment = new FormControl<Environment | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  selectedZone = new FormControl<Zone | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required, zoneCapacityValidator],
  });

  isNew = true;
  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    this.availableZones = this.selectedEnvironment.valueChanges.pipe(
      startWith(this.selectedEnvironment.value),
      switchMap((e) => of(e?.controls.zones))
    );

    // TODO: need to handle moving animal between env/zones

    route.data
      .pipe(
        takeUntil(this.destroy$),
        map((data) => ({
          zone: data['zone'],
          env: data['environment'],
          animal: data['animal'],
        }))
      )
      .subscribe(({ zone, env, animal }) => {
        this.animalForm = animal;
        this.isNew = false;
        this.selectedEnvironment.setValue(env);
        this.selectedZone.setValue(zone);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.isNew && this.selectedZone.value) {
      this.formService.addAnimalToZone(
        this.selectedZone.value,
        this.animalForm
      );
    }

    this.router.navigate(['']);
  }
}
