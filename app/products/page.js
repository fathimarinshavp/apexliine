import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../../components/Reveal';
import { ScrollRevealText, ZoomText, ScrollColorText } from '../../components/animations';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { productGroups } from '../data/products';
import styles from '../services/[id]/page.module.css';

export const metadata = {
  title: 'Products | Apexline Graphics LLC',
  description: 'Browse Apexline Graphics LLC product categories for print, packaging, apparel, and signage.',
};

export default function ProductsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="products-page-title">
          <div className={styles.container}>
            <Reveal>
              <p className={styles.eyebrow}>Products</p>
              <ZoomText as="h1" id="products-page-title" className={styles.title}><ScrollRevealText as="span" by="words" stagger={0.04} y={30}>Everything you need, printed.</ScrollRevealText></ZoomText>
              <ScrollColorText as="p" className={styles.lead} fromColor="rgba(94,94,94,0.5)" toColor="#111111">Explore our product categories, from everyday business essentials to packaging, apparel, and signage.</ScrollColorText>
            </Reveal>
            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image src="/images/project-packaging.jpg" alt="Custom packaging products arranged in natural light" fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.image} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.details} aria-label="All product categories">
          <div className={styles.detailsContainer} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {productGroups.map((group, index) => (
              <Reveal key={group.id} className={styles.detailBlock} delay={(index % 2) * 60}>
                <p className={styles.label}>{group.number}</p>
                <Link href={`/products/${group.id}`} className={styles.nextLink} style={{ display: 'inline-flex', marginBottom: 12 }}>
                  <span>{group.title}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
                </Link>
                <p className={styles.value}>{group.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

