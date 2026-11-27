import Reveal from '../../components/Reveal';
import { ScrollRevealText, ZoomText, ScrollColorText } from '../../components/animations';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ContactForm from '../../components/ContactForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact | Apexline Graphics LLC',
  description: 'Get in touch with Apexline Graphics LLC for quotes, print advice, and project support.',
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-page-title">
          <div className={styles.container}>
            <Reveal className={styles.intro}>
              <p className={styles.eyebrow}>Contact</p>
              <ZoomText as="h1" id="contact-page-title" className={styles.title}><ScrollRevealText as="span" by="words" stagger={0.04} y={30}>Let&apos;s print something great.</ScrollRevealText></ZoomText>
              <ScrollColorText as="p" className={styles.lead} fromColor="rgba(160,160,160,0.55)" toColor="#F3F3F3">Tell us about your project and we&apos;ll help with materials, finishes, timelines, and the right print approach.</ScrollColorText>
              <div className={styles.details}>
                <div>
                  <p className={styles.label}>Email</p>
                  <p className={styles.value}>hello@apexlinegraphics.com</p>
                </div>
                <div>
                  <p className={styles.label}>Phone</p>
                  <p className={styles.value}>+971 00 000 0000</p>
                </div>
                <div>
                  <p className={styles.label}>Location</p>
                  <p className={styles.value}>Dubai, United Arab Emirates</p>
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.formWrap} delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <section className={styles.infoSection} aria-label="Contact information">
          <div className={styles.infoContainer}>
            <Reveal className={styles.infoCard}>
              <p className={styles.label}>Project enquiries</p>
              <p className={styles.infoText}>Share your quantity, size, material ideas, and timeline. we&apos;ll come back with practical options and a clear quote.</p>
            </Reveal>
            <Reveal className={styles.infoCard} delay={60}>
              <p className={styles.label}>File support</p>
              <p className={styles.infoText}>Need help preparing artwork? We can check files, advise on bleed and color, and make sure everything is print-ready.</p>
            </Reveal>
            <Reveal className={styles.infoCard} delay={120}>
              <p className={styles.label}>Turnaround</p>
              <p className={styles.infoText}>From quick digital runs to larger production jobs, we&apos;ll recommend a schedule that fits your deadline.</p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

