import { Component } from '@angular/core';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public get form() {
    return this.formService.form;
  }

  constructor(private formService: FormService) {}
}
