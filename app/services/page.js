import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../../components/Reveal';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { services } from '../data/services';
import styles from '../services/[id]/page.module.css';

export const metadata = {
  title: 'Services | Apexline Graphics LLC',
  description: 'Explore Apexline Graphics LLC printing, finishing, design, and packaging services.',
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="services-page-title">
          <div className={styles.container}>
            <Reveal>
              <p className={styles.eyebrow}>Services</p>
              <h1 id="services-page-title" className={styles.title}>Print services built for your brand.</h1>
              <p className={styles.lead}>From digital and offset printing to finishing, design, and packaging, we handle every stage with care and precision.</p>
            </Reveal>
            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image src="/images/service-offset-press.jpg" alt="Offset printing press in production" fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.image} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.details} aria-label="All services">
          <div className={styles.detailsContainer} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {services.map((service, index) => (
              <Reveal key={service.id} className={styles.detailBlock} delay={(index % 2) * 60}>
                <p className={styles.label}>{service.number}</p>
                <Link href={`/services/${service.id}`} className={styles.nextLink} style={{ display: 'inline-flex', marginBottom: 12 }}>
                  <span>{service.title}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
                </Link>
                <p className={styles.value}>{service.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

