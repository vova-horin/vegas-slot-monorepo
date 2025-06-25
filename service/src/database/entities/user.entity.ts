export class User {
  id: string;
  gameCredits: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, gameCredits: number) {
    this.id = id;
    this.gameCredits = gameCredits;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
