// components/blog/AudioPlayer.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { PlayArrow, Pause, Stop } from "@mui/icons-material";

// UPDATE: Add a callback prop for sentence highlighting
interface AudioPlayerProps {
  text: string;
  onBoundary: (charIndex: number) => void;
}

const AudioPlayer = ({ text, onBoundary }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ADD: State for voice and speed controls
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>();
  const [speed, setSpeed] = useState(1);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    u.onboundary = (event) => {
      onBoundary(event.charIndex);
    };

    utteranceRef.current = u;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (!selectedVoiceURI && availableVoices.length > 0) {
        const defaultVoice =
          availableVoices.find((v) => v.lang.startsWith("en")) ||
          availableVoices[0];
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
      setIsLoading(false);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.cancel();
      synth.onvoiceschanged = null;
    };
  }, [text, onBoundary, selectedVoiceURI]);

  const handlePlay = () => {
    if (!utteranceRef.current) return;
    const synth = window.speechSynthesis;

    utteranceRef.current.voice =
      voices.find((v) => v.voiceURI === selectedVoiceURI) || null;
    utteranceRef.current.rate = speed;

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      onBoundary(-1); 
    };

    if (isPaused) {
      synth.resume();
    } else {
      synth.cancel();
      synth.speak(utteranceRef.current);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    onBoundary(-1); 
  };

  if (isLoading) {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Loading audio player...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          Listen to Article
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {!isPlaying ? (
            <IconButton onClick={handlePlay} aria-label="play" color="primary">
              <PlayArrow />
            </IconButton>
          ) : (
            <IconButton onClick={handlePause} aria-label="pause" color="primary">
              <Pause />
            </IconButton>
          )}
          <IconButton onClick={handleStop} aria-label="stop" disabled={!isPlaying && !isPaused}>
            <Stop />
          </IconButton>
        </Stack>
      </Stack>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="voice-select-label">Voice</InputLabel>
            <Select
              labelId="voice-select-label"
              value={selectedVoiceURI || ""}
              label="Voice"
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
            >
              {voices.map((voice) => (
                <MenuItem key={voice.voiceURI} value={voice.voiceURI}>
                  {`${voice.name} (${voice.lang})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="caption" component="div">
            Playback Speed: {speed.toFixed(2)}x
          </Typography>
          <Slider
            value={speed}
            onChange={(_, newValue) => setSpeed(newValue as number)}
            min={0.5}
            max={2}
            step={0.25}
            aria-labelledby="speed-slider"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AudioPlayer;