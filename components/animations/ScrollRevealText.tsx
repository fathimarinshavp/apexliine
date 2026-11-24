'use client';

import React, { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion, SplitText } from './gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** 'words' | 'lines' | 'chars' */
  by?: 'words' | 'lines' | 'chars';
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  scrub?: boolean | number;
};

export default function ScrollRevealText({
  as: Tag = 'div',
  children,
  className = '',
  id: idProp,
  by = 'words',
  stagger = 0.045,
  y = 28,
  duration = 0.8,
  delay = 0,
  start = 'top 88%',
  once = true,
  scrub = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' });
        return;
      }

      const split = new SplitText(el, {
        type: by === 'chars' ? 'chars,words' : by === 'lines' ? 'lines,words' : 'words',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        mask: by === 'lines' ? 'lines' : undefined,
      });

      const targets = by === 'chars' ? split.chars : by === 'lines' ? split.lines : split.words;
      gsap.set(el, { autoAlpha: 1 });
      gsap.set(targets, { autoAlpha: 0, y, willChange: 'transform,opacity' });

      const tween = gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: el,
          start,
          once: scrub ? false : once,
          scrub: scrub || false,
          toggleActions: scrub ? undefined : 'play none none none',
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [by, stagger, y, duration, delay, start, once, scrub] },
  );

  return (
    <Tag ref={ref as any} className={className} id={idProp} style={{ visibility: 'hidden' }}>
      {children}
    </Tag>
  );
}
