import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Habitat, FormService } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class HabitatResolver implements Resolve<Habitat | undefined> {
  constructor(private formService: FormService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('habId') as string;

    return of(this.formService.getHabitatById(id));
  }
}
