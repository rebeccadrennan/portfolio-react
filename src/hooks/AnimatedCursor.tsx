import React, { useCallback, useEffect, useRef, useState } from "react";

type CursorCoreProps = {
  outerStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  color?: string;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  outerScale?: number;
  innerScale?: number;
  trailingSpeed?: number;
  clickables?: string[];
};

type DeviceDetector = {
  Android: () => boolean;
  BlackBerry: () => boolean;
  IEMobile: () => boolean;
  iOS: () => boolean;
  iPad: () => boolean;
  OperaMini: () => boolean;
  any: () => boolean;
};

const IsDevice: DeviceDetector | null = (() => {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent;

  return {
    Android() {
      return /Android/i.test(ua);
    },
    BlackBerry() {
      return /BlackBerry/i.test(ua);
    },
    IEMobile() {
      return /IEMobile/i.test(ua);
    },
    iOS() {
      return /iPhone|iPad|iPod/i.test(ua);
    },
    iPad() {
      return Boolean(ua.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    },
    OperaMini() {
      return /Opera Mini/i.test(ua);
    },
    any() {
      return (
        this.Android() ||
        this.BlackBerry() ||
        this.iOS() ||
        this.iPad() ||
        this.OperaMini() ||
        this.IEMobile()
      );
    },
  };
})();

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document | HTMLElement | null = typeof document !== "undefined" ? document : null,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element ?? document;
    if (!target || !("addEventListener" in target)) return;

    const eventListener = (event: Event) => savedHandler.current(event as DocumentEventMap[K]);

    target.addEventListener(eventName, eventListener);

    return () => {
      target.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function CursorCore({
  outerStyle,
  innerStyle,
  color = "220, 90, 90",
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 8,
  outerScale = 6,
  innerScale = 0.6,
  trailingSpeed = 8,
  clickables = [
    "a",
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    "select",
    "textarea",
    "button",
    ".link",
  ],
}: CursorCoreProps) {
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const coordsRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);

  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    coordsRef.current = { x: clientX, y: clientY };
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null && cursorOuterRef.current) {
        const coords = coordsRef.current;
        coords.x += (endX.current - coords.x) / trailingSpeed;
        coords.y += (endY.current - coords.y) / trailingSpeed;
        cursorOuterRef.current.style.top = `${coords.y}px`;
        cursorOuterRef.current.style.left = `${coords.x}px`;
      }

      previousTimeRef.current = time;
      requestRef.current = window.requestAnimationFrame(animateOuterCursor);
    },
    [trailingSpeed],
  );

  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animateOuterCursor);

    return () => {
      if (requestRef.current !== null) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  useEventListener("mousemove", onMouseMove);
  useEventListener("mousedown", () => setIsActive(true));
  useEventListener("mouseup", () => setIsActive(false));
  useEventListener("mouseover", () => setIsVisible(true));
  useEventListener("mouseout", () => setIsVisible(false));

  useEffect(() => {
    const inner = cursorInnerRef.current;
    const outer = cursorOuterRef.current;

    if (!inner || !outer) return;

    if (isActive) {
      inner.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
      outer.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
    } else {
      inner.style.transform = "translate(-50%, -50%) scale(1)";
      outer.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    const inner = cursorInnerRef.current;
    const outer = cursorOuterRef.current;

    if (!inner || !outer) return;

    if (isActiveClickable) {
      inner.style.transform = `translate(-50%, -50%) scale(${innerScale * 1.2})`;
      outer.style.transform = `translate(-50%, -50%) scale(${outerScale * 1.4})`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    const inner = cursorInnerRef.current;
    const outer = cursorOuterRef.current;

    if (!inner || !outer) return;

    if (isVisible) {
      inner.style.opacity = "1";
      outer.style.opacity = "1";
    } else {
      inner.style.opacity = "0";
      outer.style.opacity = "0";
    }
  }, [isVisible]);

  useEffect(() => {
    const clickableElements = document.querySelectorAll(clickables.join(","));

    const handleMouseOver = () => setIsActive(true);
    const handleClick = () => {
      setIsActive(true);
      setIsActiveClickable(false);
    };
    const handleMouseDown = () => setIsActiveClickable(true);
    const handleMouseUp = () => setIsActive(true);
    const handleMouseOut = () => {
      setIsActive(false);
      setIsActiveClickable(false);
    };

    clickableElements.forEach((element) => {
      const clickableElement = element as HTMLElement;
      clickableElement.style.cursor = "none";
      clickableElement.addEventListener("mouseover", handleMouseOver);
      clickableElement.addEventListener("click", handleClick);
      clickableElement.addEventListener("mousedown", handleMouseDown);
      clickableElement.addEventListener("mouseup", handleMouseUp);
      clickableElement.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      clickableElements.forEach((element) => {
        const clickableElement = element as HTMLElement;
        clickableElement.removeEventListener("mouseover", handleMouseOver);
        clickableElement.removeEventListener("click", handleClick);
        clickableElement.removeEventListener("mousedown", handleMouseDown);
        clickableElement.removeEventListener("mouseup", handleMouseUp);
        clickableElement.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [clickables]);

  useEffect(() => {
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  const styles = {
    cursorInner: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      width: innerSize,
      height: innerSize,
      pointerEvents: "none",
      backgroundColor: `rgba(${color}, 1)`,
      ...(innerStyle ?? {}),
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    } as React.CSSProperties,
    cursorOuter: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      pointerEvents: "none",
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
      willChange: "transform",
      ...(outerStyle ?? {}),
    } as React.CSSProperties,
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  );
}

function AnimatedCursor({
  outerStyle,
  innerStyle,
  color,
  outerAlpha,
  innerSize,
  innerScale,
  outerSize,
  outerScale,
  trailingSpeed,
  clickables,
}: CursorCoreProps) {
  if (typeof navigator !== "undefined" && IsDevice?.any()) {
    return null;
  }

  return (
    <CursorCore
      outerStyle={outerStyle}
      innerStyle={innerStyle}
      color={color}
      outerAlpha={outerAlpha}
      innerSize={innerSize}
      innerScale={innerScale}
      outerSize={outerSize}
      outerScale={outerScale}
      trailingSpeed={trailingSpeed}
      clickables={clickables}
    />
  );
}

export default AnimatedCursor;