import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, Target, Heart, Compass } from 'lucide-react';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Interactive state for 3D card tilt & gaze reflection
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [cardHovered, setCardHovered] = useState(false);

  // Scroll Progress capture for beautiful kinetic backdrop movement
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const abstractRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const pillars = [
    {
      index: '01',
      tag: 'CRAFT PRECISION',
      title: 'Architectural Curve Control',
      desc: 'No blurry linework or lazy keyframes. Every vector node, timing arc, and easing curve is optimized to absolute mechanical precision.',
      icon: <Target className="w-5 h-5 text-[#13070E]" />,
      color: 'text-[#13070E]',
      lightGlow: 'bg-[#13070E]/8 border-[#13070E]/15',
    },
    {
      index: '02',
      tag: 'HUMAN VOICES',
      title: 'Direct Creative Dialogue',
      desc: 'Formality is a waste of creative energy. We collaborate under absolute structural honesty, drafting sketches and answers within a single day.',
      icon: <Heart className="w-5 h-5 text-[#13070E]" />,
      color: 'text-[#13070E]',
      lightGlow: 'bg-[#13070E]/8 border-[#13070E]/15',
    },
    {
      index: '03',
      tag: 'COHESIVE SPECTRUM',
      title: 'The Integrated Spectrum',
      desc: 'We unify flat digital art, stylized characters, custom typography, and buttery keyframes into a single coherent visual language.',
      icon: <Compass className="w-5 h-5 text-[#13070E]" />,
      color: 'text-[#13070E]',
      lightGlow: 'bg-[#13070E]/8 border-[#13070E]/15',
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % pillars.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  // 3D Glassmorphism tilt handler base calculations
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Sophisticated physics angles (-12 to 12 deg offset limit)
    const rX = -(y - yc) / (rect.height / 10);
    const rY = (x - xc) / (rect.width / 10);

    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(gX);
    setGlareY(gY);
    setCardHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCardHovered(false);
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 28 },
        opacity: { duration: 0.18 },
      },
    }),
  };

  // Structural Entrance Animations Triggered When Section Entered
  const entranceContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const entranceItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 18
      }
    }
  };

  return (
    <section 
      id="about-section" 
      ref={containerRef}
      className="py-28 px-6 sm:px-12 md:px-24 bg-gradient-to-br from-[#F31365] via-[#DE0E58] to-[#AA003D] text-warm-beige relative overflow-hidden select-none"
    >
      {/* Structural Drafting Board Grid with smooth scrolling parallax offset */}
      <motion.div 
        className="absolute inset-0 theme-grid-dark pointer-events-none" 
        style={{
          opacity: 1.0,
          y: parallaxY,
          backgroundImage: `
            linear-gradient(to right, rgba(247, 244, 240, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(247, 244, 240, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Dynamic Animated Motion SVG Vector Paths */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg className="w-full h-full min-w-[800px]" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M-100,450 C300,100 800,600 1600,250" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeDasharray="6,12"
            initial={{ pathLength: 0, strokeDashoffset: 0 }}
            whileInView={{ pathLength: 1, strokeDashoffset: [0, -36] }}
            viewport={{ once: false }}
            transition={{ 
              pathLength: { duration: 4, ease: "easeInOut" },
              strokeDashoffset: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.path 
            d="M-50,200 C400,500 900,50 1500,600" 
            stroke="#13070E" 
            strokeWidth="1" 
            strokeDasharray="8,16"
            initial={{ pathLength: 0, strokeDashoffset: 0 }}
            whileInView={{ pathLength: 1, strokeDashoffset: [0, 48] }}
            viewport={{ once: false }}
            transition={{ 
              pathLength: { duration: 4.8, ease: "easeInOut", delay: 0.3 },
              strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear" }
            }}
          />
        </svg>
      </div>

      {/* Ambient Radial Color Spots */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#13070E]/35 blur-[145px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#F7F4F0]/20 blur-[110px] pointer-events-none" />

      {/* Rotating abstract vector compass indicator floating in the backdrop */}
      <motion.div 
        style={{ rotate: abstractRotate }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-12 right-12 w-28 h-28 border border-white/10 rounded-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-24 h-24 border border-dashed border-white/20 rounded-full flex items-center justify-center">
          <div className="w-2 h-16 bg-white/20 rounded-full" />
        </div>
      </motion.div>

      {/* Drafting Crosshairs */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-warm-beige/40 pointer-events-none animate-pulse" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-warm-beige/40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-warm-beige/40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-[#F7F4F0]/.4 pointer-events-none animate-pulse" />

      {/* Decorative top border with dynamic scroll scale transition */}
      <div className="absolute top-0 left-0 w-full h-px bg-warm-beige/25" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={entranceContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* LEFT COLUMN: Clean, minimalist introductory context */}
          <motion.div variants={entranceItemVariants} className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-warm-beige/95 font-mono text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-warm-beige/95" style={{ animationDuration: '6s' }} />
              <span>THE STUDIO</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight leading-[1.1] text-warm-beige">
              Vibrant{' '} 
              <motion.span 
                whileHover={{ 
                  y: -3,
                  color: "#FFFFFF", 
                  textShadow: "0 0 12px rgba(216,180,254,0.6)",
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative inline-block text-[#D8B4FE] italic font-display font-semibold cursor-help select-none origin-center"
              >
                visual craft
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D8B4FE]/60" 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </motion.span>{' '}
              engineered with{' '}
              <motion.span 
                whileHover={{ 
                  y: -3,
                  color: "#FFFFFF", 
                  textShadow: "0 0 12px rgba(216,180,254,0.6)",
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative inline-block text-[#D8B4FE] italic font-display font-semibold cursor-help select-none origin-center"
              >
                precise
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D8B4FE]/60" 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </motion.span>{' '}
              digital motion.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-warm-beige leading-relaxed tracking-tight max-w-xl opacity-90">
              Formed by brothers Faiz, Mudhhir, and Irsyad, SYAM is a compact digital practice blending digital illustration, character art direction, logo mechanics, and kinetic animation. We work without corporate friction, keeping our production transparent, direct, and deliberate.
            </p>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Animated Card with Premium White Glassmorphism Styling */}
          <motion.div variants={entranceItemVariants} className="lg:col-span-6 space-y-5 pt-8 lg:pt-0">
            
            {/* Header labels with high-contrast elements around the card */}
            <div className="flex items-center justify-between px-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#13070E] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13070E] animate-ping" />
                [ STUDIO PILL ]
              </span>
              <span className="font-mono text-xs text-warm-beige font-extrabold uppercase tracking-widest opacity-80">
                METRICS INDEX
              </span>
            </div>

            {/* Premium clean high-quality white glassmorphism card with real-time 3D cursor tracking */}
            <div 
              style={{ perspective: 1200 }} 
              className="relative rounded-3xl"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  scale: cardHovered ? 1.02 : 1,
                  y: cardHovered ? -4 : [0, -4, 0],
                }}
                transition={cardHovered ? {
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                  mass: 0.4
                } : {
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  default: {
                    type: 'spring',
                    stiffness: 280,
                    damping: 24
                  }
                }}
                className={`relative bg-white/20 backdrop-blur-3xl border-2 border-white/60 rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(19,7,14,0.35)] overflow-hidden min-h-[220px] transition-all duration-300 ${
                  cardHovered ? 'border-white' : ''
                }`}
              >
                {/* Active vector blueprint guidelines showing on hovering */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none border border-dashed border-[#13070E]/5 rounded-3xl m-[3%] transition-opacity duration-500" 
                  animate={{ opacity: cardHovered ? 0.8 : 0.2 }}
                />

                {/* Glare flare simulation layer */}
                {cardHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-75 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 240px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
                    }}
                  />
                )}

                <div className="relative z-10 select-none">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-2.5 rounded-xl border transition-all duration-300 ${pillars[activeIndex].lightGlow}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {pillars[activeIndex].icon}
                        </motion.div>
                        <span className={`font-mono text-[11px] font-extrabold tracking-widest uppercase ${pillars[activeIndex].color}`}>
                          {pillars[activeIndex].tag}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#13070E] tracking-tight font-sans">
                          {pillars[activeIndex].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#13070E]/85 leading-relaxed font-sans max-w-lg">
                          {pillars[activeIndex].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Controls panel placed below the card with high contrast glass controls */}
            <div className="flex items-center justify-between px-2 pt-1">
              
              {/* Page indexes with highly visible solid active indicators */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {pillars.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === i ? 'w-5 bg-warm-beige' : 'w-1.5 bg-warm-beige/55 hover:bg-warm-beige/85 hover:scale-110'
                      }`}
                      data-hover-text={`Index 0${i + 1}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs text-warm-beige font-extrabold ml-2">
                  0{activeIndex + 1} / 0{pillars.length}
                </span>
              </div>

              {/* Navigation button triggers */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  data-hover-text="Prev"
                  className="p-2.5 bg-white/12 hover:bg-white/22 border-2 border-white/50 text-white rounded-xl transition-all cursor-pointer pointer-events-auto shadow-md"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  data-hover-text="Next"
                  className="p-2.5 bg-white hover:bg-[#F31365] text-[#13070E] hover:text-white border-2 border-white rounded-xl transition-all shadow-lg cursor-pointer pointer-events-auto font-bold"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
