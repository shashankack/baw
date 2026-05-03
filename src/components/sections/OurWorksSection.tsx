"use client";

import { useEffect, useRef } from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { refreshScrollAnimations, scrollFromBottom } from "@/lib/animations";
import CTAButton from "../CTAButton";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import { clients } from "@/data/clients.json";
import AnimatedCard from "../AnimatedCard";

const OurWorksSection = () => {
  const pathname = usePathname();
  const titleRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animatedElements = [titleRef.current, ctaRef.current].filter(
      Boolean,
    ) as HTMLElement[];

    if (animatedElements.length) {
      gsap.set(animatedElements, { clearProps: "opacity,transform,filter" });
    }

    const tweens = [
      scrollFromBottom(titleRef.current, {
        start: "top 70%",
      }),
      scrollFromBottom(ctaRef.current, {
        start: "top 70%",
      }),
    ];

    requestAnimationFrame(() => {
      refreshScrollAnimations();
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.revert?.();
        tween.kill();
      });
    };
  }, [pathname]);

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
      </Stack>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {clients.map((client, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={client.name}>
            <AnimatedCard
              client={client}
              index={i}
              imgSrc={client.media.thumbnail}
              href={`/works/${client.slug}`}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default OurWorksSection;
