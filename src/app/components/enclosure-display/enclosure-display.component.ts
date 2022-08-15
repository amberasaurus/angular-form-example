import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Environment, Enclosure } from 'src/app/services/form.service';

@Component({
  selector: 'app-enclosure-display',
  templateUrl: './enclosure-display.component.html',
  styleUrls: ['./enclosure-display.component.scss'],
})
export class EnclosureDisplayComponent {
  @Input() enclosure?: Enclosure;
  @Input() environment?: Environment;

  constructor(private router: Router) {}

  editEnclosure(enclosure: Enclosure) {
    this.router.navigate([
      'zoo',
      'environment',
      this.environment?.value.id,
      'enclosure',
      enclosure.value.id,
    ]);
  }
}
