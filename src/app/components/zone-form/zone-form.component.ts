import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Environment, FormService, Zone } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})
export class ZoneFormComponent implements OnDestroy {
  zoneForm: Zone;
  currentEnvironments: FormArray<Environment>;
  selectedEnvironment = new FormControl<Environment | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });
  isNew = true;
  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.zoneForm = this.formService.getZoneFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    route.data
      .pipe(
        takeUntil(this.destroy$),
        map((data) => ({ zone: data['zone'], env: data['environment'] })),
        filter((data) => !!data.zone)
      )
      .subscribe(({ zone, env }) => {
        this.zoneForm.patchValue(zone.value);
        this.isNew = false;
        this.selectedEnvironment.setValue(env);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    if (this.isNew && this.selectedEnvironment.value) {
      this.formService.addZoneToEnvironment(
        this.selectedEnvironment.value,
        this.zoneForm
      );
    } else {
      // TODO: handle undefined better
      this.formService.patchZone(
        this.selectedEnvironment.value?.value.id || '',
        this.zoneForm.value.id || '',
        this.zoneForm
      );
    }

    this.router.navigate(['']);
  }
}
