'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { huayraData } from '@/data/carData';

export default function Footer() {
  const [inquireOpen, setInquireOpen] = useState(false);

  return (
    <footer id="contact" className="bg-white border-t border-[#CC0000] relative overflow-hidden">
      {/* Decorative top red gradient line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#CC0000] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center justify-between pb-16 border-b border-[#E0E0E0]">
          {/* Left: Branding & Atelier Identity */}
          <div className="md:col-span-7 flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-[#CC0000] flex items-center justify-center bg-white shadow-xs">
                <span
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-[#CC0000] text-lg font-black"
                >
                  P
                </span>
              </div>
              <div>
                <span
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-[#111111] text-base font-bold tracking-[0.25em] block"
                >
                  PAGANI AUTOMOBILI S.P.A.
                </span>
                <span
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-[#666666] text-xs tracking-[0.2em] font-semibold uppercase block"
                >
                  SAN CESARIO SUL PANARO, MODENA, ITALY
                </span>
              </div>
            </div>

            <p
              style={{ fontFamily: 'var(--font-rajdhani)' }}
              className="text-[#666666] text-sm md:text-base max-w-lg leading-relaxed font-medium"
            >
              &ldquo;{huayraData.tagline}&rdquo; — Art and science can walk hand in hand. The Huayra BC Macchina Volante is the pinnacle of hypercar craftsmanship, limited to 20 units globally.
            </p>
          </div>

          {/* Right: Atelier CTA Button */}
          <div className="md:col-span-5 flex flex-col md:items-end justify-center">
            <button
              onClick={() => setInquireOpen(true)}
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="bg-[#CC0000] hover:bg-[#FF1A1A] text-white text-xs md:text-sm font-bold tracking-[0.25em] px-8 py-4 border border-[#CC0000] shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              CONTACT THE ATELIER
            </button>
            <span
              style={{ fontFamily: 'var(--font-rajdhani)' }}
              className="text-xs text-[#666666] mt-3 font-semibold tracking-wider uppercase"
            >
              PRIVATE APPOINTMENTS ONLY
            </span>
          </div>
        </div>

        {/* Bottom Credits & Tech Stack */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] space-y-4 sm:space-y-0">
          <div style={{ fontFamily: 'var(--font-rajdhani)' }} className="font-semibold tracking-wider">
            © {new Date().getFullYear()} PAGANI AUTOMOBILI · ALL RIGHTS RESERVED
          </div>

          <div
            style={{ fontFamily: 'var(--font-orbitron)' }}
            className="text-[10px] tracking-[0.15em] text-[#AAAAAA] flex items-center space-x-2"
          >
            <span>NEXT.JS 14</span>
            <span>·</span>
            <span>TAILWIND V4</span>
            <span>·</span>
            <span>FRAMER MOTION</span>
            <span>·</span>
            <span>LENIS</span>
          </div>
        </div>
      </div>

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
                    PRIVATE CONCIERGE
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
                Schedule an exclusive consultation with the Horacio Pagani design studio or request official vehicle specification dossier.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for reaching out. The Modena Atelier concierge will be in touch with your private invitation.');
                  setInquireOpen(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="block text-[10px] tracking-[0.2em] text-[#666666] mb-1 uppercase font-semibold"
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="YOUR FULL NAME"
                    className="w-full border border-[#E0E0E0] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>
                <div>
                  <label
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="block text-[10px] tracking-[0.2em] text-[#666666] mb-1 uppercase font-semibold"
                  >
                    Contact Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="EMAIL@DOMAIN.COM"
                    className="w-full border border-[#E0E0E0] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="w-full bg-[#CC0000] hover:bg-[#FF1A1A] text-white py-3 text-xs tracking-[0.25em] font-bold transition-colors cursor-pointer"
                  >
                    REQUEST ATELIER ACCESS
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
