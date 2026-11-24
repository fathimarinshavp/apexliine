import About from '../components/About/About';
import ContactForm from '../components/ContactForm';
import Finishing from '../components/Finishing/Finishing';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import Reveal from '../components/Reveal';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import WorkShowcase from '../components/WorkShowcase';
import { services } from './data/services';
import { PinnedTextReveal, ScrollColorText, ScrollRevealText, ZoomText } from '../components/animations';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <HeroSection />
        <About />
        <WorkShowcase services={services} />
        <PinnedTextReveal className="pinned-type-band" innerClassName="pinned-type-inner">
          <h2 className="pinned-type-title" data-pin-text>Made to be seen. Built to last.</h2>
          <p className="pinned-type-sub" data-pin-text>Every piece we print is checked for color, material, and finish before it leaves our hands.</p>
        </PinnedTextReveal>
        <ProductsSection />
        <Finishing />

        <section className="contact section" id="contact" aria-labelledby="contact-heading">
          <div className="shell contact__inner">
            <Reveal className="contact__intro">
              <p className="eyebrow eyebrow--light">START A PROJECT</p>
              <ZoomText as="h2" id="contact-heading">
                <ScrollRevealText as="span" by="words" stagger={0.04} y={30}>
                  Have a project in mind?
                </ScrollRevealText>
              </ZoomText>
              <ScrollColorText as="p" fromColor="rgba(94,94,94,0.55)" toColor="#111111">
                Let&apos;s create something worth holding, seeing, and remembering.
              </ScrollColorText>
              <div className="contact__rule" aria-hidden="true" />
              <p className="contact__note">
                Tell us what you need and we&apos;ll help shape the next step.
              </p>
            </Reveal>

            <Reveal className="contact__form-wrap" delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
