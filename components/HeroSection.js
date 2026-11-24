import Image from 'next/image';
import styles from './HeroSection.module.css';
import { AnimatedGradientText, ParallaxText, ScrollRevealText } from './animations';

const SHAPE_PATH =
  'M146 0 H564 A16 16 0 0 1 580 16 V524 A16 16 0 0 1 564 540 H316 A16 16 0 0 0 300 556 V624 A16 16 0 0 1 284 640 H16 A16 16 0 0 1 0 624 V116 A16 16 0 0 1 16 100 H114 A16 16 0 0 0 130 84 V16 A16 16 0 0 1 146 0 Z';

export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className={styles.hero}>
      <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="heroShape" clipPathUnits="objectBoundingBox">
            <path d={SHAPE_PATH} transform="scale(0.0017241379310344827 0.0015625)" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.layout}>
        <div className={styles.content}>
          <ScrollRevealText as="p" className={styles.eyebrow} by="words" stagger={0.03} y={18}>
            Apexline Graphics LLC
          </ScrollRevealText>

          <h1 id="hero-title" className={styles.heading}>
            <ScrollRevealText as="span" by="words" stagger={0.06} y={40}>
              Print that
            </ScrollRevealText>{' '}
            <ScrollRevealText as="span" by="words" stagger={0.06} y={40} delay={0.08}>
              makes your
            </ScrollRevealText>{' '}
            <ScrollRevealText as="span" by="words" stagger={0.06} y={40} delay={0.16}>
              brand <AnimatedGradientText>stand out.</AnimatedGradientText>
            </ScrollRevealText>
          </h1>

          <ParallaxText as="p" className={styles.statement} y={18}>
            <ScrollRevealText as="span" by="words" stagger={0.025} y={24} delay={0.15}>
              Digital, offset and UV printing crafted with care from start to finish.
            </ScrollRevealText>
          </ParallaxText>

          <a className={styles.link} href="#services">
            <span>View our services</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className={styles.media}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/service-digital-printer.jpg"
              alt="Digital printing press producing sharp color prints"
              fill
              sizes="(max-width: 900px) 100vw, 30vw"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
