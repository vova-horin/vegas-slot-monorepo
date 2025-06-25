import { registerAs } from "@nestjs/config";
import { RollSymbol } from "src/database/entities/game-roll.entity";

export interface CheatingThreshold {
  balance: number;
  rerollChance: number;
}

export interface CheatingConfig {
  enabled: boolean;
  thresholds: CheatingThreshold[];
}

export interface AppConfig {
  port: number;
  apiPrefix: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  game: {
    defaultUserCredits: number;
    sessionStartingCredits: number;
    symbolsCount: number;
    symbolRewards: Record<RollSymbol, number>;
    cheating: CheatingConfig;
  };
}

export default registerAs(
  "app",
  (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    apiPrefix: process.env.API_PREFIX || "api/v1",
    jwt: {
      secret: process.env.JWT_SECRET || "your-super-secret-jwt-key",
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    },
    game: {
      defaultUserCredits: 10,
      sessionStartingCredits: 10,
      symbolsCount: 3,
      symbolRewards: {
        [RollSymbol.CHERRY]: 10,
        [RollSymbol.LEMON]: 20,
        [RollSymbol.ORANGE]: 30,
        [RollSymbol.WATERMELON]: 40,
      },
      cheating: {
        enabled: true,
        thresholds: [
          { balance: 40, rerollChance: 0.3 },
          { balance: 60, rerollChance: 0.6 },
        ],
      },
    },
  })
);
