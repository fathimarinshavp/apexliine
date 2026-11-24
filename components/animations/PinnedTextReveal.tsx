'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered, gsap, prefersReducedMotion, ScrollTrigger, SplitText } from './gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** selector within pinned area to reveal progressively */
  textSelector?: string;
  by?: 'words' | 'lines';
  start?: string;
  end?: string;
};

export default function PinnedTextReveal({
  children,
  className = '',
  innerClassName = '',
  textSelector = '[data-pin-text]',
  by = 'words',
  start = 'top top',
  end = '+=120%',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = ref.current;
      if (!root) return;
      const textEls = Array.from(root.querySelectorAll<HTMLElement>(textSelector));
      if (!textEls.length) return;

      if (prefersReducedMotion()) {
        gsap.set(textEls, { autoAlpha: 1, clearProps: 'transform' });
        return;
      }

      const splits: SplitText[] = [];
      const targets: Element[] = [];
      textEls.forEach((el) => {
        const split = new SplitText(el, {
          type: by === 'lines' ? 'lines,words' : 'words',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          mask: by === 'lines' ? 'lines' : undefined,
        });
        splits.push(split);
        targets.push(...(by === 'lines' ? split.lines : split.words));
      });

      gsap.set(targets, { autoAlpha: 0.15, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(targets, { autoAlpha: 1, y: 0, stagger: 0.03, ease: 'none' });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        splits.forEach((s) => s.revert());
      };
    },
    { scope: ref, dependencies: [textSelector, by, start, end] },
  );

  return (
    <div ref={ref} className={className}>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
