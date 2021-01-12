import { LoadingService } from './loading.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Election } from './../models/election';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    return this.firestore
      .collection<Election>('elections')
      .doc(id)
      .set({ ...model })
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
}
