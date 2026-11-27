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
              <ZoomText as="h1" id="products-page-title" className={styles.title}>
                <ScrollRevealText as="span" by="words" stagger={0.04} y={30}>
                  Everything you need, printed.
                </ScrollRevealText>
              </ZoomText>
              <ScrollColorText as="p" className={styles.lead} fromColor="rgba(94,94,94,0.5)" toColor="#111111">
                Explore our product categories, from everyday business essentials to packaging, apparel, and signage.
              </ScrollColorText>
            </Reveal>
            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image
                  src="/images/project-packaging.jpg"
                  alt="Custom packaging products arranged in natural light"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.catalog} aria-labelledby="catalog-title">
          <div className={styles.catalogContainer}>
            <Reveal className={styles.catalogHead}>
              <div>
                <p className={styles.eyebrow}>Product categories</p>
                <h2 id="catalog-title" className={styles.catalogTitle}>
                  <ScrollRevealText as="span" by="words" stagger={0.04} y={24}>
                    Print for every purpose.
                  </ScrollRevealText>
                </h2>
              </div>
              <p className={styles.catalogHeadText}>
                Eight categories, thoughtfully produced from brief to final finish.
              </p>
            </Reveal>

            <div className={styles.catalogList}>
              {productGroups.map((group, index) => (
                <Reveal key={group.id} delay={Math.min(index * 50, 200)}>
                  <Link href={`/products/${group.id}`} className={styles.catalogRow}>
                    <span className={styles.catalogIndex}>{group.number}</span>
                    <div className={styles.catalogMedia}>
                      <Image
                        src={group.image}
                        alt={group.alt}
                        fill
                        sizes="(max-width: 720px) 100vw, 240px"
                        className={styles.catalogImage}
                      />
                    </div>
                    <div className={styles.catalogMain}>
                      <h3 className={styles.catalogName}>{group.title}</h3>
                      <p className={styles.catalogDesc}>{group.description}</p>
                    </div>
                    <div className={styles.catalogMeta}>
                      <span className={styles.catalogCount}>{group.items.length} products</span>
                      <span className={styles.catalogArrow} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h13" /><path d="m13 6 6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="products-cta">
          <div className={styles.ctaContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Need something custom?</p>
              <h2 id="products-cta" className={styles.ctaTitle}>Let’s print your next idea.</h2>
              <p className={styles.ctaText}>
                Tell us what you need and we’ll recommend the right product, material, and finish.
              </p>
              <Link href="/contact" className={styles.ctaButton}>Request a quote</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

