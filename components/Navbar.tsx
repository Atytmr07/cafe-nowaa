'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import NVLogo from './NVLogo';

const NAV_LINKS = [
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#yorumlar', label: 'Yorumlar' },
  { href: '#konum', label: 'Konum' },
  { href: '#iletisim', label: 'İletişim' },
];

const overlayList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const overlayItem = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll behind the full-screen mobile overlay
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav
      aria-label="Ana navigasyon"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-noir/90 shadow-warm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          href="/"
          className="flex min-h-12 items-center gap-3"
          aria-label="Cafe Nowaa ana sayfa"
        >
          <NVLogo className="h-9 w-9 text-gold md:h-10 md:w-10" />
          <span className="font-display text-lg font-semibold tracking-tight text-cream md:text-xl">
            Cafe Nowaa
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-stone transition-colors hover:text-gold-bright"
            >
              {link.label}
            </a>
          ))}
          {/* Menü is a separate destination, not an anchor — gold pill */}
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-xs font-semibold uppercase tracking-widest text-noir shadow-glow transition-colors hover:bg-gold-bright hover:shadow-glow-strong"
            >
              Menü
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-12 min-w-12 items-center justify-center text-cream md:hidden"
          aria-label="Menüyü aç"
          aria-expanded={open}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-noir px-6 py-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3"
                aria-label="Cafe Nowaa ana sayfa"
              >
                <NVLogo className="h-9 w-9 text-gold" />
                <span className="font-display text-lg font-semibold text-cream">
                  Cafe Nowaa
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-12 min-w-12 items-center justify-center text-cream"
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.div
              variants={overlayList}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-col items-start gap-2"
            >
              {/* Gold Menü pill — prominent at the top of the mobile menu */}
              <motion.div variants={overlayItem} className="mb-6 w-full">
                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-noir shadow-glow"
                >
                  Menü
                </Link>
              </motion.div>

              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  variants={overlayItem}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-display text-3xl font-semibold tracking-tight text-cream transition-colors hover:text-gold-bright"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            <div className="mt-auto h-px w-full bg-gold/20" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
