import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./index";

jest.mock("typewriter-effect", () => {
  return function MockTypewriter() {
    return <span>Mock typewriter</span>;
  };
});

describe("Home", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the hero content and swaps the waving image after the timeout", () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    React.act(() => {
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const wavingHand = container.querySelector('img[alt="Waving hand"]') as HTMLImageElement | null;
    const title = container.textContent ?? "";

    expect(title.includes("Hi, I'm Rebecca")).toBe(true);
    expect(title.includes("Mock typewriter")).toBe(true);
    expect(wavingHand).not.toBeNull();
    expect((wavingHand?.getAttribute("src") ?? "").includes("robot-hi-gif")).toBe(true);

    React.act(() => {
      jest.advanceTimersByTime(5000);
    });

    const updatedWavingHand = container.querySelector(
      'img[alt="Waving hand"]'
    ) as HTMLImageElement | null;

    expect(updatedWavingHand).not.toBeNull();
    expect((updatedWavingHand?.getAttribute("src") ?? "").includes("robot-hi-still")).toBe(true);

    React.act(() => {
      root.unmount();
    });
  });
});
