// components/blog/AudioPlayer.tsx
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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
  const [speed, setSpeed] = useState([1]); // Slider expects an array

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
    utteranceRef.current.rate = speed[0];

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
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Loading audio player...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 border border-border rounded-xl space-y-4 bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <h6 className="text-lg font-bold">
          Listen to Article
        </h6>
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <Button onClick={handlePlay} size="icon" variant="outline" aria-label="play">
              <Play className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handlePause} size="icon" variant="outline" aria-label="pause">
              <Pause className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={handleStop}
            size="icon"
            variant="ghost"
            aria-label="stop"
            disabled={!isPlaying && !isPaused}
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="w-full">
          <Label htmlFor="voice-select" className="mb-2 block">Voice</Label>
          <Select
            value={selectedVoiceURI || ""}
            onValueChange={(value) => setSelectedVoiceURI(value)}
          >
            <SelectTrigger id="voice-select" className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                  {`${voice.name} (${voice.lang})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label className="mb-2 block">
            Playback Speed: {speed[0].toFixed(2)}x
          </Label>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={0.5}
            max={2}
            step={0.25}
            aria-label="Playback Speed"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;