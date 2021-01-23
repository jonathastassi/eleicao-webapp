import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { Candidate } from './../models/candidate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(
    public firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  insert(model: Candidate, electionId: string): Promise<void> {
    this.loadingService.Open();
    const id = this.firestore.createId();
    model.id = id;
    model.name = model.name.toUpperCase();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`)
      .doc(id)
      .set({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  update(model: Candidate, electionId: string): Promise<void> {
    this.loadingService.Open();
    model.name = model.name.toUpperCase();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`)
      .doc(model.id)
      .update({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  delete(model: Candidate, electionId: string) {
    this.loadingService.Open();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`)
      .doc(model.id)
      .delete()
      .finally(() => {
        this.loadingService.Close();
      });
  }

  getCandidatesByElectionId(electionId: string): Observable<Candidate[]> {
    this.loadingService.Open();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/candidates`)
      .valueChanges()
      .pipe(
        map((x) => {
          const c = new Intl.Collator();
          x.sort((a, b) => {
            return c.compare(a.name, b.name);
          })

          this.loadingService.Close();
          return x;
        })
      );
  }
}
