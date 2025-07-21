import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }, 0);
  };

  const previous = () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 0);
    }
  };

  const next = () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 0);
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const clickPosition = e.nativeEvent.offsetX;
    const totalWidth = seekBg.current.offsetWidth;
    const percentage = clickPosition / totalWidth;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (!audioRef.current || !seekBar.current) return;

      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;

      seekBar.current.style.width = `${Math.floor((current / duration) * 100)}%`;

      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = handleTimeUpdate;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
