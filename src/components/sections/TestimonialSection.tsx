"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import gsap from "gsap";
import {
  scrollFromBottom,
  scrollFromLeft,
  scrollFromRight,
} from "@/lib/animations";

const testimonials = [
  {
    quote:
      "BAW's understanding of our requirements, his fantastic design skills and his laidback but professional and attentive manner made the project a resounding success.",
    name: "Francis Mercier",
    role: "International — DJ",
    avatar: "/media/assets/avatars/francis.jpg",
  },
  {
    quote:
      "Working with BAW Studio was an absolute game-changer. They took our vague vision and turned it into a brand identity that truly represents who we are.",
    name: "Priya Nair",
    role: "Founder — Verdant Co.",
    avatar: "/media/assets/avatars/priya.jpg",
  },
  {
    quote:
      "The team at BAW doesn't just deliver design — they deliver strategy. Our conversion rate doubled after the rebrand. Phenomenal work.",
    name: "Marcus Osei",
    role: "CEO — Solstice Labs",
    avatar: "/media/assets/avatars/marcus.jpg",
  },
  {
    quote:
      "I've worked with a lot of agencies. BAW Studio is in a different league. They're fast, sharp, and push you to think bigger about your brand.",
    name: "Anika Sharma",
    role: "CMO — Drift & Co.",
    avatar: "/media/assets/avatars/anika.jpg",
  },
  {
    quote:
      "From packaging to web, every touchpoint felt cohesive and intentional. BAW Studio gave our brand the language it was always missing.",
    name: "Luca Ferretti",
    role: "Creative Director — Nero Studio",
    avatar: "/media/assets/avatars/luca.jpg",
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Refs for scroll-triggered intro
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteIconRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Ref for the swappable content
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Scroll-triggered intro ──────────────────────────────────────────────────
  useEffect(() => {
    scrollFromLeft(quoteIconRef.current, {
      trigger: sectionRef.current,
      start: "top 80%",
      distance: 60,
      duration: 1,
    });
    scrollFromBottom(contentRef.current, {
      trigger: sectionRef.current,
      start: "top 80%",
      distance: 50,
      duration: 0.9,
      delay: 0.15,
    });
    scrollFromRight(navRef.current, {
      trigger: sectionRef.current,
      start: "top 80%",
      distance: 40,
      duration: 0.9,
      delay: 0.2,
    });
  }, []);

  // ── Transition between testimonials ─────────────────────────────────────────
  const goTo = (next: number, direction: "left" | "right") => {
    if (animating || next === active) return;
    setAnimating(true);

    const el = contentRef.current;
    if (!el) return;

    const xOut = direction === "left" ? -40 : 40;
    const xIn = direction === "left" ? 40 : -40;

    // Slide out
    gsap.to(el, {
      opacity: 0,
      x: xOut,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActive(next);
        // Reset position off-screen, then slide in
        gsap.fromTo(
          el,
          { opacity: 0, x: xIn },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
            onComplete: () => setAnimating(false),
          },
        );
      },
    });
  };

  const prev = () =>
    goTo((active - 1 + testimonials.length) % testimonials.length, "right");
  const next = () => goTo((active + 1) % testimonials.length, "left");

  const t = testimonials[active];

  return (
    <Box
      ref={sectionRef}
      sx={{
        bgcolor: "primary.main",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack gap={4} maxWidth="900px" mx="auto">
        <Stack direction={{ xs: "column", sm: "row" }} gap={6}>
          {/* Quote icon */}
          <Box ref={quoteIconRef}>
            <Box
              component="img"
              src="/media/assets/quote.png"
              alt=""
              aria-hidden
              sx={{
                width: { xs: "60px", md: "100px" },
                height: "auto",
                display: "block",
              }}
            />
          </Box>

          {/* Swappable content */}
          <Box ref={contentRef}>
            <Typography
              sx={{
                fontFamily: "Manrope, Arial, sans-serif",
                fontWeight: 600,
                fontSize: { xs: "5.5vw", sm: "3.5vw", md: "1.8vw" },
                color: "#FCF3E3",
                lineHeight: 1.45,
                maxWidth: "820px",
                mb: 4,
                minHeight: { xs: "10em", sm: "7em", md: "6em" },
              }}
            >
              {t.quote}
            </Typography>

            {/* Author */}
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Box
                component="img"
                src={t.avatar}
                alt={t.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=FCF3E3&color=1563FF&size=80`;
                }}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1.5px solid rgba(252,243,227,0.4)",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Manrope, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    color: "#FCF3E3",
                  }}
                >
                  {t.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Geist Mono, monospace",
                    fontSize: "0.68rem",
                    color: "rgba(252,243,227,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.role}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* Navigation */}
        <Stack ref={navRef} direction="row" alignItems="center" gap={2} mt={1}>
          {/* Prev / Next */}
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              border: "1px solid rgba(252,243,227,0.35)",
              color: "#FCF3E3",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(252,243,227,0.12)",
                borderColor: "rgba(252,243,227,0.7)",
              },
            }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              border: "1px solid rgba(252,243,227,0.35)",
              color: "#FCF3E3",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(252,243,227,0.12)",
                borderColor: "rgba(252,243,227,0.7)",
              },
            }}
          >
            <ArrowForwardRoundedIcon fontSize="small" />
          </IconButton>

          {/* Dots */}
          <Stack direction="row" gap={0.8} ml={1}>
            {testimonials.map((_, i) => (
              <Box
                key={i}
                onClick={() => goTo(i, i > active ? "left" : "right")}
                sx={{
                  width: i === active ? 24 : 6,
                  height: 6,
                  borderRadius: "999px",
                  bgcolor: i === active ? "#FCF3E3" : "rgba(252,243,227,0.35)",
                  transition: "all 0.35s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Stack>

          {/* Counter */}
          <Typography
            sx={{
              fontFamily: "Geist Mono, monospace",
              fontSize: "0.7rem",
              color: "rgba(252,243,227,0.5)",
              letterSpacing: "0.08em",
              ml: "auto",
            }}
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
