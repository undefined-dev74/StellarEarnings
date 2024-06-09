import { AuthResponse } from "@/interfaces/auth";
import { NoContentResponse, SuccessResponse } from "@/interfaces/response";
import { apiClient } from "./client";

const login = async (payload: { email: string; password: string }): Promise<SuccessResponse<AuthResponse>> => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

const logout = async (refreshToken: string): Promise<NoContentResponse> => {
  const response = await apiClient.post("/auth/logout", { refreshToken });
  return response.data;
};

export default { login, logout };
