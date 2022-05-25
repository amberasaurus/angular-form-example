import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Environment, FormService, Zone } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})
export class ZoneFormComponent {
  zoneForm: FormGroup<Zone>;
  currentEnvironments: FormArray<FormGroup<Environment>>;
  selectedEnvironment = new FormControl<number>(-1, {
    initialValueIsDefault: true,
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
