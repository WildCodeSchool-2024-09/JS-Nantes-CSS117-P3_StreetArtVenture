export interface ArtPiece {
  id: number;
  name: string;
  user_id: number;
  adress: string;
  coordinates: { x: number; y: number };
  city: string;
  has_been_viewed: 1 | 0;
  is_validated: number;
  is_covered: number;
  description: string;
  points_value: number | null;
  picture_path: string;
}
