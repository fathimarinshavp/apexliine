'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRevealText } from './animations';

const serviceLetters = 'Services'.split('');

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function WorkShowcase({ services = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return undefined;

    gsap.registerPlugin(ScrollTrigger);
    section.__wsShowcaseAnimation = { gsap, ScrollTrigger };

    const label = section.querySelector('[data-ws-label]');
    const heading = section.querySelector('[data-ws-heading]');
    const action = section.querySelector('[data-ws-action]');
    const cards = Array.from(section.querySelectorAll('[data-ws-card]'));
    const images = Array.from(section.querySelectorAll('[data-ws-image]'));
    const normalLetters = Array.from(section.querySelectorAll('[data-ws-letter-normal]'));
    const swapLetters = Array.from(section.querySelectorAll('[data-ws-letter-swap]'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([label, heading, action], { autoAlpha: 1, y: 0 });
      gsap.set([...normalLetters, ...swapLetters], { y: '0%' });
      gsap.set(cards, { rotateX: 0 });
      gsap.set(images, { scale: 1 });
      return undefined;
    }

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    const context = gsap.context(() => {
      gsap.set(label, { autoAlpha: 0, y: -20 });
      gsap.set([heading, action], { autoAlpha: 0, y: 25 });
      gsap.set(cards, {
        transformPerspective: 800,
        rotateX: -72,
        transformOrigin: '50% 0%',
        force3D: true,
      });
      gsap.set(images, { scale: 1.12, force3D: true });
      gsap.set(normalLetters, { y: '0%' });
      gsap.set(swapLetters, { y: '100%' });

      // Immediate/reliable trigger points
      ScrollTrigger.create({
        trigger: label,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(label, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)' }, 0)
            .to(
              normalLetters,
              {
                y: '-100%',
                duration: 0.2,
                ease: 'power1.out',
                stagger: { each: 0.04, from: 'center' },
              },
              0.1
            )
            .to(
              swapLetters,
              {
                y: '0%',
                duration: 0.2,
                ease: 'power1.out',
                stagger: { each: 0.04, from: 'center' },
              },
              0.1
            );
        },
      });

      [heading, action].forEach((element, index) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          delay: index * 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        });
      });

      cards.forEach((card, index) => {
        const scrollTrigger = {
          trigger: card,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        };

        gsap.to(card, {
          rotateX: 0,
          ease: 'none',
          scrollTrigger: { ...scrollTrigger },
        });

        gsap.to(images[index], {
          scale: 1,
          ease: 'none',
          scrollTrigger: { ...scrollTrigger },
        });
      });
    }, section);

    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
      context.revert();
    };
  }, []);

  return (
    <section className="work-showcase" id="services" aria-labelledby="services-heading" ref={sectionRef}>
      <div className="work-showcase__container">
        <div className="work-showcase__top">
          <div>
            <div className="ws-label" data-ws-label aria-label="Services">
              <span className="ws-label__dot" aria-hidden="true" />
              <span className="ws-label__text-wrap">
                <span className="ws-label__normal" aria-hidden="true">
                  {serviceLetters.map((letter, index) => (
                    <span
                      className="ws-label__letter"
                      data-ws-letter-normal
                      key={`normal-${letter}-${index}`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="ws-label__swap" aria-hidden="true">
                  {serviceLetters.map((letter, index) => (
                    <span
                      className="ws-label__letter"
                      data-ws-letter-swap
                      key={`swap-${letter}-${index}`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            </div>

            <h2 className="work-showcase__heading" id="services-heading" data-ws-heading>
              <ScrollRevealText as="span" by="words" stagger={0.05} y={32}>
                Work we&apos;re proud of
              </ScrollRevealText>
            </h2>
          </div>

          <div className="work-showcase__action" data-ws-action>
            <a className="ws-button ws-button--all" href="#products" aria-label="See all products">
              <span className="ws-button__line" aria-hidden="true" />
              <span className="ws-button__text" aria-hidden="true">
                <span>See All Works</span>
                <span>See All Works</span>
              </span>
              <span className="ws-button__arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        <div className="work-showcase__list">
          {services.map((service) => (
            <article className="work-showcase__card" data-ws-card key={service.id} id={service.id}>
              <div className="work-showcase__card-content">
                <div className="ws-meta-group">
                  <span className="ws-label-text">No.</span>
                  <span className="ws-value">{service.number}</span>
                </div>
                <div className="ws-meta-group">
                  <span className="ws-label-text">Service</span>
                  <span className="ws-value">{service.title}</span>
                </div>
              </div>

              <div className="work-showcase__banner">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  data-ws-image
                  sizes="(min-width: 1001px) 759px, 95vw"
                />
              </div>

              <div className="work-showcase__card-content">
                <div className="ws-meta-group">
                  <span className="ws-label-text">Overview</span>
                  <h3 className="work-showcase__project-title">{service.title}</h3>
                  <p className="work-showcase__description">{service.description}</p>
                </div>
                <a
                  className="ws-button ws-button--details"
                  href={`/services/${service.id}`}
                  aria-label={`View details about ${service.title}`}
                >
                  <span className="ws-button__text" aria-hidden="true">
                    <span>View Details</span>
                    <span>View Details</span>
                  </span>
                  <span className="ws-button__arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
