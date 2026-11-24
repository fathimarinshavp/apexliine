'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import styles from './Finishing.module.css';
import { ScrollRevealText, ZoomText } from '../animations';

type FinishingItem = {
  title: string;
  text: string;
  href: string;
  icon: ReactNode;
};

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 13.8 9l6.7 1.8-6.7 1.8L12 19.5 10.2 12.6 3.5 10.8 10.2 9 12 2.5Z" />
    <path d="m18 15.5.7 2.5 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" />
  </svg>
);

const ScissorsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8.1 7.6 20 18" />
    <path d="M8.1 16.4 20 6" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 5 7 7-7 7" />
  </svg>
);

const items: FinishingItem[] = [
  {
    title: 'Lamination & Coating',
    href: '#uv-printing',
    icon: <LayersIcon />,
    text: 'Matte, gloss or soft-touch lamination and UV coating that protect your prints and give them a premium feel.',
  },
  {
    title: 'Foil & Embossing',
    href: '#custom-packaging',
    icon: <SparkleIcon />,
    text: 'Hot foil stamping, embossing and debossing that add shine, texture and depth to covers, cards and packaging.',
  },
  {
    title: 'Die Cutting & Creasing',
    href: '#binding-solutions',
    icon: <ScissorsIcon />,
    text: 'Custom shapes, clean folds and sharp edges for boxes, brochures, labels and invitations.',
  },
];

function FinishingCard({ title, text, href, icon }: FinishingItem) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      className={`${styles.card}${active ? ` ${styles.active}` : ''}`}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') setActive(true);
      }}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
      onPointerLeave={() => setActive(false)}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
      <span className={styles.arrow} aria-hidden="true">
        <ChevronIcon />
      </span>
    </Link>
  );
}

export default function Finishing() {
  return (
    <section id="finishing" aria-labelledby="finishing-title" className={styles.finishing}>
      <div className={styles.container}>
        <span className={styles.accent} aria-hidden="true" />
        <ZoomText as="h2" id="finishing-title" className={styles.heading}>
          <ScrollRevealText as="span" className={styles.light} by="words" stagger={0.05} y={28}>
            Print
          </ScrollRevealText>{' '}
          <ScrollRevealText as="span" className={styles.bold} by="words" stagger={0.05} y={28} delay={0.06}>
            Finishing
          </ScrollRevealText>
        </ZoomText>
        <ScrollRevealText as="p" className={styles.subtitle} by="words" stagger={0.02} y={18} delay={0.08}>
          The final touches that make your print feel premium.
        </ScrollRevealText>

        <div className={styles.grid}>
          {items.map((item) => (
            <FinishingCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
