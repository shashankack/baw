"use client";

import { useEffect, useLayoutEffect, useRef, useState, type Ref } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  Collapse,
  Paper,
} from "@mui/material";
import gsap from "gsap";

type WindowWithNavbarIntro = Window & {
  __navbarIntroDone?: boolean;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const appBarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: "Work", href: "/works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact", filled: true },
  ];

  // Pre-hide all elements before first paint — prevents flash of visible content
  useLayoutEffect(() => {
    const win = window as WindowWithNavbarIntro;
    const linkEls = linksRef.current
      ? Array.from(linksRef.current.children)
      : [];

    // Navbar intro runs once per full page load. If it remounts during routing,
    // render in final state immediately.
    if (win.__navbarIntroDone) {
      gsap.set(appBarRef.current, { y: "0%" });
      gsap.set(logoRef.current, { opacity: 1, y: 0, clearProps: "transform" });
      gsap.set(linkEls.length ? linkEls : [burgerRef.current], {
        opacity: 1,
        y: 0,
        clearProps: "transform",
      });
      return;
    }

    gsap.set(appBarRef.current, { y: "-100%" });
    gsap.set(logoRef.current, { opacity: 0, y: 16 });
    gsap.set(linkEls.length ? linkEls : [burgerRef.current], {
      opacity: 1,
      y: 60,
    });
  }, []);

  useEffect(() => {
    const win = window as WindowWithNavbarIntro;
    const linkEls = linksRef.current
      ? Array.from(linksRef.current.children)
      : [];

    if (win.__navbarIntroDone) {
      return;
    }

    const tl = gsap.timeline();

    // 1. Slide AppBar down from above (already hidden via useLayoutEffect)
    tl.to(appBarRef.current, {
      y: "0%",
      duration: 0.6,
      ease: "power3.out",
    })
      // 2. Logo slides up
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          clearProps: "opacity,y,transform",
        },
        "-=0.15",
      )
      // 3. Each desktop link staggers in, or the hamburger on mobile
      .to(
        linkEls.length ? linkEls : [burgerRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "bounce.in",
          stagger: 0.1,
          clearProps: "opacity,y,transform",
        },
        "-=.3",
      );

    tl.eventCallback("onComplete", () => {
      win.__navbarIntroDone = true;
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <AppBar
        ref={appBarRef as Ref<HTMLElement>}
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "primary.main",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            mx: { xs: 0, md: "30px" },
            py: 1,
            borderInline: { xs: "none", md: "1px solid #1563ff" },
          }}
        >
          {/* Logo */}
          <Box
            ref={logoRef as Ref<HTMLElement>}
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                ".arrow": {
                  width: "30px",
                  opacity: 1,
                  transform: "rotate(0deg)",
                },
                ".monogram": { transform: "translateX(8px)" },
              },
            }}
          >
            <Box
              className="arrow"
              component="img"
              src="/media/assets/blue-arrow.png"
              alt="Arrow"
              sx={{
                width: 0,
                height: "20px",
                opacity: 0,
                overflow: "hidden",
                objectFit: "contain",
                marginRight: "-2px",
                transition:
                  "width 0.35s ease, opacity 0.35s ease, margin 0.35s ease, transform 0.35s ease",
                transform: "rotate(480deg)",
              }}
            />
            <Box
              className="monogram"
              component="img"
              src="/media/assets/blue-monogram.png"
              alt="BAW Studio Logo"
              sx={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
                transition: "transform 0.35s ease",
              }}
            />
          </Box>

          {/* Desktop nav links */}
          <Box overflow={"hidden"} p={1}>
            <Box
              ref={linksRef as Ref<HTMLElement>}
              sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component="a"
                  href={link.href}
                  color="primary"
                  variant={link.filled ? "contained" : "text"}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Hamburger — mobile only */}
          <Box
            ref={burgerRef as Ref<HTMLElement>}
            component="button"
            onClick={() => setOpen((v) => !v)}
            sx={{
              display: { xs: "flex", md: "none" },
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            <div className={`icon-menu${open ? " is-open" : ""}`}>
              <div className="bar bar--1" />
              <div className="bar bar--2" />
              <div className="bar bar--3" />
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer — MUI Collapse for smooth animation */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 65,
          left: 0,
          right: 0,
          zIndex: 1199,
          bgcolor: "background.default",
          borderBottom: open ? "1px solid" : "none",
          borderColor: "primary.main",
          borderRadius: 0,
          transition: "border-color 0.3s ease",
        }}
      >
        <Collapse
          in={open}
          timeout={350}
          easing={{
            enter: "cubic-bezier(0.4,0,0.2,1)",
            exit: "cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Stack sx={{ px: 3, py: 2.5, gap: 0.5 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component="a"
                href={link.href}
                color="primary"
                variant={link.filled ? "contained" : "text"}
                onClick={() => setOpen(false)}
                sx={{
                  textDecoration: "none",
                  fontWeight: 500,
                  justifyContent: "flex-start",
                  width: "fit-content",
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        </Collapse>
      </Paper>
    </>
  );
};

export default Navbar;
