import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import { NavBar } from './components/NavBar';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Create cursor trail effect
    const createTrail = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail active';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        document.body.removeChild(trail);
      }, 1000);
    };

    window.addEventListener('mousemove', createTrail);

    return () => {
      window.removeEventListener('mousemove', createTrail);
    };
  }, []);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <NavBar />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            number: { value: 50 },
            color: { value: "#7C3AED" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: "out"
            },
            links: {
              enable: true,
              color: "#7C3AED",
              opacity: 0.2
            }
          }
        }}
      />
      <div className="meteors-container">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="meteor"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      <main className="container mx-auto px-4 py-20">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <footer className="bg-black/30 backdrop-blur-sm py-6 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="mailto:prakathika2815@gmail.com"
              className="hover:text-accent transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </div>
          <p className="text-gray-400">© 2024 Prakathika V. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;