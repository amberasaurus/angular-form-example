import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {
  EnvironmentForm,
  FormService,
  ZoneForm,
} from 'src/app/services/form.service';

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

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.zoneForm = this.formService.getZoneFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    route.paramMap
      .pipe(
        map((params) => ({
          envName: params.get('envName'),
          zoneName: params.get('zoneName'),
        })),
        filter(
          (params): params is { envName: string; zoneName: string } =>
            !!params.envName && !!params.zoneName
        ),
        map(({ envName, zoneName }) => {
          this.selectedEnvironment.setValue(
            this.currentEnvironments.controls.findIndex(
              (env) => env.value.name === envName
            )
          );
          return formService.getZoneByName(envName, zoneName);
        }),
        filter((fg): fg is FormGroup<ZoneForm> => !!fg)
      )
      .subscribe((fg) => (this.zoneForm = fg));
  }

  submit(): void {
    this.formService.addZoneToEnvironment(
      this.selectedEnvironment.value,
      this.zoneForm
    );
    this.router.navigate(['']);
  }
}
