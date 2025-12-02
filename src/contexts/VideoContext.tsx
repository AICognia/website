import React, { createContext, useContext, useState, RefObject } from 'react';

interface VideoContextType {
  videoRef: RefObject<HTMLVideoElement | null> | null;
  setVideoRef: (ref: RefObject<HTMLVideoElement | null>) => void;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  setAudioAnalyser: (context: AudioContext, analyser: AnalyserNode) => void;
}

const VideoContext = createContext<VideoContextType>({
  videoRef: null,
  setVideoRef: () => {},
  audioContext: null,
  analyser: null,
  setAudioAnalyser: () => {}
});

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoRef, setVideoRefState] = useState<RefObject<HTMLVideoElement | null> | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const setVideoRef = (ref: RefObject<HTMLVideoElement | null>) => {
    setVideoRefState(ref);
  };

  const setAudioAnalyser = (context: AudioContext, analyserNode: AnalyserNode) => {
    setAudioContext(context);
    setAnalyser(analyserNode);
  };

  return (
    <VideoContext.Provider value={{ videoRef, setVideoRef, audioContext, analyser, setAudioAnalyser }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
