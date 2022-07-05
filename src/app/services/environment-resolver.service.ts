import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Environment, FormService } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentResolver implements Resolve<Environment | undefined> {
  constructor(private formService: FormService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('envId') as string;

    return of(this.formService.getEnvironmentById(id));
  }
}
