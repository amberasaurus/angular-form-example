import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/services/form.service';

@Component({
  selector: 'app-environment-display',
  templateUrl: './environment-display.component.html',
  styleUrls: ['./environment-display.component.scss'],
})
export class EnvironmentDisplayComponent {
  @Input() environment?: Environment;

  constructor(private router: Router) {}

  addEnclosure(environment: Environment) {
    this.router.navigate([
      'zoo',
      'environment',
      environment?.value.id,
      'enclosure',
      'add',
    ]);
  }
}
