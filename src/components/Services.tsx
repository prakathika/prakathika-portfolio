import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Globe, Code, Database, Layout, Smartphone, Server,
  Cloud, Cpu, GitBranch, Terminal, Shield, Brain
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

const FloatingIcon = ({ rotation = 0 }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh rotation={[0, rotation, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#9F67FF"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Frontend Development',
    description: 'Building responsive web applications with React, Next.js, and modern CSS frameworks',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux']
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Backend Development',
    description: 'Creating robust server-side applications with Node.js and Python',
    tech: ['Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB']
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Database Design',
    description: 'Designing efficient database schemas and implementing optimized queries',
    tech: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Prisma']
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Cloud Solutions',
    description: 'Deploying and managing applications on cloud platforms',
    tech: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'AI Integration',
    description: 'Implementing machine learning models and AI-powered features',
    tech: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn', 'NLP']
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Security Implementation',
    description: 'Implementing robust security measures and best practices',
    tech: ['OAuth', 'JWT', 'HTTPS', 'Encryption', 'Security Headers']
  }
];

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      <div className="relative p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all hover:-translate-y-2">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
        <p className="text-gray-400 mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <group>
            {[...Array(6)].map((_, i) => (
              <group key={i} position={[Math.sin(i) * 8, Math.cos(i) * 8, 0]}>
                <FloatingIcon rotation={i * Math.PI / 3} />
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
        <h2 className="text-4xl font-bold mb-12 text-gradient text-center">Technical Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;