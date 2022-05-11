import { Component, OnInit } from '@angular/core';

const availableSpecies = ['🐅', '🐒', '🦓', '🦌', '🦩', '🐊', '🦖'];

@Component({
  selector: 'app-species-form',
  templateUrl: './species-form.component.html',
  styleUrls: ['./species-form.component.scss'],
})
export class SpeciesFormComponent implements OnInit {
  speciesEmoji = availableSpecies;

  constructor() {}

  ngOnInit(): void {}
}
