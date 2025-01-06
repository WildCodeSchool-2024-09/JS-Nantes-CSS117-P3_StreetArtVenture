export interface ArtPiece {
  id: number;
  name: string;
  adress: string;
  coordinates: { x: number; y: number };
  is_validated: boolean;
  is_covered: boolean;
  description: string;
  points_value: number | null;
}
