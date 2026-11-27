import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import { ScrollRevealText, ZoomText } from '../../../components/animations';
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

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content" className={styles.editorialPage}>
        <section className={styles.intro} aria-labelledby="service-title">
          <div className={styles.introInner}>
            <Reveal>
              <p className={styles.introEyebrow}>Service {service.number}</p>
              <ZoomText as="h1" id="service-title" className={styles.introTitle}>
                <ScrollRevealText as="span" by="words" stagger={0.04} y={30}>
                  Bring Your Ideas to Life Through Exceptional {service.title}.
                </ScrollRevealText>
              </ZoomText>
              <ScrollRevealText as="p" className={styles.introText} by="words" stagger={0.015} y={18} delay={0.08}>
                From creative concepts to premium print solutions, we transform your ideas into beautifully crafted
                printed experiences with precision, quality and attention to detail.
              </ScrollRevealText>
            </Reveal>
          </div>
        </section>

        <section className={styles.showcase} aria-label={`${service.title} showcase`}>
          <div className={styles.showcaseInner}>
            <Reveal className={styles.showcaseVisual} delay={60}>
              <div className={styles.showcaseImageWrap}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 72vw"
                  className={styles.showcaseImage}
                />
              </div>
            </Reveal>

            <div className={styles.showcasePanels}>
              <Reveal className={styles.panelWhite} delay={120}>
                <p className={styles.panelEyebrow}>{service.title}</p>
                <ScrollRevealText as="h2" className={styles.panelTitle} by="words" stagger={0.035} y={24}>
                  Printing Managed by Experts
                </ScrollRevealText>
                <ScrollRevealText as="p" className={styles.panelText} by="words" stagger={0.012} y={14} delay={0.05}>
                  From concept to final production, we manage every stage of the {service.title.toLowerCase()} process
                  with precision, professional expertise and exceptional quality.
                </ScrollRevealText>
                <Link href="/contact" className={styles.panelButton}>
                  Request a quote
                </Link>
              </Reveal>

              <Reveal className={styles.panelBlack} delay={180}>
                <p className={styles.panelBlackEyebrow}>Our approach</p>
                <ScrollRevealText as="h2" className={styles.panelBlackTitle} by="words" stagger={0.035} y={24}>
                  Your Vision. Our Expertise.
                </ScrollRevealText>
                <ScrollRevealText as="p" className={styles.panelBlackText} by="words" stagger={0.012} y={14} delay={0.05}>
                  We combine creative thinking, modern printing technology and expert craftsmanship to deliver print
                  solutions that make your brand stand out.
                </ScrollRevealText>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="service-cta">
          <div className={styles.ctaContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Start a project</p>
              <ScrollRevealText as="h2" id="service-cta" className={styles.ctaTitle} by="words" stagger={0.04} y={28}>
                Need {service.title.toLowerCase()}?
              </ScrollRevealText>
              <ScrollRevealText as="p" className={styles.ctaText} by="words" stagger={0.015} y={16} delay={0.06}>
                Tell us what you’re making and we’ll help you choose the right materials, finish and timeline.
              </ScrollRevealText>
              <Link href="/contact" className={styles.ctaButton}>
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
