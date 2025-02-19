export type ArtCard = {
  points_value: string;
  name: string;
  adress: string;
  city: string;
  department: string;
  coordinates: string;
  is_validated: boolean;
  is_covered: boolean;
  description: string;
  id?: string;
};
export type ArtCardChange = {
  city: string;
  points_value: string;
  name: string;
  adress: string;
  description: string;
  id?: string;
};
interface ArtPieceGallery {
  id: number;
  city: string;
  adress: string;
  picture_path: string;
}
