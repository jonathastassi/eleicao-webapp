export class Election {
  constructor(
    public id: string,
    public title: string,
    public date: Date,
    public concluded: boolean
  ) {}
}
