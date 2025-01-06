import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.component.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";
import type { LatLngExpression } from "leaflet";
import type { ArtPiece } from "../../types/art_piece";

interface MapComponentProps {
  position: number[];
  centerMarker?: number[];
  markerList: ArtPiece[] | null;
}

function MapComponent({
  position,
  centerMarker,
  markerList,
}: MapComponentProps) {
  // customize Icon current position
  const CenterMarkerIcon = L.AwesomeMarkers.icon({
    markerColor: "red",
  });

  // customize Icon art pieces
  const defaultIcon = L.AwesomeMarkers.icon({
    markerColor: "cadetblue",
  });

  return (
    position && (
      <MapContainer
        id="leaflet-map"
        center={position as LatLngExpression}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {centerMarker && (
          <Marker
            position={centerMarker as LatLngExpression}
            icon={CenterMarkerIcon}
          >
            <Popup>
              <p>C'est vous !</p>
            </Popup>
          </Marker>
        )}
        {markerList?.map((el) => (
          <Marker
            key={el.id}
            position={{
              lat: el.coordinates.x,
              lng: el.coordinates.y,
            }}
            icon={defaultIcon}
          >
            <Popup>
              {/* <img className="popup-image" src={el.imgPath} alt="art" /> */}
              {/* TODO CHANGE TO DYNAMIC IMG SEND BY BACKEND */}
              {el.description && <p className="popup-desc">{el.description}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  );
}

export default MapComponent;
