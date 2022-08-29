import { Injectable } from '@angular/core';
import safeZooData from '../../assets/safeZooExample.json';
import { FormService } from './form.service';

@Injectable({ providedIn: 'root' })
export class FormLoaderService {
  constructor(private formService: FormService) {}

  loadSafeZoo() {
    this.formService.form.reset();
    this.loadHabitats(safeZooData.data.habitats);
  }

  // TODO: change from any, need better interfaces all over
  // also need to separate this out a bit more
  // also github copilot wrote this and I'm scared
  loadHabitats(hab: any[]) {
    hab.forEach((habitat) => {
      const habitatFormGroup = this.formService.getHabitatFormGroup();
      habitatFormGroup.patchValue(habitat);

      if (habitat.enclosures) {
        habitat.enclosures.forEach((enclosure: any) => {
          const enclosureFormGroup = this.formService.getEnclosureFormGroup();
          enclosureFormGroup.patchValue(enclosure);

          if (enclosure.animals) {
            enclosure.animals.forEach((animal: any) => {
              const animalFormGroup = this.formService.getAnimalFormGroup();
              animalFormGroup.patchValue(animal);
              enclosureFormGroup.controls.animals.push(animalFormGroup);
            });
          }

          habitatFormGroup.controls.enclosures.push(enclosureFormGroup);
        });
      }
      this.formService.addHabitat(habitatFormGroup);
    });
  }
}
