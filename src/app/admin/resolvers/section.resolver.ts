import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SectionService } from './../../shared/services/section.service';
import { Section } from './../../shared/models/section';

@Injectable({
  providedIn: 'root'
})
export class SectionResolver implements Resolve<Section> {
  constructor(
    public sectionService: SectionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Section> {
    if (route.paramMap.get('electionId') && route.paramMap.get('sectionId')) {
      return this.sectionService.getSectionById(route.paramMap.get('electionId'), route.paramMap.get('sectionId'));
    }
    return of(null);
  }
}
