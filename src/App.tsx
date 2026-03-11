import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [stage, setStage] = useState<'logo' | 'welcome' | 'main'>('logo');

  useEffect(() => {
    // Stage 1: Logo for 1 second
    const logoTimer = setTimeout(() => {
      setStage('welcome');
    }, 1000);

    // Stage 2: Welcome message for another 2.5 seconds (total 3.5s from start)
    const welcomeTimer = setTimeout(() => {
      setStage('main');
    }, 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {stage === 'logo' && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, filter: 'blur(10px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-6"
            >
              <img 
                src="/logo.png" 
                alt="La Monte Logo" 
                className="max-w-[300px] md:max-w-[600px] h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[0.15em] text-[#B06138]">
                  LA MONTE
                </h1>
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-sans font-light mt-2 text-[#B06138]/80">
                  Restaurant & Cafe
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center space-y-8"
          >
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 0.6, letterSpacing: "0.8em" }}
                transition={{ duration: 1.2 }}
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
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-brand/40 mx-auto"
            />
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-serif font-light text-[#1A1A1A]">
              Hi
            </h1>
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
