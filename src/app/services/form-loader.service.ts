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

      if (environment.enclosures) {
        environment.enclosures.forEach((enclosure: any) => {
          const enclosureFormGroup = this.formService.getEnclosureFormGroup();
          enclosureFormGroup.patchValue(enclosure);

          if (enclosure.animals) {
            enclosure.animals.forEach((animal: any) => {
              const animalFormGroup = this.formService.getAnimalFormGroup();
              animalFormGroup.patchValue(animal);
              enclosureFormGroup.controls.animals.push(animalFormGroup);
            });
          }

          environmentFormGroup.controls.enclosures.push(enclosureFormGroup);
        });
      }
      this.formService.addEnvironment(environmentFormGroup);
    });
  }
}
