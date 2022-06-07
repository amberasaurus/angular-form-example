import { Component, Input } from '@angular/core';
import { Environment } from '../../types/types';

@Component({
  selector: 'app-environment-display',
  templateUrl: './environment-display.component.html',
  styleUrls: ['./environment-display.component.scss']
})
export class EnvironmentDisplayComponent {
  @Input() environment?: Environment

  constructor() { }

}
