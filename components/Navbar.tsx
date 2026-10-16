'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { huayraData } from '@/data/carData';

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = 'STORY' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(activeSection);
  const [inquireOpen, setInquireOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    setActiveItem(link);
    if (link === 'STORY') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === 'SPECS') {
      const el = document.getElementById('specs');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'FEATURES') {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'CONTACT') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-[#E0E0E0] shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Monogram and Brand */}
          <div
            onClick={() => handleNavClick('STORY')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 border border-[#CC0000] flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-[#CC0000]">
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="text-[#CC0000] text-sm font-black transition-colors duration-300 group-hover:text-white"
              >
                P
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="text-[#111111] font-bold text-sm tracking-[0.25em]"
              >
                {huayraData.brand}
              </span>
              <span className="text-[#CC0000] text-xs font-semibold">/</span>
              <span
                style={{ fontFamily: 'var(--font-rajdhani)' }}
                className="text-[#CC0000] font-bold text-xs tracking-[0.2em] uppercase"
              >
                {huayraData.model}
              </span>
            </div>
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center space-x-8">
            {huayraData.navLinks.map((link) => {
              const isActive = activeItem === link;
              return (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className={`relative text-xs tracking-[0.2em] font-semibold transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#CC0000]'
                      : 'text-[#111111] hover:text-[#CC0000]'
                  }`}
                >
                  {link}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CC0000]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Inquire Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setInquireOpen(true)}
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="bg-[#CC0000] hover:bg-[#FF1A1A] text-white text-xs font-semibold tracking-[0.2em] px-5 py-2.5 transition-all duration-200 border border-[#CC0000] shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              INQUIRE
            </button>
          </div>
        </div>
      </motion.header>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquireOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setInquireOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white border border-[#CC0000] p-8 max-w-md w-full shadow-2xl corner-brackets"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[#CC0000] text-xs tracking-[0.2em] font-bold block"
                  >
                    PAGANI ATELIER
                  </span>
                  <h3
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-xl font-black text-[#111111] tracking-wider mt-1"
                  >
                    ACQUISITION INQUIRY
                  </h3>
                </div>
                <button
                  onClick={() => setInquireOpen(false)}
                  className="text-[#111111] hover:text-[#CC0000] text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p
                style={{ fontFamily: 'var(--font-rajdhani)' }}
                className="text-[#666666] text-sm mb-6 leading-relaxed"
              >
                The Pagani Huayra BC Macchina Volante is limited to an ultra-exclusive production. Connect with the San Cesario sul Panaro Atelier for private viewing and provenance documentation.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your interest. A Pagani concierge will contact you shortly.');
                  setInquireOpen(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="block text-[10px] tracking-[0.2em] text-[#666666] mb-1 uppercase font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="CLIENT NAME"
                    className="w-full border border-[#E0E0E0] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>
                <div>
                  <label
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="block text-[10px] tracking-[0.2em] text-[#666666] mb-1 uppercase font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="CLIENT@DOMAIN.COM"
                    className="w-full border border-[#E0E0E0] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>
                <div>
                  <label
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="block text-[10px] tracking-[0.2em] text-[#666666] mb-1 uppercase font-semibold"
                  >
                    Jurisdiction / Country
                  </label>
                  <input
                    type="text"
                    placeholder="MONACO / GENEVA / TOKYO"
                    className="w-full border border-[#E0E0E0] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="w-full bg-[#CC0000] hover:bg-[#FF1A1A] text-white py-3 text-xs tracking-[0.25em] font-bold transition-colors cursor-pointer"
                  >
                    SUBMIT TO ATELIER
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
