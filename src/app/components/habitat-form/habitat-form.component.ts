import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { FormService, Habitat } from 'src/app/services/form.service';

const availableHabitats = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-habitat-form',
  templateUrl: './habitat-form.component.html',
  styleUrls: ['./habitat-form.component.scss'],
})
export class HabitatFormComponent implements OnDestroy {
  habitatTypes = availableHabitats;
  habitatForm: Habitat;

  isNew: boolean = true;
  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.habitatForm = this.formService.getHabitatFormGroup();

    route.data
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data['habitat']),
        filter((data) => !!data),
      )
      .subscribe((hab) => {
        this.habitatForm.patchValue(hab.value);
        this.isNew = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    if (this.isNew) {
      this.formService.addHabitat(this.habitatForm);
    } else {
      // TODO: handle undefined better
      this.formService.patchHabitat(
        this.habitatForm.value.id || '',
        this.habitatForm,
      );
    }
    this.router.navigate(['']);
  }
}
