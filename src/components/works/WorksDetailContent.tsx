"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import clientsData from "@/data/clients.json";
import { ServiceLink } from "@/components/sections/ClientsAndServicesSection";
import {
  refreshScrollAnimations,
  scrollFromBottom,
  scrollFromLeft,
  scrollFromRight,
} from "@/lib/animations";

type Client = (typeof clientsData.clients)[number];

interface WorksDetailContentProps {
  client: Client;
}

const WorksDetailContent = ({ client }: WorksDetailContentProps) => {
  const pathname = usePathname();

  const clientInfoRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const projectInfoLabelRef = useRef<HTMLDivElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const whatWeDidLabelRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    client.category?.[0] || "",
  );

  const whatByCategory = useMemo(() => {
    const map: Record<string, any> = {};
    const mw = client.metadata?.whatWeDid;
    if (Array.isArray(mw)) {
      mw.forEach((entry: any) => {
        const key = Object.keys(entry)[0];
        map[key] = entry[key];
      });
    } else if (mw && typeof mw === "object") {
      const key = client.category?.[0] || "general";
      map[key] = { ...(mw as Record<string, unknown>) };
    }
    return map;
  }, [client]);

  useEffect(() => {
    const animatedElements = [
      clientInfoRef.current,
      whyRef.current,
      projectInfoLabelRef.current,
      projectInfoRef.current,
      thumbnailRef.current,
      whatWeDidLabelRef.current,
      conceptRef.current,
      ...serviceRefs.current,
      ...galleryRefs.current,
    ].filter(Boolean) as HTMLElement[];

    if (animatedElements.length) {
      gsap.set(animatedElements, { clearProps: "opacity,transform,filter" });
    }

    const tweens = [] as Array<{
      kill: () => void;
      revert?: () => void;
      scrollTrigger?: { kill: () => void };
    }>;

    if (clientInfoRef.current) {
      tweens.push(
        scrollFromBottom(clientInfoRef.current, {
          start: "top 85%",
          duration: 0.75,
          distance: 32,
        }),
      );
    }

    if (whyRef.current) {
      tweens.push(
        scrollFromBottom(whyRef.current, {
          start: "top 85%",
          duration: 0.75,
          delay: 0.08,
          distance: 32,
        }),
      );
    }

    if (projectInfoLabelRef.current) {
      tweens.push(
        scrollFromLeft(projectInfoLabelRef.current, {
          start: "top 86%",
          duration: 0.75,
          distance: 36,
        }),
      );
    }

    if (projectInfoRef.current) {
      tweens.push(
        scrollFromRight(projectInfoRef.current, {
          start: "top 86%",
          duration: 0.85,
          distance: 40,
        }),
      );
    }

    if (thumbnailRef.current) {
      tweens.push(
        scrollFromBottom(thumbnailRef.current, {
          start: "top 86%",
          duration: 0.8,
          distance: 40,
        }),
      );
    }

    if (whatWeDidLabelRef.current) {
      tweens.push(
        scrollFromLeft(whatWeDidLabelRef.current, {
          start: "top 86%",
          duration: 0.75,
          distance: 36,
        }),
      );
    }

    if (conceptRef.current) {
      tweens.push(
        scrollFromRight(conceptRef.current, {
          start: "top 86%",
          duration: 0.85,
          distance: 40,
        }),
      );
    }

    serviceRefs.current.forEach((el, i) => {
      if (!el) return;
      tweens.push(
        scrollFromBottom(el, {
          start: "top 88%",
          duration: 0.6,
          distance: 24,
          delay: i * 0.06,
        }),
      );
    });

    galleryRefs.current.forEach((el, i) => {
      if (!el) return;
      tweens.push(
        scrollFromBottom(el, {
          start: "top 90%",
          duration: 0.7,
          distance: 28,
          delay: i * 0.04,
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
  }, [client.slug, pathname]);

  return (
    <Box py={{ xs: 7, md: 9 }}>
      <Stack direction={{ xs: "column", md: "row" }} borderBottom={1}>
        <Stack
          ref={clientInfoRef}
          borderRight={{
            xs: 0,
            md: 1,
          }}
          borderBottom={{ xs: 1, md: 0 }}
          flex={1}
          py={2}
          px={{ xs: 2, md: 4 }}
        >
          <Typography variant="body1">Client: </Typography>
          <Typography variant="h6" fontWeight={600}>
            {client.name}
          </Typography>
        </Stack>
        <Stack
          ref={whyRef}
          flex={3}
          py={2}
          pl={{ xs: 0, md: 4 }}
          px={{ xs: 2, md: 4 }}
        >
          <Typography variant="body1">Why: </Typography>
          <Typography variant="h6" fontWeight={600}>
            {client.metadata.why}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} py={4}>
        <Box ref={projectInfoLabelRef} flex={1} py={2} px={{ xs: 2, md: 4 }}>
          <Typography variant="h6" fontWeight={600}>
            Project info:
          </Typography>
        </Box>
        <Box
          ref={projectInfoRef}
          flex={3}
          py={{ xs: 0, md: 2 }}
          pl={{ xs: 0, md: 4 }}
          px={{ xs: 2, md: 4 }}
        >
          <Typography
            variant="h6"
            maxWidth={{ xs: "100%", md: "90%" }}
            fontSize={{ xs: "1rem", md: "2rem" }}
          >
            {client.metadata.description}
          </Typography>
        </Box>
      </Stack>

      <Stack width="100%" px={{ xs: 2, md: 4 }}>
        <Box ref={thumbnailRef} width="100%">
          <Box
            component="img"
            src={`/${client.media.thumbnail}`}
            alt={`${client.name} thumbnail`}
            sx={{ width: "100%", display: "block" }}
          />
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} py={{ xs: 0, md: 4 }}>
          <Box
            ref={whatWeDidLabelRef}
            flex={1}
            py={2}
            display="flex"
            alignItems="start"
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Typography variant="h6" fontWeight={600}>
              What we did:
            </Typography>
            {client.category && client.category.length > 1 && (
              <FormControl size="small" sx={{ minWidth: 160, width: { xs: "100%", md: "auto" } }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(String(e.target.value))}
                  displayEmpty
                >
                  {client.category.map((c: string) => (
                    <MenuItem key={c} value={c}>
                      {c.replace(/-/g, " ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box
            ref={conceptRef}
            flex={3}
            pt={{ xs: 0, md: 2 }}
            pl={{ xs: 0, md: 4 }}
          >
            <Typography
              variant="h6"
              maxWidth={{ xs: "100%", md: "90%" }}
              fontSize={{ xs: "1rem", md: "2rem" }}
            >
              {(() => {
                const key = selectedCategory || client.category?.[0];
                return whatByCategory[key]?.concept || "";
              })()}
            </Typography>

            <Grid container spacing={{ xs: 0, md: 2 }} mt={4}>
              {(() => {
                const key = selectedCategory || client.category?.[0];
                const works = whatByCategory[key]?.works || [];
                return works.map((item: string, index: number) => (
                  <Grid
                    size={{ xs: 12, md: 4 }}
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                      serviceRefs.current[index] = el;
                    }}
                  >
                    <Box py={2}>
                      <ServiceLink name={item} />
                    </Box>
                  </Grid>
                ));
              })()}
            </Grid>
          </Box>
        </Stack>
      </Stack>

      <Grid container spacing={2} px={{ xs: 2, md: 4 }} mt={2}>
        {(() => {
          const key = selectedCategory || client.category?.[0];
          const gallery = whatByCategory[key]?.gallery || [];
          return gallery.map((item: string, index: number) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              ref={(el: HTMLDivElement | null) => {
                galleryRefs.current[index] = el;
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(.97)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 0px 20px rgba(0,0,0,.1)",
                    "& img": {
                      transform: "scale(1.03)",
                      transition: "transform 0.3s ease",
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={`/${item}`}
                  alt={`${client.name} gallery image ${index + 1}`}
                  sx={{
                    transition: "transform 0.3s ease",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          ));
        })()}
      </Grid>
    </Box>
  );
};

export default WorksDetailContent;
