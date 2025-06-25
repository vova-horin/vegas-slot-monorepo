export class GameSession {
  id: string;
  userId: string;
  credits: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, userId: string, credits: number = 10) {
    this.id = id;
    this.userId = userId;
    this.credits = credits;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
