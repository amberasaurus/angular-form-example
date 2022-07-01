import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLoaderService } from 'src/app/services/form-loader.service';
import { Environment, FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  selectedEnv = new FormControl(0);

  constructor(
    private formService: FormService,
    private formLoaderService: FormLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public get environments() {
    return this.formService.form.controls.environments;
  }

  public addZone() {
    this.router.navigate([
      {
        outlets: {
          edit: ['zone', 'add'],
        },
      },
    ]);
  }

  onAddEnvironment(formGroup: FormGroup) {
    this.formService.addEnvironment(formGroup);
  }

  loadSafeZoo() {
    this.formLoaderService.loadSafeZoo();
  }

  checkSafeZoo() {
    console.log(this.formService.form);
  }

  editEnvironment(env: Environment) {
    this.router.navigate(['zoo', 'environment', env.value.name]);
  }
}
