'use client';

import React, { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from './gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  fromScale?: number;
  toScale?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export default function ZoomText({
  as: Tag = 'div',
  children,
  className = '',
  id: idProp,
  fromScale = 0.92,
  toScale = 1,
  start = 'top 85%',
  end = 'top 35%',
  scrub = 0.8,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: 'transform,opacity' });
        return;
      }

      gsap.set(el, { autoAlpha: 0.7, scale: fromScale, transformOrigin: 'center center', willChange: 'transform,opacity' });
      const tween = gsap.to(el, {
        autoAlpha: 1,
        scale: toScale,
        ease: 'none',
        scrollTrigger: { trigger: el, start, end, scrub },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: 'transform,opacity,willChange' });
      };
    },
    { scope: ref, dependencies: [fromScale, toScale, start, end, scrub] },
  );

  return (
    <Tag ref={ref as any} className={className} id={idProp}>
      {children}
    </Tag>
  );
}
