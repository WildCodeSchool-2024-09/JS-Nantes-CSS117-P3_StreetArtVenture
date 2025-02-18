import type { ArtPiece } from "../../types/art_piece";

export type Role = {
  add: string;
  signalment: string;
};
export type RoleType = keyof Role;

export type WebcamCaptureProps = {
  openCapture: boolean;
  setOpenCapture: React.Dispatch<React.SetStateAction<boolean>>;
  position: number[] | null;
  onSuccess: () => void;
  type: RoleType;
  artPieceId?: number | null;
};

export type MapComponentProps = {
  position: number[];
  centerMarker?: number[];
  markerList: ArtPiece[] | null;
};

export type Coordinates = {
  latLong: number[];
  city: string;
  address: string;
};

export type PointButtonVerification = {
  artLat: number;
  artLong: number;
  artId: number;
};
