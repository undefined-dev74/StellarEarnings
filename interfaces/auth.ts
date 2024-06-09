export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccessToken {
  token: string;
  expires: string;
}

export interface RefreshToken {
  token: string;
  expires: string;
}

export interface Tokens {
  access: AccessToken;
  refresh: RefreshToken;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}
