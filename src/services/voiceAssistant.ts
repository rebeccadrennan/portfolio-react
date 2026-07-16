const assistantApiBaseUrl =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "http://localhost:8000";

function buildAssistantApiUrl(path: string) {
  return `${assistantApiBaseUrl.replace(/\/$/, "")}${path}`;
}

export type TranscribeAudioResponse = {
  text: string;
};

export async function transcribeAudio(blob: Blob): Promise<TranscribeAudioResponse> {
  const formData = new FormData();
  formData.append("audio", blob, "recording.webm");

  const response = await fetch(buildAssistantApiUrl("/speech-to-text"), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Transcription failed");
  }

  return (await response.json()) as TranscribeAudioResponse;
}

export async function generateSpeech(text: string): Promise<Blob> {
  const response = await fetch(buildAssistantApiUrl("/text-to-speech"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Speech generation failed");
  }

  return response.blob();
}
