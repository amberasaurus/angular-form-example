import { Injectable } from '@angular/core';
import safeZooData from '../../assets/safeZooExample.json';
import { FormService } from './form.service';

@Injectable({ providedIn: 'root' })
export class FormLoaderService {
  constructor(private formService: FormService) {}

  loadSafeZoo() {
    this.formService.form.reset();
    this.loadEnvironments(safeZooData.data.environments);
  }

  // TODO: change from any, need better interfaces all over
  // also need to separate this out a bit more
  // also github copilot wrote this and I'm scared
  loadEnvironments(env: any[]) {
    env.forEach((environment) => {
      const environmentFormGroup = this.formService.getEnvironmentFormGroup();
      environmentFormGroup.patchValue(environment);

      if (environment.zones) {
        environment.zones.forEach((zone: any) => {
          const zoneFormGroup = this.formService.getZoneFormGroup();
          zoneFormGroup.patchValue(zone);

          if (zone.animals) {
            zone.animals.forEach((animal: any) => {
              const animalFormGroup = this.formService.getAnimalFormGroup();
              animalFormGroup.patchValue(animal);
              zoneFormGroup.controls.animals.push(animalFormGroup);
            });
          }

          environmentFormGroup.controls.zones.push(zoneFormGroup);
        });
      }
      this.formService.addEnvironment(environmentFormGroup);
    });
  }
}
