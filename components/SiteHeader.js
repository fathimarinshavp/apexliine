'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { services } from '../app/data/services';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setMobileServicesOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onPointerDown = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="site-header__brand" href="/#home" aria-label="Apexline Graphics LLC — home">
          <Image
            src="/apex-line-logo-dark-ash.svg"
            alt="Apexline Graphics LLC"
            width={2062}
            height={234}
            priority
            unoptimized
            sizes="(max-width: 900px) 300px, 420px"
          />
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
          {links.map((link) => {
            if (link.label !== 'Services') {
              return (
                <Link key={link.label} href={link.href} onClick={() => setServicesOpen(false)}>
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.label}
                className={`site-nav__dropdown${servicesOpen ? ' is-open' : ''}`}
                ref={servicesRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="site-nav__dropdown-trigger"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <span>{link.label}</span>
                  <svg className="site-nav__caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="site-nav__dropdown-menu" role="menu" aria-label="Services">
                  <div className="site-nav__dropdown-panel">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="site-nav__dropdown-item"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="site-nav__dropdown-num">{service.number}</span>
                        <span className="site-nav__dropdown-title">{service.title}</span>
                        <svg className="site-nav__dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className={`menu-button${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="site-nav site-nav--mobile" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link) => {
            if (link.label !== 'Services') {
              return (
                <Link key={link.label} href={link.href} onClick={closeAll}>
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.label} className={`site-nav__mobile-group${mobileServicesOpen ? ' is-open' : ''}`}>
                <div className="site-nav__mobile-trigger-row">
                  <button
                    type="button"
                    className="site-nav__mobile-trigger-link site-nav__mobile-trigger-toggle-all"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-subnav"
                    aria-label={mobileServicesOpen ? 'Collapse services' : 'Expand services'}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    <span>{link.label}</span>
                    <svg className="site-nav__caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div className="site-nav__mobile-sub">
                    {services.map((service) => (
                      <Link key={service.id} href={`/services/${service.id}`} className="site-nav__mobile-sublink" onClick={closeAll}>
                        <span className="site-nav__dropdown-num">{service.number}</span>
                        <span>{service.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </header>
  );
}
