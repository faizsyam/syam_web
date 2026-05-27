import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveCursor from './components/InteractiveCursor';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import SyamLogo from './components/SyamLogo';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';

const IMAGES_TO_PRELOAD = [
  '/src/assets/images/syam_hero_unbordered_1779884062489.png',
  '/src/assets/images/syam_illustration_1779856834169.png',
  '/src/assets/images/syam_character_1779856812200.png',
  '/src/assets/images/syam_kinetic_1779856854167.png',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=600&h=600&q=80'
];

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  // Scroll to section function
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrolledPastHero(window.scrollY > window.innerHeight - 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    const startTime = Date.now();
    const MIN_LOAD_TIME = 4800; // Complete 4.8s time for cinematic slow tracing and high-radius bloom glow

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    };

    const preloadAll = async () => {
      let loadedCount = 0;
      await Promise.all(
        IMAGES_TO_PRELOAD.map(async (src) => {
          await preloadImage(src);
          if (active) {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / IMAGES_TO_PRELOAD.length) * 100));
          }
        })
      );

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOAD_TIME - elapsed);

      setTimeout(() => {
        if (active) {
          setLoading(false);
        }
      }, remaining);
    };

    preloadAll();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* Custom trailing interactive cursor */}
      <InteractiveCursor />

      {/* 1. STUDIO LOGO PRELOADER */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 bg-[#13070E] flex flex-col items-center justify-center select-none"
          >
            {/* Animated letterforms demonstrating kinetic logo capabilities */}
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: [0.85, 1.1, 1], opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="flex items-center justify-center mb-6 overflow-visible"
                style={{ overflow: 'visible' }}
              >
                {/* Custom premium white-and-cerise animated SyamLogo representation */}
                <SyamLogo 
                  size={190} 
                  fillColor="#F31365" 
                  strokeColor="#F31365"
                  strokeWidth={2}
                  className="overflow-visible"
                  animate={true}
                />
              </motion.div>

              <div className="overflow-hidden mb-1">
                <motion.h2
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold text-4xl tracking-widest text-[#F7F4F0]"
                >
                  SYAM
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1.2, ease: 'easeOut' }}
                className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#F7F4F0]/60 text-center leading-loose mt-3"
              >
                <div className="mb-1 flex items-center justify-center gap-1.5">
                  Creative Craft
                </div>
                <div className="opacity-80">and Motion Studio</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE INTERFACE */}
      {!loading && (
        <div className="min-h-screen bg-warm-beige text-plum-black relative flex flex-col w-full overflow-x-hidden">
                   {/* FLOATING GLASS NAVIGATION HEADER */}
          <header className={`fixed left-1/2 -translate-x-1/2 z-45 w-[92vw] max-w-7xl flex items-center justify-between select-none transition-all duration-500 ease-[0.16,1,0.3,1] ${
            scrolledPastHero
              ? 'top-4 bg-transparent border-transparent backdrop-blur-none shadow-none pointer-events-none'
              : scrolled 
                ? 'top-3 py-2 px-6 bg-white/35 border-white/80 backdrop-blur-3xl border-2 shadow-[0_25px_60px_-15px_rgba(19,7,14,0.15)] rounded-2xl w-[92vw]' 
                : 'top-6 py-4 px-6 bg-white/15 border-white/45 backdrop-blur-2xl border-2 shadow-[0_15px_40px_rgba(19,7,14,0.06)] rounded-2xl w-[92vw]'
          }`}>
            {/* Logo Pill */}
            <div className={`transition-all duration-500 rounded-2xl flex items-center pointer-events-auto h-full ${
              scrolledPastHero
                ? 'bg-white/35 border border-white/50 shadow-[0_12px_28px_rgba(19,7,14,0.08)] backdrop-blur-2xl px-4 py-2 rounded-full hover:scale-105 hover:bg-white/55 hover:border-white/75'
                : 'bg-transparent border-transparent'
            }`}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-hover-text="SYAM"
                className="flex items-center gap-1.5 group cursor-pointer"
              >
                <div className="flex items-center justify-center bg-[#D22055] rounded-xl p-1.5 w-9.5 h-9.5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:rotate-[6deg] active:scale-95 overflow-hidden">
                  <SyamLogo 
                    size={22} 
                    fillColor="#FFFFFF" 
                    animate={false}
                  />
                </div>
                <span className="font-display font-bold text-lg tracking-wider text-plum-black transition-colors group-hover:text-cerise">
                  SYAM
                  <span className="text-cerise text-xs font-mono font-normal tracking-normal ml-0.5">LAB</span>
                </span>
              </button>
            </div>

            {/* Desktop anchors row Pill */}
            <nav className={`hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider text-plum-black/70 transition-all duration-500 pointer-events-auto ${
              scrolledPastHero
                ? 'bg-white/35 border border-white/50 shadow-[0_12px_28px_rgba(19,7,14,0.08)] backdrop-blur-2xl px-7 py-2 rounded-full hover:bg-white/55 hover:border-white/75'
                : 'bg-transparent border-transparent'
            }`}>
              <button
                onClick={() => scrollToSection('about-section')}
                data-hover-text="belief"
                className="hover:text-coral relative py-1 group/btn transition-colors duration-300 cursor-pointer"
              >
                PHILOSOPHY
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover/btn:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('portfolio-section')}
                data-hover-text="portfolio"
                className="hover:text-cerise relative py-1 group/btn transition-colors duration-300 cursor-pointer"
              >
                THE WORK
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cerise group-hover/btn:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('team-section')}
                data-hover-text="brothers"
                className="hover:text-plum-black relative py-1 group/btn transition-colors duration-300 cursor-pointer"
              >
                THE TEAM
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-plum-black group-hover/btn:w-full transition-all duration-300" />
              </button>
            </nav>

            {/* Actions anchor CTA Pill */}
            <div className={`hidden md:block transition-all duration-500 pointer-events-auto ${
              scrolledPastHero
                ? 'bg-white/35 border border-white/50 shadow-[0_12px_28px_rgba(19,7,14,0.08)] backdrop-blur-2xl p-1 rounded-full scale-95 hover:scale-100 hover:bg-white/55 hover:border-white/75'
                : 'bg-transparent border-transparent'
            }`}>
              <button
                onClick={() => scrollToSection('contact-section')}
                data-hover-text="Connect"
                className={`flex items-center gap-2 font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  scrolledPastHero
                    ? 'px-5 py-2.5 bg-cerise hover:bg-coral text-warm-beige rounded-full shadow-[0_8px_20px_rgba(243,19,101,0.15)] group'
                    : 'px-5 py-2.5 bg-plum-black hover:bg-cerise text-warm-beige rounded-xl shadow-lg group'
                }`}
              >
                Get in Touch
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile menu trigger Pill */}
            <div className={`md:hidden flex items-center justify-center transition-all duration-500 pointer-events-auto ${
              scrolledPastHero
                ? 'w-11 h-11 bg-white/35 border border-white/50 shadow-[0_12px_28px_rgba(19,7,14,0.08)] backdrop-blur-2xl rounded-full hover:scale-105 hover:bg-white/55 hover:border-white/75'
                : 'bg-transparent border-transparent'
            }`}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-plum-black cursor-pointer flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* MOBILE NAVIGATION OVERLAY */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-30 bg-[#13070E] py-28 px-8 flex flex-col justify-between text-warm-beige md:hidden pointer-events-auto"
              >
                <div className="space-y-12">
                  <p className="font-mono text-[9px] text-coral/60 uppercase tracking-widest">
                    [ Studio Directory ]
                  </p>
                  <nav className="flex flex-col space-y-6 font-display font-bold text-3xl tracking-tight">
                    <button
                      onClick={() => scrollToSection('portfolio-section')}
                      className="text-left hover:text-cerise transition-colors"
                    >
                      Selected Work
                    </button>
                    <button
                      onClick={() => scrollToSection('about-section')}
                      className="text-left hover:text-coral transition-colors"
                    >
                      Our Credo
                    </button>
                    <button
                      onClick={() => scrollToSection('team-section')}
                      className="text-left hover:text-violet-400 transition-colors"
                    >
                      The Team
                    </button>
                    <button
                      onClick={() => scrollToSection('contact-section')}
                      className="text-left text-cerise font-extrabold flex items-center gap-2"
                    >
                      Let's Talk →
                    </button>
                  </nav>
                </div>

                <div className="pt-8 border-t border-warm-beige/10 font-mono text-xs text-warm-beige/50 uppercase tracking-widest">
                  <p>SYAM Creative Lab © 2026</p>
                  <p className="text-[10px] mt-1 text-coral font-bold">● STUDIO ACTIVE</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN WEB STREAM COMPONENT STACKS */}
          <main className="w-full flex-grow pt-10">
            {/* The single-page vertical scroll segments */}
            <Hero onScrollToWork={() => scrollToSection('portfolio-section')} />
            <About />
            <Portfolio />
            <Team />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
