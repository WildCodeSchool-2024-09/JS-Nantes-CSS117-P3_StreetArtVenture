export type ArtCard = {
  name: string;
  adress?: string;
  city: string;
  department: string;
  coordinates: string;
  is_validated: boolean;
  is_covered: boolean;
  description: string;
};
export type ArtCardChange = {
  city: string;
  points_value: string;
  name: string;
  adress: string;
  description: string;
  id?: string;
};
