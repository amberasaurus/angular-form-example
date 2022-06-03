import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Animal,
  Environment,
  FormService,
  Zone,
} from 'src/app/services/form.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent implements OnInit, OnDestroy {
  animalForm: FormGroup<Animal>;
  availableSpecies = availableSpecies;
  availableLifeStages = availableLifeStages;
  availableZones: FormArray<FormGroup<Zone>> | undefined;
  currentEnvironments: FormArray<FormGroup<Environment>>;

  selectedEnvironment = new FormControl<number>(-1, {
    initialValueIsDefault: true,
    validators: [Validators.required, Validators.min(0)],
  });
  selectedEnvironmentSub: Subscription;

  selectedZone = new FormControl<number>(-1, {
    initialValueIsDefault: true,
    validators: [Validators.required, Validators.min(0)],
  });

  constructor(private formService: FormService, private router: Router) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    // is there a better way or is this the best way to do this?
    this.selectedEnvironmentSub =
      this.selectedEnvironment.valueChanges.subscribe((env) => {
        this.availableZones = this.formService.getZonesForEnvironment(env);
      });
  }

  ngOnDestroy(): void {
    this.selectedEnvironmentSub.unsubscribe();
  }

  ngOnInit(): void {}

  submit(): void {
    this.formService.addAnimalToZoneInEnv(
      this.selectedEnvironment.value,
      this.selectedZone.value,
      this.animalForm
    );
    this.router.navigate(['']);
  }
}

const availableLifeStages = ['Juvenile', 'Adult'];

const availableSpecies = [
  {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    type: 'Carnivore',
  },
  {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    type: 'Herbivore',
  },
  {
    id: 'zebra',
    name: 'Zebra',
    emoji: '🦓',
    type: 'Herbivore',
  },
  {
    id: 'deer',
    name: 'Deer',
    emoji: '🦌',
    type: 'Herbivore',
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    emoji: '🦩',
    type: 'Carnivore',
  },
  {
    id: 'alligator',
    name: 'Alligator',
    emoji: '🐊',
    type: 'Carnivore',
  },
  {
    id: 't-rex',
    name: 'T-Rex',
    emoji: '🦖',
    type: 'Omnivore',
  },
];
