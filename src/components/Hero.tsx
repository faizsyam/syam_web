import { useState, MouseEvent, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import SyamLogo from './SyamLogo';

interface HeroProps {
  onScrollToWork: () => void;
}

export default function Hero({ onScrollToWork }: HeroProps) {
  // Let's break the headline into individual chars for Kinematic Typography showcase
  const studioNameList = 'SYAM'.split('');
  const labNameList = 'Creative Lab'.split('');

  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroFinished(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Mouse Coordinates for Parallax Depth Mapping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  // Parallax transformations for layered visual objects
  const gridX = useTransform(parallaxX, [-400, 400], [-15, 15]);
  const gridY = useTransform(parallaxY, [-400, 400], [-15, 15]);

  const collageX = useTransform(parallaxX, [-400, 400], [-25, 25]);
  const collageY = useTransform(parallaxY, [-400, 400], [-25, 25]);

  // Layer-specific parallax transformations for the 3 PNG layers
  const bgX = useTransform(parallaxX, [-400, 400], [-10, 10]);
  const bgY = useTransform(parallaxY, [-400, 400], [-10, 10]);

  // Label layers placed intermediate to add a float-above effect
  const bgLabelX = useTransform(parallaxX, [-400, 400], [-16, 16]);
  const bgLabelY = useTransform(parallaxY, [-400, 400], [-16, 16]);

  const midX = useTransform(parallaxX, [-400, 400], [-25, 25]);
  const midY = useTransform(parallaxY, [-400, 400], [-25, 25]);

  const midLabelX = useTransform(parallaxX, [-400, 400], [-33, 33]);
  const midLabelY = useTransform(parallaxY, [-400, 400], [-33, 33]);

  const fgX = useTransform(parallaxX, [-400, 400], [-45, 45]);
  const fgY = useTransform(parallaxY, [-400, 400], [-45, 45]);

  const fgLabelX = useTransform(parallaxX, [-400, 400], [-55, 55]);
  const fgLabelY = useTransform(parallaxY, [-400, 400], [-55, 55]);

  const floatX = useTransform(parallaxX, [-400, 400], [20, -20]);
  const floatY = useTransform(parallaxY, [-400, 400], [20, -20]);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 120, rotate: 15, opacity: 0 },
    visible: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-8 px-6 sm:px-12 md:px-24 overflow-hidden bg-warm-beige theme-grid-light select-none"
    >
      {/* Dynamic kinetic grid background syncing with mouse positions */}
      <motion.div 
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 h-full pointer-events-none opacity-[0.08]"
      >
        <div className="border-r border-plum-black h-full" />
        <div className="border-r border-plum-black h-full" />
        <div className="border-r border-[#13070E] h-full hidden md:block" />
        <div className="border-r border-plum-black h-full" />
        <div className="border-r border-plum-black h-full hidden md:block" />
        <div className="h-full" />
      </motion.div>


      {/* Drafting Crosshairs & Alignment Marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-plum-black/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-plum-black/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-plum-black/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-plum-black/20 pointer-events-none" />

      {/* Decorative digital layout grid labels */}
      <div className="absolute top-8 left-6 sm:left-12 flex justify-between w-[calc(100%-3rem)] sm:w-[calc(100%-6rem)] font-mono text-[10px] text-plum-black/40 pointer-events-none uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-cerise" />
          </motion.div>
          <span>EST. 2024 · DIGITAL PRACTICE</span>
        </div>
        <div className="hidden sm:block">MOTION & DIGITAL CRAFT</div>
        <div>V2.0 · VERTICAL FLOW</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 lg:mt-6 w-full max-w-7xl mx-auto flex-grow">
        {/* Typographic Core column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsIntroFinished(true)}
            className={isIntroFinished ? "overflow-visible" : "overflow-hidden"}
          >
            {/* Main Kinematic Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.2rem] font-display font-bold tracking-tighter leading-[0.8] text-plum-black flex flex-col gap-0 select-none overflow-visible py-3 -my-3">
              <span className={`flex pb-1.5 text-cerise flex-wrap transition-all duration-300 py-1.5 -my-1.5 overflow-visible ${isIntroFinished ? "overflow-visible" : "overflow-hidden"}`}>
                {studioNameList.map((char, index) => (
                  <motion.span
                    key={`s-${index}`}
                    variants={letterVariants}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: index % 2 === 0 ? 8 : -8,
                      color: '#FF5A5F',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="inline-block origin-bottom-left cursor-help font-extrabold pr-0.5"
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Inline Premium Design SyamLogo outline next to 'SYAM' */}
                <motion.div
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                  variants={letterVariants}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 6,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="inline-flex items-end self-end ml-3 sm:ml-4 md:ml-6 h-[1.8rem] sm:h-[2.5rem] md:h-[3.3rem] lg:h-[4.3rem] cursor-pointer -translate-y-0.5 sm:-translate-y-0.8 md:-translate-y-1 lg:-translate-y-[0.45rem] opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <SyamLogo
                    fillColor={isLogoHovered ? "#F31365" : "none"}
                    strokeColor="#F31365"
                    strokeWidth={1}
                    animate={false}
                    className="h-full w-auto transition-all duration-300"
                  />
                </motion.div>

              </span>
              <span className={`flex pb-3 text-plum-black flex-wrap -mt-1 sm:-mt-2 md:-mt-3 transition-all duration-300 py-1.5 -my-1.5 overflow-visible ${isIntroFinished ? "overflow-visible" : "overflow-hidden"}`}>
                {labNameList.map((char, index) => (
                  <motion.span
                    key={`l-${index}`}
                    variants={letterVariants}
                    whileHover={{ 
                      scale: 1.12, 
                      rotate: index % 2 === 0 ? -6 : 6,
                      color: '#F31365',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className="inline-block origin-bottom-left whitespace-pre cursor-help font-bold"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Tagline showing studio's creative range */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="max-w-xl space-y-4"
          >
            <p className="text-base sm:text-lg md:text-xl text-plum-black/85 font-sans leading-relaxed tracking-tight">
              We work across{' '}
              <span className="relative inline-block font-semibold text-cerise transition-all duration-300 hover:text-coral hover:-translate-y-0.5 border-b-2 border-cerise/20 cursor-comment">
                graphic design
              </span>,{' '}
              <span className="relative inline-block font-semibold text-coral transition-all duration-300 hover:text-cerise hover:-translate-y-0.5 border-b-2 border-coral/20 cursor-comment">
                illustration
              </span>,{' '}
              <span className="relative inline-block font-semibold text-cerise/90 transition-all duration-300 hover:text-coral hover:-translate-y-0.5 border-b-2 border-cerise/15 cursor-comment">
                motion
              </span>, and spaces between them. We make brand feels more alive.
            </p>
          </motion.div>

          {/* Interactive action anchors */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <motion.button
              onClick={onScrollToWork}
              data-hover-text="Explore"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 10px 15px -3px rgba(243, 19, 101, 0.35), 0 4px 6px -2px rgba(243, 19, 101, 0.1)",
                  "0 20px 25px -5px rgba(243, 19, 101, 0.55), 0 10px 10px -5px rgba(243, 19, 101, 0.15)",
                  "0 10px 15px -3px rgba(243, 19, 101, 0.35), 0 4px 6px -2px rgba(243, 19, 101, 0.1)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3 bg-cerise hover:bg-coral text-warm-beige font-display font-semibold rounded-full pointer-events-auto flex items-center gap-2.5 text-xs tracking-wider uppercase group transition-colors duration-350"
            >
              <span>Examine Our Work</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-300" />
            </motion.button>
            <span className="text-[10px] font-mono text-plum-black/50 tracking-wider">
              [ SCROLL TO EXPLORE ]
            </span>
          </motion.div>
        </div>

        {/* Cinematic Illustration Collage Showcase Column */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end">
          <motion.div 
            animate={{
              opacity: [0.1, 0.18, 0.1],
              scale: [0.93, 1.04, 0.93],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-4 -top-4 w-72 h-72 rounded-full bg-cerise/20 blur-[80px] pointer-events-none"
          />
          <motion.div 
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1.03, 0.92, 1.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-4 -bottom-4 w-80 h-80 rounded-full bg-coral/20 blur-[80px] pointer-events-none"
          />
          {/* Subtle Geometric Background Decorations */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.28]">
            {/* Concentric rotating drafting circle */}
            <motion.div
              style={{ x: bgX, y: bgY }}
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-plum-black/8 flex items-center justify-center"
            >
              <div className="w-[360px] h-[360px] rounded-full border border-dashed border-plum-black/5" />
              <div className="w-[240px] h-[240px] rounded-full border border-cerise/10 flex items-center justify-center">
                <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-coral/8" />
              </div>
            </motion.div>
            
            {/* Architectural draft lines & coordinates */}
            <motion.div
              style={{ x: gridX, y: gridY }}
              className="absolute w-[480px] h-[480px] border border-plum-black/5 pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-plum-black/5" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-plum-black/5" />
              <div className="absolute top-2 left-2 text-[8px] font-mono text-plum-black/25 tracking-wider">[ LAT_S.06 ]</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-plum-black/25 tracking-wider">[ ROT_Y_PRX ]</div>
            </motion.div>
          </div>

          <div className="relative w-full h-[350px] sm:h-[460px] lg:h-[530px] max-w-lg lg:max-w-none select-none flex items-center justify-center overflow-visible">
            {/* Layer 1: Background Illustration (Cosmic Workspace) */}
            <motion.div
              style={{ x: bgX, y: bgY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible"
            >
              <img
                src="/src/assets/images/syam_hero_3.png"
                alt="SYAM Creative Studio - Background Illustration"
                style={{ transform: 'scale(0.67) translate(-40%, -30%)', filter: 'drop-shadow(0 15px 35px rgba(19, 7, 14, 0.16))' }}
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Layer 2: Background Label (Web Development) */}
            <motion.div
              style={{ x: bgLabelX, y: bgLabelY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible z-10"
            >
              <div className="absolute left-[-15%] top-[30%] px-3 py-1.5 bg-[#13070E]/85 border border-[#13070E]/20 text-[#F7F4F0] text-[10px] font-mono rounded-lg shadow-[0_8px_30px_rgba(19,7,14,0.15)] tracking-widest uppercase backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" />
                Web Development
              </div>
            </motion.div>

            {/* Layer 3: Midground Character (Neon Nomad) */}
            <motion.div
              style={{ x: midX, y: midY }}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.5 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible z-20"
            >
              <img
                src="/src/assets/images/syam_hero_2.png"
                alt="SYAM Creative Studio - Character Design"
                style={{ transform: 'scale(0.7) translate(25%, -18%)', filter: 'drop-shadow(0 20px 45px rgba(19, 7, 14, 0.22))' }}
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Layer 4: Midground Label (Digital Illustration) */}
            <motion.div
              style={{ x: midLabelX, y: midLabelY }}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.65 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible z-30"
            >
              <div className="absolute right-[-5%] top-[45%] px-3 py-1.5 bg-[#FF5A5F]/95 border border-[#FF5A5F]/20 text-[#F7F4F0] text-[10px] font-mono rounded-lg shadow-[0_8px_30px_rgba(255,90,95,0.15)] tracking-widest uppercase backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F31365]" />
                Digital Illustration
              </div>
            </motion.div>

            {/* Layer 5: Foreground Typography (Kinetic Trails) */}
            <motion.div
              style={{ x: fgX, y: fgY }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible z-40"
            >
              <img
                src="/src/assets/images/syam_hero_1.png"
                alt="SYAM Creative Studio - Kinetic Typography"
                style={{ transform: 'scale(0.74) translate(-20%, 20%)', filter: 'drop-shadow(0 25px 60px rgba(19, 7, 14, 0.32))' }}
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Layer 6: Foreground Label (Motion Design) */}
            <motion.div
              style={{ x: fgLabelX, y: fgLabelY }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform overflow-visible z-50"
            >
              <div className="absolute left-[5%] bottom-[25%] px-3 py-1.5 bg-[#F31365]/95 border border-[#F31365]/20 text-[#F7F4F0] text-[10px] font-mono rounded-lg shadow-[0_8px_30px_rgba(243,19,101,0.15)] tracking-widest uppercase backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7F4F0] animate-ping" style={{ animationDuration: '3s' }} />
                Motion Design
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Footnotes & scroll cue */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-plum-black/10 text-xs font-mono text-plum-black/55 space-y-4 sm:space-y-0">
        <div className="flex gap-x-8 gap-y-2 flex-wrap justify-center sm:justify-start">
          <span>[ 01 / ILLUSTRATION ]</span>
          <span>[ 02 / CHARACTER DESIGN ]</span>
          <span>[ 03 / MOTION GRAPHICS ]</span>
          <span>[ 04 / KINEMATIC TYPE ]</span>
        </div>
        <div className="flex items-center gap-2 text-cerise font-bold animate-pulse">
          <span>MOVE CURSOR FOR PARALLAX DEPTH</span>
        </div>
      </div>
    </section>
  );
}
