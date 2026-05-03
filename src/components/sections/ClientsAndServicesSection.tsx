"use client";

import { useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  refreshScrollAnimations,
  scrollFromLeft,
  scrollFromBottom,
  scrollSplitTextBlur,
} from "@/lib/animations";

// ── ServiceLink ───────────────────────────────────────────────────────────────

interface ServiceLinkProps {
  /** Display label */
  name: string;
  /** href will be `/${slug}` */
  slug?: string;
  /** Font size for the label — default matches section defaults */
  fontSize?:
    | string
    | Record<string, string>
    | number
    | Record<string, number>
    | Array<string | number>
    | any;
  /** Override the arrow icon rotation at rest — default "-90deg" (→) */
  arrowRestRotation?: string;
  /** Override the arrow icon rotation on hover — default "400deg" */
  arrowHoverRotation?: string;
}

export function ServiceLink({
  name,
  slug,
  fontSize = { xs: "3.5vw", md: "0.85vw" },
  arrowRestRotation = "-90deg",
  arrowHoverRotation = "400deg",
}: ServiceLinkProps) {
  const hasSlug = Boolean(slug);

  return (
    <Box
      component={hasSlug ? "a" : "div"}
      href={hasSlug ? `/${slug}` : undefined}
      sx={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        cursor: hasSlug ? "pointer" : "default",
        py: 0.6,
        ...(hasSlug && {
          "&:hover .svc-line::after": {
            transform: "scaleX(1)",
            transformOrigin: "left center",
          },
          "&:hover .svc-arrow": {
            transform: `rotate(${arrowHoverRotation})`,
            opacity: 1,
          },
          "&:hover .svc-label": {
            opacity: 1,
          },
        }),
      }}
    >
      {/* Name + Arrow row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.8,
        }}
      >
        <Typography
          className="svc-label"
          variant="h3"
          fontWeight={500}
          fontSize={fontSize}
          sx={{ color: "text.primary" }}
        >
          {name}
        </Typography>
        <ArrowUpwardRoundedIcon
          className="svc-arrow"
          sx={{
            fontSize: "1.2rem",
            color: "primary.main",
            transform: `rotate(${arrowRestRotation})`,
            transition: hasSlug
              ? "transform 0.3s ease, opacity 0.3s ease"
              : "none",
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Dashed underline */}
      <Box
        className="svc-line"
        sx={{
          position: "relative",
          height: "1px",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderTop: "2px dashed",
            borderColor: "primary.main",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderTop: "2px solid",
            borderColor: "primary.main",
            transform: "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.3s cubic-bezier(0.76,0,0.24,1)",
          },
        }}
      />
    </Box>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

const ClientsAndServicesSection = () => {
  const pathname = usePathname();
  const services = [
    { name: "Brand Identity Design", slug: "brand-identity-design" },
    { name: "Web Design & Development", slug: "web-design-development" },
    { name: "Packaging Design", slug: "packaging-design" },
    { name: "Content Creation", slug: "content-creation" },
    { name: "Social Media Management", slug: "social-media-management" },
    { name: "Pitch Decks", slug: "pitch-decks" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const clientsLabelRef = useRef<HTMLElement>(null);
  const servicesLabelRef = useRef<HTMLElement>(null);
  const serviceItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const trigger = sectionRef.current;
    const animatedElements = [
      clientsLabelRef.current,
      servicesLabelRef.current,
      ...serviceItemRefs.current,
    ].filter(Boolean) as HTMLElement[];

    if (animatedElements.length) {
      gsap.set(animatedElements, { clearProps: "opacity,transform,filter" });
    }

    const tweens: Array<{
      kill: () => void;
      revert?: () => void;
      scrollTrigger?: { kill: () => void };
    }> = [];

    if (clientsLabelRef.current) {
      tweens.push(
        scrollFromLeft(clientsLabelRef.current, {
          trigger,
          start: "top 85%",
          duration: 0.8,
        }),
      );
    }

    if (servicesLabelRef.current) {
      tweens.push(
        scrollFromLeft(servicesLabelRef.current, {
          trigger,
          start: "top 75%",
          duration: 0.8,
        }),
      );
    }

    serviceItemRefs.current.forEach((el, i) => {
      if (!el) return;

      tweens.push(
        scrollFromBottom(el, {
          trigger,
          start: "top 78%",
          duration: 0.7,
          delay: i * 0.07,
          distance: 30,
        }),
      );
    });

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
      ref={sectionRef}
      sx={{ borderBlock: "1px solid", borderColor: "primary.main" }}
      gap={8}
      py={6}
      px={{ xs: 2, md: 3 }}
    >
      {/* Top */}
      <Stack direction={{ xs: "column", md: "row" }} alignItems="start" gap={4}>
        <Box flex={1}>
          <Typography
            ref={clientsLabelRef as React.Ref<HTMLElement>}
            variant="h1"
            fontWeight={500}
            fontSize={{ xs: "4vw", md: "1vw" }}
          >
            Our Clients:
          </Typography>
        </Box>
        <Box flex={2} textAlign="left">
          <Typography
            variant="h3"
            fontWeight={600}
            fontSize={{ xs: "8vw", md: "2vw" }}
            maxWidth={{ xs: "100%", md: "80%" }}
          >
            We partner with companies ready to break the mould, own their
            identity and never blend in.
          </Typography>
        </Box>
      </Stack>
      {/* Bottom */}
      <Stack direction={{ xs: "column", md: "row" }} alignItems="start" gap={4}>
        <Box flex={1}>
          <Typography
            ref={servicesLabelRef as React.Ref<HTMLElement>}
            variant="h1"
            fontWeight={500}
            fontSize={{ xs: "4vw", md: "1vw" }}
          >
            Our Services:
          </Typography>
        </Box>
        <Grid flex={2} container spacing={2}>
          {services.map((service, i) => (
            <Grid
              key={i}
              size={{ xs: 12, md: 4 }}
              ref={(el: HTMLDivElement | null) => {
                serviceItemRefs.current[i] = el;
              }}
            >
              <ServiceLink name={service.name} slug={service.slug} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ClientsAndServicesSection;
