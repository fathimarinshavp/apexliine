import Image from 'next/image';
import styles from './HeroSection.module.css';

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
          <p className={styles.eyebrow}>Apexline Graphics LLC</p>

          <h1 id="hero-title" className={styles.heading}>
            <span>Print that</span>{' '}
            <span>makes your</span>{' '}
            <span>brand stand out.</span>
          </h1>

          <p className={styles.statement}>
            Digital, offset and UV printing
            <br />
            crafted with care from start to finish.
          </p>

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
