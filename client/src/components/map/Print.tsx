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
      <div className="button-container">
        <button
          className="circle-button"
          type="button"
          onClick={capturePhoto}
        />
      </div>
      <button className="white-button print-button " type="button">
        <div className="send-container">
          <p className="p-button">Envoyer</p>
          <img className="send-img" src="/send.PNG" alt="send button" />
        </div>
      </button>
    </div>
  );
};

export default WebcamCapture;
