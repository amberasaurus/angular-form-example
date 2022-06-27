import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvironmentForm, FormService } from 'src/app/services/form.service';
import { map, filter } from 'rxjs';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent {
  environmentTypes = availableEnvironments;
  environmentForm: FormGroup<EnvironmentForm>;

  constructor(private formService: FormService, private router: Router, route: ActivatedRoute) {

    this.environmentForm = this.formService.getEnvironmentFormGroup();
    route.paramMap.pipe(
      map(params => params.get('name')),
      filter((name): name is string => !!name),
      map(name => formService.getEnvironmentByName(name)),
      filter((fg): fg is FormGroup<EnvironmentForm> => !!fg),
    ).subscribe(fg => this.environmentForm = fg)

    // for add:
  }

  submit(): void {
    this.formService.addEnvironment(this.environmentForm);
    this.router.navigate(['']);
  }
}
