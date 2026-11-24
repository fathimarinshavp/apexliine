'use client';

import React, { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion, SplitText } from './gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  fromColor?: string;
  toColor?: string;
  by?: 'words' | 'chars';
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export default function ScrollColorText({
  as: Tag = 'div',
  children,
  className = '',
  id: idProp,
  fromColor = 'rgba(150,150,150,0.45)',
  toColor = '#ffffff',
  by = 'words',
  start = 'top 85%',
  end = 'bottom 45%',
  scrub = 0.6,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { color: toColor, clearProps: 'opacity' });
        return;
      }

      const split = new SplitText(el, {
        type: by === 'chars' ? 'chars,words' : 'words',
        wordsClass: 'split-word',
        charsClass: 'split-char',
      });
      const targets = by === 'chars' ? split.chars : split.words;
      gsap.set(targets, { color: fromColor, willChange: 'color' });

      const tween = gsap.to(targets, {
        color: toColor,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
        gsap.set(el, { clearProps: 'color' });
      };
    },
    { scope: ref, dependencies: [fromColor, toColor, by, start, end, scrub] },
  );

  return (
    <Tag ref={ref as any} className={className} id={idProp}>
      {children}
    </Tag>
  );
}
