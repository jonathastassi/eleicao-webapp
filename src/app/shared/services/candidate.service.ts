import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { Candidate } from './../models/candidate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(
    public firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  insert(model: Candidate, electionId: string): Promise<void> {
    this.loadingService.Open();
    const id = this.firestore.createId();
    model.name = model.name.toUpperCase();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`)
      .doc(id)
      .set({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  getCandidatesByElectionId(electionId: string): Observable<Candidate[]> {
    this.loadingService.Open();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`, (x) => x.orderBy('name'))
      .valueChanges()
      .pipe(
        map((x) => {
          this.loadingService.Close();
          return x;
        })
      );
  }
}
