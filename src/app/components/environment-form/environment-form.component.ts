import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { Environment, FormService } from 'src/app/services/form.service';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent implements OnDestroy {
  environmentTypes = availableEnvironments;
  environmentForm: Environment;

  isNew: boolean = true;
  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();

    route.data
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data['environment']),
        filter((data) => !!data),
      )
      .subscribe((env) => {
        this.environmentForm.patchValue(env.value);
        this.isNew = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    if (this.isNew) {
      this.formService.addEnvironment(this.environmentForm);
    } else {
      // TODO: handle undefined better
      this.formService.patchEnvironment(
        this.environmentForm.value.id || '',
        this.environmentForm,
      );
    }
    this.router.navigate(['']);
  }
}
