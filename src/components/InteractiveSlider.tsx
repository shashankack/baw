"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SliderItem {
  name: string;
  slug: string;
  /** Path relative to /media/, e.g. "clients/coca-cola/logo.png" */
  logo: string;
}

/** A plain number or a responsive breakpoint map of numbers. */
export type ResponsiveNum =
  | number
  | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", number>>;

/** A px value — either a plain number or a responsive breakpoint map. */
export type ResponsivePx = ResponsiveNum;

/**
 * Converts a ResponsiveNum to a CSS string or responsive sx object.
 * @param unit  CSS unit to append, e.g. "px" or "s"
 * @param scale Optional multiplier applied to each value before appending.
 */
function toUnit(
  val: ResponsiveNum,
  unit: string,
  scale = 1
): string | Record<string, string> {
  if (typeof val === "number") return `${val * scale}${unit}`;
  return Object.fromEntries(
    Object.entries(val).map(([bp, n]) => [bp, `${(n ?? 0) * scale}${unit}`])
  );
}

/** Shorthand: converts ResponsiveNum → "Npx" or responsive px map. */
const toPx = (val: ResponsiveNum) => toUnit(val, "px");
/** Shorthand: converts ResponsiveNum → "N/2 px" or responsive half-px map. */
const toPxHalf = (val: ResponsiveNum) => toUnit(val, "px", 0.5);
/** Shorthand: converts ResponsiveNum → "Ns" or responsive seconds map. */
const toSecs = (val: ResponsiveNum) => toUnit(val, "s");

export interface InteractiveSliderProps {
  /** Array of items to display — pass `clientsData.clients` from clients.json */
  items: SliderItem[];
  /** Scroll direction — default "left" */
  direction?: "left" | "right";
  /**
   * Time in seconds for one full loop pass — lower = faster.
   * Accepts a plain number or a responsive breakpoint map. Default 30.
   */
  speed?: ResponsiveNum;
  /** Fixed height for every logo cell — number (px) or responsive map. Default 40 */
  logoHeight?: ResponsivePx;
  /** Max width cap per logo — number (px) or responsive map. Default 160 */
  logoMaxWidth?: ResponsivePx;
  /** Gap between logos — number (px) or responsive map. Default 72 */
  gap?: ResponsiveNum;
  /** Whether clicking a logo navigates to /works/[slug] — default true */
  navigateOnClick?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InteractiveSlider({
  items,
  direction = "left",
  speed = 30,
  logoHeight = 40,
  logoMaxWidth = 160,
  gap = 72,
  navigateOnClick = true,
}: InteractiveSliderProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(4);

  if (!items?.length) return null;

  // Repeat the item set enough times so the reset occurs outside the
  // visible viewport and the loop feels truly infinite.
  const track = useMemo(
    () => Array.from({ length: repeatCount }, () => items).flat(),
    [items, repeatCount]
  );

  const keyframeName =
    direction === "left" ? "is-slide-left" : "is-slide-right";
  const trackShift = `calc(-100% / ${repeatCount})`;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const trackEl = trackRef.current;
    if (!wrapper || !trackEl) return;

    const calculateRepeatCount = () => {
      const wrapperWidth = wrapper.clientWidth || window.innerWidth;
      const copyWidth = trackEl.scrollWidth / repeatCount;
      if (!copyWidth) return;

      const requiredCopies = Math.max(
        2,
        Math.ceil(wrapperWidth / copyWidth) + 1
      );
      if (requiredCopies !== repeatCount) {
        setRepeatCount(requiredCopies);
      }
    };

    const resizeObserver = new ResizeObserver(calculateRepeatCount);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(trackEl);
    window.addEventListener("load", calculateRepeatCount);
    requestAnimationFrame(calculateRepeatCount);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", calculateRepeatCount);
    };
  }, [repeatCount, items, gap, logoHeight, logoMaxWidth]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        // Pause on hover
        "&:hover .is-track": {
          animationPlayState: "paused !important",
        },
        // Keyframes injected via sx (MUI injects into <style>)
        "@keyframes is-slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: `translateX(${trackShift})` },
        },
        "@keyframes is-slide-right": {
          "0%": { transform: `translateX(${trackShift})` },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      <Stack
        ref={trackRef}
        direction="row"
        alignItems="center"
        className="is-track"
        sx={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          // Split the animation shorthand so each property can be responsive
          animationName: keyframeName,
          animationDuration: toSecs(speed),
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          // Gap on both sides so the loop edge is seamless
          columnGap: toPx(gap),
          px: toPxHalf(gap),
        }}
      >
        {track.map((item, i) => (
          <LogoCell
            key={`${item.slug}-${i}`}
            item={item}
            logoHeight={logoHeight}
            logoMaxWidth={logoMaxWidth}
            onClick={
              navigateOnClick
                ? () => router.push(`/works/${item.slug}`)
                : undefined
            }
          />
        ))}
      </Stack>
    </Box>
  );
}

// ── Logo cell ──────────────────────────────────────────────────────────────────

function LogoCell({
  item,
  logoHeight,
  logoMaxWidth,
  onClick,
}: {
  item: SliderItem;
  logoHeight: ResponsivePx;
  logoMaxWidth: ResponsivePx;
  onClick?: () => void;
}) {
  return (
    <Box
      component={onClick ? "button" : "div"}
      onClick={onClick}
      aria-label={onClick ? `View ${item.name} work` : undefined}
      sx={{
        // Reset button styles
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: onClick ? "pointer" : "default",
        // Layout
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: toPx(logoHeight),
        // Keep aspect ratio fixed regardless of image dimensions
        width: "auto",
        // Subtle hover feedback
        transition: "transform 0.25s ease",
        ...(onClick && {
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            opacity: 0.35,
            transform: "scale(0.92)",
          },
        }),
      }}
    >
      <Box
        component="img"
        src={`/${item.logo}`}
        alt={item.name}
        draggable={false}
        sx={{
          display: "block",
          height: "100%",
          width: "auto",
          maxWidth: toPx(logoMaxWidth),
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
