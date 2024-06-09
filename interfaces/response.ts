export interface SuccessResponse<T = Record<string, unknown>> extends ApiResponse {
  data: T;
  message: string;
  statusCode: string;
  success: boolean;
}

// Base interface for all API responses
export interface ApiResponse {
  success: boolean;
}

// Interface for no content responses (e.g., 204 No Content)
export interface NoContentResponse extends ApiResponse {}

// Interface for error responses
export interface ErrorResponse extends ApiResponse {
  error: string;
  statusCode: string;
}
