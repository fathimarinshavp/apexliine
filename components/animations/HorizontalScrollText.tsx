'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from './gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** positive moves right on scroll down, negative moves left */
  distance?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export default function HorizontalScrollText({
  children,
  className = '',
  distance = -18,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      if (prefersReducedMotion()) {
        gsap.set(inner, { clearProps: 'transform' });
        return;
      }

      gsap.set(inner, { xPercent: 0, willChange: 'transform' });
      const tween = gsap.fromTo(
        inner,
        { xPercent: distance > 0 ? -Math.abs(distance) : 0 },
        {
          xPercent: distance > 0 ? 0 : distance,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(inner, { clearProps: 'transform,willChange' });
      };
    },
    { scope: wrapRef, dependencies: [distance, start, end, scrub] },
  );

  return (
    <div ref={wrapRef} className={className} style={{ overflow: 'clip' }}>
      <div ref={innerRef} style={{ whiteSpace: 'nowrap', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
