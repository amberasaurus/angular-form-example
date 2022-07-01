import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Environment, Zone } from 'src/app/services/form.service';

@Component({
  selector: 'app-zone-display',
  templateUrl: './zone-display.component.html',
  styleUrls: ['./zone-display.component.scss'],
})
export class ZoneDisplayComponent {
  @Input() zone?: Zone;
  @Input() environment?: Environment;

  constructor(private router: Router) {}

  editZone(zone: Zone) {
    this.router.navigate([
      'zoo',
      'environment',
      this.environment?.value.name,
      'zone',
      zone.value.name,
    ]);
  }
}
