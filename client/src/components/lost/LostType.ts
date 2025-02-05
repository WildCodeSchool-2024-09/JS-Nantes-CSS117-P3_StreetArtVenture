export type CoordinateI = {
  x: string;
  y: string;
};

export type LostI = {
  picture_path: number;
  art_piece_id: number;
  user_id: number;
  timestamp: string;
  user_name: string;
  coordinates: { x: number; y: number };
  art_piece_name: string;
  city: string;
  reported_img_path: string;
  report_img_path: string;
};
