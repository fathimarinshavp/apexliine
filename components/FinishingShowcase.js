'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinishingShowcase({ details = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const eyebrow = section.querySelector('[data-fs-eyebrow]');
    const heading = section.querySelector('[data-fs-heading]');
    const lead = section.querySelector('[data-fs-lead]');
    const progress = section.querySelector('[data-fs-progress]');
    const chapters = Array.from(section.querySelectorAll('[data-fs-chapter]'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([eyebrow, heading, lead], { autoAlpha: 1, y: 0 });
      gsap.set(progress, { scaleY: 1 });
      chapters.forEach((chapter) => {
        gsap.set(chapter.querySelector('[data-fs-media]'), { clipPath: 'inset(0 0 0% 0)' });
        gsap.set(chapter.querySelector('[data-fs-image]'), { scale: 1 });
        gsap.set(chapter.querySelectorAll('[data-fs-reveal]'), { autoAlpha: 1, y: 0 });
      });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set([eyebrow, heading, lead], { autoAlpha: 0, y: 32 });
      gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' });

      chapters.forEach((chapter) => {
        gsap.set(chapter.querySelector('[data-fs-media]'), { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(chapter.querySelector('[data-fs-image]'), { scale: 1.12 });
        gsap.set(chapter.querySelectorAll('[data-fs-reveal]'), { autoAlpha: 0, y: 28 });
      });

      gsap.to([eyebrow, heading, lead], {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.finish-story__head'),
          start: 'top 82%',
          once: true,
        },
      });

      gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.finish-story__chapters'),
          start: 'top 72%',
          end: 'bottom 62%',
          scrub: 0.6,
        },
      });

      chapters.forEach((chapter) => {
        const media = chapter.querySelector('[data-fs-media]');
        const image = chapter.querySelector('[data-fs-image]');
        const reveals = chapter.querySelectorAll('[data-fs-reveal]');

        gsap
          .timeline({
            scrollTrigger: { trigger: chapter, start: 'top 88%', once: true },
          })
          .to(media, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' }, 0)
          .to(image, { scale: 1, duration: 1.1, ease: 'power3.out' }, 0)
          .to(reveals, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 0.18);
      });

      // Safety reveal fallback: ensure all media and copy are visible after 1.2s
      setTimeout(() => {
        gsap.to([eyebrow, heading, lead], { autoAlpha: 1, y: 0, duration: 0.4 });
        gsap.to(progress, { scaleY: 1, duration: 0.4 });
        chapters.forEach((chapter) => {
          const media = chapter.querySelector('[data-fs-media]');
          const image = chapter.querySelector('[data-fs-image]');
          const reveals = chapter.querySelectorAll('[data-fs-reveal]');
          if (media) gsap.to(media, { clipPath: 'inset(0 0 0% 0)', duration: 0.4 });
          if (image) gsap.to(image, { scale: 1, duration: 0.4 });
          if (reveals?.length) gsap.to(reveals, { autoAlpha: 1, y: 0, duration: 0.4 });
        });
      }, 1200);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      className="finish-story section"
      id="finishing"
      aria-labelledby="finishing-heading"
      ref={sectionRef}
    >
      <div className="shell">
        <div className="finish-story__head">
          <div>
            <p className="eyebrow" data-fs-eyebrow>
              PRINT FINISHING
            </p>
            <h2 id="finishing-heading" data-fs-heading>
              The details make the difference.
            </h2>
          </div>
          <p className="finish-story__lead" data-fs-lead>
            Quality lives in the small decisions — the paper you choose, the way a colour holds, the feel of a final
            fold.
          </p>
        </div>

        <div className="finish-story__body">
          <div className="finish-story__rail" aria-hidden="true">
            <span className="finish-story__progress" data-fs-progress />
          </div>

          <div className="finish-story__chapters">
            {details.map((detail, index) => (
              <article
                className={`finish-chapter ${index % 2 === 1 ? 'finish-chapter--reverse' : ''}`}
                key={detail.label}
                data-fs-chapter
              >
                <span className="finish-chapter__index" data-fs-reveal>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="finish-chapter__media media-frame" data-fs-media>
                  <Image
                    data-fs-image
                    src={detail.image}
                    alt={detail.alt}
                    width={detail.width}
                    height={detail.height}
                    sizes="(min-width: 901px) 48vw, 100vw"
                  />
                </div>
                <div className="finish-chapter__copy">
                  <h3 data-fs-reveal>{detail.label}</h3>
                  <p data-fs-reveal>{detail.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
