'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue } from 'framer-motion';

interface HuayraScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  imageFolderPath?: string;
}

export default function HuayraScrollCanvas({
  scrollYProgress,
  totalFrames = 100,
  imageFolderPath = '/images/huayra-sequence',
}: HuayraScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Render a specific frame on canvas with Retina DPR & object-fit: contain
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      const cssWidth = rect.width;
      const cssHeight = rect.height;

      const dpr = window.devicePixelRatio || 1;

      // Ensure canvas internal resolution matches high-DPI
      const targetCanvasWidth = Math.round(cssWidth * dpr);
      const targetCanvasHeight = Math.round(cssHeight * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      // RULE 2: Canvas background must be WHITE
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Object-fit: contain calculations to center the car
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgRatio = imgWidth / imgHeight;
      const containerRatio = cssWidth / cssHeight;

      let drawWidth = cssWidth;
      let drawHeight = cssHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (containerRatio > imgRatio) {
        // Container is wider than image
        drawHeight = cssHeight;
        drawWidth = cssHeight * imgRatio;
        offsetX = (cssWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Container is taller than image
        drawWidth = cssWidth;
        drawHeight = cssWidth / imgRatio;
        offsetX = 0;
        offsetY = (cssHeight - drawHeight) / 2;
      }

      // Draw high-quality smoothed image
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      ctx.restore();
      currentFrameRef.current = index;
    },
    []
  );

  // Preload all frames on mount
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      const percent = Math.floor((loadedCount / totalFrames) * 100);
      setLoadProgress(percent);

      if (loadedCount === totalFrames) {
        setIsLoading(false);
        // Draw the initial frame corresponding to current scroll
        const initialProgress = scrollYProgress.get();
        const initialIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(initialProgress * (totalFrames - 1)))
        );
        renderFrame(initialIndex);
      }
    };

    const handleImageError = (index: number) => {
      console.warn(`Frame ${index + 1} failed to load from ${imageFolderPath}`);
      // Treat as loaded to prevent hanging the loader
      handleImageLoad();
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `${imageFolderPath}/${i + 1}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = () => handleImageError(i);
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [totalFrames, imageFolderPath, renderFrame, scrollYProgress]);

  // Subscribe to scrollYProgress and redraw ONLY when frameIndex changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      if (isLoading) return;

      const clamped = Math.min(1, Math.max(0, latest));
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.floor(clamped * (totalFrames - 1))
      );

      if (targetIndex !== currentFrameRef.current) {
        renderFrame(targetIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, totalFrames, isLoading, renderFrame]);

  // Handle Resize via ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      if (!isLoading && currentFrameRef.current >= 0) {
        renderFrame(currentFrameRef.current);
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [isLoading, renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-white flex flex-col items-center justify-center">
          <div className="w-64 max-w-[85vw] flex flex-col items-center">
            {/* Pagani Monogram */}
            <div className="w-12 h-12 border border-[#CC0000] flex items-center justify-center mb-6">
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="text-[#CC0000] font-black text-xl"
              >
                P
              </span>
            </div>

            {/* Title */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="text-xs font-bold text-[#111111] tracking-[0.3em]"
              >
                HUAYRA BC
              </span>
              <span className="text-[#CC0000] text-xs font-bold">/</span>
              <span
                style={{ fontFamily: 'var(--font-rajdhani)' }}
                className="text-xs font-semibold text-[#666666] tracking-[0.2em]"
              >
                CALIBRATING HUD
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-[#E0E0E0] overflow-hidden relative mb-3">
              <div
                className="h-full bg-[#CC0000] transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Percentage & Loading text */}
            <div className="w-full flex justify-between items-center text-[10px] text-[#666666]">
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="tracking-[0.2em] font-semibold text-[#CC0000]"
              >
                LOADING SEQUENCE
              </span>
              <span
                style={{ fontFamily: 'var(--font-orbitron)' }}
                className="font-bold text-[#111111]"
              >
                {loadProgress}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
