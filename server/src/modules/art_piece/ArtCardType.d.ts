export type ArtCard = {
  points_value: string;
  name: string;
  adress?: string;
  city: string;
  department: string;
  coordinates: string; // Exemple : "POINT(12.34 56.78)"
  is_validated: boolean;
  is_covered: boolean;
  description: string;
  id?: string;
};
