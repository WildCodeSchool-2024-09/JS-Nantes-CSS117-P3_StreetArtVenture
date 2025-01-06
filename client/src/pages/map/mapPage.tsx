import { useEffect, useState } from "react";
import CityCoordinates from "../../components/cityCoordinates/cityCoordinates.component";
import MapComponent from "../../components/map/map.component";
import "./MapPage.css";
import type { ArtPiece } from "../../types/art_piece";

function MapPage() {
  const [position, setPosition] = useState<
    "asking" | "denied" | "loading" | number[]
  >("loading");
  const [data, setData] = useState<null | ArtPiece[]>(null);

  useEffect(() => {
    // Verify permissions
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        // check if browser is asking for geolocation
        if (result.state === "prompt") setPosition("asking");
        // check if geolocation is denied
        else if (result.state === "denied") setPosition("denied");
        // change of permission listener
        result.onchange = () => {
          if (result.state === "denied") setPosition("denied");
          // check if accepted after asking
          else if (result.state === "granted") {
            setPosition("loading");
            setWatcher();
          }
        };
      });
    }

    setWatcher();
  }, []);

  // fetch all art_pieces around lattitude and longitude given
  async function getData(lat: number, lng: number) {
    // parameter radius (optionnal) can be added if we want a wider or narrower radius
    const res = await fetch(
      `http://localhost:3310/art/findArtPiecesAround?latitude=${lat}&longitude=${lng}`,
    );
    const newData = await res.json();
    setData(newData);
  }

  // Set watcher for user position tracking
  async function setWatcher() {
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      getData(latitude, longitude);
      setPosition([latitude, longitude]);
    });
    // Clean watcher when unmounted component
    return () => navigator.geolocation.clearWatch(watchId);
  }

  // Handle user denies geolocation
  function setManualCity(lat: number, lng: number) {
    setPosition([lat, lng]);
    getData(lat, lng);
  }

  return (
    <>
      {position === "loading" ? (
        <p>chargement..</p>
      ) : position === "denied" ? (
        <>
          <p>géolocalisation refusée</p>
          <CityCoordinates setManualCity={setManualCity} />
        </>
      ) : position === "asking" ? (
        <p>veuillez accepter la géolocalisation</p>
      ) : (
        <div id="map-main-container">
          <MapComponent
            markerList={data}
            position={position}
            centerMarker={position}
          />
        </div>
      )}
    </>
  );
}

export default MapPage;
