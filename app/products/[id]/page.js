import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import { ScrollRevealText, ZoomText, ScrollColorText, ParallaxText, AnimatedGradientText } from '../../../components/animations';
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

        <section className={styles.pdOverview} aria-label="Category overview">
          <div className={styles.pdOverviewInner}>
            <div className={styles.pdOverviewTop}>
              <Reveal className={styles.pdOverviewHead}>
                <p className={styles.eyebrow}>Category {group.number}</p>
                <ZoomText as="h2" className={styles.pdOverviewTitle}>
                  <ScrollRevealText as="span" by="words" stagger={0.04} y={28}>
                    Made to leave an impression.
                  </ScrollRevealText>
                </ZoomText>
              </Reveal>
              <Reveal className={styles.pdOverviewCopy} delay={80}>
                <ScrollColorText as="p" className={styles.pdOverviewLead} fromColor="rgba(94,94,94,0.45)" toColor="#111111">
                  {group.description} We produce this category with attention to material choice, color accuracy, and finishing so the final result feels professional and ready to use.
                </ScrollColorText>
                <div className={styles.pdOverviewMeta}>
                  <div className={styles.pdMetaItem}>
                    <span className={styles.pdMetaValue}>{String(group.items.length).padStart(2, '0')}</span>
                    <span className={styles.pdMetaLabel}>Products</span>
                  </div>
                  <div className={styles.pdMetaItem}>
                    <span className={styles.pdMetaValue}>Custom</span>
                    <span className={styles.pdMetaLabel}>Sizes & finishes</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className={styles.pdIndex}>
              <Reveal className={styles.pdIndexHead}>
                <p className={styles.pdIndexLabel}>What we produce</p>
                <div className={styles.pdIndexLine} aria-hidden="true" />
              </Reveal>
              <div className={styles.pdIndexList}>
                {group.items.map((item, index) => (
                  <Reveal key={item} className={styles.pdIndexItem} delay={Math.min(index * 40, 240)}>
                    <span className={styles.pdIndexNum}>{String(index + 1).padStart(2, '0')}</span>
                    <p className={styles.pdIndexName}>{item}</p>
                    <span className={styles.pdIndexDot} aria-hidden="true" />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.pdProcess} aria-labelledby="product-process">
          <div className={styles.pdProcessInner}>
            <Reveal className={styles.pdProcessHead}>
              <p className={styles.eyebrow}>How to order</p>
              <h2 id="product-process" className={styles.pdProcessTitle}>
                <ScrollRevealText as="span" by="words" stagger={0.04} y={24}>
                  Simple steps, solid results.
                </ScrollRevealText>
              </h2>
            </Reveal>
            <div className={styles.pdSteps}>
              {[
                { num: '01', title: 'Share your requirement', text: 'Send us the quantity, size, and purpose. If you have artwork, we can review it before print.' },
                { num: '02', title: 'Choose material & finish', text: 'We recommend the right stock, coating, and finishing options for durability and look.' },
                { num: '03', title: 'Print & deliver', text: 'After approval, we produce, quality-check, and deliver your order on schedule.' },
              ].map((step, index) => (
                <Reveal key={step.title} className={styles.pdStep} delay={index * 70}>
                  <span className={styles.pdStepNum}>{step.num}</span>
                  <div className={styles.pdStepBody}>
                    <h3 className={styles.pdStepTitle}>{step.title}</h3>
                    <p className={styles.pdStepText}>{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pdNext} aria-label="Next category">
          <div className={styles.pdNextInner}>
            <Reveal className={styles.pdNextReveal}>
              <div className={styles.pdNextMeta}>
                <p className={styles.eyebrow}>Next category</p>
                <p className={styles.pdNextDesc}>Continue exploring our product range.</p>
              </div>
              <Link href={`/products/${nextGroup.id}`} className={styles.pdNextLink}>
                <span className={styles.pdNextTitle}>{nextGroup.title}</span>
                <span className={styles.pdNextArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13" /><path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
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
