import apiClient from "./client";

export interface SignUpResponse {
  accessToken: string;
}

export const authApi = {
  signUp: async (): Promise<SignUpResponse> => {
    const response = await apiClient.post("/auth/sign-up", {});
    return response.data;
  },
};
