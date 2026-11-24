import Image from 'next/image';
import Link from 'next/link';
import { services } from '../app/data/services';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <Image
              src="/apexlogo.png"
              alt="Apexline Graphics LLC"
              width={180}
              height={60}
              sizes="180px"
              className="footer-logo"
            />
            <p>Print, packaging and finishing for brands that value the tangible.</p>
          </div>

          <nav className="footer-column" aria-label="Footer navigation">
            <h3>Navigate</h3>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav className="footer-column" aria-label="Footer services">
            <h3>Services</h3>
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                {service.title}
              </Link>
            ))}
          </nav>

          <div className="footer-column">
            <h3>Apexline</h3>
            <Link href="/contact">Request a Quote</Link>
            <Link href="/services">Selected Work</Link>
            <Link href="/about">Our Approach</Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {year} Apexline Graphics LLC</span>
          <span>Printing • Design • Finishing</span>
        </div>
      </div>
    </footer>
  );
}
