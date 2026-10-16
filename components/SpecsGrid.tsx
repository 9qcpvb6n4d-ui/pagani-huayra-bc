'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { huayraData } from '@/data/carData';

export default function SpecsGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="specs" className="py-24 md:py-32 bg-white relative border-t border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-[2px] bg-[#CC0000]" />
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
            >
              TECHNICAL DATA
            </span>
          </div>
          <h2
            style={{ fontFamily: 'var(--font-orbitron)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight"
          >
            PERFORMANCE <span className="text-[#CC0000]">SPECIFICATIONS</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-rajdhani)' }}
            className="text-[#666666] text-base md:text-lg max-w-2xl mt-3 font-medium"
          >
            Engineering metrics distilled to absolute purity. Developed by Horacio Pagani and Mercedes-AMG.
          </p>
        </div>

        {/* 8 Spec Cards: 2x4 Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {huayraData.specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-white border border-[#E0E0E0] hover:border-[#CC0000] p-6 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between h-44 overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <span
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-xs font-bold text-[#666666] tracking-[0.2em] uppercase group-hover:text-[#CC0000] transition-colors"
                >
                  {spec.label}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-[10px] text-[#AAAAAA] font-bold"
                >
                  0{index + 1}
                </span>
              </div>

              {/* Main Metric Value */}
              <div>
                <div
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-3xl md:text-4xl font-black text-[#111111] group-hover:text-[#CC0000] transition-colors duration-300 tracking-tight"
                >
                  {spec.value}
                </div>
                <div
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-xs font-semibold text-[#666666] tracking-[0.15em] uppercase mt-1"
                >
                  {spec.unit}
                </div>
              </div>

              {/* Bottom Red Border Line (grows left-to-right on hover) */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent overflow-hidden">
                <div className="h-full bg-[#CC0000] w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
