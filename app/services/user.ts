import { SuccessResponse } from "@/interfaces/response";
import { apiClient } from "./client";

const getUserBalance = async (): Promise<SuccessResponse> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export default { getUserBalance };
