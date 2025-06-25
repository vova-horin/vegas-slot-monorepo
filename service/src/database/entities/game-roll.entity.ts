export enum RollSymbol {
  CHERRY = "CHERRY",
  LEMON = "LEMON",
  ORANGE = "ORANGE",
  WATERMELON = "WATERMELON",
}

export class GameRoll {
  id: string;
  sessionId: string;
  symbols: RollSymbol[];
  isWin: boolean;
  reward: number;
  creditsBefore: number;
  creditsAfter: number;
  wasRerolled: boolean;
  createdAt: Date;

  constructor(
    id: string,
    sessionId: string,
    symbols: RollSymbol[],
    isWin: boolean,
    reward: number,
    creditsBefore: number,
    creditsAfter: number,
    wasRerolled: boolean = false
  ) {
    this.id = id;
    this.sessionId = sessionId;
    this.symbols = symbols;
    this.isWin = isWin;
    this.reward = reward;
    this.creditsBefore = creditsBefore;
    this.creditsAfter = creditsAfter;
    this.wasRerolled = wasRerolled;
    this.createdAt = new Date();
  }
}
