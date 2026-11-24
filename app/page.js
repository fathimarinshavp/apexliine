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

export default function Home() {
  const year = new Date().getFullYear();

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
        <ProductsSection />
        <Finishing />

        <section className="contact section" id="contact" aria-labelledby="contact-heading">
          <div className="shell contact__inner">
            <Reveal className="contact__intro">
              <p className="eyebrow eyebrow--light">START A PROJECT</p>
              <h2 id="contact-heading">Have a project in mind?</h2>
              <p>Let&apos;s create something worth holding, seeing, and remembering.</p>
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

