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
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display font-bold tracking-tighter leading-[0.8] text-plum-black flex flex-col gap-0 select-none overflow-visible py-3 -my-3">
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
                  className="inline-flex items-end self-end ml-3 sm:ml-4 md:ml-6 h-[2.2rem] sm:h-[3rem] md:h-[4rem] lg:h-[5.1rem] cursor-pointer -translate-y-0.5 sm:-translate-y-1 md:-translate-y-1.5 lg:-translate-y-[0.55rem] opacity-80 hover:opacity-100 transition-opacity duration-300"
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
            <p className="text-lg sm:text-xl md:text-2xl text-plum-black/85 font-sans leading-relaxed tracking-tight">
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
            className="flex flex-wrap items-center gap-4 pt-4"
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
              className="px-8 py-4 bg-cerise hover:bg-coral text-warm-beige font-display font-semibold rounded-full pointer-events-auto flex items-center gap-3 text-sm tracking-wider uppercase group transition-colors duration-350"
            >
              <span>Examine Our Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </motion.button>
            <span className="text-xs font-mono text-plum-black/50 tracking-wider">
              [ SCROLL TO EXPLORE ]
            </span>
          </motion.div>
        </div>

        {/* Cinematic Illustration Collage Showcase Column */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end">
          {/* Subtle slow-pulse ambient radial lights behind the collage image */}
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

          <motion.div
            style={{ x: collageX, y: collageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center select-none"
          >
            {/* The primary transparent-background PNG illustration of our studio characters */}
            <img
              src="/src/assets/images/syam_hero_unbordered_1779884062489.png"
              alt="SYAM Creative Studio Illustration"
              className="w-full h-auto max-h-[460px] lg:max-h-[530px] object-contain will-change-transform hover:scale-[1.03] transition-transform duration-[1500ms] ease-out select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Floating abstract geometrical shapes reinforcing dimensionality */}
          <motion.div
            style={{ x: floatX, y: floatY }}
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.06, 0.94, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-6 -left-6 w-16 h-16 bg-coral/10 rounded-2xl border border-coral/20 pointer-events-none backdrop-blur-sm hidden sm:block flex items-center justify-center font-mono text-[9px] text-coral/40"
          >
            VEC_C
          </motion.div>

          <motion.div
            style={{ x: floatX, y: floatY }}
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.04, 1],
              boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "0 15px 25px -5px rgba(243, 19, 101, 0.25), 0 10px 10px -5px rgba(243, 19, 101, 0.05)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              ]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 right-12 px-4 py-2 bg-cerise text-warm-beige text-[11px] font-mono rounded-lg shadow-md pointer-events-none hidden sm:block uppercase tracking-wider"
          >
            ● MOTION READY
          </motion.div>
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
