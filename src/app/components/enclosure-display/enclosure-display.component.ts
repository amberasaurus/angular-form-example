import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Enclosure,
  Environment,
  FormService,
} from 'src/app/services/form.service';

@Component({
  selector: 'app-enclosure-display',
  templateUrl: './enclosure-display.component.html',
  styleUrls: ['./enclosure-display.component.scss'],
})
export class EnclosureDisplayComponent {
  @Input() enclosure?: Enclosure;
  @Input() environment?: Environment;

  constructor(private router: Router, private formService: FormService) {}

  editEnclosure(enclosure: Enclosure) {
    this.router.navigate([
      'zoo',
      'environment',
      this.environment?.value.id,
      'enclosure',
      enclosure.value.id,
    ]);
  }

  deleteEnclosure() {
    // TODO: switch to material dialog
    const confirmed = confirm(
      'Are you sure you want to delete this enclosure?',
    );
    if (confirmed) {
      this.formService.removeEnclosureFromEnvironment(
        this.environment?.value.id || '',
        this.enclosure?.value.id || '',
      );

      this.router.navigate(['']);
    }
  }
}
