import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FormService, Enclosure } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class EnclosureResolver implements Resolve<Enclosure | undefined> {
  constructor(private formService: FormService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const envId = route.paramMap.get('envId') as string;
    const enclosureId = route.paramMap.get('enclosureId') as string;

    return of(this.formService.getEnclosureById(envId, enclosureId));
  }
}
