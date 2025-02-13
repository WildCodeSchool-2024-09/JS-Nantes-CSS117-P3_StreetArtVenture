import type { ArtPiece } from "./artPiece";
import type { JWTPayload } from "./auth";
declare global {
  namespace Express {
    export interface Request {
      art_piece: ArtPiece;
      auth?: JWTPayload;
    }
  }
}
