import { Component, Input } from '@angular/core';
import { Environment } from 'src/app/services/form.service';

@Component({
  selector: 'app-environment-display',
  templateUrl: './environment-display.component.html',
  styleUrls: ['./environment-display.component.scss'],
})
export class EnvironmentDisplayComponent {
  @Input() environment?: Environment;

  constructor() {}
}
