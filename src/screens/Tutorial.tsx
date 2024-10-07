import { useEffect, useRef, useState } from "react";

export function Tutorial () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSkippingAllowed, setIsSkippingAllowed] = useState(false);

  // Fallback para timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSkippingAllowed(true); // Permite pular o vídeo após 5 segundos
    }, 7000); // Ajuste o tempo conforme necessário

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
      videoElement.onended = () => {
        clearTimeout(timeoutId); // Cancela o timeout se o vídeo terminar normalmente
        setIsPlaying(false);
        Rune.actions.tutorialEnded()
      };
    }
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  const skipTutorial = () => {
    setIsPlaying(false);
    Rune.actions.tutorialEnded()
  };
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      {isPlaying && (
        <>
          <video
            ref={videoRef}
            src={'./video/1004.mp4'}
            width="640"
            height="360"
            autoPlay
            muted
            controls={false}
          />
          {isSkippingAllowed && (
            <button onClick={skipTutorial} style={{ position: 'absolute', top: '10px', right: '10px' }}>
              {">>"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
