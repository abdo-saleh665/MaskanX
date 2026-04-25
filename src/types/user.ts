export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  about?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}