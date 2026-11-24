'use client';

import React, { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from './gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  y?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export default function ParallaxText({
  as: Tag = 'div',
  children,
  className = '',
  id: idProp,
  y = 24,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: 'transform' });
        return;
      }
      const tween = gsap.fromTo(
        el,
        { y: -y },
        { y, ease: 'none', scrollTrigger: { trigger: el, start, end, scrub } },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: 'transform' });
      };
    },
    { scope: ref, dependencies: [y, start, end, scrub] },
  );

  return (
    <Tag ref={ref as any} className={className} id={idProp}>
      {children}
    </Tag>
  );
}
