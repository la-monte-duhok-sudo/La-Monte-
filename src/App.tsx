import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Intro for 1 second as requested
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!showWelcome ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative group">
              {/* Logo Image with Text Fallback */}
              <img 
                src="/logo.png" 
                alt="La Monte Logo" 
                className="max-w-[280px] md:max-w-[400px] h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[0.15em] text-brand">
                  LA MONTE
                </h1>
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-sans font-light mt-2 text-brand/80">
                  Restaurant & Cafe
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
            className="text-center space-y-8"
          >
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 0.6, letterSpacing: "0.8em" }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="text-[10px] md:text-xs uppercase font-sans font-medium text-brand"
              >
                Experience Elegance
              </motion.p>
              <h2 className="text-4xl md:text-7xl font-serif font-light tracking-tight text-[#1A1A1A]">
                Welcome to <span className="italic text-brand font-medium">La Monte</span>
              </h2>
            </div>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "80px", opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              className="h-[1px] bg-brand/40 mx-auto"
            />
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>
    </main>
  );
}
