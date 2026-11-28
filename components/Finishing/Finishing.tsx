'use client';

import Link from 'next/link';
import styles from './Finishing.module.css';
import { ScrollRevealText, ZoomText } from '../animations';

type FinishingItem = {
  number: string;
  title: string;
  text: string;
  href: string;
  details: string[];
};

const items: FinishingItem[] = [
  {
    number: '01',
    title: 'Lamination & Coating',
    href: '/services/digital-special-effects-printing',
    text: 'Matte, gloss, soft-touch lamination and UV coating that protect your prints and give them a premium feel.',
    details: ['Matte / Gloss', 'Soft-touch', 'UV coating'],
  },
  {
    number: '02',
    title: 'Foil & Embossing',
    href: '/services/commercial-packaging',
    text: 'Hot foil stamping, embossing and debossing that add shine, texture and depth to covers, cards and packaging.',
    details: ['Hot foil', 'Emboss', 'Deboss'],
  },
  {
    number: '03',
    title: 'Die Cutting & Creasing',
    href: '/services/binding',
    text: 'Custom shapes, clean folds and sharp edges for boxes, brochures, labels and invitations.',
    details: ['Custom shapes', 'Clean folds', 'Sharp edges'],
  },
];

export default function Finishing() {
  return (
    <section id="finishing" aria-labelledby="finishing-title" className={styles.finishing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Finishing touches</p>
          <ZoomText as="h2" id="finishing-title" className={styles.heading}>
            <ScrollRevealText as="span" by="words" stagger={0.05} y={28}>
              Print Finishing
            </ScrollRevealText>
          </ZoomText>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={item.title} href={item.href} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{item.number}</span>
                <span className={styles.ctaIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
              <ul className={styles.details} aria-label={`${item.title} details`}>
                {item.details.map((detail) => (
                  <li key={detail} className={styles.detail}>{detail}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
