'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const SHAPE_PATH =
  'M146 0 H564 A16 16 0 0 1 580 16 V524 A16 16 0 0 1 564 540 H316 A16 16 0 0 0 300 556 V624 A16 16 0 0 1 284 640 H16 A16 16 0 0 1 0 624 V116 A16 16 0 0 1 16 100 H114 A16 16 0 0 0 130 84 V16 A16 16 0 0 1 146 0 Z';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
      className={styles.about}
    >
      <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="aboutShape" clipPathUnits="objectBoundingBox">
            <path d={SHAPE_PATH} transform="scale(0.0017241379310344827 0.0015625)" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.layout}>
        <div className={styles.content}>
          <h2 id="about-title" className={styles.heading}>ABOUT</h2>

          <p className={styles.statement}>
            WE ARE A PRINTING HOUSE FOR BRANDS
            <br />
            THAT WANT TO BE REMEMBERED
          </p>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.label}>About us</h3>
              <p className={styles.text}>
                We are an independent printing house that turns ideas into things you can hold. From a single business card to a full packaging run, we handle digital, offset and UV printing, binding, design and large format work under one roof. Our goal is to make professional printing simple, fast and reliable for every business.
              </p>
            </div>

            <div className={styles.column}>
              <h3 className={styles.label}>Our approach</h3>
              <p className={styles.text}>
                We keep the process clear and the finish sharp. Every job is checked for color, paper and detail before it leaves the press.
              </p>
              <p className={`${styles.text} ${styles.textSecond}`}>
                The result is print that looks simple but still catches the eye, with the care of a small team behind every order.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.media} ${visible ? styles.isVisible : ''}`}>
          <div className={styles.imageFrame}>
            {imageFailed ? (
              <div className={styles.fallback} aria-hidden="true" />
            ) : (
              <Image
                src="/images/service-offset-press.jpg"
                alt="Offset printing press running a production job"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                priority={false}
                className={styles.image}
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
