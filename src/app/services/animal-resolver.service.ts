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
    const envName = route.paramMap.get('envName') as string;
    const zoneName = route.paramMap.get('zoneName') as string;
    const animalName = route.paramMap.get('animalName') as string;

    return of(this.formService.getAnimalByName(envName, zoneName, animalName));
  }
}
