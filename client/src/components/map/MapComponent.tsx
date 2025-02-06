import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "./Mapcomponent.css";
import "leaflet.awesome-markers";
import type { LatLngExpression } from "leaflet";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import useToast from "../../utils/useToast";
import type { MapComponentProps, PointButtonVerification } from "./Map.types";
import WebcamCapture from "./Print";

function MapComponent({
  position,
  centerMarker,
  markerList,
}: MapComponentProps) {
  const [openCapture, setOpenCapture] = useState(false);
  const [isViewed, setIsViewed] = useState<boolean>(false);
  const { success, failed } = useToast();
  const { user } = useUser();

  const handleButtonClick = () => setOpenCapture(!openCapture);
  // customize Icon current position
  const CenterMarkerIcon = L.AwesomeMarkers.icon({
    markerColor: "red",
  });

  // customize Icon art pieces
  const defaultIcon = L.AwesomeMarkers.icon({
    markerColor: "cadetblue",
  });

  const isAlreadySeen = async ({
    artId,
    artLong,
    artLat,
  }: PointButtonVerification) => {
    setIsViewed(false);
    if (user && centerMarker) {
      const latLongArt = L.latLng(artLong, artLat);
      const latLongUser = L.latLng(centerMarker[0], centerMarker[1]);
      const distance = latLongArt.distanceTo(latLongUser);
      if (distance > 50) {
        setIsViewed(false);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/artVerification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              artId: artId,
            }),
          },
        );

        if (!response.ok) {
          failed("Erreur lors de l'envoie de la requête");
        }
        const data = await response.json();
        if (data[0].has_viewed === 1) {
          setIsViewed(false);
        } else {
          setIsViewed(true);
        }
      } catch (error) {
        failed("Erreur lors de l'envoie de la requête");
      }
    }
  };

  const handleAddPoint = async (artId: number) => {
    if (user) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/addpoint`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id, artId: artId }),
          },
        );

        if (!response.ok) {
          failed("Erreur lors de l'attribution de points' :");
        }
        success(
          "Bravo ! Vous avez découvert une nouvelle œuvre et gagné des points. Continuez l’exploration !",
        );
        setIsViewed(false);
      } catch (error) {
        failed("Erreur lors de l'attribution de points' :");

        console.error("Echec lors de l'envoi de points", error);
      }
    }
  };

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
            eventHandlers={{
              popupopen: async () => {
                await isAlreadySeen({
                  artId: el.id,
                  artLong: el.coordinates.x,
                  artLat: el.coordinates.y,
                });
              },
            }}
            key={el.id}
            position={{
              lat: el.coordinates.x,
              lng: el.coordinates.y,
            }}
            icon={defaultIcon}
          >
            <Popup>
              <img
                className="popup-image"
                src={`${import.meta.env.VITE_API_URL}${el.picture_path}`}
                alt="art"
              />
              <h4 className="popup-title">{el.name}</h4>
              <p className="popup-coordinates">Lattitude {el.coordinates.x}</p>
              <p className="popup-coordinates">Longitude {el.coordinates.y}</p>
              {isViewed && (
                <button type="button" onClick={() => handleAddPoint(el.id)}>
                  eye
                </button>
              )}
            </Popup>
          </Marker>
        ))}

        <button
          type="button"
          className="round-button"
          onClick={handleButtonClick}
        >
          +
        </button>
        {openCapture && (
          <WebcamCapture
            openCapture={openCapture}
            setOpenCapture={setOpenCapture}
            position={position}
            onSuccess={() =>
              success(
                "Félicitations ! Votre découverte a été envoyée et est maintenant en attente de validation !",
              )
            }
          />
        )}
      </MapContainer>
    )
  );
}

export default MapComponent;
