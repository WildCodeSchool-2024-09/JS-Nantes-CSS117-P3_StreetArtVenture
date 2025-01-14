import { useRef } from "react";
import Webcam from "react-webcam";
import "./Print.css";

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log(imageSrc);
    }
  };

  return (
    <div className="camera-container">
      <Webcam
        className="camera"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "user",
        }}
      />
      <div className="button-container">
        <button
          className="circle-button"
          type="button"
          onClick={capturePhoto}
        />
      </div>
      <button className="white-button" type="button">
        Envoi
      </button>
    </div>
  );
};

export default WebcamCapture;
