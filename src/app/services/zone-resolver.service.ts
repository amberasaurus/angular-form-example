import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FormService, Zone } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class ZoneResolver implements Resolve<Zone | undefined> {
  constructor(private formService: FormService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const envName = route.paramMap.get('envName') as string;
    const zoneName = route.paramMap.get('zoneName') as string;

    return of(this.formService.getZoneByName(envName, zoneName));
  }
}
