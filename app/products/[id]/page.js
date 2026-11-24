import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import { ScrollRevealText, ZoomText, ScrollColorText } from '../../../components/animations';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import { getProductGroupById, productGroups } from '../../data/products';
import styles from '../../services/[id]/page.module.css';

export function generateStaticParams() {
  return productGroups.map((group) => ({ id: group.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const group = getProductGroupById(id);
  if (!group) return { title: 'Products | Apexline Graphics LLC' };
  return {
    title: `${group.title} | Apexline Graphics LLC`,
    description: group.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const group = getProductGroupById(id);
  if (!group) notFound();

  const currentIndex = productGroups.findIndex((item) => item.id === group.id);
  const nextGroup = productGroups[(currentIndex + 1) % productGroups.length];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.container}>
            <Reveal>
              <Link href="/#products" className={styles.backLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H6" /><path d="m12 19-7-7 7-7" /></svg>
                <span>Back to products</span>
              </Link>
              <p className={styles.eyebrow}>Product category {group.number}</p>
              <ZoomText as="h1" id="product-title" className={styles.title}><ScrollRevealText as="span" by="words" stagger={0.04} y={30}>{group.title}</ScrollRevealText></ZoomText>
              <ScrollColorText as="p" className={styles.lead} fromColor="rgba(94,94,94,0.5)" toColor="#111111">{group.description}</ScrollColorText>
            </Reveal>
            <Reveal className={styles.heroMedia} delay={100}>
              <div className={styles.imageFrame}>
                <Image src={group.image} alt={group.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.image} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.details} aria-label="Product details">
          <div className={styles.detailsContainer} style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <Reveal className={styles.detailBlock} style={{ gridColumn: 'span 2' }}>
              <p className={styles.label}>What we produce</p>
              <ul className={styles.list} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
            <Reveal className={styles.detailBlock} delay={120}>
              <p className={styles.label}>Next category</p>
              <Link href={`/products/${nextGroup.id}`} className={styles.nextLink}>
                <span>{nextGroup.title}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="product-overview">
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Overview</p>
              <h2 id="product-overview" className={styles.sectionTitle}>Print made to fit your need.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionText}>{group.description} We produce this category with attention to material choice, color accuracy, and finishing so the final result feels professional and ready to use.</p>
              <p className={styles.sectionText}>Whether you need a small run or a larger batch, we can guide you on paper, sizing, finish, and turnaround to match your purpose and budget.</p>
            </Reveal>
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="product-process" style={{ paddingTop: 0 }}>
          <div className={styles.contentContainer}>
            <Reveal>
              <p className={styles.eyebrow}>How to order</p>
              <h2 id="product-process" className={styles.sectionTitle}>A clear path from brief to print.</h2>
            </Reveal>
            <div className={styles.stepList}>
              {[{ title: 'Share your requirement', text: 'Send us the quantity, size, and purpose. If you have artwork, we can review it before print.' }, { title: 'Choose material & finish', text: 'We recommend the right stock, coating, and finishing options for durability and look.' }, { title: 'Print & deliver', text: 'After approval, we produce, quality-check, and deliver your order on schedule.' }].map((step, index) => (
                <Reveal key={step.title} as="div" className={styles.stepItem} delay={index * 60}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="product-cta">
          <div className={styles.ctaContainer}>
            <Reveal>
              <p className={styles.eyebrow}>Start a project</p>
              <h2 id="product-cta" className={styles.ctaTitle}>Need {group.title.toLowerCase()}?</h2>
              <p className={styles.ctaText}>Tell us what you need and we’ll recommend the right format, material, and finish for your project.</p>
              <Link href="/contact" className={styles.ctaButton}>Request a quote</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
