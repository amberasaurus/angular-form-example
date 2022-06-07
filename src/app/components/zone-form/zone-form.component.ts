import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentForm, FormService, ZoneForm } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})
export class ZoneFormComponent {
  zoneForm: FormGroup<ZoneForm>;
  currentEnvironments: FormArray<FormGroup<EnvironmentForm>>;
  selectedEnvironment = new FormControl<number>(-1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });

  constructor(private formService: FormService, private router: Router) {
    this.zoneForm = this.formService.getZoneFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();
  }

  submit(): void {
    this.formService.addZoneToEnvironment(
      this.selectedEnvironment.value,
      this.zoneForm
    );
    this.router.navigate(['']);
  }
}
