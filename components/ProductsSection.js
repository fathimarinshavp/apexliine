import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { productGroups } from '../app/data/products';
import { ScrollRevealText, ZoomText } from './animations';

export default function ProductsSection() {
  return (
    <section className="products section" id="products" aria-labelledby="products-heading">
      <div className="shell catalogue__layout">
        <Reveal className="catalogue__intro">
          <p className="eyebrow">PRODUCT CATALOGUE</p>
          <ZoomText as="h2" id="products-heading">
            <ScrollRevealText as="span" by="words" stagger={0.04} y={30}>
              Everything you need, printed.
            </ScrollRevealText>
          </ZoomText>
          <ScrollRevealText as="p" by="words" stagger={0.015} y={18} delay={0.05}>
            From everyday stationery to custom packaging and branded merchandise, here is what we can produce for your business.
          </ScrollRevealText>
          <span className="catalogue__count">08 product categories</span>
        </Reveal>

        <div className="catalogue__list">
          {productGroups.map((group, index) => (
            <Reveal as="article" className="catalogue__row" key={group.id} delay={(index % 3) * 60}>
              <span className="catalogue__num">{group.number}</span>
              <div className="catalogue__copy">
                <h3>
                  <Link href={`/products/${group.id}`} className="catalogue__link">
                    {group.title}
                  </Link>
                </h3>
                <p>{group.items.join(' · ')}</p>
              </div>
              <Link href={`/products/${group.id}`} className="catalogue__media media-frame" aria-label={`View ${group.title}`}>
                <Image
                  src={group.image}
                  alt={group.alt}
                  fill
                  sizes="140px"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
