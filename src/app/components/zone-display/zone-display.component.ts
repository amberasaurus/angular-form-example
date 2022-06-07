import { Component, Input } from '@angular/core';
import { Zone } from '../../types/types';

@Component({
  selector: 'app-zone-display',
  templateUrl: './zone-display.component.html',
  styleUrls: ['./zone-display.component.scss']
})

export class ZoneDisplayComponent {
  @Input() zone?: Zone;

  constructor() { }

}