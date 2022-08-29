import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Enclosure, Habitat, FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-enclosure-display',
  templateUrl: './enclosure-display.component.html',
  styleUrls: ['./enclosure-display.component.scss'],
})
export class EnclosureDisplayComponent {
  @Input() enclosure?: Enclosure;
  @Input() habitat?: Habitat;

  constructor(private router: Router, private formService: FormService) {}

  editEnclosure(enclosure: Enclosure) {
    this.router.navigate([
      'zoo',
      'habitat',
      this.habitat?.value.id,
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
      this.formService.removeEnclosureFromHabitat(
        this.habitat?.value.id || '',
        this.enclosure?.value.id || '',
      );

      this.router.navigate(['']);
    }
  }
}
