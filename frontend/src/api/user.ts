import apiClient from "./client";

export interface UserProfile {
  id: string;
  gameCredits: number;
  createdAt: string;
}

export const userApi = {
  getMe: async (): Promise<UserProfile> => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },
};
