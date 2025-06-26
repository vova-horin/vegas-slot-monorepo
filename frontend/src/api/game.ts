import apiClient from "./client";

export enum RollSymbol {
  CHERRY = "CHERRY",
  LEMON = "LEMON",
  ORANGE = "ORANGE",
  WATERMELON = "WATERMELON",
}

export interface SessionResponse {
  sessionId: string;
  credits: number;
  isActive: boolean;
  createdAt: Date;
}

export interface RollResponse {
  rollId: string;
  symbols: RollSymbol[];
  isWin: boolean;
  reward: number;
  creditsBefore: number;
  creditsAfter: number;
  createdAt: Date;
}

export interface CashoutResponse {
  sessionId: string;
  cashedOutCredits: number;
  cashedOutAt: Date;
}

export const gameApi = {
  startSession: async (): Promise<SessionResponse> => {
    const response = await apiClient.post("/game/session/start");
    return response.data;
  },

  roll: async (sessionId: string): Promise<RollResponse> => {
    const response = await apiClient.post(`/game/session/${sessionId}/roll`);
    return response.data;
  },

  cashout: async (sessionId: string): Promise<CashoutResponse> => {
    const response = await apiClient.post(`/game/session/${sessionId}/cashout`);
    return response.data;
  },

  getSession: async (sessionId: string): Promise<SessionResponse> => {
    const response = await apiClient.get(`/game/session/${sessionId}`);
    return response.data;
  },
};
