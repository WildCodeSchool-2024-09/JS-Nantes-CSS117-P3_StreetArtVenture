export interface ArtPiece {
  id: number;
  name: string;
  adress: string;
  coordinates: { x: number; y: number };
  city: string;
  is_validated: number;
  is_covered: number;
  description: string;
  points_value: number | null;
  picture_path: string;
}
