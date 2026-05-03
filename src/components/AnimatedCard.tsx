"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  refreshScrollAnimations,
  scrollFromLeft,
  scrollFromRight,
  scrollFromBottom,
} from "@/lib/animations";
import { usePathname, useRouter } from "next/navigation";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import clients from "@/data/clients.json";

const cornerSx = (vert: "top" | "bottom", horiz: "left" | "right") => ({
  position: "absolute" as const,
  [vert]: 14,
  [horiz]: 14,
  width: 18,
  height: 18,
  borderTop: vert === "top" ? "2px solid rgba(252,243,227,0.7)" : "none",
  borderBottom: vert === "bottom" ? "2px solid rgba(252,243,227,0.7)" : "none",
  borderLeft: horiz === "left" ? "2px solid rgba(252,243,227,0.7)" : "none",
  borderRight: horiz === "right" ? "2px solid rgba(252,243,227,0.7)" : "none",
});

const AnimatedCard = ({
  client,
  index,
  direction,
  stagger = false,
  imgSrc,
  href,
}: {
  client: (typeof clients.clients)[number];
  index: number;
  direction?: "left" | "right" | "bottom";
  stagger?: boolean;
  imgSrc: string;
  href: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, { clearProps: "opacity,transform,filter" });

    let anim;
    switch (direction) {
      case "left":
        anim = scrollFromLeft;
        break;
      case "right":
        anim = scrollFromRight;
        break;
      case "bottom":
        anim = scrollFromBottom;
        break;
      default:
        anim = index % 2 === 0 ? scrollFromLeft : scrollFromRight;
    }
    const tween = anim(cardRef.current, {
      distance: 40,
      duration: 0.8,
      start: "top 65%",
      delay: stagger ? index * 0.1 : 0,
    });

    requestAnimationFrame(() => {
      refreshScrollAnimations();
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.revert?.();
      tween.kill();
    };
  }, [index, direction, stagger, pathname]);

  return (
    <Box
      ref={cardRef}
      onClick={() => router.push(href)}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        cursor: "pointer",
        borderColor: "primary.main",
        "&:hover .slide-overlay": {
          transform: "translateX(0%)",
        },

        "&:hover .card-name": { opacity: 1 },
        "&:hover .card-view": { opacity: 1 },
        "&:hover .card-arrow": { opacity: 1 },
        "&:hover .card-bracket": { opacity: 1 },
        "&:hover .card-arrow svg": {
          transform: "rotate(450deg) translate(3px, -3px)",
        },
      }}
    >
      {/* Logo / image */}
      <Box
        className="client-logo"
        component="img"
        src={imgSrc}
        alt={client.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.55s ease",
        }}
      />

      {/* Slide-in overlay — no content */}
      <Box
        className="slide-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(21, 99, 255, 0.80)",
          transform: "translateX(-100%)",
          transition: "transform 0.25s ease",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Corner brackets */}
      <Box
        className="card-bracket"
        sx={{
          ...cornerSx("top", "left"),
          opacity: 0,
          transition: "opacity .5s ease",
          zIndex: 2,
        }}
      />
      <Box
        className="card-bracket"
        sx={{
          ...cornerSx("top", "right"),
          opacity: 0,
          transition: "opacity .5s ease",
          zIndex: 2,
        }}
      />
      <Box
        className="card-bracket"
        sx={{
          ...cornerSx("bottom", "left"),
          opacity: 0,
          transition: "opacity .5s ease",
          zIndex: 2,
        }}
      />
      <Box
        className="card-bracket"
        sx={{
          ...cornerSx("bottom", "right"),
          opacity: 0,
          transition: "opacity .5s ease",
          zIndex: 2,
        }}
      />

      {/* Top-left: name */}
      <Typography
        className="card-name"
        sx={{
          position: "absolute",
          top: 20,
          left: 40,
          fontFamily: "Manrope, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "#FCF3E3",
          letterSpacing: "0.03em",
          opacity: 0,
          transition: "opacity .5s ease",
          zIndex: 2,
        }}
      >
        {client.name}
      </Typography>

      {/* Bottom-left: View Project */}
      <Typography
        className="card-view"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 40,
          fontFamily: "Geist Mono, monospace",
          fontWeight: 400,
          fontSize: "0.72rem",
          color: "rgba(252,243,227,1)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: 0,
          transition: "opacity .5s ease 0.05s",
          zIndex: 2,
        }}
      >
        View Project
      </Typography>

      {/* Bottom-right: arrow */}
      <Box
        className="card-arrow"
        sx={{
          position: "absolute",
          bottom: 20,
          right: 26,
          color: "#FCF3E3",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          transition: "opacity .5s ease 0.05s",
          zIndex: 2,
        }}
      >
        <ArrowUpwardRoundedIcon
          sx={{
            fontSize: "2rem",
            transform: "rotate(45deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

export default AnimatedCard;
