import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../../components/Reveal';
import { ScrollRevealText, ZoomText, ScrollColorText } from '../../components/animations';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import styles from '../services/[id]/page.module.css';

export const metadata = {
  title: 'About Us | Apexline Graphics LLC',
  description: 'Learn about Apexline Graphics LLC, our approach, and our printing craft.',
};

const values = [
  {
    label: 'Craft',
    text: 'We treat every print run with care, checking color, paper, and detail before it leaves.',
  },
  {
    label: 'Clarity',
    text: 'We keep the process simple and transparent, from file preparation to final delivery.',
  },
  {
    label: 'Reliability',
    text: 'We deliver consistent quality on time, whether it is a small run or a full production job.',
  },
];

const process = [
  { title: 'Brief & advice', text: 'We understand your goal, recommend the right format, and help you choose materials and finishes.' },
  { title: 'Production & checks', text: 'Files are prepared carefully, colors are checked, and every piece is produced with consistent quality.' },
  { title: 'Finish & delivery', text: 'From binding to packaging, we complete the final details and deliver print ready to use.' },
];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-page-title">
          <div className={styles.container}>
            <Reveal>
              <Link href="/#about" className={styles.backLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H6" /><path d="m12 19-7-7 7-7" /></svg>
                <span>Back to home</span>
              </Link>
              <p className={styles.eyebrow}>About us</p>
              <ZoomText as="h1" id="about-page-title" className={styles.title}><ScrollRevealText as="span" by="words" stagger={0.04} y={30}>Built for brands that value print.</ScrollRevealText></ZoomText>
              <ScrollColorText as="p" className={styles.lead} fromColor="rgba(160,160,160,0.55)" toColor="#F3F3F3">We are an independent printing house turning ideas into things you can hold, with care from first proof to final finish.</ScrollColorText>
            </Reveal>
            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image src="/images/service-binding-hands.jpg" alt="A print specialist binding a finished book by hand" fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.image} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.details} aria-label="Our values">
          <div className={styles.detailsContainer} style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {values.map((value, index) => (
              <Reveal key={value.label} className={styles.detailBlock} delay={index * 60}>
                <p className={styles.label}>{value.label}</p>
                <p className={styles.value}>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="about-story">
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Our story</p>
              <h2 id="about-story" className={styles.sectionTitle}>A print house with a careful eye.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionText}>Apexline Graphics LLC was built to make professional printing feel simple. We combine digital, offset, UV, large format, and finishing capabilities so brands can move from idea to finished piece with one trusted team.</p>
              <p className={styles.sectionText}>Whether it's a business card, a bound catalogue, or custom packaging, we focus on the details that make print feel sharp, useful, and memorable.</p>
            </Reveal>
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="about-process" style={{ paddingTop: 0 }}>
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>How we work</p>
              <h2 id="about-process" className={styles.sectionTitle}>Simple process. Solid results.</h2>
            </Reveal>
            <div className={styles.stepList}>
              {process.map((step, index) => (
                <Reveal key={step.title} as="div" className={styles.stepItem} delay={index * 60}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="about-cta" style={{ '--sd-accent': '#1B1A24' }}>
          <div className={styles.ctaContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Work with us</p>
              <h2 id="about-cta" className={styles.ctaTitle}>Let’s make something worth keeping.</h2>
              <p className={styles.ctaText}>From business essentials to custom packaging, we’ll help you choose the right print, material, and finish.</p>
              <Link href="/contact" className={styles.ctaButton}>Contact us</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

