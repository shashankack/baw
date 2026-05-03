"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const syncScrollTrigger = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", syncScrollTrigger);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Integrate with GSAP ticker for frame-perfect updates
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
