export type CardI = {
  id: number;
  name: string;
  adress: string;
  city: string;
  department: string;
  coordinate: { x: number; y: number };
  is_validated: boolean;
  is_covered: boolean;
  description: string;
  points_value: number;
  picture_path: string;
  points?: string;
};
