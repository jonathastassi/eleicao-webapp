export class Election {
  constructor(
    public id: number,
    public title: string,
    public date: Date,
    public finalized: boolean,
    public deleted: boolean
  ) {}
}
