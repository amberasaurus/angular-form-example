import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { EnvironmentForm, FormService } from 'src/app/services/form.service';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent {
  environmentTypes = availableEnvironments;
  environmentForm: FormGroup<EnvironmentForm>;

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();
    route.paramMap
      .pipe(
        map((params) => params.get('name')),
        filter((name): name is string => !!name),
        map((name) => formService.getEnvironmentByName(name)),
        filter((fg): fg is FormGroup<EnvironmentForm> => !!fg)
      )
      .subscribe((fg) => (this.environmentForm = fg));
  }

  submit(): void {
    this.formService.addEnvironment(this.environmentForm);
    this.router.navigate(['']);
  }
}
