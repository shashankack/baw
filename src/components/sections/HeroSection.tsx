"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CTAButton from "../CTAButton";
import gsap from "gsap";
import SplitType from "split-type";
import {
  scrollSplitTextBlur,
  scrollFromBottom,
  scrollFromLeft,
} from "@/lib/animations";

const NAVBAR_HEIGHT = 80; // px — accounts for fixed AppBar height

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const studioRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLElement>(null);
  const heartRef = useRef<HTMLElement>(null);
  const madeWithRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLElement>(null);
  const heroArrowRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLElement>(null);

  // Pre-hide all intro elements before first paint — prevents flash of visible content
  useLayoutEffect(() => {
    gsap.set(videoRef.current, { opacity: 0, y: 100 });
    gsap.set(studioRef.current, { opacity: 0 });
    gsap.set(yearRef.current, { opacity: 0, y: 16 });
    gsap.set(heartRef.current, { opacity: 0, y: 16 });
    gsap.set(madeWithRef.current, { opacity: 0 });
    gsap.set(buttonRef.current, { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    const scrollTweens = [
      scrollFromBottom(heroContainerRef.current, { start: "top 70%" }),
      scrollFromLeft(heroArrowRef.current, {
        start: "top 70%",
        distance: 60,
        duration: 0.9,
      }),
    ];

    const heroTextSplit = scrollSplitTextBlur(heroTextRef.current, {
      stagger: 0.018,
      duration: 0.6,
      distance: 12,
      start: "top 70%",
    });

    // Scroll-triggered animations — set up immediately (fire on scroll, not on load)
    const introTweens = [
      gsap.to(videoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }),
      gsap.to(yearRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.25,
      }),
      gsap.to(heartRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.35,
      }),
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.35,
      }),
    ];

    let studioSplit: SplitType | null = null;
    let madeWithSplit: SplitType | null = null;

    const studioCall = gsap.delayedCall(0.15, () => {
      gsap.set(studioRef.current, { opacity: 1 });
      studioSplit = new SplitType(studioRef.current as HTMLElement, {
        types: "chars",
      });
      introTweens.push(
        gsap.from(studioSplit.chars, {
          opacity: 0,
          y: 10,
          filter: "blur(6px)",
          duration: 0.45,
          stagger: 0.025,
          ease: "power2.out",
          clearProps: "filter",
        }),
      );
    });

    const madeWithCall = gsap.delayedCall(0.35, () => {
      gsap.set(madeWithRef.current, { opacity: 1 });
      madeWithSplit = new SplitType(madeWithRef.current as HTMLElement, {
        types: "chars",
      });
      introTweens.push(
        gsap.from(madeWithSplit.chars, {
          opacity: 0,
          y: 10,
          filter: "blur(6px)",
          duration: 0.4,
          stagger: 0.018,
          ease: "power2.out",
          clearProps: "filter",
        }),
      );
    });

    return () => {
      studioCall.kill();
      madeWithCall.kill();

      scrollTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.revert?.();
        tween.kill();
      });

      introTweens.forEach((tween) => {
        tween.revert?.();
        tween.kill();
      });

      heroTextSplit?.revert();
      studioSplit?.revert();
      madeWithSplit?.revert();

      gsap.set(
        [
          videoRef.current,
          studioRef.current,
          yearRef.current,
          heartRef.current,
          madeWithRef.current,
          buttonRef.current,
          heroContainerRef.current,
          heroArrowRef.current,
          heroTextRef.current,
        ].filter(Boolean),
        { clearProps: "opacity,transform,filter" },
      );
    };
  }, []);

  return (
    <Stack overflow="hidden">
      {/* Top */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
          borderBottom: "1px solid",
          borderColor: "primary.main",
        }}
      >
        {/* ── Video ── */}
        <Box
          ref={videoRef}
          component="video"
          src="/media/videos/intro_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* ── Transparent overlay with top/bottom vignette ── */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            /* background: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.55) 0%,
              rgba(0, 0, 0, 0.08) 30%,
              rgba(0, 0, 0, 0.08) 70%,
              rgba(0, 0, 0, 0.55) 100%
            )
          `, */
          }}
        >
          {/* ── Top-left: BAW Studio ── */}
          <Box
            sx={{
              position: "absolute",
              top: NAVBAR_HEIGHT + 10,
              left: 18,
            }}
          >
            <Typography
              ref={studioRef}
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", md: "1rem" },
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              BAW-STUDIO
            </Typography>
          </Box>

          {/* ── Top-right: year range ── */}
          <Box
            ref={yearRef}
            sx={{
              position: "absolute",
              top: NAVBAR_HEIGHT + 8,
              right: 18,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Geist Mono, monospace",
                fontWeight: 400,
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                letterSpacing: "0.08em",
              }}
            >
              20—25
            </Typography>
          </Box>

          {/* ── Bottom-left: heart + Made with love ── */}
          <Box
            sx={{
              position: "absolute",
              bottom: 18,
              left: 18,
              display: "flex",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            <Box ref={heartRef} sx={{ display: "flex", alignItems: "center" }}>
              <FavoriteIcon
                sx={{
                  fontSize: "1.5rem",
                  opacity: 0.8,
                }}
              />
            </Box>
            <Typography
              ref={madeWithRef}
              sx={{
                fontFamily: "Geist Mono, monospace",
                fontWeight: 400,
                fontSize: { xs: "0.72rem", md: "0.72rem" },
                letterSpacing: "0.06em",
              }}
            >
              Made with love
            </Typography>
          </Box>

          {/* ── Bottom-right: glassy CTA button ── */}
          <Box
            ref={buttonRef}
            sx={{
              position: "absolute",
              bottom: 18,
              right: 18,
            }}
          >
            <CTAButton
              text="View our work"
              variant="blurred"
              component="a"
              href="/works"
              endIcon={
                <ArrowUpwardRoundedIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "rotate(45deg)",
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Bottom */}
      <Stack direction="row">
        <Box
          flex={1}
          sx={{
            borderBottom: 1,
            borderRight: 1,
            justifyContent: "center",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Box ref={heroArrowRef}>
            <ArrowUpwardRoundedIcon
              sx={{
                fontSize: "28vw",
                opacity: 0.8,
                transform: "rotate(90deg)",
              }}
            />
          </Box>
        </Box>
        <Box
          flex={3}
          ref={heroContainerRef}
          sx={{ py: 6, position: "relative" }}
        >
          {/* ── Corner monogram overlay ── */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
              borderBottom: 1,
            }}
          >
            {/* Top-left */}
            <Box
              component="img"
              src="/media/assets/blue-monogram.png"
              alt=""
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                width: 20,
                height: 20,
                objectFit: "contain",
              }}
            />
            {/* Top-right */}
            <Box
              component="img"
              src="/media/assets/blue-monogram.png"
              alt=""
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 20,
                height: 20,
                objectFit: "contain",
              }}
            />
            {/* Bottom-left */}
            <Box
              component="img"
              src="/media/assets/blue-monogram.png"
              alt=""
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                width: 20,
                height: 20,
                objectFit: "contain",
              }}
            />
            {/* Bottom-right */}
            <Box
              component="img"
              src="/media/assets/blue-monogram.png"
              alt=""
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                width: 20,
                height: 20,
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              my: { xs: 2, md: 4 },
              ml: { xs: 2, sm: 8, md: 12 },
              fontSize: { xs: "9vw", sm: "7vw", md: "4.5vw" },
            }}
            fontWeight="bold"
            ref={heroTextRef}
          >
            Building brands for <br /> those who are bored <br /> of blending
            in.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HeroSection;
