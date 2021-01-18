import { DocumentReference } from "@angular/fire/firestore";
import { EStateSection } from "../enums/e-state-section.enum";
import { Candidate } from './candidate';

export class Section {
  constructor(
    public id: string,
    public title: string,
    public state: EStateSection,
    public sequence: number,
    public peopleToVote: number,
    public dataCreated: Date,
    public dateInitial: Date,
    public dateFinal: Date,
    public candidatesExcluded: string[],
    public votes: Candidate[],
    public votes_count: number,
  ) {}
}
