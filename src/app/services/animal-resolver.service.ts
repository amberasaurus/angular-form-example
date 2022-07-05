import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Animal, FormService } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalResolver implements Resolve<Animal | undefined> {
  constructor(private formService: FormService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const envId = route.paramMap.get('envId') as string;
    const zoneId = route.paramMap.get('zoneId') as string;
    const animalId = route.paramMap.get('animalId') as string;

    return of(this.formService.getAnimalById(envId, zoneId, animalId));
  }
}
