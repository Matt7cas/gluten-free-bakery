
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const PerformanceContext = createContext();

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Memoized function to play sounds with performance optimization
  const playSound = useCallback((soundName, volume = 0.3) => {
    if (typeof window === 'undefined' || !isAudioEnabled) return;

    // Create audio element only when needed to prevent memory issues
    const audio = new Audio();
    audio.volume = volume;

    // Define sound URLs
    const soundUrls = {
      paperRustle: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
      paperTear: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
      paperDrop: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
      menuOpen: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA=='
    };

    audio.src = soundUrls[soundName] || soundUrls.paperRustle;

    // Clone the audio to prevent conflicts when multiple sounds play
    const clonedAudio = audio.cloneNode();
    clonedAudio.play().catch(e => console.log('Audio play failed:', e));
  }, [isAudioEnabled]);

  const contextValue = useMemo(() => ({
    isAudioEnabled,
    setIsAudioEnabled,
    playSound
  }), [isAudioEnabled, playSound]);

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};