import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Print.css";

const WebcamCapture: React.FC = () => {
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
          <div className="overlay-element top-left"> </div>
          <div className="overlay-element top-right"> </div>
          <div className="overlay-element bottom-left"> </div>
          <div className="overlay-element bottom-right"> </div>
          <Webcam
            className="camera"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
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
        <button className="white-button print-button " type="button">
          <div className="send-container">
            <p className="p-button">Envoyer</p>
            <img className="send-img" src="/send.PNG" alt="send button" />
          </div>
        </button>
      )}
    </div>
  );
};

export default WebcamCapture;
