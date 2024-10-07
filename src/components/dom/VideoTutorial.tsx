import React, { useEffect, useRef } from "react";

interface VideoTutorialProps {
  src: string;  // URL do vídeo
  width?: number; // Largura opcional do vídeo
  height?: number; // Altura opcional do vídeo
}

export const VideoTutorial: React.FC<VideoTutorialProps> = ({ src, width = 640, height = 360 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reproduz o vídeo quando o componente é montado
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        width={width}
        height={height}
        src={src}
        autoPlay
        muted
        controls={false} // Desabilita os controles do vídeo
      />
    </div>
  );
};
