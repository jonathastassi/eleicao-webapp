import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { Section } from './../models/section';
import { EStateSection } from '../enums/e-state-section.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candidate } from './../models/candidate';

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

  getSectionById(electionId: string, sectionId: string): Observable<Section> {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`)
      .doc(sectionId)
      .get()
      .pipe(
        map((x) => {
          this.loadingService.Close();
          return x.data();
        })
      );
  }

  getSectionStartedAndFinalized(electionId: string): Observable<Section> {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`, x => x.orderBy('dateInitial', 'desc'))
      .valueChanges()
      .pipe(
        map(
          x => {
            const section = x[0];

            this.getVotesOfSession(electionId, section?.id).subscribe(
              (votes) => {
                if (section) {
                  section.votes_count = votes.length;
                }
              }
            );

            this.loadingService.Close();
            return x[0];
          }
        )
      )
  }

  getSectionsByElectionIdOrderByDataCreated(electionId: string): Observable<Section[]> {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`, (x) =>
        x.orderBy('dataCreated', 'desc')
      )
      .valueChanges()
      .pipe(
        map((x) => {
          x.map(s => {
            if (s.dateInitial) {
              s.dateInitial = new Date(s.dateInitial['seconds'] * 1000);
            }
            if (s.dateFinal) {
              s.dateFinal = new Date(s.dateFinal['seconds'] * 1000);
            }

            if (s.state != EStateSection.Pending) {
              this.getVotesOfSession(electionId, s.id).subscribe(
                (votes) => {
                  s.votes = votes
                }
              );
            }

            return s;
          })
          this.loadingService.Close();
          return x;
        })
      );
  }

  getVotesOfSession(electionId: string, sectionId: string): Observable<Candidate[]> {
    return this.firestore.collection<Candidate>(`elections/${electionId}/sections/${sectionId}/votes`).valueChanges();
  }

  delete(sectionId: string, electionId: string) {
    this.loadingService.Open();
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`)
      .doc(sectionId)
      .delete()
      .finally(() => {
        this.loadingService.Close();
      });
  }

  registerVote(electionId: string, sectionId: string, candidate: Candidate): Promise<void> {
    this.loadingService.Open();

    const id = this.firestore.createId();
    return this.firestore
      .collection<Candidate>(`elections/${electionId}/sections/${sectionId}/votes`)
      .doc(id)
      .set({ ...candidate })
      .finally(() => {
        this.loadingService.Close();
      });
  }

  hasSessionOpenedOrFinalized(electionId: string): Observable<boolean> {
    return this.firestore
      .collection<Section>(`elections/${electionId}/sections`, x => x.where('state', 'in', [EStateSection.Started, EStateSection.Finalized]))
      .valueChanges()
      .pipe(
        map(
          x => {
            if (x.length) {
              return true;
            }
            return false
          }
        )
      )
  }
}
