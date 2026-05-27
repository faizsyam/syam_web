import { useState, MouseEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';
import { Maximize2, X, Sparkles, Filter, Monitor, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

function InteractivePortfolioCard({ item, onClick }: { item: PortfolioItem; onClick: () => void; key?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rX = -(y - yc) / (rect.height / 8);
    const rY = (x - xc) / (rect.width / 8);

    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(gX);
    setGlareY(gY);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovered(false);
  };

  return (
    <motion.div
      layout
      className="relative flex flex-col h-full pointer-events-auto select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: hovered ? 1.025 : 1,
          y: hovered ? -6 : [0, -4, 0],
        }}
        transition={hovered ? {
          type: 'spring',
          stiffness: 300,
          damping: 22,
          mass: 0.4
        } : {
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (item.title.length * 3) % 4 * 0.4
          },
          default: {
            type: 'spring',
            stiffness: 300,
            damping: 22
          }
        }}
        className={`bg-[#180d14] rounded-3xl overflow-hidden border border-warm-beige/5 hover:border-cerise/25 transition-all duration-350 flex flex-col h-full relative cursor-pointer group ${
          hovered ? 'shadow-[0_25px_60px_-15px_rgba(243,19,101,0.25)] border-[#F31365]/40' : 'shadow-lg'
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            animate={{
              scale: hovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Creative Interactive diagonal light sweep reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none" />
          
          {/* Glare Flare on hover */}
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-65"
              style={{
                background: `radial-gradient(circle 200px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
              }}
            />
          )}

          {/* Hover indicator: clean modern overlay focus crop marks */}
          <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-2xl pointer-events-none">
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Hover reveal tags */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-plum-black/85 backdrop-blur-md text-[9px] font-mono text-warm-beige/90 tracking-widest uppercase rounded-full border border-warm-beige/10">
              {item.categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] text-cerise mb-1 uppercase tracking-widest">
              <span>{item.year}</span>
              <span>[ {item.category} ]</span>
            </div>
            <h3 className="font-display font-medium text-lg text-warm-beige transition-colors duration-300 flex items-center justify-between group-hover:text-coral">
              {item.title}
              <ArrowUpRight className="w-4 h-4 text-warm-beige/20 text-cerise opacity-80" />
            </h3>
            <p className="text-xs text-warm-beige/65 mt-2 line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="pt-2 border-t border-warm-beige/5 flex items-center justify-between text-xs font-mono text-warm-beige/40">
            <span>CLIENT SPEC READY</span>
            <span className="text-cerise/80">INSPECT PROCESS →</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isSwiping, setIsSwiping] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateScrollButtons();
    }, 300);

    window.addEventListener('resize', updateScrollButtons);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [selectedCategory]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.45;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      // Update state soon after smooth scroll finishes/animates
      setTimeout(updateScrollButtons, 50);
      setTimeout(updateScrollButtons, 150);
      setTimeout(updateScrollButtons, 300);
      setTimeout(updateScrollButtons, 500);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    setIsSwiping(true);
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
    dragMovedRef.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // drag sensitivity factor multiplier
    if (Math.abs(walk) > 8) {
      dragMovedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Brief timeout ensures click handler registers dragMovedRef before resetting
      setTimeout(() => {
        setIsSwiping(false);
      }, 50);
    }
  };

  const handleItemClick = (e: MouseEvent, item: PortfolioItem) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setActiveItem(item);
  };

  const categories = [
    { id: 'all', label: 'All Practice' },
    { id: 'illustration', label: 'Illustration' },
    { id: 'motion', label: 'Motion Design' },
    { id: 'logo', label: 'Logo Animation' },
    { id: 'typography', label: 'Kinematic Type' },
    { id: 'character', label: 'Characters' },
    { id: 'ai-art', label: 'AI Art Direction' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory || (selectedCategory === 'motion' && item.category === 'logo'));

  const featuredItems = PORTFOLIO_ITEMS.filter(item => item.featured);

  return (
    <section id="portfolio-section" className="py-24 px-6 sm:px-12 md:px-24 bg-plum-black theme-grid-dark text-warm-beige relative overflow-hidden select-none">
      {/* Drafting Crosshairs & Alignment Marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-warm-beige/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-warm-beige/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-warm-beige/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-warm-beige/20 pointer-events-none" />

      {/* Background aesthetics represent kinematic paths */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M-100,200 Q200,600 600,100 T1800,800" 
            fill="none" 
            stroke="#F31365" 
            strokeWidth="2" 
            strokeDasharray="5,15" 
            animate={{ strokeDashoffset: [0, -120] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path 
            d="M-50,400 Q400,100 900,500 T1900,200" 
            fill="none" 
            stroke="#FF5A5F" 
            strokeWidth="1.5" 
            strokeDasharray="6,12"
            animate={{ strokeDashoffset: [0, 120] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Title and implied sorting tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-coral font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>THE PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight">
              Selected{' '}
              <motion.span 
                whileHover={{ 
                  y: -3,
                  color: "#FF5a5f",
                  textShadow: "0 0 12px rgba(243,19,101,0.35)",
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-cerise italic font-display inline-block cursor-help select-none origin-center"
              >
                Craft
              </motion.span>
            </h2>
            <p className="text-warm-beige/65 text-sm sm:text-base max-w-md">
              A dynamic catalog showcasing visual precision across various disciplines. Click any piece to inspect our artistic process.
            </p>
          </motion.div>

          {/* Interactive filter pills with fluid layout sliding capsule background */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-wrap gap-1.5 bg-neutral-950/85 p-1.5 rounded-2xl border border-warm-beige/10 relative"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                data-hover-text={cat.label}
                className="relative px-4 py-2.5 text-[10px] font-mono rounded-xl transition-all duration-300 uppercase tracking-widest z-10 cursor-pointer text-warm-beige/70 hover:text-warm-beige"
              >
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategoryCapsule"
                    className="absolute inset-0 bg-cerise rounded-xl -z-10 shadow-lg border border-white/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={selectedCategory === cat.id ? "font-bold text-white text-[10px]" : "text-[10px]"}>
                  {cat.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* 1ST PART: FULL-VIEWPORT HORIZONTAL PANELS (Featured Showcase) */}
        {selectedCategory === 'all' && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 font-mono text-[11px] text-coral uppercase tracking-widest"
              >
                <Monitor className="w-3.5 h-3.5 animate-pulse" />
                <span>Cinematic Masterpieces (Horizontal Flow)</span>
              </motion.div>
            </div>
            
            {/* Elegant horizontal scroll flow wrapped in a relative container with overlapping navigation buttons */}
            <div className="relative group/carousel">
              {/* Left Overlay Button */}
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className="absolute left-2 sm:left-4 top-[calc(50%-12px)] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#F31365]/80 text-[#F31365] bg-transparent backdrop-blur-md hover:bg-[#F31365] hover:text-white hover:border-[#F31365] hover:shadow-[0_0_20px_rgba(243,19,101,0.4)] active:scale-95 active:bg-[#d00e54] transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none flex items-center justify-center group/btn"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
              </button>

              {/* Right Overlay Button */}
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className="absolute right-2 sm:right-4 top-[calc(50%-12px)] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#F31365]/80 text-[#F31365] bg-transparent backdrop-blur-md hover:bg-[#F31365] hover:text-white hover:border-[#F31365] hover:shadow-[0_0_20px_rgba(243,19,101,0.4)] active:scale-95 active:bg-[#d00e54] transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none flex items-center justify-center group/btn"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              <div 
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onScroll={updateScrollButtons}
                className={`flex overflow-x-auto gap-6 pb-6 pt-2 pointer-events-auto px-12 sm:px-18 ${
                  isSwiping 
                    ? 'cursor-grabbing select-none scroll-auto' 
                    : 'cursor-grab scroll-smooth snap-x snap-mandatory'
                }`}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {featuredItems.map((item, index) => (
                  <motion.div
                    key={`featured-${item.id}`}
                    onClick={(e) => handleItemClick(e, item)}
                    data-hover-text="Inspect"
                    initial={{ opacity: 0, x: 60, scale: 0.97 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 120, 
                      damping: 20, 
                      delay: index * 0.12 
                    }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="min-w-[75vw] sm:min-w-[42vw] lg:min-w-[28vw] aspect-[16/10] bg-neutral-900/40 rounded-3xl overflow-hidden border border-warm-beige/10 group snap-start relative flex-shrink-0 flex flex-col justify-between p-6 hover:border-cerise/50 transition-all duration-500"
                  >
                    {/* Backdrop artwork */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out select-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13070E]/90 via-[#13070E]/20 to-transparent" />
                    </div>

                    {/* Top indicators */}
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="px-3 py-1 bg-[#13070E]/70 backdrop-blur-md rounded-full text-[9px] font-mono font-semibold text-coral uppercase tracking-wider border border-coral/20">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-mono text-warm-beige/50">
                        [ N° {index + 1} / 0{featuredItems.length} ]
                      </span>
                    </div>

                    {/* Bottom Text */}
                    <div className="relative z-10 mt-auto pt-8 sm:pt-14">
                      <p className="font-mono text-[10px] text-cerise font-bold tracking-widest mb-1">
                        {item.year} STUDIO PROJECT
                      </p>
                      <h3 className="font-display font-medium text-xl sm:text-2xl text-warm-beige group-hover:text-cerise transition-colors duration-300 flex items-center justify-between">
                        {item.title}
                        <Maximize2 className="w-4 h-4 text-warm-beige/40 group-hover:text-cerise opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </h3>
                      <p className="text-xs text-warm-beige/70 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2ND PART: ASYMMETRICAL MOUNTED GRID (Full filtered / implied flow) */}
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-8 font-mono text-[11px] text-coral uppercase tracking-widest border-t border-warm-beige/10 pt-12"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Studio Vault / All Practice Assets</span>
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.98 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 140,
                        damping: 18
                      }
                    }
                  }}
                  className="h-full"
                >
                  <InteractivePortfolioCard
                    item={item}
                    onClick={() => setActiveItem(item)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3RD PART: THE LIGHTBOX DETAILED INSPECT MODAL */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-plum-black/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-5xl bg-[#1a0f15]/95 border border-warm-beige/10 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] lg:max-h-none overflow-y-auto"
            >
              <button
                onClick={() => setActiveItem(null)}
                data-hover-text="Close"
                className="absolute top-4 right-4 z-20 p-2.5 bg-plum-black/80 hover:bg-cerise text-warm-beige rounded-full border border-warm-beige/10 hover:border-transparent transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media column */}
              <div className="lg:col-span-7 bg-[#13070E] relative flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover max-h-[50vh] lg:max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Explanatory Context column */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-8 bg-gradient-to-br from-[#1a0f15] to-[#13070e]">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cerise text-warm-beige text-[10px] font-mono tracking-widest rounded-full uppercase">
                      {activeItem.categoryLabel}
                    </span>
                    <span className="px-3 py-1 bg-warm-beige/5 text-warm-beige/80 text-[10px] font-mono tracking-widest rounded-full uppercase border border-warm-beige/10">
                      N° {activeItem.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-medium text-warm-beige tracking-tight leading-tight">
                      {activeItem.title}
                    </h3>
                    <p className="font-mono text-xs text-coral">
                      STUDIO INITIATIVE // COMPLETED {activeItem.year}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-warm-beige/90 uppercase tracking-widest font-mono text-[10px] border-b border-warm-beige/10 pb-2">
                      Studio Brief & Workflow
                    </p>
                    <p className="text-sm text-warm-beige/75 leading-relaxed">
                      {activeItem.description}
                    </p>
                    <p className="text-xs text-warm-beige/60 leading-relaxed italic">
                      "To deliver the client's creative targets, we synchronized our shared visual vocabulary, ensuring Faiz directed the stylistic boundaries, Mudhhir mapped out the vector assets, and Irsyad timed the fluid keyframing structures."
                    </p>
                  </div>
                </div>

                {/* Engagement details */}
                <div className="space-y-4 pt-6 border-t border-warm-beige/10">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-warm-beige/40 block">CLIENT</span>
                      <span className="text-warm-beige/80 font-medium">SYAM Labs / Open</span>
                    </div>
                    <div>
                      <span className="text-warm-beige/40 block">SPECS USED</span>
                      <span className="text-coral font-medium uppercase">{activeItem.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="w-full py-3 bg-warm-beige hover:bg-cerise text-plum-black hover:text-warm-beige font-display font-semibold rounded-xl text-center text-xs transition-colors duration-300 uppercase tracking-wider block"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
