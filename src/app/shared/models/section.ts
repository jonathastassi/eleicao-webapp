import { EStateSection } from "../enums/e-state-section.enum";

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
  ) {}
}
