import type { ArtPiece } from "../../types/art_piece";

export type WebcamCaptureProps = {
  openCapture: boolean;
  setOpenCapture: React.Dispatch<React.SetStateAction<boolean>>;
  position: number[] | null;
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
