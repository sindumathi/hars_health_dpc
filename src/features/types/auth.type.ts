export interface LoginState {
  accessToken: string | null;
  userName: string | null;
  isAuthenticated: boolean;
}

export interface AuthLoginDatatype {
  auth: LoginState;
}
