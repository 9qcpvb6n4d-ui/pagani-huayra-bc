'use client';

import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from '@/components/Navbar';
import HuayraScrollCanvas from '@/components/HuayraScrollCanvas';
import HuayraExperience from '@/components/HuayraExperience';
import SpecsGrid from '@/components/SpecsGrid';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // RULE 3: Master Scroll Architecture — attached to the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // RULE 4: Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#FFFFFF' }} className="relative bg-white text-[#111111]">
      <Navbar />

      {/* SCROLL SEQUENCE — locked for 600vh */}
      <section
        ref={containerRef}
        style={{ height: '600vh', position: 'relative' }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 0: Canvas z-0 */}
          <HuayraScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={100}
            imageFolderPath="/images/huayra-sequence"
          />

          {/* Layer 1: Subtle vignette — very light, just enough for text contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              pointerEvents: 'none',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 15%, transparent 80%, rgba(255,255,255,0.7) 100%)',
            }}
          />

          {/* Layer 2: HUD z-10 */}
          <HuayraExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE — scrolls naturally */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#FFFFFF' }}>
        <SpecsGrid />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}
