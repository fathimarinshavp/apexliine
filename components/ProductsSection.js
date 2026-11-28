import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { products } from '../app/data/products';
import { ScrollColorText, ScrollRevealText, ZoomText } from './animations';
import styles from './ProductsSection.module.css';

const layout = [
  styles.span5x2,
  styles.span7,
  styles.span7,
  styles.span4,
  styles.span4,
  styles.span4,
  styles.span5x2,
  styles.span7,
  styles.span7,
  styles.span12,
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function ProductsSection() {
  return (
    <section className={styles.section} id="products" aria-labelledby="products-heading">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Product catalogue</p>
            <ZoomText as="h2" id="products-heading" className={styles.title}>
              <ScrollRevealText as="span" by="words" stagger={0.04} y={30}>
                Everything you need, printed.
              </ScrollRevealText>
            </ZoomText>
          </div>
          <div className={styles.intro}>
            <ScrollColorText as="p" fromColor="rgba(160,160,160,0.55)" toColor="#F3F3F3">
              Ten considered products, from the first business card to the final hard case book. Each one made with the same care for colour, material and finish.
            </ScrollColorText>
            <span className={styles.count}>10 products / 01 collection</span>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <Reveal
              as="article"
              key={product.id}
              className={`${styles.card} ${layout[index]}`}
              delay={(index % 3) * 70}
            >
              <Link href={`/products/${product.id}`} className={styles.cardLink} aria-label={`View ${product.title}`}>
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 45vw"
                  quality={90}
                  className={styles.image}
                />
                <span className={styles.cardTop}>
                  <span className={styles.number}>{product.number}</span>
                  <span className={styles.arrow}><ArrowIcon /></span>
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.cardTitle}>{product.title}</span>
                  <span className={styles.cardText}>{product.description}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.footer}>
          <p>Looking for something specific? We can shape a product around your brief.</p>
          <Link href="/products" className={styles.footerLink}>
            View full catalogue <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
