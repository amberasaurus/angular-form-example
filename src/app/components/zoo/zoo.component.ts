import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLoaderService } from 'src/app/services/form-loader.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  selectedHab = new FormControl(0);

  constructor(
    private formService: FormService,
    private formLoaderService: FormLoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public get habitats() {
    return this.formService.form.controls.habitats;
  }

  addHabitat() {
    this.router.navigate(['zoo', 'habitat', 'add']);
  }

  addEnclosure() {
    this.router.navigate(['zoo', 'enclosure', 'add']);
  }
  addAnimal() {
    this.router.navigate(['zoo', 'animal', 'add']);
  }
}
