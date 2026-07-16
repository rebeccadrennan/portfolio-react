import { useEffect, useRef, useState } from "react";

const supportedRecorderMimeTypes = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
  "audio/wav",
];

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onend: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: Event) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechRecognitionEventLike = {
  results: ArrayLike<{
    0: { transcript: string };
    isFinal: boolean;
  }>;
  resultIndex: number;
};

function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  const speechWindow = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  const speechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

  return speechRecognition ?? null;
}

function getMicrophoneErrorMessage(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      return "Microphone access was denied. Enable microphone permissions and try again.";
    }

    if (error.name === "NotFoundError") {
      return "No microphone was found on this device.";
    }

    if (error.name === "NotReadableError") {
      return "The microphone is already in use by another application.";
    }
  }

  return "Could not start voice recording.";
}

export function useVoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef("");
  const recordingCompletionRef = useRef<Promise<string | null> | null>(null);
  const recordingResolveRef = useRef<((text: string | null) => void) | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const speechSynthesisUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const clearRecordingTimer = () => {
    if (recordingTimerRef.current !== null) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  const stopRecordingTracks = () => {
    const recognition = speechRecognitionRef.current;

    if (recognition) {
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
      recognition.stop();
    }

    speechRecognitionRef.current = null;
  };

  const finishRecording = (text: string | null) => {
    const resolve = recordingResolveRef.current;
    recordingResolveRef.current = null;
    recordingCompletionRef.current = null;
    setIsRecording(false);
    setRecordingSeconds(0);
    clearRecordingTimer();
    stopRecordingTracks();
    transcriptRef.current = "";
    resolve?.(text);
  };

  const startRecording = async () => {
    if (isRecording || speechRecognitionRef.current) {
      return;
    }

    setVoiceError(null);
    stopRecordingTracks();

    const SpeechRecognitionConstructor = getSpeechRecognitionConstructor();

    if (!SpeechRecognitionConstructor) {
      setVoiceError("This browser does not support speech recognition.");
      throw new Error("SpeechRecognition is not supported");
    }

    try {
      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = "en-GB";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      speechRecognitionRef.current = recognition;
      transcriptRef.current = "";
      setRecordingSeconds(0);
      setIsRecording(true);

      clearRecordingTimer();
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);

      recordingCompletionRef.current = new Promise<string | null>((resolve) => {
        recordingResolveRef.current = resolve;
      });

      recognition.onresult = (event: Event) => {
        const speechEvent = event as Event & SpeechRecognitionEventLike;

        for (let index = speechEvent.resultIndex; index < speechEvent.results.length; index += 1) {
          const result = speechEvent.results[index];
          if (result) {
            transcriptRef.current += result[0].transcript;
          }
        }
      };

      recognition.onerror = () => {
        setVoiceError("Recording failed. Please try again.");
        finishRecording(null);
      };

      recognition.onend = () => {
        const transcript = transcriptRef.current.trim();
        finishRecording(transcript || null);
      };

      recognition.start();
    } catch (error) {
      finishRecording(null);
      setVoiceError(getMicrophoneErrorMessage(error));
      throw error;
    }
  };

  const stopRecording = async () => {
    const completion = recordingCompletionRef.current;

    if (!speechRecognitionRef.current) {
      return null;
    }

    speechRecognitionRef.current.stop();
    return completion ?? null;
  };

  const clearVoiceError = () => {
    setVoiceError(null);
  };

  useEffect(() => {
    return () => {
      clearRecordingTimer();
      stopRecordingTracks();
      recordingCompletionRef.current = null;
      recordingResolveRef.current = null;
    };
  }, []);

  return {
    isRecording,
    recordingSeconds,
    voiceError,
    setVoiceError,
    startRecording,
    stopRecording,
    clearVoiceError,
  };
}
