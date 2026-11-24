import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { productGroups } from '../app/data/products';

export default function ProductsSection() {
  return (
    <section className="products section" id="products" aria-labelledby="products-heading">
      <div className="shell catalogue__layout">
        <Reveal className="catalogue__intro">
          <p className="eyebrow">PRODUCT CATALOGUE</p>
          <h2 id="products-heading">Everything you need, printed.</h2>
          <p>
            From everyday stationery to custom packaging and branded merchandise, here is what we can produce for
            your business.
          </p>
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
