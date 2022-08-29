import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Habitat } from 'src/app/services/form.service';

@Component({
  selector: 'app-habitat-display',
  templateUrl: './habitat-display.component.html',
  styleUrls: ['./habitat-display.component.scss'],
})
export class HabitatDisplayComponent {
  @Input() habitat?: Habitat;

  constructor(private router: Router) {}

  addEnclosure(habitat: Habitat) {
    this.router.navigate([
      'zoo',
      'habitat',
      habitat?.value.id,
      'enclosure',
      'add',
    ]);
  }
}
