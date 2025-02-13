export interface JWTPayload {
  id: number;
  email: string;
  isAdmin: number;
  isBanned: number;
  iat: number;
  exp: number;
}
