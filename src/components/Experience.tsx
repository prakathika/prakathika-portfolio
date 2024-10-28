import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Code2, Briefcase, Award, GitBranch, Terminal } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';

const FloatingNumber = ({ number, position }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <Text3D
        font="/fonts/inter_bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        position={position}
      >
        {number}
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#9F67FF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  );
};

const experiences = [
  {
    icon: <BookOpen className="w-5 h-5 text-accent" />,
    title: 'B.E. Computer Science Engineering',
    organization: 'Hindusthan College of Engineering and Technology',
    period: '2021 - Present',
    description: [
      'Specialized in Advanced Algorithms and Data Structures',
      'Core team member of the College Technical Club',
      'Maintained a consistent CGPA of 8.0',
      'Published research paper on Edge Computing'
    ],
    tech: ['Data Structures', 'Algorithms', 'System Design', 'Research']
  },
  {
    icon: <Code2 className="w-5 h-5 text-accent" />,
    title: 'Full Stack Development Intern',
    organization: 'TechCorp Solutions',
    period: 'Summer 2023',
    description: [
      'Developed microservices using Node.js and Express',
      'Implemented real-time features with WebSocket',
      'Optimized database queries improving performance by 40%',
      'Contributed to the team\'s CI/CD pipeline'
    ],
    tech: ['Node.js', 'React', 'MongoDB', 'Docker', 'AWS']
  },
  {
    icon: <Terminal className="w-5 h-5 text-accent" />,
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    period: '2022 - Present',
    description: [
      'Active contributor to popular open-source projects',
      'Created documentation and tutorials',
      'Fixed critical bugs and implemented new features',
      'Collaborated with global developer community'
    ],
    tech: ['Git', 'JavaScript', 'Python', 'Documentation', 'Testing']
  }
];

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className="relative pl-8 mb-12"
    >
      <div className="absolute -left-[41px] bg-dark p-2 rounded-full border-2 border-accent">
        {experience.icon}
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-black/30 p-6 rounded-lg backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all"
      >
        <h3 className="text-xl font-semibold text-accent">{experience.title}</h3>
        <p className="text-gray-400 mt-1">{experience.organization}</p>
        <p className="text-gray-400">{experience.period}</p>
        <ul className="mt-4 space-y-2">
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <GitBranch className="w-4 h-4 mt-1 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <group>
            {[...Array(3)].map((_, i) => (
              <group key={i} position={[Math.sin(i) * 5, Math.cos(i) * 5, 0]}>
                <FloatingNumber number={i + 1} position={[-0.5, 0, 0]} />
              </group>
            ))}
          </group>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 text-gradient text-center">Education & Experience</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-accent/30">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;