import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Election } from 'src/app/shared/models/election';
import { ElectionService } from 'src/app/shared/services/election.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionResolver implements Resolve<Election> {
  constructor(
    public electionService: ElectionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Election> {
    if (route.paramMap.get('electionId')) {
      return this.electionService.getElectionById(route.paramMap.get('electionId'));
    }
    return of(null);
  }
}
