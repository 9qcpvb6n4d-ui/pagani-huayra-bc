'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { huayraData } from '@/data/carData';

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="features" className="py-24 md:py-32 bg-[#F5F5F5] relative border-t border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-[2px] bg-[#CC0000]" />
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
            >
              ENGINEERING EXCELLENCE
            </span>
          </div>
          <h2
            style={{ fontFamily: 'var(--font-orbitron)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight"
          >
            DEFINING <span className="text-[#CC0000]">FEATURES</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-rajdhani)' }}
            className="text-[#666666] text-base md:text-lg max-w-2xl mt-3 font-medium"
          >
            A relentless pursuit of beauty and mechanical function. Every component is custom sculptured in Modena.
          </p>
        </div>

        {/* 4 Feature Cards in 2-Column Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {huayraData.features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={feature.number}
                initial={{ x: isEven ? -40 : 40, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? -40 : 40, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-white border border-[#E0E0E0] border-l-[3px] border-l-[#CC0000] p-8 md:p-10 transition-all duration-300 hover:bg-[#FFF5F5] hover:shadow-xl cursor-default"
              >
                {/* Number & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-2xl font-black text-[#CC0000]"
                  >
                    {feature.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#111111] group-hover:bg-[#CC0000] transition-colors" />
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-xl md:text-2xl font-black text-[#111111] group-hover:text-[#CC0000] transition-colors duration-200 tracking-wide mb-3"
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-sm md:text-base text-[#666666] leading-relaxed font-medium"
                >
                  {feature.description}
                </p>

                {/* Corner decorative mark */}
                <div className="mt-6 flex items-center space-x-2 text-[10px] text-[#AAAAAA] group-hover:text-[#CC0000] transition-colors font-bold tracking-widest uppercase">
                  <span style={{ fontFamily: 'var(--font-orbitron)' }}>MODENA SPEC</span>
                  <span>·</span>
                  <span style={{ fontFamily: 'var(--font-orbitron)' }}>BESPOKE ATELIER</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
