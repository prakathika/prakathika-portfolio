import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Brain, Rocket, Database, Server, Globe } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

const FloatingCube = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#9F67FF"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.span
      ref={ref}
      style={{ x, opacity }}
      className="px-4 py-2 bg-accent/10 rounded-full text-accent text-center text-sm hover:bg-accent/20 transition-colors cursor-default"
    >
      {skill}
    </motion.span>
  );
};

const About = () => {
  const skills = [
    "JavaScript/TypeScript", "React.js", "Node.js", "Python",
    "TensorFlow", "SQL/NoSQL", "AWS", "Docker",
    "Git", "Agile", "UI/UX Design", "System Design"
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="py-20 relative" ref={containerRef}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-16 text-gradient text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4">Aspiring Software Engineer</h3>
            <p className="text-gray-300 mb-6">
              Currently in my final year at Hindusthan College of Engineering and Technology,
              I'm passionate about creating innovative solutions that make a difference.
              With a strong foundation in computer science and a CGPA of 8.0, I combine
              academic excellence with practical experience in modern technologies.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in technology started with web development and has evolved to
              include machine learning, cloud computing, and full-stack development.
              I'm particularly interested in how AI can be integrated into web applications
              to create more intelligent and user-friendly experiences.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingCube />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
              />
            </Canvas>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;