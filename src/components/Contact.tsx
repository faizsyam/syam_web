import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Instagram, Sparkles, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submittedName, setSubmittedName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmittedName(formData.name);
    // Simulate API delivery (fits brief without unrequested DB layers)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('faizsyam06@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact-section" className="py-24 px-6 sm:px-12 md:px-24 bg-[#13070E] theme-grid-dark text-warm-beige relative overflow-hidden select-none">
      {/* Drafting Crosshairs & Alignment Marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-warm-beige/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-warm-beige/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-warm-beige/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-warm-beige/20 pointer-events-none" />

      {/* Structural graphic lights on dark plum backdrop */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cerise/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-coral/5 blur-[80px] pointer-events-none" />

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
              delayChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10"
      >
        
        {/* Left Column: Direct connection, social handles and copy email */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -35, scale: 0.98 },
            visible: {
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 18
              }
            }
          }}
          className="lg:col-span-5 space-y-10 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-coral font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>DELIBERATE CONNECTIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight">
              Let’s build{' '}
              <motion.span 
                whileHover={{ 
                  y: -3,
                  color: "#FF5A5F", 
                  textShadow: "0 0 12px rgba(243,19,101,0.35)",
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-cerise italic font-display inline-block cursor-help select-none origin-center"
              >
                something
              </motion.span>{' '}
              real.
            </h2>
            <p className="text-warm-beige/70 text-sm sm:text-base leading-relaxed font-sans">
              Got an idea for an art piece, character line-up, kinematic kinetic loop, logo morph, or full social media campaign? Tell us about it. We reply with sketches within one day.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-mono text-[9px] text-warm-beige/40 uppercase tracking-widest leading-none">
              Direct channels // Skip the form
            </h4>

            <div className="space-y-3">
              {/* Interactive clipboard email */}
              <button
                onClick={copyEmailToClipboard}
                data-hover-text={copiedEmail ? 'Copied' : 'Copy Email'}
                className="group flex items-center justify-between w-full max-w-sm p-4 bg-warm-beige/5 hover:bg-cerise/10 border border-warm-beige/10 hover:border-cerise/30 rounded-2xl transition-all duration-300 text-left pointer-events-auto cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cerise/10 rounded-xl group-hover:bg-cerise/20 transition-colors">
                    <Mail className="w-4 h-4 text-cerise" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-warm-beige/55 block">STUDIO MAINMAIL</span>
                    <span className="text-sm font-semibold tracking-tight text-warm-beige">faizsyam06@gmail.com</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-warm-beige/40 group-hover:text-cerise transition-colors">
                  {copiedEmail ? '[ COPIED! ]' : '[ CLICK TO COPY ]'}
                </span>
              </button>
            </div>
          </div>

          {/* Socials Block */}
          <div className="space-y-4 pt-10 border-t border-warm-beige/10">
            <p className="font-mono text-[9px] text-warm-beige/40 uppercase tracking-widest leading-none">
              Explore Our Footprints
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/syamlab"
                target="_blank"
                rel="noreferrer"
                data-hover-text="Instagram"
                className="flex items-center gap-2 px-4 py-2.5 bg-warm-beige/5 hover:bg-cerise border border-warm-beige/10 hover:border-transparent rounded-xl text-xs font-mono transition-all duration-300 pointer-events-auto hover:scale-[1.03]"
              >
                <Instagram className="w-4 h-4 text-coral" />
                <span>INSTAGRAM</span>
              </a>
              <a
                href="https://behance.net/syamlab"
                target="_blank"
                rel="noreferrer"
                data-hover-text="Behance"
                className="flex items-center gap-2 px-4 py-2.5 bg-warm-beige/5 hover:bg-coral border border-warm-beige/10 hover:border-transparent rounded-xl text-xs font-mono transition-all duration-300 pointer-events-auto hover:scale-[1.03]"
              >
                <span className="font-bold text-[10px] text-cerise">Be</span>
                <span>BEHANCE</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Custom styled submission form or success stage */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 35, scale: 0.98 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 18,
                delay: 0.15
              }
            }
          }}
          className="lg:col-span-7"
        >
          <div className="p-8 sm:p-10 bg-warm-beige/5 border border-warm-beige/10 rounded-3xl relative overflow-hidden shadow-2xl">
            <h3 className="font-display font-medium text-xl text-warm-beige mb-6">
              Launch Studio Brief
            </h3>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 pointer-events-auto"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name-input" className="font-mono text-[10px] text-warm-beige/55 uppercase tracking-widest">
                      How should we address you?
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alexis Carter"
                      className="w-full px-4 py-3.5 bg-plum-black/40 border border-warm-beige/10 focus:border-cerise hover:border-warm-beige/25 rounded-xl text-sm text-warm-beige placeholder-warm-beige/25 outline-none transition-all duration-300 focus:ring-1 focus:ring-cerise/20"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email-input" className="font-mono text-[10px] text-warm-beige/55 uppercase tracking-widest">
                      Where do we send sketches and answers?
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alexis@studio.co"
                      className="w-full px-4 py-3.5 bg-plum-black/40 border border-warm-beige/10 focus:border-cerise hover:border-warm-beige/25 rounded-xl text-sm text-warm-beige placeholder-warm-beige/25 outline-none transition-all duration-300 focus:ring-1 focus:ring-cerise/20"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label htmlFor="message-input" className="font-mono text-[10px] text-warm-beige/55 uppercase tracking-widest">
                      What visual goals are we conquering?
                    </label>
                    <textarea
                      id="message-input"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your character concepts, video curves, illustration layouts, or timeframe demands..."
                      className="w-full px-4 py-3.5 bg-plum-black/40 border border-warm-beige/10 focus:border-cerise hover:border-warm-beige/25 rounded-xl text-sm text-warm-beige placeholder-warm-beige/25 outline-none transition-all duration-300 resize-none focus:ring-1 focus:ring-cerise/20"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    data-hover-text="Submit Form"
                    animate={isSubmitting ? {} : {
                      scale: [1, 1.015, 1],
                      boxShadow: [
                        "0 10px 15px -3px rgba(243, 19, 101, 0.25), 0 4px 6px -2px rgba(243, 19, 101, 0.05)",
                        "0 15px 25px -5px rgba(243, 19, 101, 0.4), 0 10px 10px -5px rgba(243, 19, 101, 0.08)",
                        "0 10px 15px -3px rgba(243, 19, 101, 0.25), 0 4px 6px -2px rgba(243, 19, 101, 0.05)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.025, y: -1 }}
                    whileTap={{ scale: 0.975 }}
                    className="w-full py-4 bg-cerise hover:bg-coral text-warm-beige font-display font-semibold rounded-xl text-center text-xs transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer border border-white/10"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-warm-beige/30 border-t-warm-beige rounded-full animate-spin" />
                        <span>transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Brief</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-cerise/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-cerise animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-display font-medium text-warm-beige">
                      Transmission Received!
                    </h4>
                    <p className="text-sm text-warm-beige/70 max-w-sm mx-auto leading-relaxed font-sans">
                      Thank you, <span className="text-coral font-bold">{submittedName || 'friend'}</span>. Your creative goals have bypassed core atmosphere straight to the Faiz/Mudhhir/Irsyad shared sketchbook. We will notify you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-warm-beige/10 hover:bg-warm-beige/15 text-warm-beige font-mono text-xs uppercase tracking-widest rounded-xl transition-colors border border-warm-beige/10 pointer-events-auto cursor-pointer"
                  >
                    [ WRITE ANOTHER RESPONSE ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Aesthetic footer signature */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between mt-20 pt-8 border-t border-warm-beige/10 text-[10px] font-mono text-warm-beige/40">
        <div className="flex gap-4">
          <span>© 2026 SYAM CREATIVE LAB</span>
          <span>ALL PRACTICE DELIBERATE</span>
        </div>
        <div>
          <span>CRAFTED IN COHESION BY BROTHERS</span>
        </div>
      </div>
    </section>
  );
}
