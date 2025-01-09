import type { ArtPiece } from "./artPiece";

declare global {
  namespace Express {
    export interface Request {
      art_piece: ArtPiece;
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}
