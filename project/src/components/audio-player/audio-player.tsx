import { useState, useEffect, useRef } from 'react';


type AudioPlayerProps = {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
}

function AudioPlayer({ isPlaying, src, onPlayButtonClick }: AudioPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement !== null) {
      const handleLoadedData = () => {
        setIsLoading(false);
      };

      audioElement.addEventListener('loadeddata', handleLoadedData);

      return () => {
        audioElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  });

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement !== null) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  });


  return (
    <>
      <button
        className={`track__button track__button--${isPlaying ? 'pause' : 'play'}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      >
      </button>
      <div className="track__status">
        <audio src={src} ref={audioRef} />
      </div>
    </>
  );
}

export default AudioPlayer;
