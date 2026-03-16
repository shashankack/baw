"use client";

import { useEffect, useRef } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import InteractiveSlider from "./InteractiveSlider";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ServiceLink } from "./sections/ClientsAndServicesSection";
import clients from "@/data/clients.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  scrollFromLeft,
  scrollFromRight,
  scrollFromBottom,
  scrollSplitTextBlur,
} from "@/lib/animations";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const quickLinks = [
    [
      { name: "WORK", slug: "work" },
      { name: "ABOUT", slug: "about" },
      { name: "CONTACT", slug: "contact" },
    ],
    [
      {
        name: "Linked In",
        slug: "https://www.linkedin.com/company/baw-studios/",
        icon: <LinkedInIcon />,
      },
      {
        name: "Instagram",
        slug: "https://www.instagram.com/baw.studios/",
        icon: <InstagramIcon />,
      },
      {
        name: "WhatsApp",
        slug: "https://wa.me/qr/5Z6X2Z7QG5L4N1",
        icon: <WhatsAppIcon />,
      },
    ],
  ];

  const footerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    // ── Intro animations ───────────────────────────────────────────────
    scrollFromLeft(headingRef.current, {
      trigger: footer,
      start: "top 88%",
      duration: 0.9,
    });

    scrollSplitTextBlur(descRef.current, {
      trigger: footer,
      start: "top 85%",
      duration: 0.6,
      stagger: 0.015,
      delay: 0.1,
    });

    scrollFromLeft(leftColRef.current, {
      trigger: footer,
      start: "top 75%",
      duration: 0.85,
      distance: 50,
    });

    scrollFromRight(rightColRef.current, {
      trigger: footer,
      start: "top 75%",
      duration: 0.85,
      distance: 50,
    });

    scrollFromBottom(contactRef.current, {
      trigger: contactRef.current,
      start: "top 90%",
      duration: 0.8,
      distance: 40,
    });

    scrollFromBottom(monogramRef.current, {
      trigger: monogramRef.current,
      start: "top 100%",
      duration: 0.7,
      distance: 30,
      delay: 0.1,
    });

    // ── Scrub: logo parallax ──────────────────────────────────────
    // Logo rises upward as you scroll past (adds to the existing bottom: -80 offset)
    gsap.to(logoRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <Stack
      ref={footerRef}
      mt={{ xs: 6, md: 10 }}
      borderBottom="1px solid"
      position="relative"
    >
      <Stack px={{ xs: 2, md: 3 }} gap={{ xs: 2, md: 0 }}>
        <Typography
          ref={headingRef as React.Ref<HTMLElement>}
          variant="h1"
          fontSize={{ xs: "1rem", md: "1.6rem" }}
        >
          People we&apos;ve made things for:
        </Typography>
        <Typography
          ref={descRef as React.Ref<HTMLElement>}
          variant="body1"
          fontSize={{ xs: ".8rem", md: "1rem" }}
          width={{ xs: "100%", md: "50%" }}
        >
          Over the years we&rsquo;ve had the privilege to work with many great
          people and companies in both design and production.
        </Typography>
        <InteractiveSlider
          items={clients.clients}
          speed={10}
          logoHeight={{ xs: 100, md: 120 }}
          logoMaxWidth={{ xs: 100, md: 120 }}
          gap={{ xs: 10, md: 72 }}
        />
      </Stack>

      <Stack
        borderTop={{ xs: "none", md: "1px solid" }}
        px={{ xs: 0, md: 3 }}
        direction={{ xs: "column", md: "row" }}
        minHeight={250}
      >
        <Stack
          ref={leftColRef}
          flex={1}
          px={{ xs: 2, md: 0 }}
          py={{ xs: 2, md: 3 }}
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h1"
              fontSize={{ xs: "1rem", md: "1.3rem" }}
              mb={4}
            >
              BAW &copy; 2023
            </Typography>
            <Typography
              variant="body1"
              fontSize={{ xs: "1rem", md: "1rem" }}
              width="80%"
            >
              Working with brands ready to break the mould. If you&apos;re bored
              of blending in drop us a line and let&apos;s make bring your brand
              to life.
            </Typography>
          </Box>
          <AddRoundedIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "block" } }}
          />
        </Stack>
        <Stack
          ref={rightColRef}
          flex={1}
          borderLeft={{ xs: "none", md: "1px solid" }}
          borderTop={{ xs: "1px solid", md: "none" }}
          borderColor="primary.main"
          justifyContent="space-between"
          px={{ xs: 2, md: 0 }}
          py={{ xs: 2, md: 3 }}
        >
          <Stack px={{ xs: 0, md: 3 }}>
            <Typography
              variant="h1"
              fontSize={{ xs: "1rem", md: "1.3rem" }}
              mb={4}
            >
              Know More:
            </Typography>
            {quickLinks[0].map((item, i) => (
              <Box key={i} mb={2}>
                <ServiceLink
                  name={item.name}
                  slug={item.slug}
                  fontSize={{ xs: 10, md: "1vw" }}
                />
              </Box>
            ))}
          </Stack>
          <AddRoundedIcon
            fontSize="large"
            sx={{ alignSelf: "flex-end", display: { xs: "none", md: "block" } }}
          />
        </Stack>
      </Stack>

      <Stack
        ref={contactRef}
        borderTop={1}
        borderBottom={1}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Stack
          px={{ xs: 2, md: 3 }}
          py={3}
          flex={1}
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            variant="h1"
            fontSize={{ xs: "1rem", md: "1rem" }}
            sx={{
              "& a": {
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.3s ease, text-decoration 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  color: "primary.dark",
                },
              },
            }}
          >
            Contact Us: <br />
            <a href="mailto:bawstudios55@gmail.com">bawstudios55@gmail.com</a>
          </Typography>

          <Typography
            variant="h1"
            fontSize={{ xs: "1rem", md: "1.4vw" }}
            display={{ xs: "none", md: "block" }}
          >
            <ArrowForwardRoundedIcon /> Brand /Web /Creative
          </Typography>
        </Stack>

        <Stack
          display={{ xs: "none", md: "flex" }}
          px={{ xs: 2, md: 3 }}
          flex={1}
          borderLeft={1}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          gap={2}
        >
          {quickLinks[1].map((item, i) => (
            <Box key={i}>
              <IconButton
                component="a"
                href={item.slug}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label={item.name}
                sx={{
                  transition:
                    "color 0.3s ease, background-color 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    color: "primary.dark",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    transform: "scale(1.1) rotate(10deg)",
                  },
                  "& svg": {
                    fontSize: { xs: "1.5rem", md: "3rem" },
                  },
                }}
              >
                {"icon" in item && item.icon}
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Stack
          display={{ xs: "flex", md: "none" }}
          px={{ xs: 2, md: 3 }}
          flex={1}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          gap={2}
          borderTop={1}
          borderBottom={1}
        >
          {quickLinks[1].map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: i !== 0 ? "1px solid" : "none",
                borderColor: "primary.main",
                py: 1,
              }}
            >
              <IconButton
                component="a"
                href={item.slug}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label={item.name}
                sx={{
                  borderRadius: 0,
                  transition:
                    "color 0.3s ease, background-color 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    color: "primary.dark",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    transform: "scale(1.1) rotate(10deg)",
                  },
                  "& svg": {
                    fontSize: { xs: "1.8rem", md: "3rem" },
                  },
                }}
              >
                {"icon" in item && item.icon}
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Box width="100%" textAlign="center">
        <Typography
          variant="h1"
          fontWeight={500}
          fontSize={{ xs: "15vw", md: "15vw" }}
          sx={{
            transformOrigin: "center center",
            willChange: "transform, filter",
          }}
        >
          BAW STUDIO
        </Typography>
      </Box>

      <Box width="100%" px={{ xs: 1, md: 3 }} borderTop={1} overflow="hidden">
        <Box
          ref={logoRef as React.Ref<HTMLElement>}
          component="img"
          src="/media/assets/blue-logo.png"
          sx={{
            width: "100%",
            position: "relative",
            bottom: { xs: -23, md: -80 },
            willChange: "transform",
          }}
        />
      </Box>

      <Box height={{ xs: 60, md: 80 }} />
      {/* Border that bleeds past the wrapper's 30px margin to the viewport edge */}
      <Box
        ref={monogramRef}
        sx={{
          position: "absolute",
          bottom: 0,
          left: { xs: 0, md: "-30px" },
          right: { xs: 0, md: "-30px" },
          height: { xs: 60, md: 80 },
          borderTop: "1px solid",
          borderColor: "primary.main",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 7 },
        }}
      >
        <Box component="img" src="/media/assets/blue-monogram.png" width={40} />
        <Typography variant="body1" fontSize={{ xs: ".6rem", md: "1rem" }}>
          Created by BAW-STUDIO
        </Typography>
      </Box>
    </Stack>
  );
};

export default Footer;
