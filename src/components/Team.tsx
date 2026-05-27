import { useState, MouseEvent } from 'react';
import { TEAM_MEMBERS } from '../data';
import { motion } from 'motion/react';
import { Instagram, Globe, Mail, Eye, Award, Cpu, Move } from 'lucide-react';

function InteractiveTeamCard({ member, dec }: { member: typeof TEAM_MEMBERS[0]; dec: any; key?: string }) {
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

    const rX = -(y - yc) / (rect.height / 10);
    const rY = (x - xc) / (rect.width / 10);

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
    <div style={{ perspective: 1000 }} className="h-full select-none">
      <motion.div
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
          stiffness: 280,
          damping: 22,
          mass: 0.5
        } : {
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: member.id === 'faiz' ? 0 : member.id === 'mudhhir' ? 0.5 : 1.0
          },
          default: {
            type: 'spring',
            stiffness: 280,
            damping: 22
          }
        }}
        className={`bg-[#faf7f3] rounded-3xl overflow-hidden border border-plum-black/5 hover:border-cerise/20 h-full flex flex-col justify-between group p-0 transition-all duration-300 relative ${
          hovered ? 'shadow-[0_25px_50px_-15px_rgba(19,7,14,0.12)]' : 'shadow-sm shadow-plum-black/5'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Portrait area with custom floating decorator - paddingless full bleed */}
            <div className="relative aspect-square w-full rounded-t-3xl overflow-hidden bg-plum-black/5 border-b border-plum-black/10">
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Spotlight reflection glare */}
              {hovered && (
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
                  style={{
                    background: `radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
                  }}
                />
              )}

              {dec?.floatingElement}

              {/* Bottom overlay title */}
              <div className="absolute bottom-4 left-4 text-warm-beige">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#FFF5F6] font-medium opacity-90 font-mono">
                  {dec?.badgeText}
                </p>
                <h4 className="font-display font-medium text-xl tracking-tight leading-none mt-1 text-white">
                  {member.name} SYAM
                </h4>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Role identifier bar */}
              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors duration-300 ${dec?.accentBg}`}>
                {dec?.icon}
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-plum-black/80">
                  {member.role}
                </span>
              </div>

              {/* Character/Bio text with conversation block style */}
              <p className="text-sm text-plum-black/75 leading-relaxed font-sans">
                {member.bio}
              </p>

              {/* Custom list of specialties */}
              <div className="space-y-2 pt-2">
                <p className="font-mono text-[9px] text-plum-black/40 uppercase tracking-widest">
                  Specialties // Core Skillset
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((spec) => (
                    <span 
                      key={spec} 
                      className="px-2.5 py-1 bg-plum-black/5 hover:bg-cerise/5 text-[10px] font-mono text-plum-black/70 hover:text-cerise transition-colors rounded-lg border border-plum-black/5 cursor-help"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Handshakes & Socials Footer */}
          <div className="p-6 pt-5 border-t border-plum-black/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-plum-black/45">
              [ LINK OUT ]
            </span>
            
            <div className="flex items-center gap-3 z-10 font-mono">
              {member.socials.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  data-hover-text={`@${member.name}`}
                  className="p-2 bg-plum-black/5 hover:bg-cerise hover:text-warm-beige text-plum-black/60 rounded-xl transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {member.socials.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  data-hover-text="Portfolio"
                  className="p-2 bg-plum-black/5 hover:bg-coral hover:text-warm-beige text-plum-black/60 rounded-xl transition-all duration-300"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {member.socials.email && (
                <a
                  href={`mailto:${member.socials.email}`}
                  data-hover-text="Direct"
                  className="p-2 bg-plum-black/5 hover:bg-plum-black hover:text-warm-beige text-plum-black/60 rounded-xl transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Team() {
  // Map icons or special graphics to specific brothers to represent their disciplines
  const getDisciplineDecorators = (id: string) => {
    switch (id) {
      case 'faiz':
        return {
          icon: <Eye className="w-5 h-5 text-cerise" />,
          accentBg: 'bg-cerise/10 border-cerise/20',
          badgeText: 'VISION & STRATEGY',
        };
      case 'mudhhir':
        return {
          icon: <Award className="w-5 h-5 text-coral" />,
          accentBg: 'bg-coral/10 border-coral/20',
          badgeText: 'LINE & SCENE MASTERY',
        };
      case 'irsyad':
        return {
          icon: <Cpu className="w-5 h-5 text-purple-500" />,
          accentBg: 'bg-purple-500/10 border-purple-500/20',
          badgeText: 'SPEED CURVE PHYSICS',
        };
      default:
        return null;
    }
  };

  return (
    <section id="team-section" className="py-24 px-6 sm:px-12 md:px-24 bg-warm-beige theme-grid-light text-plum-black relative overflow-hidden select-none">
      {/* Drafting Crosshairs & Alignment Marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-plum-black/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-plum-black/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-plum-black/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-plum-black/20 pointer-events-none" />

      {/* Schematic Blueprint Circles rotating in backend representing Faiz/Mudhhir/Irsyad visual precision */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.circle 
            cx="15%" cy="30%" r="140" 
            fill="none" stroke="#13070E" strokeWidth="1" strokeDasharray="4,8"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle 
            cx="85%" cy="75%" r="180" 
            fill="none" stroke="#F31365" strokeWidth="1" strokeDasharray="3,12"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-2xl"
        >
          <div className="flex items-center gap-2 text-cerise font-mono text-xs uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-cerise animate-ping" />
            <span>THE COHESIVE BRAIN</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight">
            Meet the{' '}
            <motion.span 
              whileHover={{ 
                y: -3,
                color: "#13070E",
                textShadow: "0 0 12px rgba(244,140,114,0.35)",
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="text-coral italic font-display inline-block cursor-help select-none origin-center"
            >
              SYAM Brothers
            </motion.span>
          </h2>
          <p className="text-plum-black/70 text-sm sm:text-base leading-relaxed font-sans">
            Formed in mutual design obsession, we divide and conquer our projects based on three specific pillars of craft.
          </p>
        </motion.div>

        {/* Members List with premium stagger animations */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 120,
                    damping: 18
                  }
                }
              }}
              className="h-full"
            >
              <InteractiveTeamCard
                member={member}
                dec={getDisciplineDecorators(member.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
