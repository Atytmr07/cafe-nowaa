'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Instagram, Menu, Phone, X } from 'lucide-react';
import NVLogo from './NVLogo';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { BUSINESS } from '@/config/business';

const NAV_LINKS = [
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#yorumlar', label: 'Yorumlar' },
  { href: '#konum', label: 'Konum' },
  { href: '#iletisim', label: 'İletişim' },
];

const overlayList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const overlayItem = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
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
    <nav aria-label="Ana navigasyon" className="fixed inset-x-0 top-0 z-50">
      {/* The blur sits on this inner bar, never on <nav>: backdrop-filter
          makes its element the containing block for fixed descendants,
          which would trap the full-screen overlay inside the bar. */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-pearl/10 bg-obsidian/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
          <Link
            href="/"
            className="group flex min-h-12 items-center gap-3"
            aria-label="Cafe Nowaa ana sayfa"
          >
            <NVLogo className="h-8 w-8 text-pearl transition-opacity duration-300 group-hover:opacity-80 md:h-9 md:w-9" />
            <span className="font-display text-base tracking-wide text-pearl md:text-lg">
              CAFE NOWAA
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[10px] font-medium uppercase tracking-[0.24em] text-silver transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-pearl after:transition-all after:duration-300 hover:text-pearl hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            {/* Menü is a destination, not an anchor — pearl pill */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                href="/menu"
                className="inline-flex min-h-11 items-center rounded-full bg-pearl px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-obsidian transition-colors duration-300 hover:bg-ivory"
              >
                Menü
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-12 min-w-12 items-center justify-center text-pearl md:hidden"
            aria-label="Menüyü aç"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>
      </div>

      {/* Full-screen mobile overlay — solid obsidian, above everything */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] flex flex-col bg-obsidian bg-slats px-6 py-5 md:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(246,245,242,0.08),transparent_70%)]"
            />

            <div className="relative flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3"
                aria-label="Cafe Nowaa ana sayfa"
              >
                <NVLogo className="h-8 w-8 text-pearl" />
                <span className="font-display text-base tracking-wide text-pearl">
                  CAFE NOWAA
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-12 min-w-12 items-center justify-center text-pearl"
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" strokeWidth={1.4} />
              </button>
            </div>

            <motion.div
              variants={overlayList}
              initial="hidden"
              animate="visible"
              className="relative mt-14 flex flex-col items-start gap-1"
            >
              <motion.div variants={overlayItem} className="mb-8 w-full">
                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pearl px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-obsidian shadow-halo"
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
                  className="flex min-h-12 items-center font-display text-3xl text-pearl transition-colors duration-300 hover:text-platinum"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            <div className="relative mt-auto">
              <div className="h-px w-full bg-pearl/12" aria-hidden="true" />
              <div className="flex items-center justify-between py-5">
                <a
                  href={BUSINESS.phoneHref}
                  className="flex min-h-12 items-center gap-2.5 text-xs tracking-wide text-silver transition-colors hover:text-pearl"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                  {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-2.5 text-xs tracking-wide text-silver transition-colors hover:text-pearl"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-2.5 text-xs tracking-wide text-silver transition-colors hover:text-pearl"
                >
                  <Instagram
                    className="h-4 w-4"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  {BUSINESS.instagramHandle}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
