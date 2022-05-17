import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})
export class ZoneFormComponent {
  zoneForm: FormGroup;
  currentEnvironments: FormArray;
  selectedEnvironment = new FormControl('');

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
