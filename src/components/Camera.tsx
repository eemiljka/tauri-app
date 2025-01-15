import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type CameraProps = {
  width: number;
  aspect: number;
};

const Camera = forwardRef<HTMLVideoElement | null, CameraProps>(
  (props, ref) => {
    const { width, aspect } = props;
    const height = width / aspect;
    const videoRef = useRef<HTMLVideoElement>(null);

    // jaetaan videoRef parentille
    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
      const setupVideoInput = async () => {
        // getUserMedia
        const constraints = {
          audio: false,
          video: { width: width, height: height },
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            const video = videoRef.current;
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
            };
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };

      setupVideoInput();
    }, []);

    return <video ref={videoRef} width={width} height={height} />;
  }
);

export default Camera;
