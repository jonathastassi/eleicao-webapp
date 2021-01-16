import { LoadingService } from './loading.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Election } from './../models/election';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { EStateElection } from '../enums/e-state-election.enum';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  constructor(
    public firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  insert(model: Election): Promise<void> {
    this.loadingService.Open();
    const id = this.firestore.createId();
    model.id = id;
    model.reference = uuidv4();
    model.state = EStateElection.Started;

    return this.firestore
      .collection<Election>('elections')
      .doc(id)
      .set({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  update(model: Election): Promise<void> {
    this.loadingService.Open();
    return this.firestore
      .collection<Election>('elections')
      .doc(model.id)
      .update({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  getAllOrderByDateAsc(): Observable<Election[]> {
    this.loadingService.Open();
    return this.firestore
      .collection<Election>('elections', (x) => x.orderBy('date', 'desc'))
      .valueChanges()
      .pipe(
        map((x) => {
          this.loadingService.Close();
          return x;
        })
      );
  }

  getElectionById(electionId: string): Observable<Election> {
    this.loadingService.Open();
    return this.firestore
      .collection<Election>(`elections`)
      .doc(electionId)
      .get()
      .pipe(
        map((x) => {
          this.loadingService.Close();
          return x.data();
        })
      );
  }

  getElectionByReference(reference: string): Observable<Election> {
    this.loadingService.Open();
    return this.firestore
      .collection<Election>(`elections`, x => x.where('reference', '==', reference))
      .valueChanges()
      .pipe(
        map(x => {
          this.loadingService.Close();
          return x[0];
        })
      )
  }
}
