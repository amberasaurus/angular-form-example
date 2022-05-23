import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  selectedEnvironment = new FormControl<string>('', {
    initialValueIsDefault: true,
  });
  selectedEnvironmentSub: Subscription;
  currentEnvironments: FormArray<FormGroup<Environment>>;
  selectedZone = new FormControl<string>('');

  availableZones: FormArray<FormGroup<Zone>> | undefined;

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
    this.router.navigate(['']);
  }
}
