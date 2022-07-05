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
    const envId = route.paramMap.get('envId') as string;
    const zoneId = route.paramMap.get('zoneId') as string;

    return of(this.formService.getZoneById(envId, zoneId));
  }
}
