import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const splitInstanceMap = new WeakMap<HTMLElement, SplitType>();
const splitTweenMap = new WeakMap<HTMLElement, gsap.core.Tween>();

const cleanupSplitAnimation = (target: HTMLElement) => {
  const existingTween = splitTweenMap.get(target);
  if (existingTween) {
    existingTween.scrollTrigger?.kill();
    existingTween.kill();
    splitTweenMap.delete(target);
  }

  const existingSplit = splitInstanceMap.get(target);
  if (existingSplit) {
    existingSplit.revert();
    splitInstanceMap.delete(target);
  }
};

// ─── Shared props ────────────────────────────────────────────────────────────

export interface AnimationProps {
  /** Animation duration in seconds (default: 0.9) */
  duration?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Pixel distance to travel from (default: 40) */
  distance?: number;
  /** GSAP ease string (default: "power3.out") */
  ease?: string;
  /** Stagger between multiple targets in seconds */
  stagger?: number;
}

export interface ScrollAnimationProps extends AnimationProps {
  /** The element that triggers the animation (defaults to the animated target) */
  trigger?: Element | string | null;
  /** ScrollTrigger start position (default: "top 88%") */
  start?: string;
  /** Show ScrollTrigger markers for debugging */
  markers?: boolean;
}

/** Force ScrollTrigger to recalculate positions after route/layout changes. */
export const refreshScrollAnimations = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
};

// ─── Base animations ─────────────────────────────────────────────────────────

/** Fade in — opacity 0 → 1 */
export const fadeIn = (target: gsap.TweenTarget, props: AnimationProps = {}) =>
  gsap.from(target, {
    opacity: 0,
    duration: props.duration ?? 0.8,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power2.out",
    stagger: props.stagger,
  });

/** From below — slides up into place */
export const fromBottom = (
  target: gsap.TweenTarget,
  props: AnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    y: props.distance ?? 40,
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
  });

/** From above — slides down into place */
export const fromTop = (target: gsap.TweenTarget, props: AnimationProps = {}) =>
  gsap.from(target, {
    opacity: 0,
    y: -(props.distance ?? 40),
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
  });

/** From the left — slides right into place */
export const fromLeft = (
  target: gsap.TweenTarget,
  props: AnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    x: -(props.distance ?? 40),
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
  });

/** From the right — slides left into place */
export const fromRight = (
  target: gsap.TweenTarget,
  props: AnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    x: props.distance ?? 40,
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
  });

// ─── Scroll-triggered animations ─────────────────────────────────────────────

/** Scroll-triggered fade in */
export const scrollFadeIn = (
  target: gsap.TweenTarget,
  props: ScrollAnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    duration: props.duration ?? 0.8,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power2.out",
    stagger: props.stagger,
    scrollTrigger: {
      trigger: (props.trigger ?? (target as Element)) as gsap.DOMTarget,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

/** Scroll-triggered — slides up from below */
export const scrollFromBottom = (
  target: gsap.TweenTarget,
  props: ScrollAnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    y: props.distance ?? 40,
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
    scrollTrigger: {
      trigger: (props.trigger ?? (target as Element)) as gsap.DOMTarget,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

/** Scroll-triggered — slides down from above */
export const scrollFromTop = (
  target: gsap.TweenTarget,
  props: ScrollAnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    y: -(props.distance ?? 40),
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
    scrollTrigger: {
      trigger: (props.trigger ?? (target as Element)) as gsap.DOMTarget,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

/** Scroll-triggered — slides in from the left */
export const scrollFromLeft = (
  target: gsap.TweenTarget,
  props: ScrollAnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    x: -(props.distance ?? 40),
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
    scrollTrigger: {
      trigger: (props.trigger ?? (target as Element)) as gsap.DOMTarget,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

/** Scroll-triggered — slides in from the right */
export const scrollFromRight = (
  target: gsap.TweenTarget,
  props: ScrollAnimationProps = {},
) =>
  gsap.from(target, {
    opacity: 0,
    x: props.distance ?? 40,
    duration: props.duration ?? 0.9,
    delay: props.delay ?? 0,
    ease: props.ease ?? "power3.out",
    stagger: props.stagger,
    scrollTrigger: {
      trigger: (props.trigger ?? (target as Element)) as gsap.DOMTarget,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

/**
 * Scroll-triggered split-text blur reveal.
 * Splits text into chars and animates each with blur + y offset when scrolled into view.
 */
export const scrollSplitTextBlur = (
  target: HTMLElement | null,
  props: ScrollAnimationProps = {},
): SplitType | null => {
  if (!target) return null;

  cleanupSplitAnimation(target);

  const split = new SplitType(target, { types: "chars" });

  const tween = gsap.from(split.chars, {
    opacity: 0,
    y: props.distance ?? 10,
    filter: "blur(6px)",
    duration: props.duration ?? 0.7,
    delay: props.delay ?? 0,
    stagger: props.stagger ?? 0.035,
    ease: props.ease ?? "power2.out",
    clearProps: "filter",
    scrollTrigger: {
      trigger: props.trigger ? (props.trigger as gsap.DOMTarget) : target,
      start: props.start ?? "top 88%",
      markers: props.markers,
      invalidateOnRefresh: true,
    },
  });

  splitInstanceMap.set(target, split);
  splitTweenMap.set(target, tween);

  return split;
};

// ─── Split-type blur ──────────────────────────────────────────────────────────

/**
 * Splits an element's text into individual characters and animates each one
 * in with a per-letter blur + vertical offset, creating a soft reveal effect.
 *
 * Returns the SplitType instance so you can call `.revert()` if needed.
 */
export const splitTextBlur = (
  target: HTMLElement | null,
  props: AnimationProps = {},
): SplitType | null => {
  if (!target) return null;

  cleanupSplitAnimation(target);

  const split = new SplitType(target, { types: "chars" });

  const tween = gsap.from(split.chars, {
    opacity: 0,
    y: props.distance ?? 10,
    filter: "blur(6px)",
    duration: props.duration ?? 0.7,
    delay: props.delay ?? 0,
    stagger: props.stagger ?? 0.035,
    ease: props.ease ?? "power2.out",
    clearProps: "filter", // clean up the filter after animation
  });

  splitInstanceMap.set(target, split);
  splitTweenMap.set(target, tween);

  return split;
};
