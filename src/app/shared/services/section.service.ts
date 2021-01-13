import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { Section } from './../models/section';
import { EStateSection } from '../enums/e-state-section.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(
    public firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  insert(model: Section, electionId: string): Promise<void> {
    this.loadingService.Open();
    const id = this.firestore.createId();
    model.id = id;
    model.sequence = 1;
    model.state = EStateSection.Pending;
    model.dataCreated = new Date();

    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`)
      .doc(id)
      .set({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  update(model: Section, electionId: string): Promise<void> {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`)
      .doc(model.id)
      .update({ ...model })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  getSectionsByElectionIdOrderBy(electionId: string): Observable<Section[]> {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`, (x) =>
        x.orderBy('dataCreated', 'desc')
      )
      .valueChanges()
      .pipe(
        map((x) => {
          this.loadingService.Close();
          return x;
        })
      );
  }
}
