"use client";

import { useEffect, useRef } from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import {
  scrollFromBottom,
  scrollFromLeft,
  scrollFromRight,
} from "@/lib/animations";
import CTAButton from "../CTAButton";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useRouter } from "next/navigation";

import { clients } from "@/data/clients.json";

// Corner bracket positions
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

const ClientCard = ({
  client,
  index,
}: {
  client: (typeof clients)[number];
  index: number;
}) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = index % 2 === 0 ? scrollFromLeft : scrollFromRight;
    anim(cardRef.current, {
      distance: 40,
      duration: 0.8,
      start: "top 65%",
    });
  }, [index]);

  return (
    <Box
      ref={cardRef}
      onClick={() => router.push(`/work/${client.slug}`)}
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
        src={client.thumbnail}
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

const OurWorksSection = () => {
  const titleRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollFromBottom(titleRef.current, {
      start: "top 70%",
    });
    scrollFromBottom(ctaRef.current, {
      start: "top 70%",
    });
  }, []);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        py: { xs: 4, md: 3 },
      }}
      overflow="hidden"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          ref={titleRef}
          variant="h1"
          fontSize={{ xs: "1rem", md: "1.2rem" }}
          fontWeight="bold"
        >
          Work - <br /> Highlights
        </Typography>
        <Box ref={ctaRef}>
          <CTAButton
            text="View our work"
            variant="text"
            component="a"
            href="/our-works"
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
      </Stack>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {clients.map((client, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={client.name}>
            <ClientCard client={client} index={i} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default OurWorksSection;
