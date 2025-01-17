import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Print.css";
import type { WebcamCaptureProps } from "./Map.types";

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  openCapture,
  setOpenCapture,
}) => {
  const [previsualisation, setPrevisualisation] = useState(true);
  const [showPicture, setShowPicture] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setPrevisualisation(false);
      setShowPicture(true);
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
        setOpenCapture(!openCapture);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="camera-container">
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
