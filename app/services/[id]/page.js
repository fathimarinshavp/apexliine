import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import { getServiceById, services } from '../../data/services';
import styles from './page.module.css';

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: 'Service | Apexline Graphics LLC' };
  return {
    title: `${service.title} | Apexline Graphics LLC`,
    description: service.description,
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  const currentIndex = services.findIndex((item) => item.id === service.id);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="service-title">
          <div className={styles.container}>
            <Reveal>
              <Link href="/#services" className={styles.backLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H6" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                <span>Back to services</span>
              </Link>
              <p className={styles.eyebrow}>Service {service.number}</p>
              <h1 id="service-title" className={styles.title}>{service.title}</h1>
              <p className={styles.lead}>{service.description}</p>
            </Reveal>

            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.details} aria-label="Service details">
          <div className={styles.detailsContainer}>
            <Reveal className={styles.detailBlock}>
              <p className={styles.label}>What we deliver</p>
              <ul className={styles.list}>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={styles.detailBlock} delay={60}>
              <p className={styles.label}>Materials</p>
              <p className={styles.value}>{service.materials}</p>
            </Reveal>

            <Reveal className={styles.detailBlock} delay={120}>
              <p className={styles.label}>Typical turnaround</p>
              <p className={styles.value}>{service.turnaround}</p>
            </Reveal>

            <Reveal className={styles.detailBlock} delay={180}>
              <p className={styles.label}>Next service</p>
              <Link href={`/services/${nextService.id}`} className={styles.nextLink}>
                <span>{nextService.title}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="service-overview">
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Overview</p>
              <h2 id="service-overview" className={styles.sectionTitle}>Quality you can see and feel.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionText}>{service.description} Our {service.title.toLowerCase()} service is handled with careful file checks, material selection, and finishing so the result looks sharp and performs well in real use.</p>
              <p className={styles.sectionText}>We work closely with you to match the right method to your quantity, budget, and timeline, making sure every piece leaves our press ready to represent your brand.</p>
            </Reveal>
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="service-process" style={{ paddingTop: 0 }}>
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Our process</p>
              <h2 id="service-process" className={styles.sectionTitle}>From brief to finished print.</h2>
            </Reveal>
            <div className={styles.stepList}>
              {[{ title: 'Consult & prepare', text: 'We review your brief, check files, and confirm materials, sizes, and finishes before production.' }, { title: 'Produce with care', text: 'Your job runs on the right press with color and quality checks at key stages.' }, { title: 'Finish & deliver', text: 'We apply final finishing, inspect the output, and deliver on the agreed timeline.' }].map((step, index) => (
                <Reveal key={step.title} as="div" className={styles.stepItem} delay={index * 60}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="service-cta">
          <div className={styles.ctaContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Start a project</p>
              <h2 id="service-cta" className={styles.ctaTitle}>Need {service.title.toLowerCase()}?</h2>
              <p className={styles.ctaText}>
                Tell us what you’re making and we’ll help you choose the right materials, finish and timeline.
              </p>
              <Link href="/#contact" className={styles.ctaButton}>
                Request a quote
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
