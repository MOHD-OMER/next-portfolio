"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [scrambledName, setScrambledName] = useState("");
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const exploreButtonRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Smooth mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: (clientX / window.innerWidth - 0.5) * 20,
      y: (clientY / window.innerHeight - 0.5) * 20,
    });
    mouseX.set((clientX / window.innerWidth - 0.5) * 40);
    mouseY.set((clientY / window.innerHeight - 0.5) * 40);
  }, [mouseX, mouseY]);

  // Hacker typing scramble effect
  useEffect(() => {
    const fullName = "Mohammed Abdul Omer";
    let frame = 0;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let output = "";

    const interval = setInterval(() => {
      frame++;

      output = fullName
        .split("")
        .map((char, i) => {
          if (frame / 3 > i) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setScrambledName(output);

      if (frame / 3 > fullName.length) clearInterval(interval);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const titles = useMemo(() => [
    "Machine Learning Engineer",
    "Generative AI Engineer", 
    "AI Researcher",
    "Deep Learner"
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const handleButtonHover = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleButtonLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-20 md:pt-32 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Layered Animated Background with Multiple Gradients */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)",
          }}
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.4, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)",
          }}
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 1.3, 1.25, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, -80, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.35, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/3 w-[550px] h-[550px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(239, 68, 68, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: [0, -90, 70, 0],
            y: [0, 70, -50, 0],
            scale: [1, 1.25, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Dynamic Grid Pattern with Enhanced Mouse Interaction */}
      <motion.div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(100,200,255,0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(100,200,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />

      {/* Radial Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 800px at 50% 40%, rgba(100, 200, 255, 0.08), transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full flex flex-col items-center px-4"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="w-full flex flex-col items-center"
        >
          {/* Enhanced Profile Image with Holographic Effect */}
          <div className="w-full flex justify-center items-center mb-10 mt-10 md:mt-20">
            <motion.div className="relative">
              {/* Profile Image Container */}
              <motion.div
                className="relative w-[200px] h-[200px] rounded-full p-[4px]
                bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_80px_rgba(100,150,255,0.5)]"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-dark border-[4px] border-dark/90">
                  <Image
                    src="/profile.png"
                    fill
                    alt="Mohammed Abdul Omer"
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                    priority
                    sizes="200px"
                  />
                  
                  {/* Holographic Overlay */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(100,200,255,0.3) 0%, transparent 50%, rgba(168,85,247,0.3) 100%)",
                      mixBlendMode: "overlay",
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>




            </motion.div>
          </div>

          {/* Name with Enhanced Typing + Multi-layered Glow */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-3 relative text-center tracking-tight"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
            }}
          >
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="relative inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-purple-100">
                {scrambledName}
              </span>

              {/* Animated Cursor */}
              <motion.span
                animate={{ opacity: typingComplete ? [1, 0, 1] : 1 }}
                transition={{ 
                  duration: 0.6, 
                  repeat: typingComplete ? Infinity : 0 
                }}
                className="inline-block ml-1.5 text-blue-400 font-normal text-5xl md:text-7xl"
              >
                |
              </motion.span>
            </motion.span>
            
            {/* Multi-layer Neon Glow */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-xl pointer-events-none opacity-60"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Mohammed Abdul Omer
            </motion.span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent blur-2xl pointer-events-none opacity-40"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              Mohammed Abdul Omer
            </motion.span>
          </motion.h1>

          {/* Enhanced Title Transition with Gradient Animation */}
          <motion.div
            variants={itemVariants}
            className="mt-6 relative h-14 flex items-center justify-center"
          >
            <motion.div
              key={currentTitleIndex}
              initial={{ opacity: 0, y: 25, filter: "blur(12px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -25, filter: "blur(12px)", scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="absolute text-xl md:text-2xl lg:text-4xl font-extrabold whitespace-nowrap"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                }}
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {titles[currentTitleIndex]}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Enhanced Description with Interactive Highlights */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 mt-16 max-w-4xl px-6 text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
          >
            Architecting intelligent systems at the intersection of{" "}
            <motion.span 
              className="text-blue-400 font-bold inline-block relative cursor-pointer"
              whileHover={{ 
                scale: 1.08,
                color: "#60a5fa",
              }}
              transition={{ duration: 0.2 }}
            >
              deep learning
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>,{" "}
            <motion.span 
              className="text-purple-400 font-bold inline-block relative cursor-pointer"
              whileHover={{ 
                scale: 1.08,
                color: "#c084fc",
              }}
              transition={{ duration: 0.2 }}
            >
              automation
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>, and{" "}
            <motion.span 
              className="text-pink-400 font-bold inline-block relative cursor-pointer"
              whileHover={{ 
                scale: 1.08,
                color: "#f472b6",
              }}
              transition={{ duration: 0.2 }}
            >
              innovation
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            {" "}to transform complex challenges into elegant solutions.
          </motion.p>

          {/* Premium CTA Buttons with Advanced Effects */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 mt-16 justify-center"
          >
            <motion.a
              ref={buttonRef}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold overflow-hidden shadow-[0_10px_40px_rgba(100,150,255,0.4)] transition-all duration-300"
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 20px 60px rgba(100, 150, 255, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={(e) => handleButtonHover(e, buttonRef)}
              onMouseLeave={() => handleButtonLeave(buttonRef)}
              style={{ transition: "transform 0.2s ease-out" }}
            >
              {/* Animated Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  backgroundSize: "200% 200%",
                }}
              />
              
              <span className="relative z-10 flex items-center gap-3 text-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </span>
            </motion.a>

            <motion.a
              ref={exploreButtonRef}
              href="#projects"
              className="group relative px-12 py-6 border-2 border-blue-400/70 text-blue-400 rounded-2xl font-bold overflow-hidden backdrop-blur-xl bg-blue-500/10 shadow-[0_10px_40px_rgba(100,150,255,0.2)] transition-all duration-300"
              whileHover={{ 
                scale: 1.08,
                borderColor: "#60a5fa",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                boxShadow: "0 20px 60px rgba(100, 150, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={(e) => handleButtonHover(e, exploreButtonRef)}
              onMouseLeave={() => handleButtonLeave(exploreButtonRef)}
              style={{ transition: "transform 0.2s ease-out" }}
            >
              {/* Gradient Sweep on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              <span className="relative z-10 flex items-center gap-3 text-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Explore Projects
              </span>
            </motion.a>
          </motion.div>

          {/* Modern Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-28 flex flex-col items-center gap-5"
          >
            <motion.span 
              className="text-gray-400 text-sm font-semibold tracking-[0.25em] uppercase"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              className="relative w-8 h-14 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-3 backdrop-blur-md bg-blue-500/10 shadow-[0_0_30px_rgba(100,150,255,0.2)]"
              whileHover={{ 
                borderColor: "#60a5fa",
                scale: 1.15,
                boxShadow: "0 0 40px rgba(100,150,255,0.4)"
              }}
            >
              <motion.div
                className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/60"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Particles with Varied Colors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => {
            const colors = [
              "rgba(59,130,246,0.7)",
              "rgba(168,85,247,0.6)",
              "rgba(236,72,153,0.6)",
              "rgba(34,211,238,0.5)",
            ];
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${2.5 + (i % 4)}px`,
                  height: `${2.5 + (i % 4)}px`,
                  background: `radial-gradient(circle, ${colors[i % 4]} 0%, transparent 70%)`,
                  left: `${(i * 6) + 5}%`,
                  top: `${(i * 5) + 10}%`,
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 15px ${colors[i % 4]}`,
                }}
                animate={{
                  y: [0, -180, 0],
                  opacity: [0, 1, 0],
                  scale: [0.3, 2, 0.3],
                }}
                transition={{
                  duration: 7 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            );
          })}
        </div>
      </motion.div>  
    </section>
  );
}