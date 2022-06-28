import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  withLatestFrom,
} from 'rxjs';
import { zoneCapacityValidator } from 'src/app/services/form-validator.service';
import {
  AnimalForm,
  EnvironmentForm,
  FormService,
  ZoneForm,
} from 'src/app/services/form.service';
import { Zone } from 'src/app/types/types';
import { availableLifeStages, availableSpecies } from '../../constants';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalFormComponent implements OnInit, OnDestroy {
  animalForm: FormGroup<AnimalForm>;
  availableSpecies = Object.values(availableSpecies);
  availableLifeStages = availableLifeStages;
  availableZones: Observable<FormArray<FormGroup<ZoneForm>> | undefined>;
  currentEnvironments: FormArray<FormGroup<EnvironmentForm>>;

  selectedEnvironment = new FormControl<number>(-1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });

  selectedZone = new FormControl<Zone | undefined>(undefined, {
    validators: [Validators.required, zoneCapacityValidator],
  });

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    this.availableZones = this.selectedEnvironment.valueChanges.pipe(
      startWith(-1),
      map((e) => this.formService.getZonesForEnvironment(e)),
      shareReplay(1)
    );

    route.paramMap
      .pipe(
        map((params) => ({
          envName: params.get('envName'),
          zoneName: params.get('zoneName'),
          animalName: params.get('animalName'),
        })),
        filter(
          (
            params
          ): params is {
            envName: string;
            zoneName: string;
            animalName: string;
          } => !!params.envName && !!params.zoneName && !!params.animalName
        ),
        withLatestFrom(this.availableZones),
        map(([{ envName, zoneName, animalName }, availableZones]) => {
          this.selectedEnvironment.setValue(
            this.currentEnvironments.controls.findIndex(
              (env) => env.value.name === envName
            )
          );

          this.selectedZone.setValue(
            this.formService.getZoneByName(envName, zoneName)?.getRawValue()
          );

          this.selectedZone.markAsTouched();

          return formService.getAnimalByName(envName, zoneName, animalName);
        }),
        filter((fg): fg is FormGroup<AnimalForm> => !!fg)
      )
      .subscribe((fg) => (this.animalForm = fg));
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  submit(): void {
    this.formService.addAnimalToZoneInEnv(
      this.selectedEnvironment.value,
      this.selectedZone.value?.name,
      this.animalForm
    );
    this.router.navigate(['']);
  }

  getZoneName(index: number, zoneControl: FormGroup<ZoneForm>): string {
    return zoneControl.controls.name.value;
  }
}
