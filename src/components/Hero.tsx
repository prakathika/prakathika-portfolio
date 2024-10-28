import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Rocket } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';

const FloatingLogo = () => {
  const meshRef = useRef();

  return (
    <Float
      speed={1.5}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#9F67FF"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

const ParallaxText = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingCard = ({ icon: Icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
    style={{
      boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
    }}
  >
    <Icon className="w-4 h-4 text-accent" />
    <span className="text-gray-300">{title}</span>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars
            radius={50}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <group position={[3, 0, 0]}>
            <FloatingLogo />
          </group>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      <FloatingCard
        icon={Code2}
        title="Full Stack Developer"
        delay={0.6}
        style={{ top: '20%', left: '15%' }}
      />
      
      <FloatingCard
        icon={Rocket}
        title="AI Enthusiast"
        delay={0.9}
        style={{ bottom: '25%', right: '10%' }}
      />
      
      <ParallaxText className="text-center relative z-10 perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient">Prakathika V</span>
          </h1>
          <div className="relative">
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Computer Science Engineering Student & Aspiring Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Building the future through code, one project at a time.
              Transforming ideas into elegant solutions with modern technology.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-accent hover:bg-accent-light px-8 py-4 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-accent/50"
              >
                Get in Touch
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </ParallaxText>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-gray-400 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <div className="w-[2px] h-8 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;