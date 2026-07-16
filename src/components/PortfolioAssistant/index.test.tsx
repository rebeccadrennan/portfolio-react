import React from "react";
import ReactDOM from "react-dom/client";
import PortfolioAssistant from "./index";
import { useVoiceAssistant } from "@hooks/useVoiceAssistant";

jest.mock("@hooks/useVoiceAssistant", () => ({
  useVoiceAssistant: jest.fn(),
}));

const useVoiceAssistantMock = useVoiceAssistant as jest.MockedFunction<typeof useVoiceAssistant>;

function setupVoiceHookMock(overrides: Partial<ReturnType<typeof useVoiceAssistant>> = {}) {
  useVoiceAssistantMock.mockReturnValue({
    isRecording: false,
    recordingSeconds: 0,
    voiceError: null,
    setVoiceError: jest.fn(),
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    clearVoiceError: jest.fn(),
    ...overrides,
  });
}

describe("PortfolioAssistant", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    global.fetch = jest.fn();
    setupVoiceHookMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("keeps the text chat submit flow working", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: "She built a portfolio assistant and multiple React projects." }),
    });

    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await React.act(async () => {
      root.render(<PortfolioAssistant />);
    });

    const questionButton = container.querySelectorAll(".chipButton")[0] as HTMLButtonElement;

    await React.act(async () => {
      questionButton.click();
    });

    expect(container.textContent ?? "").toContain(
      "She built a portfolio assistant and multiple React projects."
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/chat"),
      expect.objectContaining({ method: "POST" })
    );

    React.act(() => {
      root.unmount();
    });
  });

  it("shows a helpful message when microphone access is denied", async () => {
    const startRecordingMock = jest
      .fn()
      .mockRejectedValue(new DOMException("Denied", "NotAllowedError"));
    setupVoiceHookMock({ startRecording: startRecordingMock });

    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await React.act(async () => {
      root.render(<PortfolioAssistant />);
    });

    const micButton = container.querySelector(
      '[aria-label="Start voice recording"]'
    ) as HTMLButtonElement;

    await React.act(async () => {
      micButton.click();
    });

    expect(container.textContent ?? "").toContain("Microphone access is required for voice input.");

    React.act(() => {
      root.unmount();
    });
  });

  it("lets users disable voice replies", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await React.act(async () => {
      root.render(<PortfolioAssistant />);
    });

    const toggleButton = container.querySelector(
      '[aria-label="Disable voice replies"]'
    ) as HTMLButtonElement;

    await React.act(async () => {
      toggleButton.click();
    });

    expect(container.textContent ?? "").toContain("Voice replies off");
    expect(container.textContent ?? "").toContain("Voice replies are muted.");

    React.act(() => {
      root.unmount();
    });
  });
});
