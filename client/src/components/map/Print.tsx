import { fetchWithAuth } from "../../utils/api";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Print.css";
import { useUser } from "../../context/UserContext";
import useToast from "../../utils/useToast";
import type { Coordinates, Role, WebcamCaptureProps } from "./Map.types";
const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  openCapture,
  setOpenCapture,
  position,
  onSuccess,
  type,
  artPieceId,
}) => {
  const { information, failed } = useToast();

  const { user } = useUser();
  const [previsualisation, setPrevisualisation] = useState(true);
  const [showPicture, setShowPicture] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const role: Role = {
    add: {
      role: "Nouvelle oeuvre",
    },
    signalment: {
      role: "Signaler",
    },
  };
  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setPrevisualisation(false);
      setShowPicture(true);
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setPrevisualisation(false);
        setShowPicture(true);

        if (position) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&zoom=18&format=jsonv2`,
            );
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données");
            }
            const data = await response.json();

            setCoordinates({
              latLong: [position[0], position[1]],
              city:
                data.address.city || data.address.suburb || "Ville inconnue",
              address: data.address.road || "Adresse inconnue",
            });
          } catch (error) {
            information(
              "Merci d'activer la géolocalisation afin d'accéder à cette option",
            );
          }
        }
      }
    }
  };

  const tryAgain = () => {
    setShowPicture(false);
    setPrevisualisation(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) return;

    const blob = await fetch(capturedImage).then((res) => res.blob());
    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (artPieceId) {
          const toSend = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/art/newReport`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                filePath: data.filePath,
                userId: user ? user.id : null,
                artId: artPieceId,
              }),
            },
          );
          if (!toSend.ok) {
            failed("Echec lors de l'envoi du fichier");
          }
        } else {
          const toSend = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/art/newArt`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                coordinates: coordinates,
                fileName: data.fileName,
                filePath: data.filePath,
                userId: user ? user.id : null,
              }),
            },
          );
          if (!toSend.ok) {
            failed("Echec lors de l'envoi du fichier");
          }
        }

        setOpenCapture(!openCapture);
        onSuccess();
      }
    } catch (error) {
      failed("Echec lors de l'envoi du fichier");
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="camera-container">
      <h2>{`${role[type].role}`}</h2>
      {showPicture && capturedImage && (
        <div>
          <img className="camera shadow" src={capturedImage} alt="test" />
          <button
            className="new-shot montserrat"
            onClick={tryAgain}
            type="button"
          >
            Besoin d'un meilleur angle ? clic ici !
          </button>
        </div>
      )}
      {previsualisation && (
        <div className="overlay">
          <Webcam
            className="camera"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          />
        </div>
      )}
      {previsualisation && (
        <div className="button-container">
          <button
            className="circle-button"
            type="button"
            onClick={capturePhoto}
          />
        </div>
      )}
      {showPicture && (
        <form onSubmit={handleSubmit}>
          <button className="white-button print-button" type="submit">
            <div className="send-container">
              <p className="p-button">Envoyer</p>
              <img className="send-img" src="/send.PNG" alt="send button" />
            </div>
          </button>
        </form>
      )}
    </div>
  );
};

export default WebcamCapture;
