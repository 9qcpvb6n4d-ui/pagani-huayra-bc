'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import { huayraData } from '@/data/carData';

interface HuayraExperienceProps {
  scrollYProgress: MotionValue<number>;
}

const transitionEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: transitionEase,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: transitionEase,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: transitionEase,
    },
  },
};

export default function HuayraExperience({ scrollYProgress }: HuayraExperienceProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      setScrollVal(latest);

      if (latest < 0.25) {
        setActivePhaseIndex(0);
      } else if (latest < 0.5) {
        setActivePhaseIndex(1);
      } else if (latest < 0.75) {
        setActivePhaseIndex(2);
      } else {
        setActivePhaseIndex(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentPhase = huayraData.phases[activePhaseIndex];

  // Door angle calculation for Phase 3 (50% to 75%)
  const phase3Progress = Math.min(
    1,
    Math.max(0, (scrollVal - 0.5) / 0.25)
  );
  const doorAngle = Math.round(phase3Progress * 73);

  // Jump to specific phase on dot click
  const jumpToPhase = (index: number) => {
    const targets = [0, 0.3, 0.55, 0.8];
    const targetScroll = targets[index];
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetScroll * (window.innerHeight * 5),
      behavior: 'smooth',
    });
  };

  const handleScrollExplore = () => {
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: 'smooth',
    });
  };

  const handleScrollSpecs = () => {
    const el = document.getElementById('specs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* ── PERSISTENT HUD ELEMENTS ── */}

      {/* Top Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
        <motion.div
          className="h-full bg-[#CC0000]"
          style={{
            scaleX: scrollVal,
            transformOrigin: '0%',
          }}
        />
      </div>

      {/* Persistent Top Bar: Left Branding & Right Phase Indicator */}
      <div className="w-full flex items-center justify-between pt-16 md:pt-14 z-20">
        {/* Top-Left: Pagani Logo mark + Huayra BC title */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border border-[#CC0000] flex items-center justify-center bg-white shadow-xs">
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[#CC0000] text-xs font-black"
            >
              P
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[#111111] text-[11px] font-bold tracking-[0.25em]"
            >
              PAGANI
            </span>
            <span className="text-[#CC0000] text-xs">/</span>
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[#CC0000] text-[11px] font-semibold tracking-[0.2em]"
            >
              HUAYRA BC
            </span>
          </div>
        </div>

        {/* Top-Right: Phase Dots (4 dots) */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-white/80 backdrop-blur-md px-3 py-1.5 border border-[#E0E0E0] shadow-xs">
          <span
            style={{ fontFamily: 'var(--font-orbitron)' }}
            className="text-[9px] font-semibold tracking-[0.2em] text-[#666666] mr-1 hidden sm:inline-block"
          >
            PHASE
          </span>
          {[0, 1, 2, 3].map((index) => {
            const isActive = activePhaseIndex === index;
            return (
              <button
                key={index}
                onClick={() => jumpToPhase(index)}
                aria-label={`Jump to phase ${index + 1}`}
                className="group relative p-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#CC0000] scale-125 ring-2 ring-[#CC0000]/30'
                      : 'border border-[#111111] bg-white group-hover:border-[#CC0000]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PHASE CONTENT TRANSITIONS ── */}
      <div className="flex-1 flex items-center w-full my-auto py-4">
        <AnimatePresence mode="wait">
          {activePhaseIndex === 0 && (
            <motion.div
              key="phase-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            >
              {/* Left Column: Hero Title & Description */}
              <div className="lg:col-span-8 flex flex-col justify-end">
                {/* Phase Tag */}
                <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-[1.5px] bg-[#CC0000]" />
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
                  >
                    {currentPhase.label}
                  </span>
                </motion.div>

                {/* Main Hero Title */}
                <motion.h1
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#111111] tracking-tight leading-none mb-1"
                >
                  HUAYRA BC
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-base sm:text-xl md:text-2xl font-bold text-[#CC0000] tracking-[0.35em] mb-4 uppercase"
                >
                  {currentPhase.subtitle}
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-sm md:text-base text-[#666666] max-w-xl font-medium leading-relaxed mb-8"
                >
                  {currentPhase.description}
                </motion.p>

                {/* Interactive Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 pointer-events-auto"
                >
                  <button
                    onClick={handleScrollExplore}
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="bg-[#CC0000] hover:bg-[#FF1A1A] text-white text-xs font-bold tracking-[0.2em] px-6 py-3.5 border border-[#CC0000] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    SCROLL TO EXPLORE
                  </button>
                  <button
                    onClick={handleScrollSpecs}
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="bg-transparent hover:bg-[#111111] text-[#111111] hover:text-white text-xs font-bold tracking-[0.2em] px-6 py-3.5 border border-[#111111] transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    SPECIFICATIONS
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Price & Limited Edition Info */}
              <div className="lg:col-span-4 flex flex-col lg:items-end justify-end">
                <motion.div
                  variants={itemVariants}
                  className="bg-white/90 backdrop-blur-md border border-[#E0E0E0] p-6 max-w-xs corner-brackets shadow-sm"
                >
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[10px] text-[#666666] tracking-[0.25em] font-semibold block uppercase mb-1"
                  >
                    ATELIER VALUATION
                  </span>
                  <div
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-3xl md:text-4xl font-black text-[#111111] tracking-tight mb-2"
                  >
                    €2,600,000
                  </div>
                  <div className="w-full h-[1px] bg-[#CC0000] mb-3" />
                  <div
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-xs font-bold text-[#CC0000] tracking-[0.25em]"
                  >
                    20 UNITS ONLY
                  </div>
                  <p
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                    className="text-xs text-[#666666] mt-2 font-medium"
                  >
                    Bespoke tailored aerodynamic track package with road legal certification.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePhaseIndex === 1 && (
            <motion.div
              key="phase-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            >
              {/* Left Column: Form & Sculpture */}
              <div className="lg:col-span-8 flex flex-col justify-end">
                <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-[1.5px] bg-[#CC0000]" />
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
                  >
                    {currentPhase.label}
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#111111] tracking-tight leading-none mb-1"
                >
                  {currentPhase.title}
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-base sm:text-xl md:text-2xl font-bold text-[#CC0000] tracking-[0.35em] mb-4 uppercase"
                >
                  {currentPhase.subtitle}
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-sm md:text-base text-[#666666] max-w-xl font-medium leading-relaxed"
                >
                  {currentPhase.description}
                </motion.p>
              </div>

              {/* Right Column: Carbotanium Badge with Corner Brackets */}
              <div className="lg:col-span-4 flex flex-col lg:items-end justify-end">
                <motion.div
                  variants={itemVariants}
                  className="bg-white/95 backdrop-blur-md border border-[#111111] p-6 max-w-xs corner-brackets shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                      className="text-[10px] text-[#CC0000] font-bold tracking-[0.25em]"
                    >
                      PATENTED MATERIAL
                    </span>
                    <span className="w-2 h-2 bg-[#CC0000]" />
                  </div>
                  <div
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-xl md:text-2xl font-black text-[#111111] tracking-wider mb-2"
                  >
                    CARBOTANIUM™
                  </div>
                  <div className="w-full h-[1px] bg-[#E0E0E0] mb-3" />
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">DRAG COEFFICIENT</span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="font-bold text-[#111111]"
                      >
                        0.31 Cd
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">WEIGHT REDUCTION</span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="font-bold text-[#CC0000]"
                      >
                        -20% VS CF
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">TORSIONAL RIGIDITY</span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="font-bold text-[#111111]"
                      >
                        +50%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePhaseIndex === 2 && (
            <motion.div
              key="phase-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            >
              {/* Left Column: Butterfly Doors & Ritual */}
              <div className="lg:col-span-8 flex flex-col justify-end">
                <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-[1.5px] bg-[#CC0000]" />
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
                  >
                    {currentPhase.label}
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#111111] tracking-tight leading-none mb-1"
                >
                  {currentPhase.title}
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-base sm:text-xl md:text-2xl font-bold text-[#CC0000] tracking-[0.35em] mb-4 uppercase"
                >
                  {currentPhase.subtitle}
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-sm md:text-base text-[#666666] max-w-xl font-medium leading-relaxed"
                >
                  {currentPhase.description}
                </motion.p>
              </div>

              {/* Right Column: Animated Door Angle Visualization */}
              <div className="lg:col-span-4 flex flex-col lg:items-end justify-end">
                <motion.div
                  variants={itemVariants}
                  className="bg-white/95 backdrop-blur-md border border-[#E0E0E0] p-6 max-w-xs corner-brackets shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                      className="text-[10px] text-[#666666] tracking-[0.25em] font-semibold uppercase"
                    >
                      DOOR ELEVATION
                    </span>
                    <span
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                      className="text-xl font-black text-[#CC0000]"
                    >
                      {doorAngle}°
                    </span>
                  </div>

                  {/* Graphical Angle Gauge */}
                  <div className="w-full h-24 border border-[#E0E0E0] bg-[#F5F5F5] relative flex items-end justify-center overflow-hidden p-2 mb-3">
                    {/* Pivot indicator */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111] z-10 mb-[-5px]" />
                    {/* Rotating door arm */}
                    <div
                      className="absolute bottom-2 w-[2px] h-16 bg-[#CC0000] origin-bottom transition-transform duration-150 ease-out"
                      style={{
                        transform: `rotate(${-doorAngle}deg)`,
                      }}
                    />
                    {/* Arc guide */}
                    <div className="absolute bottom-2 w-28 h-28 border border-dashed border-[#AAAAAA] rounded-full pointer-events-none" />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-[#666666] font-semibold">
                    <span style={{ fontFamily: 'var(--font-orbitron)' }}>HINGE: TITANIUM</span>
                    <span style={{ fontFamily: 'var(--font-orbitron)' }} className="text-[#CC0000]">
                      MAX 73°
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePhaseIndex === 3 && (
            <motion.div
              key="phase-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            >
              {/* Left Column: Power & V12 */}
              <div className="lg:col-span-8 flex flex-col justify-end">
                <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-[1.5px] bg-[#CC0000]" />
                  <span
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase"
                  >
                    {currentPhase.label}
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#111111] tracking-tight leading-none mb-2"
                >
                  {currentPhase.title}
                </motion.h2>

                {/* Subtitle: Huge Power & Torque Callout */}
                <motion.div
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  className="text-2xl sm:text-4xl md:text-5xl font-black text-[#CC0000] tracking-wide mb-4"
                >
                  745 HP / 1,000 NM
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                  className="text-sm md:text-base text-[#666666] max-w-xl font-medium leading-relaxed"
                >
                  {currentPhase.description}
                </motion.p>
              </div>

              {/* Right Column: Three Stacked Specs with Red Underlines */}
              <div className="lg:col-span-4 flex flex-col lg:items-end justify-end">
                <motion.div
                  variants={itemVariants}
                  className="bg-white/95 backdrop-blur-md border border-[#E0E0E0] p-6 max-w-xs w-full corner-brackets shadow-sm space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-[10px] text-[#666666] tracking-[0.2em] font-semibold uppercase"
                      >
                        PEAK POWER
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-xl font-black text-[#111111]"
                      >
                        745 HP
                      </span>
                    </div>
                    <div className="w-full h-[1.5px] bg-[#CC0000]" />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-[10px] text-[#666666] tracking-[0.2em] font-semibold uppercase"
                      >
                        MAX TORQUE
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-xl font-black text-[#111111]"
                      >
                        1,000 NM
                      </span>
                    </div>
                    <div className="w-full h-[1.5px] bg-[#CC0000]" />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-[10px] text-[#666666] tracking-[0.2em] font-semibold uppercase"
                      >
                        0–100 KM/H
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        className="text-xl font-black text-[#CC0000]"
                      >
                        2.8 SEC
                      </span>
                    </div>
                    <div className="w-full h-[1.5px] bg-[#CC0000]" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── PERSISTENT BOTTOM BAR ── */}
      <div className="w-full flex items-end justify-between pb-2 z-20">
        {/* Empty left spacer */}
        <div className="w-32 hidden md:block" />

        {/* Bottom Center: Scroll Indicator (Phase 1 only, disappears when scroll > 0.05) */}
        <div className="mx-auto flex flex-col items-center">
          <motion.div
            animate={{
              opacity: scrollVal > 0.05 ? 0 : 1,
              y: scrollVal > 0.05 ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-[1.5px] h-8 bg-[#CC0000] mb-2"
            />
            <span
              style={{ fontFamily: 'var(--font-orbitron)' }}
              className="text-[9px] font-bold text-[#111111] tracking-[0.3em] uppercase"
            >
              SCROLL
            </span>
          </motion.div>
        </div>

        {/* Bottom-Right: Origin & Year */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#CC0000] animate-pulse" />
          <span
            style={{ fontFamily: 'var(--font-rajdhani)' }}
            className="text-xs font-semibold text-[#666666] tracking-[0.2em] uppercase"
          >
            MODENA, ITALY · 2017
          </span>
        </div>
      </div>
    </div>
  );
}
