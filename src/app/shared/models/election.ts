import { EStateElection } from "../enums/e-state-election.enum";

export class Election {
  constructor(
    public id: string,
    public title: string,
    public reference: string,
    public date: Date,
    public state: EStateElection
  ) {}
}
