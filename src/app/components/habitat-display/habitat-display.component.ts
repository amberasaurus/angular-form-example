import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormService, Habitat } from 'src/app/services/form.service';

@Component({
  selector: 'app-habitat-display',
  templateUrl: './habitat-display.component.html',
  styleUrls: ['./habitat-display.component.scss'],
})
export class HabitatDisplayComponent {
  @Input() habitat?: Habitat;

  constructor(private router: Router, private formService: FormService) {}

  addEnclosure(habitat: Habitat) {
    this.router.navigate([
      'zoo',
      'habitat',
      habitat?.value.id,
      'enclosure',
      'add',
    ]);
  }

  editHabitat() {
    this.router.navigate(['zoo', 'habitat', this.habitat?.value.id]);
  }

  deleteHabitat() {
    // TODO: switch to material dialog
    const confirmed = confirm('Are you sure you want to delete this habitat?');
    if (confirmed) {
      this.formService.removeHabitat(this.habitat?.value.id || '');

      this.router.navigate(['']);
    }
  }
}
