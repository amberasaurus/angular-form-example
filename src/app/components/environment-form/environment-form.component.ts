import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent {
  environmentTypes = availableEnvironments;
  environmentForm: FormGroup;

  constructor(private formService: FormService, private router: Router) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();
  }

  submit(): void {
    this.formService.addEnvironment(this.environmentForm);
    this.router.navigate(['']);
  }
}
