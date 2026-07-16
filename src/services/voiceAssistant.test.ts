import { generateSpeech, transcribeAudio } from "./voiceAssistant";

describe("voiceAssistant services", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("posts audio form data to the speech-to-text endpoint", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ text: "hello world" }),
    });

    const recording = new Blob(["audio"], { type: "audio/webm" });
    const result = await transcribeAudio(recording);

    expect(result).toEqual({ text: "hello world" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/speech-to-text");
    expect(options.method).toBe("POST");
    expect(options.body).toBeInstanceOf(FormData);
  });

  it("posts assistant text to the text-to-speech endpoint and returns a blob", async () => {
    const speechBlob = new Blob(["audio"], { type: "audio/webm" });
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      blob: async () => speechBlob,
    });

    const result = await generateSpeech("Thanks for asking");

    expect(result).toBe(speechBlob);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/text-to-speech");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
  });
});
