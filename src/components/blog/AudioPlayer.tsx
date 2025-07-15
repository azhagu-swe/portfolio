// components/mdx/AudioPlayer.tsx
import React, { useState, useEffect, useRef } from "react";
import { IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import { PlayArrow, Pause, Stop } from "@mui/icons-material";

interface AudioPlayerProps {
  text: string;
}

const AudioPlayer = ({ text }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use a ref to hold the utterance object
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    utteranceRef.current = u;
    setIsLoading(false); // Voices loaded, ready to play

    // Cleanup function to cancel speech when the component unmounts
    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    if (!utteranceRef.current) return;
    const synth = window.speechSynthesis;

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utteranceRef.current);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (isLoading) {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Loading audio...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="subtitle1" fontWeight="bold">
        Listen to this article
      </Typography>
      {!isPlaying ? (
        <IconButton onClick={handlePlay} aria-label="play">
          <PlayArrow />
        </IconButton>
      ) : (
        <IconButton onClick={handlePause} aria-label="pause">
          <Pause />
        </IconButton>
      )}
      <IconButton onClick={handleStop} aria-label="stop" disabled={!isPlaying && !isPaused}>
        <Stop />
      </IconButton>
    </Stack>
  );
};

export default AudioPlayer;